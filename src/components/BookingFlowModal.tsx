"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Minus, Plus, CalendarDays, ShieldCheck, FileText, AlertTriangle, Clock, Users, IdCard, Banknote, CheckCircle2, Send, RotateCcw } from "lucide-react";
import { DayPicker, type DateRange } from "react-day-picker";
import { format, isBefore, startOfToday, eachDayOfInterval, getDay, isWeekend } from "date-fns";
import { properties, business, pricing, capacity, booking, type Property } from "@/lib/config";
import { cn } from "@/lib/utils";
import { fetchBookedRanges, isDateBooked, hasBookedDateInRange } from "@/lib/ical";
import "react-day-picker/style.css";

type Step = 1 | 2 | 3 | 4;

interface BookingFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPropertySlug?: string;
}

const MAX_ADULTS = 16;
const ABSOLUTE_MAX_ADULTS = 20;
const BOOKING_ID_KEY = "aviora-booking-counter";
const PET_PRICE = 500;

const OCCASIONS = [
  "Weekend getaway",
  "Family stay",
  "Celebration",
  "Corporate retreat",
  "Photoshoot",
];

function parseAmount(amount: string): number {
  const numeric = amount.replace(/[^\d]/g, "");
  return numeric ? parseInt(numeric, 10) : 0;
}

function generateBookingId(): string {
  if (typeof window === "undefined") return "AVR-001";
  const raw = localStorage.getItem(BOOKING_ID_KEY);
  let next = 1;
  if (raw) {
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed > 0) next = parsed;
  }
  const id = `AVR-${String(next).padStart(3, "0")}`;
  localStorage.setItem(BOOKING_ID_KEY, String(next + 1));
  return id;
}

function getShortLocation(location: string): string {
  return location.split(",")[0].trim();
}

function getDisplayName(name: string): string {
  return name.split(",")[0].trim();
}

