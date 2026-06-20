import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { BookingCTA } from "@/components/BookingCTA";
import { policies, capacity, booking, business } from "@/lib/config";

export const metadata: Metadata = {
  title: "House Terms & Conditions",
  description:
    "Read the house rules, capacity limits, and terms of stay at Aviora Estates before you book.",
  alternates: {
    canonical: `${business.url}/terms`,
  },
  openGraph: {
    title: "House Terms & Conditions | Aviora Estates",
    description:
      "Read the house rules, capacity limits, and terms of stay at Aviora Estates before you book.",
    images: ["/images/hero/villa-front-day.png"],
  },
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-24 md:pb-32 bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container className="mb-16">
        <AnimatedSection className="max-w-3xl">
          <SectionLabel className="mb-5">Terms of Stay</SectionLabel>
          <SectionHeading size="xl">House Terms & Conditions</SectionHeading>
          <p className="mt-6 text-lg text-muted dark:text-muted-inverse">
            A few simple guidelines help us keep {business.name} beautiful, safe,
            and enjoyable for every guest.
          </p>
        </AnimatedSection>
      </Container>

      <Container className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="h-full rounded-3xl bg-surface-card border border-border-light p-8 md:p-10 dark:bg-surface-dark/50 dark:border-border-dark">
              <h3 className="font-serif text-2xl text-text-heading dark:text-text-inverse mb-6">
                House Rules
              </h3>
              <ul className="space-y-4">
                {policies.houseRules.map((rule, index) => (
                  <li key={index} className="flex gap-3 text-muted dark:text-muted-inverse">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="h-full rounded-3xl bg-secondary text-text-inverse p-8 md:p-10">
              <h3 className="font-serif text-2xl mb-6">Capacity & Timing</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted-inverse/50 mb-1">
                    Night Stay
                  </p>
                  <p className="text-lg">Up to {capacity.nightStay} guests</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted-inverse/50 mb-1">
                    Day Use
                  </p>
                  <p className="text-lg">Up to {capacity.dayUse} guests max</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted-inverse/50 mb-1">
                    Check-in
                  </p>
                  <p className="text-lg">{booking.checkIn}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted-inverse/50 mb-1">
                    Check-out
                  </p>
                  <p className="text-lg">{booking.checkOut}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>

      <Container className="mb-20">
        <AnimatedSection>
          <div className="rounded-3xl border border-border-light bg-surface-card p-8 md:p-10 dark:bg-surface-dark/50 dark:border-border-dark">
            <h3 className="font-serif text-2xl text-text-heading dark:text-text-inverse mb-6">
              Security Deposit
            </h3>
            <p className="text-muted dark:text-muted-inverse mb-6">
              A refundable security deposit of {policies.securityDeposit.amount} is collected via{" "}
              {policies.securityDeposit.collectedVia} before check-in. It is returned within{" "}
              {policies.securityDeposit.refundTimeline.toLowerCase()}, subject to the following
              conditions:
            </p>
            <ul className="grid sm:grid-cols-2 gap-4">
              {policies.securityDeposit.conditions.map((condition, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm text-muted dark:text-muted-inverse"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {condition}
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
