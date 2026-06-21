"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { ImageCard } from "@/components/ImageCard";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { properties, type Property } from "@/lib/config";

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const isLive = property.status === "live";
  const images = property.heroImages.slice(0, 3);

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      <AnimatedSection className={index % 2 === 1 ? "lg:order-2" : ""}>
        <div className="grid gap-4 relative">
          {!isLive && property.badge && (
            <span className="absolute top-5 left-5 z-10 rounded-full bg-secondary/80 text-text-inverse px-4 py-1.5 text-xs font-semibold uppercase tracking-lux backdrop-blur-sm">
              {property.badge}
            </span>
          )}
          <ImageCard
            src={images[0]?.src || property.heroImages[0]?.src}
            alt={images[0]?.alt || property.name}
            aspect="landscape"
            className="rounded-3xl"
            priority={isLive}
          />
          <div className="grid grid-cols-2 gap-4">
            <ImageCard
              src={images[1]?.src || property.heroImages[0]?.src}
              alt={images[1]?.alt || property.name}
              aspect="square"
              className="rounded-2xl"
            />
            <ImageCard
              src={images[2]?.src || property.heroImages[0]?.src}
              alt={images[2]?.alt || property.name}
              aspect="square"
              className="rounded-2xl"
            />
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.15} className={index % 2 === 1 ? "lg:order-1" : ""}>
        <SectionLabel className="mb-5">
          {isLive ? "Featured Property" : property.badge || "Coming Soon"}
        </SectionLabel>
        <SectionHeading size="lg">{property.tagline}</SectionHeading>
        <p className="mt-7 text-base md:text-lg text-muted leading-relaxed dark:text-muted-inverse">
          {property.shortDescription}
        </p>

        <ul className="mt-10 space-y-4">
          {property.highlights.map((item) => (
            <li key={item} className="flex items-center gap-4">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-muted/80 dark:text-muted-inverse/80">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          {isLive ? (
            <Button href={`/properties/${property.slug}`}>Discover the Villa</Button>
          ) : (
            <span className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium tracking-wide border border-border-light text-muted/70 cursor-not-allowed dark:border-border-dark dark:text-muted-inverse/70">
              Launching Soon
            </span>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}

function ComingSoonCard({ property }: { property: Property }) {
  const image = property.heroImages[0];

  return (
    <div className="group card-luxury overflow-hidden">
      <div className="relative overflow-hidden">
        <ImageCard
          src={image?.src || "/images/placeholder/coming-soon.svg"}
          alt={image?.alt || property.name}
          aspect="landscape"
          className="rounded-none"
        />
        <span className="absolute top-4 left-4 z-10 inline-block rounded-full bg-secondary/70 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-lux text-text-inverse">
          {property.badge || "Coming Soon"}
        </span>
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-lux text-muted dark:text-muted-inverse mb-2">{property.location}</p>
        <h3 className="font-serif text-xl text-text-heading dark:text-text-inverse mb-2">
          {property.name}
        </h3>
        <p className="text-sm leading-relaxed text-muted dark:text-muted-inverse">
          {property.tagline}
        </p>
      </div>
    </div>
  );
}

export function FeaturedProperty() {
  const liveProperties = properties.filter((p) => p.status === "live");
  const comingSoonProperties = properties.filter((p) => p.status === "coming-soon");

  return (
    <section className="section-padding bg-ivory dark:bg-ivory-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
          <SectionLabel className="mb-4">Featured Property</SectionLabel>
          <SectionHeading size="lg">
            Our first private estate is ready in Noida.
          </SectionHeading>
        </AnimatedSection>

        <div className="space-y-16 md:space-y-22">
          {liveProperties.map((property, index) => (
            <PropertyCard key={property.slug} property={property} index={index} />
          ))}
        </div>

        {comingSoonProperties.length > 0 && (
          <div className="mt-14 md:mt-18">
            <AnimatedSection className="max-w-3xl mb-8 md:mb-12">
              <SectionLabel className="mb-4">On the Horizon</SectionLabel>
              <SectionHeading size="md">
                More destinations, same Aviora standard.
              </SectionHeading>
            </AnimatedSection>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comingSoonProperties.map((property, index) => (
                <AnimatedSection key={property.slug} delay={index * 0.1}>
                  <ComingSoonCard property={property} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
