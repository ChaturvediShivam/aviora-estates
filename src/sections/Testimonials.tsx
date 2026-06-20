"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { GuestStoriesPlaceholder } from "@/components/GuestStoriesPlaceholder";

export function Testimonials() {
  return (
    <section className="section-padding">
      <Container>
        <AnimatedSection>
          <GuestStoriesPlaceholder />
        </AnimatedSection>
      </Container>
    </section>
  );
}
