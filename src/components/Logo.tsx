"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 180 48"
      fill="currentColor"
      className={cn("block h-full w-auto", className)}
      aria-label="Aviora"
      role="img"
    >
      <text
        x="0"
        y="38"
        fontFamily="var(--font-script), 'Brush Script MT', cursive"
        fontSize="42"
        fontWeight="400"
        fill="currentColor"
      >
        Aviora
      </text>
    </svg>
  );
}
