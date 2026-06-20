"use client";

import { BadgeCheck, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: BadgeCheck, label: "Verified Property" },
  { icon: ShieldCheck, label: "Secure Booking" },
  { icon: Star, label: "Curated Guest Experience" },
];

export function TrustBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:gap-4"
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 rounded-full border border-border-dark bg-text-inverse/15 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-lux text-text-inverse backdrop-blur-sm shadow-sm whitespace-nowrap"
        >
          <item.icon size={13} strokeWidth={2.5} className="shrink-0" />
          <span className="truncate">{item.label}</span>
        </div>
      ))}
    </motion.div>
  );
}
