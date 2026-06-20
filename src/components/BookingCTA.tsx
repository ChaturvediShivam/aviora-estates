"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/Container";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/Button";
import { BookingFlowModal } from "@/components/BookingFlowModal";
import { business } from "@/lib/config";

interface BookingCTAProps {
  variant?: "light" | "dark";
  title?: string;
  subtitle?: string;
  defaultPropertySlug?: string;
}

export function BookingCTA({
  variant = "light",
  title = "Request your stay",
  subtitle = `Submit a request and the ${business.name} team will review availability, share final pricing, and guide you through a secure, owner-approved reservation.`,
  defaultPropertySlug,
}: BookingCTAProps) {
  const isDark = variant === "dark";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className={isDark ? "bg-secondary text-text-inverse" : "bg-luxury-gradient dark:bg-luxury-gradient-dark text-text-heading dark:text-text-inverse"}>
        <Container className="py-16 md:py-22">
          <AnimatedSection className="text-center">
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-lux mb-4",
                isDark ? "text-muted-inverse" : "text-primary/80 dark:text-primary"
              )}
            >
              Request Your Stay
            </p>
            <h2 className={cn("font-serif text-3xl md:text-4xl lg:text-5xl max-w-3xl mx-auto", isDark ? "text-text-inverse" : "text-text-heading dark:text-text-inverse")}>
              {title}
            </h2>
            <p className={cn("mx-auto mt-5 max-w-xl", isDark ? "text-muted-inverse" : "text-muted dark:text-muted-inverse")}>
              {subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => setIsOpen(true)}
                variant={isDark ? "outline" : "primary"}
                className={isDark ? "border-text-inverse text-text-inverse hover:bg-text-inverse hover:text-text-heading" : ""}
              >
                Request Availability
              </Button>
              <Button href="/contact" variant={isDark ? "ghost" : "outline"} className={isDark ? "text-text-inverse hover:bg-text-inverse/10" : ""}>
                Send an Inquiry
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <BookingFlowModal isOpen={isOpen} onClose={() => setIsOpen(false)} defaultPropertySlug={defaultPropertySlug} />
    </>
  );
}
