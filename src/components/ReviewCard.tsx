"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

import type { ReviewSource } from "@/lib/config";

interface ReviewCardProps {
  quote: string;
  author: string;
  stay: string;
  rating: number;
  source?: ReviewSource;
  className?: string;
}

function sourceBadge(source?: ReviewSource) {
  if (source === "airbnb") {
    return { label: "Airbnb", className: "bg-[#FF5A5F]/10 text-[#FF5A5F]" };
  }
  if (source === "google") {
    return { label: "Google", className: "bg-[#4285F4]/10 text-[#4285F4]" };
  }
  return { label: "Guest", className: "bg-primary/10 text-primary" };
}

export function ReviewCard({
  quote,
  author,
  stay,
  rating,
  source,
  className,
}: ReviewCardProps) {
  const badge = sourceBadge(source);

  return (
    <div
      className={cn(
        "h-full rounded-2xl border border-border-light bg-surface-card p-8 shadow-sm transition-all duration-500 hover:border-accent hover:shadow-md dark:bg-surface-dark/50 dark:border-border-dark",
        className
      )}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1 text-success">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < rating ? "currentColor" : "none"}
              className={i < rating ? "" : "text-muted/30 dark:text-muted-inverse/30"}
            />
          ))}
        </div>
        <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-lux", badge.className)}>
          {badge.label}
        </span>
      </div>
      <blockquote className="font-serif text-lg leading-relaxed text-text-heading dark:text-text-inverse mb-8">
        “{quote}”
      </blockquote>
      <div>
        <p className="font-medium text-text-heading dark:text-text-inverse">{author}</p>
        <p className="text-xs uppercase tracking-lux text-muted/70 dark:text-muted-inverse/70 mt-1">
          {stay}
        </p>
      </div>
    </div>
  );
}
