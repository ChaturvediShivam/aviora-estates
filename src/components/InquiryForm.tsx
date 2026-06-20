"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { business, whatsappLink } from "@/lib/config";

interface InquiryFormProps {
  compact?: boolean;
}

export function InquiryForm({ compact }: InquiryFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dates: "",
    guests: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  // Honeypot anti-spam field — must remain empty
  const [website, setWebsite] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[e.target.name];
        return next;
      });
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email";
    }
    if (!form.dates.trim()) next.dates = "Preferred dates are required";
    if (!form.guests) next.guests = "Number of guests is required";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (website) return; // Honeypot: silently block spam bots
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const safeName = form.name.trim();
    const safeEmail = form.email.trim();
    const safePhone = form.phone.trim();
    const safeDates = form.dates.trim();
    const safeGuests = form.guests;
    const safeMessage = form.message.trim();

    const message = `Hi ${business.name}, I would like to inquire about staying at your villa.

Name: ${safeName}
Email: ${safeEmail}
Phone: ${safePhone || "Not provided"}
Dates: ${safeDates}
Guests: ${safeGuests}
Message: ${safeMessage || "None"}`;

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl bg-success-soft border border-success/20 p-10 text-center dark:bg-success/20 dark:border-success/30">
        <h3 className="font-serif text-2xl text-text-heading mb-3 dark:text-text-inverse">Inquiry sent!</h3>
        <p className="text-muted dark:text-muted-inverse">
          We have redirected you to WhatsApp. Our team will respond within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass = (name: string) =>
    [
      "w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition-colors dark:bg-surface-dark/50 dark:text-text-inverse placeholder:text-muted/50 dark:placeholder:text-muted-inverse/50",
      errors[name]
        ? "border-danger focus:border-danger"
        : "border-border-light focus:border-primary dark:border-border-dark",
    ].join(" ");

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-surface-card border border-border-light p-8 md:p-10 shadow-sm dark:bg-surface-dark/40 dark:border-border-dark"
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="inquiry-website">Website</label>
        <input
          id="inquiry-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="absolute opacity-0 pointer-events-none"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-lux text-muted dark:text-muted-inverse">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={inputClass("name")}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-xs text-danger">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-lux text-muted dark:text-muted-inverse">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass("email")}
            placeholder="hello@email.com"
          />
          {errors.email && <p className="text-xs text-danger">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-lux text-muted dark:text-muted-inverse">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputClass("phone")}
            placeholder="+91 00000 00000"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="dates" className="text-xs font-semibold uppercase tracking-lux text-muted dark:text-muted-inverse">
            Preferred Dates *
          </label>
          <input
            id="dates"
            name="dates"
            type="text"
            value={form.dates}
            onChange={handleChange}
            className={inputClass("dates")}
            placeholder="e.g. 12–15 March"
          />
          {errors.dates && <p className="text-xs text-danger">{errors.dates}</p>}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <label htmlFor="guests" className="text-xs font-semibold uppercase tracking-lux text-muted dark:text-muted-inverse">
          Number of Guests *
        </label>
        <select
          id="guests"
          name="guests"
          value={form.guests}
          onChange={handleChange}
          className={inputClass("guests")}
        >
          <option value="">Select guests</option>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "Guest" : "Guests"}
            </option>
          ))}
        </select>
        {errors.guests && <p className="text-xs text-danger">{errors.guests}</p>}
      </div>

      {!compact && (
        <div className="mt-5 space-y-2">
          <label htmlFor="message" className="text-xs font-semibold uppercase tracking-lux text-muted dark:text-muted-inverse">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className={inputClass("message") + " resize-none"}
            placeholder="Tell us about your trip..."
          />
        </div>
      )}

      <Button type="submit" className="mt-8 w-full">
        Send Inquiry via WhatsApp
      </Button>
      <p className="mt-4 text-center text-xs text-muted/70 dark:text-muted-inverse/70">
        We typically reply within 24 hours.
      </p>
    </form>
  );
}
