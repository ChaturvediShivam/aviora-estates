import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/Container";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { ImageCard } from "@/components/ImageCard";
import { PropertyDetailClient } from "@/components/PropertyDetailClient";
import { ReviewCard } from "@/components/ReviewCard";
import { GuestStoriesPlaceholder } from "@/components/GuestStoriesPlaceholder";
import { PropertyHighlights } from "@/sections/PropertyHighlights";
import { NearbyLocations } from "@/sections/NearbyLocations";
import { RoomBreakdown } from "@/sections/RoomBreakdown";
import { business, properties, getPropertyBySlug, pricing, reviews, capacity } from "@/lib/config";
import { User, Clock, ShieldCheck, MessageCircle } from "lucide-react";

export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return {};

  return {
    title: property.name,
    description: property.description,
    alternates: {
      canonical: `${business.url}/properties/${slug}`,
    },
    openGraph: {
      title: `${property.name} | ${business.name}`,
      description: property.description,
      images: [property.heroImages[0]?.src || "/images/hero/villa-front-day.png"],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const isLive = property.status === "live";

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <Container>
          <AnimatedSection className="max-w-4xl">
            <SectionLabel className="mb-5">{isLive ? "Now Booking" : property.badge}</SectionLabel>
            <SectionHeading size="xl">{property.name}</SectionHeading>
            <p className="mt-4 text-lg text-muted dark:text-muted-inverse">{property.location}</p>

            {property.estateSize && (
              <p className="mt-2 text-sm font-semibold uppercase tracking-lux text-primary/80 dark:text-primary">
                {property.estateSize}
              </p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <PropertyDetailClient property={property} />
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 h-[55vh] md:h-[72vh]">
          {property.heroImages.map((img, index) => (
            <div key={img.src} className={index === 0 ? "col-span-2 row-span-2" : ""}>
              <ImageCard
                src={img.src}
                alt={img.alt}
                aspect="auto"
                priority={index < 2}
                className="h-full w-full rounded-none"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding-sm bg-luxury-gradient dark:bg-luxury-gradient-dark">
        <Container className="max-w-4xl">
          <AnimatedSection>
            <SectionHeading size="lg" className="text-balance">
              {property.tagline}
            </SectionHeading>
            <p className="mt-8 text-lg md:text-xl text-muted leading-relaxed dark:text-muted-inverse">
              {property.description}
            </p>
          </AnimatedSection>
        </Container>
      </section>

      <section className="section-padding-sm">
        <Container className="max-w-4xl">
          <AnimatedSection>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-4 rounded-2xl border border-border-light bg-surface-card p-5 dark:border-border-dark dark:bg-surface-dark/50">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6 opacity-70"
                    aria-hidden="true"
                  >
                    <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-heading dark:text-text-inverse">
                    Hosted by {property.hostName || business.name}
                  </p>
                  <p className="text-xs text-muted dark:text-muted-inverse">
                    Direct owner communication. Every request is reviewed personally to preserve privacy, safety, and the quality of the Aviora experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border-light bg-surface-card p-5 dark:border-border-dark dark:bg-surface-dark/50">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-heading dark:text-text-inverse">Owner-managed response</p>
                  <p className="text-xs text-muted dark:text-muted-inverse">Most guests receive a response within 2 hrs.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-border-light bg-surface-card p-5 dark:border-border-dark dark:bg-surface-dark/50">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-heading dark:text-text-inverse">Verified property</p>
                  <p className="text-xs text-muted dark:text-muted-inverse">Details matched to the real stay</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <PropertyHighlights highlights={property.highlights} />

      {isLive && (
        <section className="bg-luxury-gradient dark:bg-luxury-gradient-dark">
          <Container className="py-16 md:py-22">
            <AnimatedSection className="text-center">
              <p className="text-xs font-semibold uppercase tracking-lux text-primary/80 dark:text-primary mb-4">
                Request Your Stay
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl max-w-3xl mx-auto text-text-heading dark:text-text-inverse">
                Request your dates
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-muted dark:text-muted-inverse">
                Submit a stay request for {property.name}. The owner will review availability and share final pricing and next steps.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <PropertyDetailClient property={property} buttonLabel="Request Availability" variant="primary" />
                <PropertyDetailClient
                  property={property}
                  buttonLabel="Send an Inquiry"
                  variant="outline"
                />
              </div>
            </AnimatedSection>
          </Container>
        </section>
      )}

      <RoomBreakdown rooms={property.rooms} />

      <section className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
        <Container>
          <AnimatedSection className="max-w-3xl mb-14">
            <SectionLabel className="mb-5">Experiences</SectionLabel>
            <SectionHeading size="lg">Moments designed around the day.</SectionHeading>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {property.experiences.map((exp, index) => (
              <AnimatedSection key={exp.title} delay={index * 0.1}>
                <ImageCard
                  src={exp.image}
                  alt={exp.title}
                  aspect="video"
                  className="rounded-2xl"
                  label={exp.title}
                />
                <p className="mt-4 text-sm text-muted dark:text-muted-inverse">{exp.text}</p>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          <AnimatedSection className="max-w-3xl mb-14 text-center">
            <SectionLabel className="mb-5">Pricing</SectionLabel>
            <SectionHeading size="lg" className="dark:text-text-inverse">Estimated rates. Full villa.</SectionHeading>
            <p className="mt-4 text-sm text-muted dark:text-muted-inverse">
              Final pricing is confirmed after owner review and may vary based on stay requirements.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(pricing).map((tier, index) => {
              const typedTier = tier as { label: string; originalAmount?: string; amount: string; per?: string; note?: string; discountPercent?: number };
              const hasDiscount = Boolean(typedTier.originalAmount && typedTier.discountPercent);
              return (
                <AnimatedSection key={typedTier.label} delay={index * 0.08}>
                  <div className="relative h-full p-8 rounded-2xl border border-border-light bg-surface-card hover:border-border-accent transition-all duration-500 dark:bg-surface-dark/50 dark:border-border-dark">
                    {hasDiscount && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-lux text-text-inverse shadow-sm">
                        {typedTier.discountPercent}% OFF
                      </span>
                    )}
                    <p className="text-xs font-semibold uppercase tracking-lux text-primary/70 dark:text-primary mb-3">{typedTier.label}</p>
                    {typedTier.originalAmount && (
                      <p className="text-sm text-muted/60 dark:text-muted-inverse/60 line-through">{typedTier.originalAmount}</p>
                    )}
                    <p className="font-serif text-3xl text-text-heading dark:text-text-inverse">{typedTier.amount}</p>
                    {typedTier.per && <p className="text-sm text-muted/70 dark:text-muted-inverse/70 mt-1">{typedTier.per}</p>}
                    <p className="text-xs text-muted/50 dark:text-muted-inverse/50 mt-4">{typedTier.note}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="mt-10 text-center" delay={0.3}>
            <p className="text-sm text-muted/70 dark:text-muted-inverse/70">
              Base capacity {capacity.nightStay} guests for night stays. Day use up to {capacity.dayUse} guests.
              Extra adults charged at {pricing.extraGuest.amount} {pricing.extraGuest.per}. Rates shown are estimates; final pricing confirmed after owner review.
            </p>
          </AnimatedSection>
        </Container>
      </section>

      <section className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
        <Container>
          <AnimatedSection className="max-w-3xl mb-14">
            <SectionLabel className="mb-5">Gallery</SectionLabel>
            <SectionHeading size="lg">A curated look at life here.</SectionHeading>
          </AnimatedSection>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
            {property.galleryImages.map((img, index) => (
              <AnimatedSection key={img.src + index} delay={index * 0.04}>
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
      </section>

      <NearbyLocations nearby={property.nearby} locationName={property.location.split(",")[0]} />

      {isLive && (
        <section className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
          <Container>
            <AnimatedSection className="max-w-3xl mb-14">
              <SectionLabel className="mb-5">Guest Stories</SectionLabel>
              <SectionHeading size="lg">What guests will say.</SectionHeading>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.length > 0 ? reviews.slice(0, 6).map((review, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <ReviewCard {...review} />
                </AnimatedSection>
              )) : (
                <AnimatedSection className="md:col-span-3">
                  <GuestStoriesPlaceholder />
                </AnimatedSection>
              )}
            </div>
          </Container>
        </section>
      )}

      <section className="section-padding-sm bg-luxury-gradient dark:bg-luxury-gradient-dark text-text-heading dark:text-text-inverse">
        <Container className="text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-5xl text-text-heading dark:text-text-inverse">{isLive ? "Ready to request your stay?" : "Join the waitlist"}</h2>
            <p className="mt-4 max-w-xl mx-auto text-muted dark:text-muted-inverse">
              {isLive
                ? "Submit a stay request and the owner will personally review availability, share final pricing, and guide you through a secure, owner-approved reservation."
                : "Be the first to know when this property opens for bookings."}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {isLive ? (
                <PropertyDetailClient property={property} buttonLabel="Request Availability" variant="primary" />
              ) : (
                <PropertyDetailClient property={property} buttonLabel="Join Waitlist" variant="primary" />
              )}
              <PropertyDetailClient
                property={property}
                buttonLabel="Contact Page"
                href="/contact"
                variant="outline"
              />
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <div className="h-20 md:hidden" aria-hidden="true" />

      <aside className="fixed bottom-0 left-0 right-0 z-30 md:hidden border-t border-border-light bg-surface/95 p-4 shadow-[0_-4px_20px_rgba(21,21,21,0.08)] backdrop-blur-md dark:border-border-dark dark:bg-surface-dark/95">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-serif text-sm text-text-heading dark:text-text-inverse">{property.name.split(",")[0]}</p>
            <p className="text-xs text-muted dark:text-muted-inverse">
              {isLive ? `Est. from ${pricing.weekday.amount} / night` : "Opening soon"}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <PropertyDetailClient
              property={property}
              buttonLabel={isLive ? "Request Availability" : "Join Waitlist"}
              variant="primary"
              className="px-5 py-2.5 text-xs"
            />
            <a
              href={`/api/whatsapp?message=${encodeURIComponent(`Hi, I'd like to enquire about ${property.name}.`)}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md hover:brightness-110"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={18} fill="currentColor" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
