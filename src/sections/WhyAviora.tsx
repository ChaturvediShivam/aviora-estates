"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { Leaf, ShieldCheck, Sparkles, Clock } from "lucide-react";

const reasons = [
  {
    icon: Leaf,
    title: "Private Estate",
    description:
      "Gated grounds surrounded by tropical greenery offer complete seclusion and space to unwind.",
  },
  {
    icon: Sparkles,
    title: "Curated Design",
    description:
      "Handpicked ceramics, natural textiles, and Mediterranean architecture create an editorial atmosphere.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Care",
    description:
      "Thoughtful hospitality, professional housekeeping, and meticulous attention to every detail.",
  },
  {
    icon: Clock,
    title: "Slow Luxury",
    description:
      "No crowded lobbies. No rushed schedules. Just time, space, and the feeling of being away.",
  },
];

export function WhyAviora() {
  return (
    <section className="section-padding bg-surface dark:bg-surface-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
          <SectionLabel className="mb-4">Why Aviora</SectionLabel>
          <SectionHeading size="lg" className="dark:text-text-inverse">
            Hospitality that feels personal.
          </SectionHeading>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, index) => (
            <AnimatedSection key={reason.title} delay={index * 0.1}>
              <div className="group h-full p-6 rounded-2xl border border-border-light bg-surface-card hover:border-border-accent hover:shadow-sm transition-all duration-500 dark:bg-surface-dark/60 dark:border-border-dark dark:hover:bg-surface-dark/80">
                <div className="mb-5 inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-text-inverse transition-colors duration-500">
                  <reason.icon size={22} />
                </div>
                <h3 className="font-serif text-xl text-text-heading mb-2 dark:text-text-inverse">{reason.title}</h3>
                <p className="text-sm leading-relaxed text-muted dark:text-muted-inverse">
                  {reason.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
