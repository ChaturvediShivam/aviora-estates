"use client";

import { Container } from "@/components/Container";
import { business, pricing } from "@/lib/config";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Villa", href: "/properties/noida-estate" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-text-inverse">
      <Container className="max-w-7xl">
        <div className="py-16 md:py-24 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <p className="font-serif text-3xl text-text-inverse mb-4">{business.name}</p>
            <p className="text-muted-inverse/80 max-w-md leading-relaxed">
              A private Mediterranean-style estate in {business.location.short}.
              Curated for slow living, intimate celebrations, and exceptional stays.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${business.whatsapp.number.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-text-inverse hover:bg-primary-hover transition-colors"
              >
                <Phone size={16} />
                WhatsApp Us
              </a>
              <a
                href={business.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-dark px-5 py-2.5 text-sm font-medium text-text-inverse hover:bg-text-inverse/10 transition-colors"
              >
                <Instagram size={16} />
                Instagram
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-lux text-muted-inverse/50 mb-6">
              Explore
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-inverse/80 hover:text-text-inverse transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={business.airbnb}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-inverse/80 hover:text-text-inverse transition-colors"
                >
                  Airbnb Listing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-lux text-muted-inverse/50 mb-6">
              Contact
            </p>
            <ul className="space-y-4 text-muted-inverse/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <span>{business.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-primary" />
                <a href={`tel:${business.phone.replace(/\s/g, "")}`} className="hover:text-text-inverse transition-colors">
                  {business.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-primary" />
                <a href={`mailto:${business.email}`} className="hover:text-text-inverse transition-colors">
                  {business.email}
                </a>
              </li>
            </ul>

            <div className="mt-8 pt-8 border-t border-border-dark">
              {pricing.weekday.originalAmount && (
                <p className="text-sm text-muted-inverse/60 line-through mb-1">{pricing.weekday.originalAmount}</p>
              )}
              <div className="flex items-center gap-3">
                <p className="text-text-inverse font-serif text-2xl">{pricing.weekday.amount}</p>
                <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-lux text-text-inverse">
                  {pricing.weekday.discountPercent}% OFF
                </span>
              </div>
              <p className="text-sm font-sans text-muted-inverse/70 mt-1">{pricing.weekday.per}</p>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-muted-inverse/60">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-text-inverse transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-border-dark flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-inverse/60">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>Private luxury stays in {business.location.short}.</p>
        </div>
      </Container>
    </footer>
  );
}
