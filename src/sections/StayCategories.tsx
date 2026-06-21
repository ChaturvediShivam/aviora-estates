"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { Users, Heart, Sparkles, Briefcase } from "lucide-react";

const categories = [
  { title: "Families", subtitle: "Space for everyone", icon: Users },
  { title: "Couples", subtitle: "Intimate escapes", icon: Heart },
  { title: "Celebrations", subtitle: "Small events & gatherings", icon: Sparkles },
  { title: "Workations", subtitle: "Quiet focus in nature", icon: Briefcase },
];

export function StayCategories() {
  return (
    <section className="section-padding bg-ivory dark:bg-ivory-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
          <SectionLabel className="mb-4">Curated Stays</SectionLabel>
          <SectionHeading size="lg">
            A villa for every kind of pause.
          </SectionHeading>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, index) => (
            <AnimatedSection key={cat.title} delay={index * 0.1}>
              <div className="group card-luxury p-6 cursor-default">
                <div className="mb-5 h-12 w-12 icon-circle-luxury">
                  <cat.icon size={22} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-lux text-primary/70 mb-2 dark:text-primary/80">
                  {cat.subtitle}
                </p>
                <h3 className="font-serif text-xl md:text-2xl text-text-heading group-hover:text-primary transition-colors dark:text-text-inverse">
                  {cat.title}
                </h3>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
