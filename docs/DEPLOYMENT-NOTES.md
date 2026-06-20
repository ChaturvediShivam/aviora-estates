# Aviora Estates — Deployment Notes

## Recommended Platform

**Vercel** is the recommended host because the project is built on Next.js 15 and uses static site generation.

## Deployment Steps

1. Push the repository to GitHub.
2. Import the repository in the Vercel dashboard.
3. Use the default framework preset (Next.js).
4. Set the root directory to the project root (the folder containing `package.json`).
5. Do not add any environment variables unless Phase 2 features are implemented.
6. Deploy.

## Domain Connection

1. In Vercel, go to **Project Settings → Domains**.
2. Add the production domain (`avioraestates.com` or the desired domain).
3. Update DNS records at the domain registrar:
   - For apex domain: add an `A` record pointing to Vercel’s load balancer.
   - For `www`: add a `CNAME` record pointing to `cname.vercel-dns.com`.
4. Wait for DNS propagation and SSL issuance.

## SSL Setup

SSL is handled automatically by Vercel once the domain is connected and verified. No manual certificate installation is required.

## Environment Setup

This project does not require environment variables for the current Phase 1 launch. All business data lives in `src/lib/config.ts`.

If Phase 2 features are added, create:

```bash
.env.local
```

and add the required keys there. Never commit `.env.local` to the repository.

## Post-Deployment Checklist

- [ ] Production build passes locally (`npm run build`).
- [ ] All routes return 200 on the deployed domain.
- [ ] `/robots.txt` and `/sitemap.xml` are accessible.
- [ ] WhatsApp links route to the correct number and message.
- [ ] Dark mode toggle works across pages.
- [ ] Mobile sticky CTA does not overlap floating WhatsApp button.
- [ ] Images load without 404s.
- [ ] Favicon is present and rendered.
- [ ] Domain and SSL are verified in Vercel.
