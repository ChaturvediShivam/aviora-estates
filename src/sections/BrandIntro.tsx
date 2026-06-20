"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";

export function BrandIntro() {
  return (
    <section id="intro" className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container tight>
        <AnimatedSection className="text-center">
          <SectionLabel className="mb-5">Welcome to Aviora</SectionLabel>
          <SectionHeading size="xl" className="text-balance">
            Where every detail breathes slower.
          </SectionHeading>
          <p className="mt-10 text-lg md:text-xl text-muted leading-relaxed dark:text-muted-inverse">
            Inspired by the white-washed villas of the Mediterranean and rooted in
            the calm of the Indian countryside, Aviora Estates is a curated
            retreat for guests who value space, beauty, and quiet luxury. Cobalt
            doors open onto manicured lawns, a private pool shimmers beneath
            tropical palms, and every room is dressed in natural textures and
            artisan detail.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
