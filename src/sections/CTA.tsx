"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { BookingFlowModal } from "@/components/BookingFlowModal";
import { business } from "@/lib/config";

export function CTA() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-champagne dark:bg-champagne-dark py-14 md:py-20">
        <div
          className="absolute inset-0 opacity-[0.14] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/gallery/villa-front-facade.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-champagne/70 via-champagne/85 to-champagne/70 dark:from-champagne-dark/70 dark:via-champagne-dark/85 dark:to-champagne-dark/70" />
        <Container className="relative z-10 text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-lux text-primary/80 dark:text-primary mb-4">
              Request Your Stay
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight text-text-heading dark:text-text-inverse">
              Begin your escape today.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-muted dark:text-muted-inverse">
              Submit a stay request and the owner will personally review availability, share final pricing, and guide you through a secure, owner-approved reservation.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => setIsBookingOpen(true)}
                variant="primary"
              >
                Request Availability
              </Button>
              <Button
                href="/contact"
                variant="outline"
              >
                Send an Inquiry
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <BookingFlowModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultPropertySlug="noida-estate" />
    </>
  );
}
