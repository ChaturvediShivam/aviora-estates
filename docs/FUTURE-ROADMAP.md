# Aviora Estates — Future Roadmap (Phase 2)

The following systems are intentionally deferred for post-launch development. They are **not** required for the initial production release.

## Phase 2 — Deferred Systems

### Live iCal Integration
- Connect real property iCal URLs to `icalUrl` in `src/lib/config.ts`.
- Enable automatic availability blocking in the booking calendar.
- Add sync frequency and error handling.

### CRM / Database Persistence
- Store booking requests, inquiries, and waitlist signups in a database.
- Replace WhatsApp-as-primary-handoff with a structured lead pipeline.

### Booking Dashboard (Owner)
- Build a protected owner dashboard to review, approve, and decline requests.
- Add calendar view, guest details, and status management.

### Secure ID Upload System
- Implement encrypted guest ID collection before check-in.
- Ensure GDPR/privacy compliance and secure storage.

### Payment Gateway Integration
- Add UPI / card payment flow for security deposit and full booking amount.
- Connect to a payment provider (Razorpay, Stripe, etc.).

### Email Automation
- Send confirmation, reminder, and post-stay emails to guests.
- Send owner notifications for new requests and approvals.

### Analytics Tracking
- Add privacy-conscious analytics (Plausible, Fathom, or Google Analytics 4).
- Track key conversion events: booking request, inquiry, waitlist join.

### Review System
- Collect verified guest reviews after checkout.
- Display real reviews in place of the current placeholder.

### Booking Status Tracker
- Allow guests to view request status (pending, approved, confirmed, cancelled).
- Provide a shareable booking reference page.

## Notes

- All Phase 2 work should preserve the existing luxury visual language.
- No routing changes should be made without updating the sitemap and redirects.
- Maintain the owner-managed, trust-first tone in all guest-facing copy.
