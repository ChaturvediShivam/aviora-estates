"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";

export function BrandIntro() {
  return (
    <section id="intro" className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container tight>
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <SectionLabel className="mb-4">Welcome to Aviora</SectionLabel>
          <SectionHeading size="xl" className="text-balance">
            Where every stay is an experience.
          </SectionHeading>
          <p className="mt-8 text-lg md:text-xl text-muted leading-relaxed dark:text-muted-inverse">
            Don’t just visit—Live it. Unique homes and unforgettable moments in
            the most vibrant places in the neighborhood.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