export function BookingFlowModal({ isOpen, onClose, defaultPropertySlug }: BookingFlowModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedProperty, setSelectedProperty] = useState<Property>(
    properties.find((p) => p.slug === defaultPropertySlug) || liveProperty()
  );
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(0);
  const [range, setRange] = useState<DateRange | undefined>();
  const [bookedRanges, setBookedRanges] = useState<{ start: Date; end: Date }[]>([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  const hasCalendarUrl = Boolean(selectedProperty.icalUrl && selectedProperty.icalUrl.trim());
  const [bookingId, setBookingId] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [occasion, setOccasion] = useState("");
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [step1Touched, setStep1Touched] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  // Honeypot anti-spam field — must remain empty
  const [website, setWebsite] = useState("");

  const liveProperties = useMemo(() => properties.filter((p) => p.status === "live"), []);

  const step1Errors = useMemo(() => {
    const errors: { name?: string; phone?: string; email?: string } = {};
    const trimmedName = guestName.trim();
    if (!trimmedName) errors.name = "Please enter your full name.";
    else if (trimmedName.length < 2) errors.name = "Name must be at least 2 characters.";

    const phoneDigits = guestPhone.replace(/\D/g, "");
    if (!guestPhone.trim()) errors.phone = "Please enter your phone number.";
    else if (!/^[6-9]\d{9}$/.test(phoneDigits)) errors.phone = "Please enter a valid 10-digit Indian mobile number.";

    const trimmedEmail = guestEmail.trim();
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
    return errors;
  }, [guestName, guestPhone, guestEmail]);

  const isStep1Valid = Object.keys(step1Errors).length === 0;

  const resetState = useCallback(() => {
    setStep(1);
    setGuestName("");
    setGuestPhone("");
    setGuestEmail("");
    setAdults(2);
    setChildren(0);
    setPets(0);
    setRange(undefined);
    setOccasion("");
    setArrivalTime("");
    setTermsAccepted(false);
    setStep1Touched(false);
    setWebsite("");
    setBookingId(generateBookingId());
  }, []);

  const clearDraft = useCallback(() => {
    resetState();
  }, [resetState]);

  const handleClose = useCallback(() => {
    resetState();
    onClose();
  }, [onClose, resetState]);

  // Initialize booking ID and clean state when modal opens.
  // Guest data is intentionally NOT persisted for privacy.
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    resetState();

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, resetState]);

  useEffect(() => {
    if (!isOpen) return;
    if (!hasCalendarUrl) {
      setBookedRanges([]);
      setIsLoadingCalendar(false);
      return;
    }
    setIsLoadingCalendar(true);
    fetchBookedRanges(selectedProperty.icalUrl || "")
      .then(setBookedRanges)
      .finally(() => setIsLoadingCalendar(false));
  }, [isOpen, selectedProperty, hasCalendarUrl]);

  useEffect(() => {
    if (isOpen && defaultPropertySlug) {
      const match = properties.find((p) => p.slug === defaultPropertySlug);
      if (match) setSelectedProperty(match);
    }
  }, [isOpen, defaultPropertySlug]);

  useEffect(() => {
    if (!calendarOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [calendarOpen]);

  const today = startOfToday();

  const disabledDays = useCallback(
    (date: Date) => {
      if (isBefore(date, today)) return true;
      return isDateBooked(date, bookedRanges);
    },
    [bookedRanges, today]
  );

  const handleSelect = (selected: DateRange | undefined) => {
    if (!selected) {
      setRange(undefined);
      return;
    }
    const { from, to } = selected;
    if (from && to) {
      if (hasBookedDateInRange(from, to, bookedRanges)) {
        setRange({ from });
        return;
      }
      if (isDateBooked(from, bookedRanges) || isDateBooked(to, bookedRanges)) {
        setRange({ from });
        return;
      }
    }
    setRange(selected);
  };

  const formatDate = (date?: Date) => (date ? format(date, "d MMMM yyyy") : "");

  const totalGuests = adults + children;
  const extraAdults = Math.max(0, adults - capacity.baseGuests);
  const exceedsBaseOccupancy = extraAdults > 0;
  const exceedsAdultCapacity = adults > MAX_ADULTS;
  const exceedsAbsoluteAdultLimit = adults > ABSOLUTE_MAX_ADULTS;

  const isWeekendNight = (date: Date) => {
    const day = getDay(date);
    // Property weekend rates apply to Friday (5) and Saturday (6) nights.
    return day === 5 || day === 6;
  };

  const pricingEstimate = useMemo(() => {
    if (!range?.from || !range?.to) return null;

    const days = eachDayOfInterval({ start: range.from, end: range.to });
    const totalNights = Math.max(1, days.length - 1);
    const weekdayOriginalPrice = parseAmount(pricing.weekday.originalAmount);
    const weekendOriginalPrice = parseAmount(pricing.weekend.originalAmount);
    const weekdayPrice = parseAmount(pricing.weekday.amount);
    const weekendPrice = parseAmount(pricing.weekend.amount);
    const extraGuestPrice = parseAmount(pricing.extraGuest.amount);
    const petTotal = pets * PET_PRICE * totalNights;

    let weekdayNights = 0;
    let weekendNights = 0;
    for (let i = 0; i < totalNights; i++) {
      const nightDate = days[i];
      if (isWeekendNight(nightDate)) {
        weekendNights++;
      } else {
        weekdayNights++;
      }
    }

    const originalWeekdayTotal = weekdayNights * weekdayOriginalPrice;
    const originalWeekendTotal = weekendNights * weekendOriginalPrice;
    const originalStayEstimate = originalWeekdayTotal + originalWeekendTotal;

    const weekdayTotal = weekdayNights * weekdayPrice;
    const weekendTotal = weekendNights * weekendPrice;
    const stayEstimate = weekdayTotal + weekendTotal;

    const extraGuestTotal = extraAdults * extraGuestPrice * totalNights;
    const securityDeposit = parseAmount(pricing.securityDeposit.amount);
    const totalPayableAfterApproval = stayEstimate + extraGuestTotal + petTotal + securityDeposit;

    return {
      totalNights,
      weekdayNights,
      weekendNights,
      originalWeekdayTotal,
      originalWeekendTotal,
      originalStayEstimate,
      weekdayTotal,
      weekendTotal,
      stayEstimate,
      extraAdults,
      extraGuestTotal,
      petTotal,
      securityDeposit,
      totalPayableAfterApproval,
    };
  }, [adults, range, extraAdults, pets]);

  const generateWhatsAppUrl = useCallback(() => {
    const host = selectedProperty.hostName || "Alok";
    const displayName = getDisplayName(selectedProperty.name);
    const shortLocation = getShortLocation(selectedProperty.location);
    const message = [
      `Hi ${host}, I’d like to enquire about ${displayName} in ${shortLocation}.`,
      "",
      "Guest Details:",
      `Name: ${guestName.trim() || "Not provided"}`,
      `Phone: ${guestPhone.trim() || "Not provided"}`,
      guestEmail.trim() ? `Email: ${guestEmail.trim()}` : "",
      "",
      "Guests:",
      `Adults: ${adults}`,
      `Children: ${children}`,
      `Pets: ${pets}`,
      occasion ? `Occasion: ${occasion}` : "",
      "",
      "Dates:",
      `Check-in: ${formatDate(range?.from)}`,
      `Check-out: ${formatDate(range?.to)}`,
      arrivalTime ? `Expected arrival: ${arrivalTime}` : "",
      "",
      pricingEstimate
        ? `Estimated total: ₹${pricingEstimate.totalPayableAfterApproval.toLocaleString("en-IN")} for ${pricingEstimate.totalNights} night${pricingEstimate.totalNights > 1 ? "s" : ""} (includes discounted stay, extra adults, pets, and refundable security deposit of ₹${pricingEstimate.securityDeposit.toLocaleString("en-IN")}). Final pricing to be confirmed by owner after review.`
        : "",
      `Booking ID: ${bookingId}`,
      "",
      "Please confirm availability.",
    ]
      .filter(Boolean)
      .join("\n");

    return `/api/whatsapp?message=${encodeURIComponent(message)}`;
  }, [adults, children, pets, range, arrivalTime, bookingId, selectedProperty, pricingEstimate, occasion, guestName, guestPhone, guestEmail]);

  const handleNext = useCallback(() => {
    if (step === 1) {
      setStep1Touched(true);
      if (!isStep1Valid) return;
      setStep1Touched(false);
    }
    setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  }, [step, isStep1Valid]);
  const handleBack = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  const handleFinalSubmit = () => {
    if (!termsAccepted) return;
    if (website) return; // Honeypot: silently block spam bots
    setStep(4);
  };

  const handleSendWhatsApp = useCallback(() => {
    if (website) return; // Honeypot guard
    const url = generateWhatsAppUrl();
    window.open(url, "_blank", "noopener,noreferrer");
    clearDraft();
    onClose();
  }, [generateWhatsAppUrl, clearDraft, onClose, website]);

  const Counter = ({
    label,
    value,
    onChange,
    min = 0,
    max = MAX_ADULTS,
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    min?: number;
    max?: number;
  }) => (
    <div className="flex items-center justify-between rounded-2xl border border-border-light bg-surface-card p-4 dark:bg-surface-dark/50 dark:border-border-dark">
      <span className="font-medium text-text dark:text-text-inverse">{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-text hover:border-primary hover:text-primary disabled:opacity-30 dark:border-border-dark dark:text-text-inverse"
          aria-label={`Decrease ${label}`}
        >
          <Minus size={16} />
        </button>
        <span className="w-6 text-center font-medium text-text dark:text-text-inverse">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-text hover:border-primary hover:text-primary disabled:opacity-30 dark:border-border-dark dark:text-text-inverse"
          aria-label={`Increase ${label}`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

  const LineItem = ({ label, value, highlight = false, muted = false }: { label: string; value: string; highlight?: boolean; muted?: boolean }) => (
    <div className="flex items-center justify-between py-3 border-b border-border-light last:border-0 dark:border-border-dark">
      <span className={cn(
        "text-sm",
        muted ? "text-muted/70 dark:text-muted-inverse/70" : highlight ? "font-semibold text-text dark:text-text-inverse" : "text-muted dark:text-muted-inverse"
      )}>
        {label}
      </span>
      <span className={cn(
        "text-sm font-medium",
        muted ? "text-muted/60 dark:text-muted-inverse/60 line-through" : highlight ? "text-primary" : "text-text dark:text-text-inverse"
      )}>
        {value}
      </span>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <div className="absolute inset-0 bg-secondary/70 backdrop-blur-sm" onClick={handleClose} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface shadow-2xl dark:bg-surface-dark"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border-light bg-surface/95 px-6 py-4 backdrop-blur-md dark:border-border-dark dark:bg-surface-dark/95">
              <div className="flex items-center gap-3">
                {step > 1 && (
                  <button
                    onClick={handleBack}
                    className="rounded-full p-2 text-text hover:bg-text/5 dark:text-text-inverse dark:hover:bg-text-inverse/10"
                    aria-label="Go back"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-primary/80 dark:text-primary">
                    Step {step} of 4
                  </p>
                  <h2 id="booking-modal-title" className="font-serif text-xl text-text-heading dark:text-text-inverse">
                    {step === 1 && "Guest Details"}
                    {step === 2 && "Select Dates"}
                    {step === 3 && "Review & Confirm"}
                    {step === 4 && "Request Ready"}
                  </h2>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 text-text hover:bg-text/5 dark:text-text-inverse dark:hover:bg-text-inverse/10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-8 md:p-10">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label htmlFor="property-select" className="text-sm font-medium text-muted dark:text-muted-inverse">
                      Select Property
                    </label>
                    <div className="relative">
                      <select
                        id="property-select"
                        value={selectedProperty.slug}
                        onChange={(e) => {
                          const match = properties.find((p) => p.slug === e.target.value);
                          if (match) setSelectedProperty(match);
                        }}
                        className="w-full appearance-none rounded-2xl border border-border-light bg-surface-card px-5 py-4 pr-12 text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-surface-dark/50 dark:border-border-dark dark:text-text-inverse"
                      >
                        {liveProperties.map((property) => (
                          <option key={property.slug} value={property.slug}>
                            {property.name} — {property.location}
                          </option>
                        ))}
                      </select>
                      <ChevronRight
                        size={18}
                        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-muted/70 dark:text-muted-inverse/70"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label htmlFor="guest-name" className="text-sm font-medium text-muted dark:text-muted-inverse">
                        Full Name <span className="text-muted/70 dark:text-muted-inverse/70">(required)</span>
                      </label>
                      <input
                        id="guest-name"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g., Priya Sharma"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className={cn(
                          "w-full rounded-2xl border bg-surface-card px-5 py-4 text-text outline-none focus:ring-2 dark:bg-surface-dark/50 dark:text-text-inverse placeholder:text-muted/50 dark:placeholder:text-muted-inverse/50",
                          step1Touched && step1Errors.name
                            ? "border-danger focus:border-danger focus:ring-danger/20"
                            : "border-border-light focus:border-primary focus:ring-primary/20 dark:border-border-dark"
                        )}
                      />
                      {step1Touched && step1Errors.name && (
                        <p className="text-sm text-danger">{step1Errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="guest-phone" className="text-sm font-medium text-muted dark:text-muted-inverse">
                        Phone Number <span className="text-muted/70 dark:text-muted-inverse/70">(required)</span>
                      </label>
                      <input
                        id="guest-phone"
                        type="tel"
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="e.g., 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className={cn(
                          "w-full rounded-2xl border bg-surface-card px-5 py-4 text-text outline-none focus:ring-2 dark:bg-surface-dark/50 dark:text-text-inverse placeholder:text-muted/50 dark:placeholder:text-muted-inverse/50",
                          step1Touched && step1Errors.phone
                            ? "border-danger focus:border-danger focus:ring-danger/20"
                            : "border-border-light focus:border-primary focus:ring-primary/20 dark:border-border-dark"
                        )}
                      />
                      {step1Touched && step1Errors.phone && (
                        <p className="text-sm text-danger">{step1Errors.phone}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="guest-email" className="text-sm font-medium text-muted dark:text-muted-inverse">
                        Email <span className="text-muted/70 dark:text-muted-inverse/70">(optional)</span>
                      </label>
                      <input
                        id="guest-email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="e.g., priya@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className={cn(
                          "w-full rounded-2xl border bg-surface-card px-5 py-4 text-text outline-none focus:ring-2 dark:bg-surface-dark/50 dark:text-text-inverse placeholder:text-muted/50 dark:placeholder:text-muted-inverse/50",
                          step1Touched && step1Errors.email
                            ? "border-danger focus:border-danger focus:ring-danger/20"
                            : "border-border-light focus:border-primary focus:ring-primary/20 dark:border-border-dark"
                        )}
                      />
                      {step1Touched && step1Errors.email && (
                        <p className="text-sm text-danger">{step1Errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="guest-website">Website</label>
                    <input
                      id="guest-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="absolute opacity-0 pointer-events-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="occasion-select" className="text-sm font-medium text-muted dark:text-muted-inverse">
                      Occasion <span className="text-muted/70 dark:text-muted-inverse/70">(optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="occasion-select"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-border-light bg-surface-card px-5 py-4 pr-12 text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-surface-dark/50 dark:border-border-dark dark:text-text-inverse"
                      >
                        <option value="">Select an occasion</option>
                        {OCCASIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                      <ChevronRight
                        size={18}
                        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-muted/70 dark:text-muted-inverse/70"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-2xl border border-border-light bg-surface-card p-4 dark:bg-surface-dark/50 dark:border-border-dark">
                      <div className="flex items-center gap-3">
                        <Users size={18} className="text-primary" />
                        <span className="text-sm font-medium text-text dark:text-text-inverse">Guests</span>
                      </div>
                      <span className={cn(
                        "text-sm font-semibold tabular-nums",
                        exceedsAdultCapacity ? "text-danger" : "text-primary"
                      )}>
                        {adults} / {capacity.baseGuests}
                      </span>
                    </div>
                    <Counter label="Adults" value={adults} onChange={setAdults} min={1} max={ABSOLUTE_MAX_ADULTS} />
                    <Counter label="Children" value={children} onChange={setChildren} />
                    <Counter label="Pets" value={pets} onChange={setPets} max={6} />
                  </div>

                  {exceedsBaseOccupancy && (
                    <div className="flex items-start gap-3 rounded-2xl border border-warning bg-warning/30 p-4 dark:bg-warning/20">
                      <AlertTriangle size={20} className="mt-0.5 shrink-0 text-warning-text" />
                      <p className="text-sm text-text dark:text-text-inverse">
                        Your booking exceeds our base capacity of {capacity.baseGuests} adults. Extra adult charges will apply beyond the included capacity.
                      </p>
                    </div>
                  )}

                  {exceedsAdultCapacity && (
                    <div className="flex items-start gap-3 rounded-2xl border border-danger bg-danger-soft p-4 dark:bg-danger/20">
                      <AlertTriangle size={20} className="mt-0.5 shrink-0 text-danger" />
                      <p className="text-sm text-text dark:text-text-inverse">
                        Standard night stay capacity is {MAX_ADULTS} adults. Please contact us for larger groups.
                      </p>
                    </div>
                  )}

                  {exceedsAbsoluteAdultLimit && (
                    <div className="flex items-start gap-3 rounded-2xl border border-danger bg-danger-soft p-4 dark:bg-danger/20">
                      <AlertTriangle size={20} className="mt-0.5 shrink-0 text-danger" />
                      <p className="text-sm text-text dark:text-text-inverse">
                        Adult guests cannot exceed {ABSOLUTE_MAX_ADULTS}.
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      onClick={handleNext}
                      disabled={exceedsAbsoluteAdultLimit}
                      className="w-full rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-text-inverse transition-all hover:bg-primary-hover hover:shadow-lg disabled:cursor-not-allowed disabled:bg-primary/40"
                    >
                      Next
                    </button>
                    {step1Touched && !isStep1Valid && (
                      <p className="mt-2 text-center text-xs text-danger">
                        Please complete the required fields above.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-border-light bg-surface-card p-5 dark:bg-surface-dark/50 dark:border-border-dark">
                    <p className="font-medium text-text dark:text-text-inverse">{selectedProperty.name}</p>
                    <p className="text-sm text-muted dark:text-muted-inverse">{selectedProperty.location}</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-muted dark:text-muted-inverse">
                      Select dates
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setCalendarOpen(true)}
                        className="rounded-2xl border border-border-light bg-surface-card p-4 text-left transition-colors hover:border-primary/40 dark:bg-surface-dark/50 dark:border-border-dark"
                      >
                        <p className="text-xs font-semibold uppercase tracking-lux text-primary/70 dark:text-primary mb-1">Check-in</p>
                        <p className="font-medium text-text dark:text-text-inverse">
                          {range?.from ? formatDate(range.from) : "Select date"}
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalendarOpen(true)}
                        className="rounded-2xl border border-border-light bg-surface-card p-4 text-left transition-colors hover:border-primary/40 dark:bg-surface-dark/50 dark:border-border-dark"
                      >
                        <p className="text-xs font-semibold uppercase tracking-lux text-primary/70 dark:text-primary mb-1">Check-out</p>
                        <p className="font-medium text-text dark:text-text-inverse">
                          {range?.to ? formatDate(range.to) : "Select date"}
                        </p>
                      </button>
                    </div>
                  </div>

                  {calendarOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-secondary/50 p-4 backdrop-blur-sm">
                      <motion.div
                        ref={calendarRef}
                        initial={{ opacity: 0, scale: 0.96, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 12 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-sm rounded-3xl border border-border-light bg-surface-card p-6 shadow-2xl dark:border-border-dark dark:bg-surface-dark"
                      >
                        <button
                          type="button"
                          onClick={() => setCalendarOpen(false)}
                          className="absolute right-4 top-4 rounded-full p-2 text-muted transition-colors hover:bg-text/5 hover:text-text dark:text-muted-inverse dark:hover:bg-text-inverse/10"
                          aria-label="Close calendar"
                        >
                          <X size={20} />
                        </button>
                        <p className="mb-5 font-serif text-xl text-text-heading dark:text-text-inverse">
                          Select your dates
                        </p>

                        {isLoadingCalendar ? (
                          <div className="py-12 text-center text-muted dark:text-muted-inverse">
                            <CalendarDays className="mx-auto mb-3 animate-pulse" size={32} />
                            Loading availability…
                          </div>
                        ) : (
                          <DayPicker
                            mode="range"
                            selected={range}
                            onSelect={(selected) => {
                              handleSelect(selected);
                              if (selected?.from && selected?.to) {
                                setCalendarOpen(false);
                              }
                            }}
                            disabled={disabledDays}
                            numberOfMonths={1}
                            showOutsideDays={false}
                            className="booking-calendar"
                            classNames={{
                              today: "text-primary font-semibold",
                              selected: "bg-primary text-text-inverse rounded-full",
                              range_start: "bg-primary text-text-inverse rounded-full",
                              range_end: "bg-primary text-text-inverse rounded-full",
                              range_middle: "bg-primary/20 text-primary",
                              disabled: "text-muted/30 line-through bg-danger-soft dark:text-muted-inverse/30 dark:bg-danger-soft",
                              day: "h-10 w-10 text-sm font-medium text-text hover:bg-primary/10 rounded-full transition-colors dark:text-text-inverse dark:hover:bg-primary/20 aria-selected:text-text-inverse",
                              day_button: "h-10 w-10",
                              button_next: "inline-flex h-8 w-8 items-center justify-center rounded-full text-text hover:bg-text/10 dark:text-text-inverse dark:hover:bg-text-inverse/10",
                              button_previous: "inline-flex h-8 w-8 items-center justify-center rounded-full text-text hover:bg-text/10 dark:text-text-inverse dark:hover:bg-text-inverse/10",
                              caption_label: "text-text dark:text-text-inverse font-serif",
                              weekday: "text-muted/70 dark:text-muted-inverse/70 text-xs font-medium uppercase tracking-wider",
                            }}
                            modifiers={{
                              weekend: (date) => isWeekend(date),
                            }}
                            modifiersClassNames={{
                              weekend: "text-primary font-semibold",
                            }}
                          />
                        )}

                        <p className="mt-4 text-center text-xs text-muted/70 dark:text-muted-inverse/70">
                          {!hasCalendarUrl
                            ? "Availability calendar is open. Owner confirms final dates after review."
                            : "Blocked dates are unavailable. Select an open range."}
                        </p>
                      </motion.div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label htmlFor="arrival-time" className="text-sm font-medium text-muted dark:text-muted-inverse">
                      Expected Arrival Time <span className="text-muted/70 dark:text-muted-inverse/70">(optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="arrival-time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-border-light bg-surface-card px-5 py-4 pr-12 text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-surface-dark/50 dark:border-border-dark dark:text-text-inverse"
                      >
                        <option value="">Select your expected arrival window</option>
                        {booking.arrivalTimes.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <ChevronRight
                        size={18}
                        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-muted/70 dark:text-muted-inverse/70"
                      />
                    </div>
                  </div>

                  <p className="flex items-center gap-2 text-sm italic text-primary/80 dark:text-primary">
                    <CalendarDays size={16} />
                    Weekends are reserved first. Request early to allow time for owner review.
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={handleNext}
                      disabled={!range?.from || !range?.to}
                      className="w-full rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-text-inverse transition-all hover:bg-primary-hover hover:shadow-lg disabled:cursor-not-allowed disabled:bg-primary/40"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && pricingEstimate && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-border-light bg-surface-card p-5 dark:bg-surface-dark/50 dark:border-border-dark">
                    <p className="text-xs font-semibold uppercase tracking-lux text-primary/70 dark:text-primary mb-3">Booking Summary</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted dark:text-muted-inverse">Property</span>
                        <span className="font-medium text-text dark:text-text-inverse text-right">{selectedProperty.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted dark:text-muted-inverse">Dates</span>
                        <span className="font-medium text-text dark:text-text-inverse text-right">
                          {formatDate(range?.from)} — {formatDate(range?.to)} · {pricingEstimate.totalNights} night{pricingEstimate.totalNights > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted dark:text-muted-inverse">Guests</span>
                        <span className="font-medium text-text dark:text-text-inverse text-right">
                          {adults} adult{adults > 1 ? "s" : ""}
                          {children > 0 ? `, ${children} child${children > 1 ? "ren" : ""}` : ""}
                          {pets > 0 ? `, ${pets} pet${pets > 1 ? "s" : ""}` : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted dark:text-muted-inverse">Booking ID</span>
                        <span className="font-medium text-text dark:text-text-inverse font-mono text-right">{bookingId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border-light bg-surface-card p-6 dark:bg-surface-dark/50 dark:border-border-dark">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-lux text-primary/80 dark:text-primary">Stay estimate</span>
                      <span className="text-xs font-semibold uppercase tracking-lux text-primary">21% OFF weekday • 22% OFF weekend</span>
                    </div>

                    {pricingEstimate.weekdayNights > 0 && (
                      <>
                        <LineItem
                          label={`${pricingEstimate.weekdayNights} weekday night${pricingEstimate.weekdayNights > 1 ? "s" : ""} @ ${pricing.weekday.originalAmount}`}
                          value={`₹${pricingEstimate.originalWeekdayTotal.toLocaleString("en-IN")}`}
                          muted
                        />
                        <LineItem
                          label={`${pricingEstimate.weekdayNights} weekday night${pricingEstimate.weekdayNights > 1 ? "s" : ""} @ ${pricing.weekday.amount}`}
                          value={`₹${pricingEstimate.weekdayTotal.toLocaleString("en-IN")}`}
                        />
                      </>
                    )}

                    {pricingEstimate.weekendNights > 0 && (
                      <>
                        <LineItem
                          label={`${pricingEstimate.weekendNights} weekend night${pricingEstimate.weekendNights > 1 ? "s" : ""} @ ${pricing.weekend.originalAmount}`}
                          value={`₹${pricingEstimate.originalWeekendTotal.toLocaleString("en-IN")}`}
                          muted
                        />
                        <LineItem
                          label={`${pricingEstimate.weekendNights} weekend night${pricingEstimate.weekendNights > 1 ? "s" : ""} @ ${pricing.weekend.amount}`}
                          value={`₹${pricingEstimate.weekendTotal.toLocaleString("en-IN")}`}
                        />
                      </>
                    )}

                    {pricingEstimate.originalStayEstimate > pricingEstimate.stayEstimate && (
                      <LineItem
                        label={`Original stay total (${pricingEstimate.totalNights} night${pricingEstimate.totalNights > 1 ? "s" : ""})`}
                        value={`₹${pricingEstimate.originalStayEstimate.toLocaleString("en-IN")}`}
                        muted
                      />
                    )}

                    <LineItem
                      label={`Extra adults (${pricingEstimate.extraAdults})`}
                      value={pricingEstimate.extraAdults > 0 ? `₹${pricingEstimate.extraGuestTotal.toLocaleString("en-IN")}` : "Included"}
                    />
                    <LineItem
                      label={`Children (${children})`}
                      value="Included"
                    />
                    <LineItem
                      label={`Pets (${pets})`}
                      value={pets > 0 ? `₹${pricingEstimate.petTotal.toLocaleString("en-IN")}` : "Included"}
                    />
                    <LineItem
                      label="Refundable Security Deposit"
                      value={pricing.securityDeposit.amount}
                    />
                    <div className="mt-4 rounded-xl border border-border-light bg-surface p-4 dark:bg-surface-dark/50 dark:border-border-dark">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-text dark:text-text-inverse">Estimated total</span>
                        <span className="text-base font-semibold text-primary">₹{pricingEstimate.totalPayableAfterApproval.toLocaleString("en-IN")}</span>
                      </div>
                      <p className="text-xs text-muted/70 dark:text-muted-inverse/70">
                        Includes discounted stay, extra adults, pets, and refundable security deposit. Final pricing is confirmed after owner review.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 dark:bg-primary/10">
                    <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text dark:text-text-inverse">Owner approval required</p>
                      <p className="text-sm text-muted dark:text-muted-inverse">
                        Your request is reviewed personally. The owner confirms availability and approves the reservation before any payment is requested.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border-light bg-surface-card p-4 dark:bg-surface-dark/50 dark:border-border-dark">
                    <IdCard size={20} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text dark:text-text-inverse">ID verification</p>
                      <p className="text-sm text-muted dark:text-muted-inverse">
                        Before confirmation, all guests must submit a valid government-issued ID. This is a private, owner-managed estate.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border-light bg-surface-card p-4 dark:bg-surface-dark/50 dark:border-border-dark">
                    <Clock size={20} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text dark:text-text-inverse">Owner review explained</p>
                      <p className="text-sm text-muted dark:text-muted-inverse">
                        Every stay request is reviewed personally to preserve privacy, safety, and the quality of the Aviora experience.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border-light bg-surface-card p-5 dark:bg-surface-dark/50 dark:border-border-dark">
                    <div className="flex items-center gap-2 mb-3">
                      <RotateCcw size={18} className="text-primary" />
                      <p className="text-sm font-semibold text-text dark:text-text-inverse">Refund at a glance</p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted dark:text-muted-inverse">
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                        Full refund at least 1 day before check-in.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning" />
                        Partial refund within 1 day of check-in.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        Security deposit refunded after check-out inspection.
                      </li>
                    </ul>
                    <a
                      href="/refund-policy"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      Read full refund policy
                    </a>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border-light bg-surface-card p-4 dark:bg-surface-dark/50 dark:border-border-dark">
                    <Banknote size={20} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text dark:text-text-inverse">Refundable security deposit</p>
                      <p className="text-sm text-muted dark:text-muted-inverse">
                        A security deposit is collected before arrival and refunded after checkout, subject to a brief property inspection.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border-light bg-surface-card p-4 dark:bg-surface-dark/50 dark:border-border-dark">
                    <Clock size={20} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text dark:text-text-inverse">Owner-managed response</p>
                      <p className="text-sm text-muted dark:text-muted-inverse">
                        The owner personally reviews every request. Most guests receive a response within 2 hrs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border-light bg-surface-card p-4 dark:bg-surface-dark/50 dark:border-border-dark">
                    <FileText size={20} className="mt-0.5 shrink-0 text-primary" />
                    <div className="flex-1">
                      <label htmlFor="terms-checkbox" className="flex cursor-pointer items-start gap-3">
                        <input
                          id="terms-checkbox"
                          type="checkbox"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-text/30 text-primary focus:ring-primary dark:border-text-inverse/30"
                        />
                        <span className="text-sm text-muted dark:text-muted-inverse">
                          I have read and agree to the{" "}
                          <a
                            href="/terms"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-primary hover:underline"
                          >
                            Terms & Conditions
                          </a>
                          .
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleFinalSubmit}
                      disabled={!termsAccepted}
                      className="w-full rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-text-inverse transition-all hover:bg-primary-hover hover:shadow-lg disabled:cursor-not-allowed disabled:bg-primary/40"
                    >
                      Submit Stay Request on WhatsApp
                    </button>
                    {!termsAccepted && (
                      <p className="mt-2 text-center text-xs text-muted/70 dark:text-muted-inverse/70">
                        Please accept the Terms & Conditions to continue.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center dark:bg-primary/10">
                    <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-text-inverse">
                      <CheckCircle2 size={28} />
                    </div>
                    <h3 className="font-serif text-2xl text-text-heading dark:text-text-inverse mb-2">
                      Your stay request is ready to be sent.
                    </h3>
                    <p className="text-sm text-muted dark:text-muted-inverse max-w-sm mx-auto">
                      Review your details below, then send the request on WhatsApp to begin owner review.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border-light bg-surface-card p-5 dark:bg-surface-dark/50 dark:border-border-dark">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-border-light dark:border-border-dark">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-lux text-muted/50 dark:text-muted-inverse/50">Booking ID</p>
                        <p className="font-mono text-lg text-text dark:text-text-inverse">{bookingId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold uppercase tracking-lux text-muted/50 dark:text-muted-inverse/50">Status</p>
                        <p className="inline-flex items-center gap-1.5 text-sm font-medium text-warning-text">
                          <span className="relative inline-flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-warning" />
                          </span>
                          Pending Owner Review
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted dark:text-muted-inverse">Property</span>
                        <span className="font-medium text-text dark:text-text-inverse text-right">{selectedProperty.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted dark:text-muted-inverse">Dates</span>
                        <span className="font-medium text-text dark:text-text-inverse text-right">
                          {formatDate(range?.from)} — {formatDate(range?.to)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted dark:text-muted-inverse">Guests</span>
                        <span className="font-medium text-text dark:text-text-inverse text-right">
                          {totalGuests} total
                          {extraAdults > 0 ? ` (${extraAdults} extra adult${extraAdults > 1 ? "s" : ""})` : ""}
                        </span>
                      </div>
                      {pricingEstimate && (
                        <div className="flex justify-between">
                          <span className="text-muted dark:text-muted-inverse">Estimated total</span>
                          <span className="font-medium text-primary text-right">
                            ₹{pricingEstimate.totalPayableAfterApproval.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border-light bg-surface-card p-5 dark:bg-surface-dark/50 dark:border-border-dark">
                    <p className="text-sm font-semibold text-text dark:text-text-inverse mb-3">What happens next</p>
                    <ul className="space-y-3">
                      {booking.process.map((s, i) => (
                        <li key={s.title} className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {s.step}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-text dark:text-text-inverse">{s.title}</p>
                            <p className="text-xs text-muted dark:text-muted-inverse">{s.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4 dark:bg-primary/10">
                    <ShieldCheck size={20} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-text dark:text-text-inverse">Owner review explained</p>
                      <p className="text-sm text-muted dark:text-muted-inverse">
                        Every stay request is reviewed personally to preserve privacy, safety, and the quality of the Aviora experience.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleSendWhatsApp}
                      disabled={Boolean(website)}
                      className="w-full rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-text-inverse transition-all hover:bg-primary-hover hover:shadow-lg disabled:cursor-not-allowed disabled:bg-primary/40"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <Send size={18} />
                        Send Request on WhatsApp
                      </span>
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="mt-3 w-full rounded-full border border-border-light bg-surface px-7 py-3 text-sm font-medium text-text transition-all hover:border-primary hover:text-primary dark:border-border-dark dark:bg-surface-dark/50 dark:text-text-inverse"
                    >
                      Edit details
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function liveProperty(): Property {
  return properties.find((p) => p.status === "live") || properties[0];
}
