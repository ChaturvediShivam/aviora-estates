"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { business } from "@/lib/config";

const nav = [
  { label: "Home", href: "/" },
  { label: "The Villa", href: "/properties/noida-estate" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "bg-surface/95 backdrop-blur-xl border-b border-border-light/60 shadow-[0_4px_30px_rgba(21,21,21,0.06)] dark:bg-surface-dark/90 dark:border-border-dark/60"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link
          href="/"
          className="group relative flex h-8 md:h-9 items-center transition-opacity duration-300 hover:opacity-80"
        >
          <Logo
            className={cn(
              "transition-colors duration-500",
              scrolled || open
                ? "text-text-heading dark:text-text-inverse"
                : "text-text-inverse"
            )}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium tracking-wide transition-colors duration-300 py-2",
                scrolled
                  ? "text-muted hover:text-primary dark:text-muted-inverse dark:hover:text-text-inverse"
                  : "text-text-inverse/90 hover:text-text-inverse"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link
            href={`https://wa.me/${business.whatsapp.number.replace(/\D/g, "")}?text=${encodeURIComponent(
              business.whatsapp.message
            )}`}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "rounded-full px-6 py-2.5 text-sm font-medium transition-colors duration-300",
              scrolled
                ? "bg-primary text-text-inverse hover:bg-primary-hover"
                : "bg-text-inverse text-text-heading hover:bg-surface-elevated"
            )}
          >
            Submit Stay Request
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "p-2 transition-colors",
              scrolled ? "text-text dark:text-text-inverse" : "text-text-inverse"
            )}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden absolute inset-x-0 top-20 overflow-hidden bg-surface/95 backdrop-blur-xl dark:bg-surface-dark/95 border-b border-border-light dark:border-border-dark transition-all duration-500",
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col px-6 py-6 gap-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-lg font-serif text-text dark:text-text-inverse hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={`https://wa.me/${business.whatsapp.number.replace(/\D/g, "")}?text=${encodeURIComponent(
              business.whatsapp.message
            )}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-text-inverse"
          >
            Submit Stay Request
          </Link>
        </nav>
      </div>
    </header>
  );
}
