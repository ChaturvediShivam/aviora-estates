import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { BookingCTA } from "@/components/BookingCTA";
import { business } from "@/lib/config";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the curated image gallery of Aviora Estates — private pool, Mediterranean villa exterior, suites, gardens, and interior details.",
  alternates: {
    canonical: `${business.url}/gallery`,
  },
  openGraph: {
    title: "Gallery | Aviora Estates",
    description:
      "Browse the curated image gallery of Aviora Estates — private pool, Mediterranean villa exterior, suites, gardens, and interior details.",
    images: ["/images/hero/villa-front-day.png"],
  },
};

const galleryImages = [
  { src: "/images/hero/villa-front-day.png", alt: "Aviora villa front facade with cobalt blue doors and manicured gardens" },
  { src: "/images/hero/pool-sunset.png", alt: "Private pool at sunset reflecting the whitewashed villa" },
  { src: "/images/gallery/living-room-dining.jpg", alt: "Open-plan Mediterranean living and dining space" },
  { src: "/images/gallery/living-room-wide.jpg", alt: "Bright living room with decorative wall plates and tropical plants" },
  { src: "/images/spaces/bedroom-2.png", alt: "Garden-view bedroom with natural linens and cane blinds" },
  { src: "/images/spaces/bathroom-master.jpg", alt: "Master bathroom with blue patterned tile floors" },
  { src: "/images/hero/villa-night.png", alt: "Aviora villa exterior illuminated at night" },
  { src: "/images/gallery/lawn-panorama.jpg", alt: "Wide panoramic lawn backed by mature tropical trees" },
  { src: "/images/gallery/palm-walkway.png", alt: "Palm tree lined stone garden walkway" },
  { src: "/images/spaces/kitchen-fridge.jpg", alt: "Modern villa kitchen with refrigerator and cabinets" },
  { src: "/images/gallery/villa-garden-view.png", alt: "Villa viewed through lush green foliage" },
  { src: "/images/spaces/bedroom-1.jpg", alt: "Poolside bedroom with white and blue bed runner" },
  { src: "/images/gallery/estate-gate-night.png", alt: "Teal estate entrance gate lit at night" },
  { src: "/images/spaces/bathroom-shower.jpg", alt: "Open shower bathroom with cobalt door" },
  { src: "/images/hero/garden-path-hero.png", alt: "Stone garden path with red roses alongside the villa" },
  { src: "/images/gallery/living-room-evening.png", alt: "Living room in warm evening light" },
  { src: "/images/hero/villa-sunset-lawn.png", alt: "Villa and lawn at dusk with colorful sky" },
  { src: "/images/spaces/lounge-hammock.jpg", alt: "Cozy lounge corner with hammock and tropical plants" },
  { src: "/images/gallery/wall-plates-art.png", alt: "Decorative blue and white ceramic plates on wall" },
  { src: "/images/hero/outdoor-lounge-lawn.png", alt: "Curved outdoor lounge bench overlooking green lawn" },
];

export default function GalleryPage() {
  return (
    <section className="pt-32 pb-24 md:pb-32">
      <Container className="mb-14 md:mb-18">
        <AnimatedSection className="max-w-3xl">
          <SectionLabel className="mb-5">Gallery</SectionLabel>
          <SectionHeading size="xl">A curated look at life here.</SectionHeading>
          <p className="mt-6 text-lg text-muted dark:text-muted-inverse">
            Every corner of Aviora is designed to feel light, open, and intentionally calm.
          </p>
        </AnimatedSection>
      </Container>

      <Container className="max-w-7xl">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, index) => (
            <AnimatedSection key={img.src} delay={index * 0.04}>
              <div className="relative overflow-hidden rounded-2xl break-inside-avoid bg-text/5 dark:bg-text-inverse/5">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>

      <div className="mt-20">
        <BookingCTA variant="dark" />
      </div>
    </section>
  );
}
