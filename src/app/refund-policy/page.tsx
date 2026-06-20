import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { BookingCTA } from "@/components/BookingCTA";
import { policies, business } from "@/lib/config";
import { CalendarCheck, CalendarX, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "View the cancellation and refund policy for Aviora Estates bookings, including security deposit terms.",
  alternates: {
    canonical: `${business.url}/refund-policy`,
  },
  openGraph: {
    title: "Refund Policy | Aviora Estates",
    description:
      "View the cancellation and refund policy for Aviora Estates bookings, including security deposit terms.",
    images: ["/images/hero/villa-front-day.png"],
  },
};

export default function RefundPolicyPage() {
  return (
    <section className="pt-32 pb-24 md:pb-32 bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container className="mb-16">
        <AnimatedSection className="max-w-3xl">
          <SectionLabel className="mb-5">Booking Policy</SectionLabel>
          <SectionHeading size="xl">Refund Policy</SectionHeading>
          <p className="mt-6 text-lg text-muted dark:text-muted-inverse">
            We believe in transparent and fair cancellation terms. Here is how
            refunds work at {business.name}.
          </p>
        </AnimatedSection>
      </Container>

      <Container className="mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <AnimatedSection>
            <div className="h-full rounded-2xl bg-surface-card border border-border-light p-8 dark:bg-surface-dark/50 dark:border-border-dark">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success">
                <CalendarCheck size={24} />
              </div>
              <h3 className="font-serif text-xl text-text-heading dark:text-text-inverse mb-3">Full Refund</h3>
              <p className="text-sm text-muted dark:text-muted-inverse">
                Cancellations made at least 1 day before check-in are eligible for a full
                refund of the booking amount.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="h-full rounded-2xl bg-surface-card border border-border-light p-8 dark:bg-surface-dark/50 dark:border-border-dark">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-warning text-warning-text">
                <CalendarX size={24} />
              </div>
              <h3 className="font-serif text-xl text-text-heading dark:text-text-inverse mb-3">Partial Refund</h3>
              <p className="text-sm text-muted dark:text-muted-inverse">
                Cancellations within 1 day of check-in receive a partial refund based on
                the cancellation timeline.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="h-full rounded-2xl bg-surface-card border border-border-light p-8 dark:bg-surface-dark/50 dark:border-border-dark">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif text-xl text-text-heading dark:text-text-inverse mb-3">Security Deposit</h3>
              <p className="text-sm text-muted dark:text-muted-inverse">
                The {policies.securityDeposit.amount} security deposit is fully refunded after a
                successful check-out inspection, provided no damage or missing items
                are found.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </Container>

      <Container className="mb-20">
        <AnimatedSection>
          <div className="rounded-3xl bg-surface-card border border-border-light p-8 md:p-10 dark:bg-surface-dark/50 dark:border-border-dark">
            <h3 className="font-serif text-2xl text-text-heading dark:text-text-inverse mb-6">
              Policy Details
            </h3>
            <ul className="space-y-4">
              {policies.refund.map((item, index) => (
                <li key={index} className="flex gap-3 text-muted dark:text-muted-inverse">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </Container>

      <BookingCTA variant="dark" />
    </section>
  );
}
