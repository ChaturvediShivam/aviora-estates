"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { Waves, Building2, Dog, UtensilsCrossed, TreePine, UsersRound } from "lucide-react";

const features = [
  {
    icon: Waves,
    title: "Private Pool",
    description: "A sun-drenched pool deck surrounded by tropical palms for lazy afternoons and evening dips.",
  },
  {
    icon: Building2,
    title: "Mediterranean Architecture",
    description: "Whitewashed walls, cobalt accents, and arched openings inspired by coastal villas.",
  },
  {
    icon: Dog,
    title: "Pet Friendly",
    description: "Your companions are welcome with prior notice, because a family holiday includes everyone.",
  },
  {
    icon: UtensilsCrossed,
    title: "Curated Dining",
    description: "Indoor-outdoor dining spaces designed for long lunches, candlelit dinners, and celebrations.",
  },
  {
    icon: TreePine,
    title: "Private Lawn",
    description: "A wide manicured garden for yoga, picnics, events, or simply doing nothing under the trees.",
  },
  {
    icon: UsersRound,
    title: "Group Stay Ready",
    description: "Thoughtfully planned suites and common areas that balance togetherness and quiet retreat.",
  },
];

export function Features() {
  return (
    <section className="section-padding bg-champagne dark:bg-champagne-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-14 md:mb-20">
          <SectionLabel className="mb-5">The Estate</SectionLabel>
          <SectionHeading size="lg" className="text-balance">
            Every space is designed for presence.
          </SectionHeading>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.08}>
              <div className="group h-full card-luxury p-6">
                <div className="flex items-center gap-5 h-full">
                  <div className="shrink-0 h-12 w-12 icon-circle-luxury">
                    <feature.icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg text-text-heading dark:text-text-inverse mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted dark:text-muted-inverse">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
