"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: "square" | "portrait" | "landscape" | "video" | "auto";
  priority?: boolean;
  label?: string;
  loading?: "eager" | "lazy";
}

const aspectClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  video: "aspect-video",
  auto: "",
};

export function ImageCard({
  src,
  alt,
  className,
  aspect = "video",
  priority,
  label,
  loading = "lazy",
}: ImageCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-text/5 dark:bg-text-inverse/5",
        aspectClasses[aspect],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : loading}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {label && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/70 via-secondary/30 to-transparent p-5 md:p-6">
          <p className="font-serif text-lg text-text-inverse">{label}</p>
        </div>
      )}
    </motion.div>
  );
}
