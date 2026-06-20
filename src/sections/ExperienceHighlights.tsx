"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { ImageCard } from "@/components/ImageCard";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import type { PropertyExperience } from "@/lib/config";

const defaultExperiences: PropertyExperience[] = [
  {
    title: "Poolside Living",
    image: "/images/hero/pool-sunset.png",
    text: "Spend the day by the pool, framed by tropical palms and a teak deck.",
  },
  {
    title: "Garden & Lawn",
    image: "/images/gallery/lawn-panorama.jpg",
    text: "A wide green lawn for yoga, events, picnics, or simply doing nothing.",
  },
  {
    title: "Mediterranean Dining",
    image: "/images/gallery/living-room-dining.jpg",
    text: "Indoor-outdoor dining spaces designed for long conversations.",
  },
];

interface ExperienceHighlightsProps {
  experiences?: PropertyExperience[];
}

export function ExperienceHighlights({ experiences = defaultExperiences }: ExperienceHighlightsProps) {
  return (
    <section className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-16 md:mb-24">
          <SectionLabel className="mb-5">Experiences</SectionLabel>
          <SectionHeading size="lg">
            Moments designed around the day.
          </SectionHeading>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.12}>
              <ImageCard
                src={item.image}
                alt={item.title}
                aspect="portrait"
                label={item.title}
                className="rounded-3xl"
              />
              <p className="mt-5 text-sm text-muted dark:text-muted-inverse">{item.text}</p>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
