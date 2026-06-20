import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageCard } from "@/components/ImageCard";
import { BookingCTA } from "@/components/BookingCTA";
import { Check } from "lucide-react";
import { business } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story behind Aviora Estates — a design-led luxury villa rental built on privacy, curated hospitality, and Mediterranean calm.",
  alternates: {
    canonical: `${business.url}/about`,
  },
  openGraph: {
    title: "About | Aviora Estates",
    description:
      "Learn the story behind Aviora Estates — a design-led luxury villa rental built on privacy, curated hospitality, and Mediterranean calm.",
    images: ["/images/gallery/villa-through-trees.jpg"],
  },
};

const values = [
  "Design-led hospitality",
  "Privacy above all else",
  "Thoughtful, attentive care",
  "Premium linens and curated amenities",
  "Seamless indoor-outdoor living",
  "Sustainable, low-impact operations",
];

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24 md:pb-32">
      <Container className="mb-20 md:mb-28">
        <AnimatedSection className="max-w-4xl">
          <SectionLabel className="mb-5">About {business.name}</SectionLabel>
          <SectionHeading size="xl">A retreat shaped by intention.</SectionHeading>
          <p className="mt-8 text-lg md:text-xl text-muted leading-relaxed dark:text-muted-inverse">
            Aviora Estates was created for travelers who no longer want to choose
            between beauty and comfort. We set out to build a private villa
            experience that feels like an editorial destination — where
            architecture, nature, and hospitality come together without excess.
          </p>
        </AnimatedSection>
      </Container>

      <Container className="mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <ImageCard
              src="/images/gallery/villa-through-trees.jpg"
              alt="Aviora villa viewed through tropical tree foliage"
              aspect="landscape"
              className="rounded-3xl"
            />
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <SectionLabel className="mb-5">Our Story</SectionLabel>
            <h3 className="font-serif text-3xl md:text-4xl text-text-heading dark:text-text-inverse mb-6">
              From a vision of calm.
            </h3>
            <p className="text-muted leading-relaxed dark:text-muted-inverse">
              What began as a desire for a slower, more private kind of getaway
              became Aviora — a single-story villa painted in Mediterranean
              white and cobalt, surrounded by manicured lawns and mature trees.
              Every tile, textile, and ceramic was chosen to create an
              atmosphere that feels both timeless and lived-in.
            </p>
            <p className="mt-4 text-muted leading-relaxed dark:text-muted-inverse">
              Today, Aviora hosts families, couples, and small celebrations who
              share one thing in common: they want to feel away, without
              sacrificing quality.
            </p>
          </AnimatedSection>
        </div>
      </Container>

      <div className="bg-luxury-gradient dark:bg-luxury-gradient-dark py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <SectionLabel className="mb-5">Philosophy</SectionLabel>
              <h3 className="font-serif text-3xl md:text-4xl text-text-heading dark:text-text-inverse mb-6">
                Slow luxury, naturally.
              </h3>
              <p className="text-muted leading-relaxed dark:text-muted-inverse">
                We believe the best stays are defined by what is not there: no
                crowds, no noise, no unnecessary detail. Aviora is edited down
                to the essentials — space, light, nature, and care.
              </p>
              <ul className="mt-8 space-y-4">
                {values.map((value) => (
                  <li key={value} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check size={12} />
                    </span>
                    <span className="text-muted dark:text-muted-inverse">{value}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="order-1 lg:order-2">
              <ImageCard
                src="/images/spaces/bedroom-art.jpg"
                alt="Handmade blue and white abstract ceramic art detail on a villa shelf"
                aspect="square"
                className="rounded-3xl"
              />
            </AnimatedSection>
          </div>
        </Container>
      </div>

      <div className="mt-20">
        <BookingCTA variant="dark" />
      </div>
    </section>
  );
}
