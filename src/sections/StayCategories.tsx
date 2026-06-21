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
    <section className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
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
              <div className="group p-6 rounded-2xl border border-border-light bg-surface-card hover:border-accent hover:bg-primary/5 hover:shadow-sm transition-all duration-500 cursor-default dark:bg-surface-dark/60 dark:border-border-dark dark:hover:bg-surface-dark/80">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-text-inverse transition-colors duration-500 dark:bg-primary/20 dark:text-primary">
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
