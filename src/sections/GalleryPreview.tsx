"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { ImageCard } from "@/components/ImageCard";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";

const previewImages = [
  { src: "/images/gallery/villa-garden-view.png", alt: "Aviora villa framed through lush tropical garden leaves" },
  { src: "/images/gallery/living-room-wide.jpg", alt: "Bright Mediterranean living room with decorative wall plates" },
  { src: "/images/spaces/bathroom-master.jpg", alt: "Spacious master bathroom with blue patterned tile floors" },
  { src: "/images/gallery/palm-walkway.png", alt: "Tall palm trees lining a stone garden walkway" },
  { src: "/images/spaces/bedroom-3.jpg", alt: "Poolside bedroom suite with garden view window" },
  { src: "/images/hero/villa-night.png", alt: "Aviora villa beautifully illuminated at night" },
];

export function GalleryPreview() {
  return (
    <section className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container>
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div className="max-w-2xl">
            <SectionLabel className="mb-5">Gallery</SectionLabel>
            <SectionHeading size="lg">
              A curated look at life here.
            </SectionHeading>
          </div>
          <Button href="/gallery" variant="outline">View All Images</Button>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((img, index) => (
            <AnimatedSection
              key={img.src}
              delay={index * 0.08}
              className={index === 0 || index === 5 ? "md:col-span-2" : ""}
            >
              <ImageCard
                src={img.src}
                alt={img.alt}
                aspect="landscape"
                className="rounded-2xl"
              />
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
