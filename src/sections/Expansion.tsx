"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { expansion, business } from "@/lib/config";

export function Expansion() {
  return (
    <section className="section-padding bg-ivory dark:bg-ivory-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
          <SectionLabel className="mb-5">Coming Soon</SectionLabel>
          <SectionHeading size="lg" className="dark:text-text-inverse">
            {expansion.title}
          </SectionHeading>
          <p className="mt-6 text-lg text-muted dark:text-muted-inverse">{expansion.description}</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedSection>
            <div className="card-luxury p-8 h-full">
              <h3 className="font-serif text-2xl text-text-heading mb-5 dark:text-text-inverse">Themes</h3>
              <ul className="space-y-3 text-muted dark:text-muted-inverse">
                {expansion.themes.map((theme) => (
                  <li key={theme} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="card-luxury p-8 h-full">
              <h3 className="font-serif text-2xl text-text-heading mb-5 dark:text-text-inverse">Locations</h3>
              <ul className="space-y-3 text-muted dark:text-muted-inverse">
                {expansion.locations.map((location) => (
                  <li key={location} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="card-luxury p-8 h-full">
              <h3 className="font-serif text-2xl text-text-heading mb-5 dark:text-text-inverse">Unit Types</h3>
              <ul className="space-y-3 text-muted dark:text-muted-inverse">
                {expansion.unitTypes.map((type) => (
                  <li key={type} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {type}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-16 text-center" delay={0.3}>
          <p className="text-muted dark:text-muted-inverse max-w-2xl mx-auto">
            Stay tuned as {business.name} expands into a collection of design-led
            private stays across India.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  );
}
