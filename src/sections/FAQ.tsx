"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Container } from "@/components/Container";
import { SectionLabel } from "@/components/SectionLabel";
import { SectionHeading } from "@/components/SectionHeading";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How do I confirm my booking?",
    answer:
      "Submit a stay request through the website or WhatsApp. The owner reviews availability and pricing, then shares payment details. Your booking is confirmed only after owner approval and full payment.",
  },
  {
    question: "Is the security deposit refundable?",
    answer:
      "Yes. The security deposit is fully refunded within 24–48 hours after check-out, subject to a brief property inspection and no damage or missing inventory.",
  },
  {
    question: "Are pets allowed?",
    answer:
      "Pets are welcome with prior notice. A small hygiene deposit may apply to help us keep the interiors pristine for every guest.",
  },
  {
    question: "What ID is required?",
    answer:
      "All adult guests must submit a valid government-issued photo ID before check-in. This is a private estate, and verification helps us maintain a safe, accountable stay.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellations made at least 1 day before check-in are eligible for a full refund. Cancellations within 1 day of check-in receive a partial refund based on the timeline.",
  },
  {
    question: "Is outside food allowed?",
    answer:
      "Yes. The villa has a fully functional kitchen, outdoor dining area, and BBQ setup. Outside food and private catering are welcome; we only ask that you dispose of waste properly.",
  },
];

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border-light dark:border-border-dark last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-lg md:text-xl text-text-heading dark:text-text-inverse pr-6">{question}</span>
        <span className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-light text-muted transition-colors dark:border-border-dark dark:text-muted-inverse">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted dark:text-muted-inverse leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-luxury-gradient dark:bg-luxury-gradient-dark">
      <Container className="max-w-3xl">
        <AnimatedSection className="text-center mb-14">
          <SectionLabel className="mb-5">Questions</SectionLabel>
          <SectionHeading size="lg" className="text-balance">
            Everything you need to know.
          </SectionHeading>
        </AnimatedSection>

        <AnimatedSection>
          <div className="rounded-3xl border border-border-light bg-surface-card p-6 md:p-10 dark:bg-surface-dark/60 dark:border-border-dark">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
