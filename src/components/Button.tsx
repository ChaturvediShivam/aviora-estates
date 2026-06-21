"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  external?: boolean;
  variant?: "primary" | "outline" | "ghost";
  children: React.ReactNode;
}

export function Button({
  href,
  external,
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300";

  const variants = {
    primary:
      "bg-primary text-text-inverse hover:bg-primary-hover hover:shadow-lg hover:-translate-y-0.5 dark:bg-primary dark:text-text-inverse dark:hover:bg-primary-hover",
    outline:
      "border border-accent text-primary hover:bg-primary hover:text-text-inverse hover:border-primary dark:border-border-dark dark:text-text-inverse dark:hover:text-text-inverse dark:hover:border-primary",
    ghost: "text-primary hover:bg-primary/5 dark:text-text-inverse dark:hover:bg-primary/15",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
