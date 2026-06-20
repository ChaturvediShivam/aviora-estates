"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";
import { business } from "@/lib/config";
import type { Property } from "@/lib/config";
import { cn } from "@/lib/utils";

interface WaitlistModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ property, isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Honeypot anti-spam field — must remain empty
  const [website, setWebsite] = useState("");

  const validate = () => {
    const next: Record<string, string> = {};
    const trimmedName = name.trim();
    if (!trimmedName) next.name = "Name is required";
    else if (trimmedName.length < 2) next.name = "Name must be at least 2 characters";

    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone.trim()) next.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(phoneDigits)) next.phone = "Please enter a valid 10-digit Indian mobile number";

    const trimmedEmail = email.trim();
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      next.email = "Please enter a valid email address";
    }
    return next;
  };

  const handleSubmit = () => {
    if (website) return; // Honeypot: silently block spam bots
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    const host = property.hostName || "Alok";
    const location = property.location.split(",")[0].trim();
    const safeName = name.trim();
    const safePhone = phone.trim();
    const safeEmail = email.trim();
    const message = [
      `Hi ${host}, I'd like to join the waitlist for ${property.name} in ${location}.`,
      "",
      "Name:", safeName,
      `Phone: ${safePhone}`,
      safeEmail ? `Email: ${safeEmail}` : "",
      "",
      "Please notify me when bookings open.",
    ]
      .filter(Boolean)
      .join("\n");

    const number = business.whatsapp.number.replace(/\D/g, "");
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  const inputClass = (field: string) =>
    cn(
      "w-full rounded-xl border bg-surface px-4 py-3 text-sm outline-none transition-colors dark:bg-surface-dark/50 dark:text-text-inverse placeholder:text-muted/50 dark:placeholder:text-muted-inverse/50",
      errors[field]
        ? "border-danger focus:border-danger"
        : "border-border-light focus:border-primary dark:border-border-dark"
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
          aria-labelledby="waitlist-modal-title"
        >
          <div className="absolute inset-0 bg-secondary/70 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-surface shadow-2xl dark:bg-surface-dark"
          >
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border-light bg-surface/95 px-6 py-4 backdrop-blur-md dark:border-border-dark dark:bg-surface-dark/95">
              <div>
                <p className="text-xs font-semibold uppercase tracking-lux text-primary/80 dark:text-primary">Join the waitlist</p>
                <h2 id="waitlist-modal-title" className="font-serif text-xl text-text-heading dark:text-text-inverse">
                  {property.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-text hover:bg-text/5 dark:text-text-inverse dark:hover:bg-text-inverse/10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-6 py-8 md:p-10 space-y-6">
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="waitlist-website">Website</label>
                <input
                  id="waitlist-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute opacity-0 pointer-events-none"
                />
              </div>

              <div className="rounded-2xl border border-border-light bg-surface-card p-5 dark:bg-surface-dark/50 dark:border-border-dark">
                <p className="font-medium text-text dark:text-text-inverse">{property.name}</p>
                <p className="text-sm text-muted dark:text-muted-inverse">{property.location}</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="waitlist-name" className="text-sm font-medium text-muted dark:text-muted-inverse">
                  Full Name *
                </label>
                <input
                  id="waitlist-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  className={inputClass("name")}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-xs text-danger">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="waitlist-phone" className="text-sm font-medium text-muted dark:text-muted-inverse">
                  Phone Number *
                </label>
                <input
                  id="waitlist-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors((prev) => ({ ...prev, phone: "" }));
                  }}
                  className={inputClass("phone")}
                  placeholder="+91 00000 00000"
                />
                {errors.phone && <p className="text-xs text-danger">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="waitlist-email" className="text-sm font-medium text-muted dark:text-muted-inverse">
                  Email <span className="text-muted/70 dark:text-muted-inverse/70">(optional)</span>
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className={inputClass("email")}
                  placeholder="hello@email.com"
                />
                {errors.email && <p className="text-xs text-danger">{errors.email}</p>}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full rounded-full bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-text-inverse transition-all hover:bg-primary-hover hover:shadow-lg"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Join Waitlist on WhatsApp
                </span>
              </button>

              <p className="text-center text-xs text-muted/70 dark:text-muted-inverse/70">
                We will notify you as soon as bookings open for this property.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
