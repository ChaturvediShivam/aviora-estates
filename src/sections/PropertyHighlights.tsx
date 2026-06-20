"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { Check } from "lucide-react";
import { business, capacity, pricing } from "@/lib/config";

interface PropertyHighlightsProps {
  highlights?: string[];
}

export function PropertyHighlights({ highlights = business.highlights }: PropertyHighlightsProps) {
  return (
    <section className="section-padding-sm bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-14">
          <SectionLabel className="mb-5">Property Highlights</SectionLabel>
          <SectionHeading size="lg">Everything included in your stay.</SectionHeading>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="rounded-3xl bg-surface-card border border-border-light p-8 md:p-10 h-full dark:bg-surface-dark/50 dark:border-border-dark">
              <h3 className="font-serif text-2xl text-text dark:text-text-inverse mb-6">Amenities</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3 text-muted/80 dark:text-muted-inverse/80">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check size={12} />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="rounded-3xl bg-primary text-text-inverse p-8 md:p-10 h-full">
              <h3 className="font-serif text-2xl mb-6">Capacity & Extras</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted-inverse mb-1">Night stay</p>
                  <p className="text-lg">Up to {capacity.nightStay} guests</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted-inverse mb-1">Day use</p>
                  <p className="text-lg">Up to {capacity.dayUse} guests</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-lux text-muted-inverse mb-1">Extra guest</p>
                  <p className="text-lg">
                    {pricing.extraGuest.amount} {pricing.extraGuest.per}
                  </p>
                  <p className="text-sm text-muted-inverse/80 mt-1">{pricing.extraGuest.note}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
