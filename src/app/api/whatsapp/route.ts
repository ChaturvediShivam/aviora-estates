import { NextResponse } from "next/server";
import { business } from "@/lib/config";

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return "127.0.0.1";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = RATE_LIMIT.get(ip);

  if (!record || now > record.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

function sanitize(value: string, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = stripHtml(value).trim();
  if (cleaned.length === 0) return null;
  if (cleaned.length > maxLength) return null;
  // Reject dangerous encoded/script-looking content.
  if (/%3C|%3E|javascript:|on\w+\s*=|data:text\/html/i.test(cleaned)) {
    return null;
  }
  return cleaned;
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return /^[0-9]{7,15}$/.test(digits);
}

function parseNonNegativeInt(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const n = typeof value === "number" ? value : parseInt(value, 10);
  if (isNaN(n) || n < 0 || n > 99) return null;
  return n;
}

function parseDate(value: unknown): Date | null {
  if (typeof value !== "string" || !value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d;
}

export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);

  const rawMessage = searchParams.get("message");
  const message = sanitize(rawMessage || business.whatsapp.message, 1000);
  if (!message) {
    return NextResponse.json({ error: "Invalid message parameter." }, { status: 400 });
  }

  const rawName = searchParams.get("name");
  const name = rawName ? sanitize(rawName, 80) : null;
  if (rawName && !name) {
    return NextResponse.json({ error: "Invalid name parameter." }, { status: 400 });
  }

  const rawPhone = searchParams.get("phone");
  const phone = rawPhone ? sanitize(rawPhone, 20) : null;
  if (rawPhone && (!phone || !isValidPhone(phone))) {
    return NextResponse.json({ error: "Invalid phone parameter." }, { status: 400 });
  }

  const rawNotes = searchParams.get("notes");
  const notes = rawNotes ? sanitize(rawNotes, 500) : null;
  if (rawNotes && !notes) {
    return NextResponse.json({ error: "Invalid notes parameter." }, { status: 400 });
  }

  const checkIn = parseDate(searchParams.get("checkIn"));
  const checkOut = parseDate(searchParams.get("checkOut"));
  const adults = parseNonNegativeInt(searchParams.get("adults"));
  const children = parseNonNegativeInt(searchParams.get("children"));
  const pets = parseNonNegativeInt(searchParams.get("pets"));

  const number = business.whatsapp.number.replace(/\D/g, "");

  // Build final sanitized message. Optional structured fields are appended when valid.
  const parts = [message];

  if (name) parts.push(`Name: ${name}`);
  if (phone) parts.push(`Phone: ${phone}`);
  if (checkIn) parts.push(`Check-in: ${checkIn.toISOString().split("T")[0]}`);
  if (checkOut) parts.push(`Check-out: ${checkOut.toISOString().split("T")[0]}`);
  if (adults !== null) parts.push(`Adults: ${adults}`);
  if (children !== null) parts.push(`Children: ${children}`);
  if (pets !== null) parts.push(`Pets: ${pets}`);
  if (notes) parts.push(`Notes: ${notes}`);

  const finalMessage = parts.join("\n");
  const url = `https://wa.me/${number}?text=${encodeURIComponent(finalMessage)}`;

  return NextResponse.redirect(url, 302);
}
