"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { booking } from "@/lib/config";

export function BookingProcess() {
  return (
    <section className="section-padding bg-warm-white dark:bg-warm-white-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
          <SectionLabel className="mb-4">How to Book</SectionLabel>
          <SectionHeading size="lg" className="dark:text-text-inverse">Request, review, verify, confirm, arrive.</SectionHeading>
          <p className="mt-5 text-base md:text-lg text-muted dark:text-muted-inverse">
            A deliberate, owner-managed process designed for clarity and trust.
          </p>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-primary/20 hidden md:block dark:bg-primary/30" />

          <div className="space-y-6">
            {booking.process.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 0.08}>
                <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-start">
                  <div className="relative shrink-0 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary text-text-inverse font-serif text-lg md:text-xl z-10 shadow-sm">
                    {step.step}
                  </div>
                  <div className="card-luxury p-5 md:p-7 flex-1">
                    <h3 className="font-serif text-xl text-text-heading dark:text-text-inverse mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted dark:text-muted-inverse">
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
