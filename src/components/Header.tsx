"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-surface/95 backdrop-blur-md shadow-sm dark:bg-surface-dark/90"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-primary/20">
            <Image
              src={business.logo}
              alt={business.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <span className="font-serif text-xl font-medium text-text-heading dark:text-text-inverse">
            {business.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium tracking-wide text-muted hover:text-primary transition-colors duration-300 py-2 dark:text-muted-inverse dark:hover:text-text-inverse"
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
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-text-inverse hover:bg-primary-hover transition-colors duration-300"
          >
            Submit Stay Request
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-text dark:text-text-inverse"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden absolute inset-x-0 top-20 overflow-hidden bg-surface dark:bg-surface-dark border-b border-border-light dark:border-border-dark transition-all duration-500",
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
