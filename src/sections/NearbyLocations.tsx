"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { MapPin, ExternalLink } from "lucide-react";
import type { PropertyNearby } from "@/lib/config";

interface NearbyLocationsProps {
  nearby: PropertyNearby[];
  locationName?: string;
}

export function NearbyLocations({ nearby, locationName = "the Property" }: NearbyLocationsProps) {
  return (
    <section className="section-padding">
      <Container>
        <AnimatedSection className="max-w-3xl mb-16 md:mb-24">
          <SectionLabel className="mb-5">Around {locationName}</SectionLabel>
          <SectionHeading size="lg">Nearby conveniences.</SectionHeading>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nearby.map((place, index) => (
            <AnimatedSection key={place.label + index} delay={index * 0.06}>
              <a
                href={place.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border-light bg-surface-card p-6 hover:border-accent hover:shadow-sm transition-all duration-500 dark:bg-surface-dark/50 dark:border-border-dark"
              >
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-primary" />
                  <span className="font-medium text-text dark:text-text-inverse">{place.label}</span>
                </div>
                <ExternalLink
                  size={14}
                  className="text-muted/40 group-hover:text-primary transition-colors dark:text-muted-inverse/40"
                />
              </a>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
