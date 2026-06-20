"use client";

import ICAL from "ical.js";

export type BookedRange = {
  start: Date;
  end: Date;
};

function toDate(value: unknown): Date | null {
  if (value instanceof Date) return value;
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 8) {
    const year = parseInt(cleaned.slice(0, 4), 10);
    const month = parseInt(cleaned.slice(4, 6), 10) - 1;
    const day = parseInt(cleaned.slice(6, 8), 10);
    return new Date(year, month, day);
  }
  return null;
}

function getEventDates(event: unknown): { start: Date | null; end: Date | null } {
  const ev = event as {
    getAllProperties?: (name: string) => unknown[];
    getFirstPropertyValue?: (name: string) => unknown;
  };

  if (ev.getFirstPropertyValue) {
    return {
      start: toDate(ev.getFirstPropertyValue("dtstart")),
      end: toDate(ev.getFirstPropertyValue("dtend")),
    };
  }

  return { start: null, end: null };
}

function collectEvents(component: unknown): unknown[] {
  const comp = component as {
    getAllSubcomponents?: (name: string) => unknown[];
    name?: string;
  };
  const events: unknown[] = [];
  if (comp.name === "vevent") {
    events.push(component);
  }
  if (Array.isArray(comp.getAllSubcomponents)) {
    for (const sub of comp.getAllSubcomponents("vevent")) {
      events.push(sub);
    }
    for (const sub of comp.getAllSubcomponents("vcalendar")) {
      events.push(...collectEvents(sub));
    }
  }
  return events;
}

export async function fetchBookedRanges(icalUrl: string): Promise<BookedRange[]> {
  if (!icalUrl) return [];
  try {
    const response = await fetch(icalUrl, { cache: "no-store" });
    if (!response.ok) return [];
    const text = await response.text();
    const parsed = ICAL.parse(text);
    const jcal = new ICAL.Component(parsed);
    const ranges: BookedRange[] = [];

    for (const event of collectEvents(jcal)) {
      const { start, end } = getEventDates(event);
      if (start && end) {
        ranges.push({ start, end });
      }
    }
    return ranges;
  } catch {
    return [];
  }
}

export function isDateBooked(date: Date, ranges: BookedRange[]): boolean {
  const time = date.getTime();
  return ranges.some((range) => {
    const start = new Date(range.start);
    start.setHours(0, 0, 0, 0);
    const end = new Date(range.end);
    end.setHours(0, 0, 0, 0);
    return time >= start.getTime() && time <= end.getTime();
  });
}

export function hasBookedDateInRange(start: Date, end: Date, ranges: BookedRange[]): boolean {
  const cursor = new Date(start);
  while (cursor.getTime() <= end.getTime()) {
    if (isDateBooked(cursor, ranges)) return true;
    cursor.setDate(cursor.getDate() + 1);
  }
  return false;
}
