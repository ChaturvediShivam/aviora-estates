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
    <section className="section-padding bg-surface-elevated dark:bg-surface-dark">
      <Container>
        <AnimatedSection className="max-w-3xl mb-16 md:mb-24">
          <SectionLabel className="mb-5">Booking Policy</SectionLabel>
          <SectionHeading size="lg">
            A private reservation, personally approved.
          </SectionHeading>
          <p className="mt-6 text-lg text-muted dark:text-muted-inverse">
            Every stay is owner-reviewed. We keep the process transparent, secure,
            and intentionally human.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.bookingPolicy.map((item, index) => {
            const Icon = icons[index] || FileCheck;
            return (
              <AnimatedSection key={item.title} delay={index * 0.1}>
                <div className="group h-full p-8 rounded-2xl border border-border-light bg-surface-card hover:border-border-accent transition-all duration-500 dark:bg-surface-dark/60 dark:border-border-dark">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-text-inverse transition-colors duration-500">
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
