import { Hero } from "@/sections/Hero";
import { BrandIntro } from "@/sections/BrandIntro";
import { FeaturedProperty } from "@/sections/FeaturedProperty";
import { BookingPolicy } from "@/sections/BookingPolicy";
import { HouseRules } from "@/sections/HouseRules";
import { WhyAviora } from "@/sections/WhyAviora";
import { StayCategories } from "@/sections/StayCategories";
import { TrustSection } from "@/sections/TrustSection";
import { BookingProcess } from "@/sections/BookingProcess";
import { Expansion } from "@/sections/Expansion";
import { BookingCTA } from "@/components/BookingCTA";
import { CTA } from "@/sections/CTA";
import { business } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: business.url,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <FeaturedProperty />
      <BookingPolicy />
      <HouseRules />
      <BookingCTA variant="dark" />
      <WhyAviora />
      <StayCategories />
      <TrustSection />
      <BookingProcess />
      <Expansion />
      <CTA />
    </>
  );
}
