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
    <section className="section-padding bg-warm-white dark:bg-warm-white-dark">
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
                <div className="group h-full card-luxury p-6">
                  <div className="flex items-center gap-5 h-full">
                    <div className="shrink-0 h-14 w-14 icon-circle-luxury">
                      <Icon size={24} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg text-text-heading mb-1 dark:text-text-inverse">
                        {rule.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted dark:text-muted-inverse">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
