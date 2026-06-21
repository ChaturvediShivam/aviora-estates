"use client";

import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { policies } from "@/lib/config";
import { FileCheck, IdCard, Wallet, Banknote, ClipboardCheck } from "lucide-react";

const icons = [FileCheck, IdCard, Wallet, Banknote, ClipboardCheck];

export function BookingPolicy() {
  return (
    <section className="section-padding bg-stone-soft dark:bg-stone-soft-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-12 md:mb-16">
          <SectionLabel className="mb-4">Booking Policy</SectionLabel>
          <SectionHeading size="lg">
            A private reservation, personally approved.
          </SectionHeading>
          <p className="mt-5 text-base md:text-lg text-muted dark:text-muted-inverse">
            Every stay is owner-reviewed. We keep the process transparent, secure,
            and intentionally human.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {policies.bookingPolicy.map((item, index) => {
            const Icon = icons[index] || FileCheck;
            return (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="group h-full card-luxury p-6">
                  <div className="mb-6 h-14 w-14 icon-circle-luxury">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-serif text-xl text-text-heading mb-3 dark:text-text-inverse">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted dark:text-muted-inverse">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
