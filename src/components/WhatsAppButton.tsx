"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { business } from "@/lib/config";

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${business.whatsapp.number.replace(/\D/g, "")}?text=${encodeURIComponent(
        business.whatsapp.message
      )}`}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-20 left-8 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg hover:brightness-110 hover:scale-105 transition-all md:bottom-8"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={20} fill="currentColor" />
      <span className="hidden sm:inline pr-1">Chat with us</span>
    </motion.a>
  );
}
