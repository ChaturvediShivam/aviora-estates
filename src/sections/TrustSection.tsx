"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { ShieldCheck, IdCard, UserCheck, Lock } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Pre-arrival verified property",
    description:
      "Every listing detail, amenity, and house rule is personally verified before your arrival, so what you see is exactly what you experience.",
  },
  {
    icon: IdCard,
    title: "Secure guest onboarding",
    description:
      "Government-issued ID collection and a refundable security deposit keep every stay accountable, safe, and private by design.",
  },
  {
    icon: UserCheck,
    title: "Owner-managed reservations",
    description:
      "Every request is reviewed and approved directly by the owner. No algorithms, no third-party handoffs — only personal discretion.",
  },
  {
    icon: Lock,
    title: "Privacy-first stay experience",
    description:
      "The entire estate is exclusively yours. No shared spaces, no interruptions — just complete discretion for you and your guests.",
  },
];

export function TrustSection() {
  return (
    <section className="section-padding bg-stone-soft dark:bg-stone-soft-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
          <SectionLabel className="mb-4">Why Trust Us</SectionLabel>
          <SectionHeading size="lg" className="dark:text-text-inverse">
            A stay built on trust, beauty, and care.
          </SectionHeading>
          <p className="mt-5 text-base md:text-lg text-muted dark:text-muted-inverse">
            Every stay request is reviewed personally to preserve privacy, safety, and the quality of the Aviora experience.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-5">
          {trustItems.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.1}>
              <div className="group flex items-center gap-5 h-full card-luxury p-6">
                <div className="shrink-0 h-12 w-12 icon-circle-luxury">
                  <item.icon size={22} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-xl text-text-heading dark:text-text-inverse mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted dark:text-muted-inverse">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
