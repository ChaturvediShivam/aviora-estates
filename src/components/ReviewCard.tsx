"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  quote: string;
  author: string;
  stay: string;
  rating: number;
  className?: string;
}

export function ReviewCard({
  quote,
  author,
  stay,
  rating,
  className,
}: ReviewCardProps) {
  return (
    <div
      className={cn(
        "h-full rounded-2xl border border-border-light bg-surface-card p-8 shadow-sm transition-all duration-500 hover:border-accent hover:shadow-md dark:bg-surface-dark/50 dark:border-border-dark",
        className
      )}
    >
      <div className="flex gap-1 text-success mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? "currentColor" : "none"}
            className={i < rating ? "" : "text-muted/30 dark:text-muted-inverse/30"}
          />
        ))}
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
