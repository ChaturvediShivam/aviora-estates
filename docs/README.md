# Aviora Estates

A design-led, owner-managed luxury villa rental website built for slow living and private stays.

## Project Overview

Aviora Estates is a static Next.js website that presents the Noida estate, explains the booking process, and routes guest inquiries through WhatsApp. Every stay request is owner-reviewed; the site intentionally does not process payments or store guest data on a backend.

## Stack

- **Framework:** Next.js 15.1.6 (App Router, static generation)
- **Language:** TypeScript 5.7 (strict mode)
- **Styling:** Tailwind CSS 3.4.17 + custom brand tokens
- **UI / Motion:** React 19, Framer Motion, Lucide React icons
- **Calendar:** react-day-picker v10 (client-side range selection)
- **iCal parsing:** ical.js (deferred, currently inactive)
- **Theme:** next-themes with class-based dark mode

## Project Structure

```
/
├── docs/              # Handover documentation
├── assets/            # Brand assets for client use
│   ├── logos/
│   └── photos/
├── public/            # Static images and brand assets
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable UI components
│   ├── lib/           # Config, utils, iCal helpers
│   └── sections/      # Page section components
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Current Live Features

- Responsive multi-page marketing site
- Property detail page with gallery, amenities, pricing, and nearby locations
- WhatsApp-based booking request flow with date range picker and guest count
- Inquiry form on the contact page
- Waitlist modal for coming-soon properties
- Dark mode support
- SEO metadata, sitemap.xml, robots.txt, and structured data
- Trust-first copy: owner review explanation, refund policy, ID verification, and security deposit notes

## Deferred Phase 2 Roadmap

See [FUTURE-ROADMAP.md](./FUTURE-ROADMAP.md) for planned post-launch systems.

## Contact Points

- **Website:** https://avioraestates.com
- **Email:** info@avioraestates.com
- **Phone / WhatsApp:** +91 62059 90268
- **Instagram:** https://www.instagram.com/aviora.estates
