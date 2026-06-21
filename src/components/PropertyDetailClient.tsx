"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { BookingFlowModal } from "@/components/BookingFlowModal";
import { WaitlistModal } from "@/components/WaitlistModal";
import type { Property } from "@/lib/config";
import { cn } from "@/lib/utils";

interface PropertyDetailClientProps {
  property: Property;
  buttonLabel?: string;
  variant?: "primary" | "outline" | "ghost";
  href?: string;
  className?: string;
}

export function PropertyDetailClient({
  property,
  buttonLabel = "Request Availability",
  variant = "outline",
  href,
  className,
}: PropertyDetailClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isLive = property.status === "live";

  if (href) {
    return (
      <Button href={href} variant={variant} className={className}>
        {buttonLabel}
      </Button>
    );
  }

  if (!isLive) {
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          variant={variant}
          className={className}
        >
          {buttonLabel}
        </Button>
        <WaitlistModal
          property={property}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant={variant}
        className={className}
      >
        {buttonLabel}
      </Button>
      <BookingFlowModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultPropertySlug={property.slug}
      />
    </>
  );
}
