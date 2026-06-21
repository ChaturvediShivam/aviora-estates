"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { TrustBadge } from "@/components/TrustBadge";
import { BookingFlowModal } from "@/components/BookingFlowModal";
import { business } from "@/lib/config";
import { useRef, useState } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.82]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="absolute inset-[-4%] will-change-transform"
          >
            <Image
              src="/images/hero/villa-front-day.png"
              alt={`${business.name} private villa exterior with cobalt blue doors, whitewashed walls, and manicured tropical gardens`}
              fill
              priority
              sizes="100vw"
              className="object-cover animate-scale-in"
            />
          </motion.div>
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-secondary/25 to-secondary/80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/30 via-transparent to-secondary/30" />
        </div>

        <motion.div
          style={{ y: textY }}
          className="relative z-10 mx-auto max-w-5xl px-6 text-center text-text-inverse pt-20 md:pt-24"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block text-xs font-semibold uppercase tracking-lux text-text-inverse/90 mb-5 drop-shadow"
          >
            Private Estate Collection
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.08] tracking-tight text-balance text-shadow"
          >
            Design-led private stays,
            <br />
            <span className="italic text-surface-elevated">made for slower living.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base md:text-lg lg:text-xl text-text-inverse/95 leading-relaxed drop-shadow"
          >
            A curated collection of intimate luxury villas built for stillness,
            celebration, and meaningful escape across India.
          </motion.p>

          <div className="mt-12 md:mt-16">
            <TrustBadge />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-inverse/80"
        >
          <a
            href="#intro"
            className="flex flex-col items-center gap-2 text-xs uppercase tracking-lux hover:text-text-inverse transition-colors drop-shadow"
          >
            Discover
            <ChevronDown size={18} className="animate-bounce" />
          </a>
        </motion.div>
      </section>

      <BookingFlowModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultPropertySlug="noida-estate" />
    </>
  );
}
