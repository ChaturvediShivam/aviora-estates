"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { booking } from "@/lib/config";

export function BookingProcess() {
  return (
    <section className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-16 md:mb-24">
          <SectionLabel className="mb-5">How to Book</SectionLabel>
          <SectionHeading size="lg" className="dark:text-text-inverse">Request, review, verify, confirm, arrive.</SectionHeading>
          <p className="mt-6 text-lg text-muted dark:text-muted-inverse">
            A deliberate, owner-managed process designed for clarity and trust. Every stay request is reviewed personally to preserve privacy, safety, and the quality of the Aviora experience.
          </p>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-primary/20 hidden md:block dark:bg-primary/30" />

          <div className="space-y-8">
            {booking.process.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.1}>
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  <div className="relative shrink-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-text-inverse font-serif text-xl z-10 shadow-sm">
                    {step.step}
                  </div>
                  <div className="rounded-2xl border border-border-light bg-surface-card p-6 md:p-8 flex-1 dark:bg-surface-dark/60 dark:border-border-dark">
                    <h3 className="font-serif text-2xl text-text-heading dark:text-text-inverse mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted dark:text-muted-inverse">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
