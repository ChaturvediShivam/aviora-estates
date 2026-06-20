"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { ImageCard } from "@/components/ImageCard";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import type { PropertySpace } from "@/lib/config";

interface RoomBreakdownProps {
  rooms: PropertySpace[];
}

export function RoomBreakdown({ rooms }: RoomBreakdownProps) {
  return (
    <section className="section-padding">
      <Container>
        <AnimatedSection className="max-w-3xl mb-16 md:mb-24">
          <SectionLabel className="mb-5">Room-by-Room</SectionLabel>
          <SectionHeading size="lg">Walk through every space.</SectionHeading>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, index) => (
            <AnimatedSection key={room.title} delay={index * 0.08}>
              <ImageCard
                src={room.image}
                alt={room.title}
                aspect="video"
                className="rounded-2xl"
                label={room.title}
              />
              <p className="mt-4 text-sm text-muted dark:text-muted-inverse">
                {room.description}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
