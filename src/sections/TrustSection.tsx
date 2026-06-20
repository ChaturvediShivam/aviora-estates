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
    <section className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-16 md:mb-24">
          <SectionLabel className="mb-5">Why Trust Us</SectionLabel>
          <SectionHeading size="lg" className="dark:text-text-inverse">
            A stay built on trust, beauty, and care.
          </SectionHeading>
          <p className="mt-6 text-lg text-muted dark:text-muted-inverse">
            Every stay request is reviewed personally to preserve privacy, safety, and the quality of the Aviora experience.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {trustItems.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.1}>
              <div className="group flex gap-5 p-8 rounded-2xl border border-border-light bg-surface-card hover:border-border-accent hover:shadow-md transition-all duration-500 dark:bg-surface-dark/60 dark:border-border-dark">
                <div className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-text-inverse transition-colors duration-500">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-text-heading dark:text-text-inverse mb-2">
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
