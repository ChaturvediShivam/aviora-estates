import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { InquiryForm } from "@/components/InquiryForm";
import { MapPin, Phone, Mail, MessageCircle, Instagram, Clock, ShieldCheck, ExternalLink } from "lucide-react";
import { business, booking } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Aviora Estates in Noida to check availability, schedule a visit, or book your private luxury villa stay.",
  alternates: {
    canonical: `${business.url}/contact`,
  },
  openGraph: {
    title: "Contact | Aviora Estates",
    description:
      "Contact Aviora Estates in Noida to check availability, schedule a visit, or book your private luxury villa stay.",
    images: ["/images/hero/villa-front-day.png"],
  },
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24 md:pb-32 bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container className="mb-16">
        <AnimatedSection className="max-w-3xl">
          <SectionLabel className="mb-5">Contact</SectionLabel>
          <SectionHeading size="xl">Plan your stay.</SectionHeading>
          <p className="mt-6 text-lg text-muted dark:text-muted-inverse">
            Send us your dates and preferences. We will respond within 24 hours
            with availability and next steps.
          </p>
        </AnimatedSection>
      </Container>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <AnimatedSection>
            <InquiryForm />
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="space-y-8">
            <div className="rounded-3xl bg-secondary text-text-inverse p-8 md:p-10">
              <h3 className="font-serif text-2xl mb-5">Prefer a direct message?</h3>
              <p className="text-muted-inverse mb-8">
                For fastest replies, message us on WhatsApp with your preferred
                dates and number of guests.
              </p>
              <a
                href={`/api/whatsapp?message=${encodeURIComponent(business.whatsapp.message)}`}
                className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-3 text-sm font-medium text-white hover:brightness-110 transition-all"
              >
                <MessageCircle size={18} fill="currentColor" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="grid gap-5">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted/50 dark:text-muted-inverse/50">Phone</p>
                  <p className="text-text-heading dark:text-text-inverse">{business.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted/50 dark:text-muted-inverse/50">Email</p>
                  <p className="text-text-heading dark:text-text-inverse">{business.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted/50 dark:text-muted-inverse/50">Location</p>
                  <p className="text-text-heading dark:text-text-inverse">{business.address}</p>
                  <a
                    href={business.location.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View on Google Maps <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted/50 dark:text-muted-inverse/50">Check-in / Check-out</p>
                  <p className="text-text-heading dark:text-text-inverse">{booking.checkIn} / {booking.checkOut}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted/50 dark:text-muted-inverse/50">Instagram</p>
                  <a
                    href={business.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-text-heading dark:text-text-inverse hover:text-primary transition-colors"
                  >
                    @aviora.estates
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border-light bg-surface-card p-2 dark:bg-surface-dark/50 dark:border-border-dark">
              <div className="aspect-video rounded-2xl overflow-hidden bg-text/5 dark:bg-text-inverse/5">
                <iframe
                  src={business.location.mapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Aviora Estates location map"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-border-light bg-surface-card p-5 dark:bg-surface-dark/50 dark:border-border-dark">
              <ShieldCheck className="text-primary" size={22} />
              <div>
                <p className="font-medium text-text-heading dark:text-text-inverse">Secure Booking Process</p>
                <p className="text-sm text-muted dark:text-muted-inverse">Direct host communication. Transparent pricing. No hidden fees.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
