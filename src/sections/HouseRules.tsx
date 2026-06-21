"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { policies } from "@/lib/config";
import { CigaretteOff, Music, Users, UserPlus, HeartHandshake } from "lucide-react";

const icons = [CigaretteOff, Music, Users, UserPlus, HeartHandshake];

export function HouseRules() {
  return (
    <section className="section-padding bg-surface-card dark:bg-surface-dark/30">
      <Container>
        <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
          <SectionLabel className="mb-4">House Rules</SectionLabel>
          <SectionHeading size="lg">
            A few gentle guidelines for the estate.
          </SectionHeading>
          <p className="mt-5 text-base md:text-lg text-muted dark:text-muted-inverse">
            Designed to protect the home, the neighbourhood, and the calm that
            makes an Aviora stay feel different.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {policies.curatedHouseRules.map((rule, index) => {
            const Icon = icons[index] || HeartHandshake;
            return (
              <AnimatedSection key={rule.title} delay={index * 0.1}>
                <div className="group h-full p-6 rounded-2xl border border-border-light bg-surface hover:border-border-accent hover:shadow-sm transition-all duration-500 dark:bg-surface-dark/60 dark:border-border-dark">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-text-inverse transition-colors duration-500">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-serif text-xl text-text-heading mb-3 dark:text-text-inverse">
                    {rule.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted dark:text-muted-inverse">
                    {rule.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
