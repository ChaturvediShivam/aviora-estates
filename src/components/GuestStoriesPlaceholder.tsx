"use client";

import { MessageCircle, ExternalLink } from "lucide-react";
import { business } from "@/lib/config";

export function GuestStoriesPlaceholder() {
  return (
    <div className="rounded-3xl border border-border-light bg-surface-card p-10 md:p-14 text-center dark:bg-surface-dark/50 dark:border-border-dark">
      <h3 className="font-serif text-2xl md:text-3xl text-text-heading dark:text-text-inverse mb-4">
        Guest Stories
      </h3>
      <p className="mx-auto max-w-xl text-muted dark:text-muted-inverse leading-relaxed">
        Real guest experiences will be featured here as we welcome our first stays.
      </p>
      {business.airbnb && (
        <a
          href={business.airbnb}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border-light px-6 py-3 text-sm font-medium text-text-heading hover:border-accent hover:text-primary transition-colors dark:border-border-dark dark:text-text-inverse"
        >
          <MessageCircle size={16} />
          Read reviews on Airbnb
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}
