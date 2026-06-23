# DHC Website — Design Spec

## Overview

Professional website for Digital Health Council (DHC) / Digital Health Group, LLC — a company at the intersection of law, healthcare, and AI. The site showcases past summit events, promotes the 2026 DHC Summit, and provides an end-to-end application-to-payment workflow for summit attendance.

**Tech stack:** Next.js 15 (App Router, TypeScript, Tailwind CSS), Supabase (database + auth), Resend (transactional email), Stripe (payments), Vercel (hosting).

**Company name:** TBD — founder needs to confirm whether the brand is "Digital Health Council" or "Digital Health Group."

## Architecture

Feature-grouped Next.js App Router structure using route groups for layout separation:

- `(public)` route group — marketing pages with shared header/footer
- `(admin)` route group — admin dashboard with sidebar layout, protected by middleware
- `api/` — server-side API routes for form submissions, application management, webhooks

All third-party integrations (Supabase, Stripe, Resend) are isolated in `lib/` with thin wrapper modules.

## Pages

### Public Pages

| Route | Purpose |
|---|---|
| `/` | Homepage: hero, mission, what DHC does, past event highlights, CTA to 2026 summit |
| `/events` | Past events listing (cards linking to individual events) |
| `/events/[slug]` | Individual event page (speakers, photos, summary) — static pages, 1-3 events |
| `/summit-2026` | 2026 Summit landing page with event details and application form |
| `/contact` | General contact/inquiry form |

### Admin Pages

| Route | Purpose |
|---|---|
| `/admin` | Login page (redirects to dashboard if authenticated) |
| `/admin/dashboard` | Overview: application counts by status, recent submissions |
| `/admin/applications` | Filterable/searchable table of all applications with approve/decline actions |
| `/admin/applications/[id]` | Detail view for a single application |
| `/admin/pricing` | Manage pricing tiers (add, edit, deactivate) |
| `/admin/contact` | View contact form submissions, mark as read |

## Database Schema (Supabase)

### `applications`

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | Default gen_random_uuid() |
| created_at | timestamptz | Default now() |
| first_name | text | Not null |
| last_name | text | Not null |
| email | text | Not null |
| organization | text | Not null |
| title | text | Job title |
| attendee_type | text | e.g., "provider", "vendor", "investor" — drives pricing tier |
| reason | text | Why they want to attend |
| status | text | `pending` / `approved` / `declined` / `paid`. Default `pending` |
| pricing_tier_id | uuid (FK → pricing_tiers.id) | Set by admin on approval |
| stripe_payment_link | text | Checkout session URL, generated on approval |
| stripe_session_id | text | Set after payment via webhook |
| reviewed_at | timestamptz | Set when admin approves/declines |
| paid_at | timestamptz | Set when payment confirmed |

### `pricing_tiers`

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | Default gen_random_uuid() |
| name | text | e.g., "Healthcare Provider", "Industry Vendor" |
| price_cents | integer | Price in cents |
| description | text | |
| active | boolean | Default true. Soft disable without deleting |

### `contact_submissions`

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | Default gen_random_uuid() |
| created_at | timestamptz | Default now() |
| name | text | Not null |
| email | text | Not null |
| message | text | Not null |
| read | boolean | Default false |

### Row Level Security

- **Public (anon):** Can INSERT into `applications` and `contact_submissions`. No read/update/delete.
- **Authenticated (admin):** Full read/update on `applications`, `pricing_tiers`, `contact_submissions`. Insert/update on `pricing_tiers`.

### Auth

Supabase Auth with email/password. Single admin user (the founder). Admin role checked via Supabase user metadata (`role: "admin"` set on the user). No separate admin_users table needed for a single user — if multiple admins are needed later, we can add one. Middleware at `middleware.ts` protects all `/admin/*` routes by verifying a valid Supabase session.

## API Routes

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/api/applications` | POST | Public | Submit new application |
| `/api/applications` | GET | Admin | List applications with status/search filters |
| `/api/applications/[id]` | PATCH | Admin | Approve or decline an application |
| `/api/webhooks/stripe` | POST | Stripe signature | Handle payment events |
| `/api/contact` | POST | Public | Submit contact form |

## Application Flow

1. Visitor fills out application on `/summit-2026` → `POST /api/applications` → row inserted with status `pending`
2. Founder logs into `/admin` → sees pending applications on dashboard and applications list
3. Founder selects a pricing tier and clicks "Approve" → `PATCH /api/applications/[id]`:
   - Status set to `approved`
   - Stripe Checkout Session created via API with price from selected tier, applicant email pre-filled, `metadata.application_id` attached
   - Approval email sent via Resend with checkout URL
4. Or founder clicks "Decline" → status set to `declined` (decline email can be added later)
5. Applicant clicks payment link in email → Stripe-hosted checkout page
6. Stripe fires `checkout.session.completed` webhook → `POST /api/webhooks/stripe`:
   - Verifies Stripe signature
   - Reads `metadata.application_id` to find the application
   - Updates status to `paid`, sets `stripe_session_id` and `paid_at`
   - Sends payment confirmation email via Resend

## Stripe Integration

- **Checkout Sessions** created dynamically via Stripe API on each approval — no pre-configured Products or Prices in the Stripe dashboard
- Price amount sourced from `pricing_tiers` table
- Each session includes `metadata.application_id` for webhook matching
- Success URL → `/summit-2026?payment=success` (shows confirmation message on the summit page)
- Cancel URL → `/summit-2026?payment=cancelled` (returns to the summit page)
- Webhook endpoint verifies Stripe signature before processing

## Email (Resend)

Templates built as React components using `@react-email/components`, stored in `src/lib/email/templates/`.

**Launch emails:**

| Email | Trigger |
|---|---|
| Approval + Payment Link | Admin approves application |
| Payment Confirmed | Stripe webhook `checkout.session.completed` |

**Ready to add later:**

| Email | Trigger |
|---|---|
| Application Received | On form submission |
| Application Declined | Admin declines application |

All emails sent through `src/lib/email/send.ts` — thin wrapper around the Resend client. Adding a new email type = create a template + call `send()`.

## Folder Structure

```
src/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # /
│   │   ├── events/
│   │   │   ├── page.tsx                # /events
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # /events/[slug]
│   │   ├── summit-2026/
│   │   │   └── page.tsx                # /summit-2026
│   │   └── contact/
│   │       └── page.tsx                # /contact
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   └── admin/
│   │       ├── page.tsx                # /admin (login)
│   │       ├── dashboard/
│   │       │   └── page.tsx            # /admin/dashboard
│   │       ├── applications/
│   │       │   ├── page.tsx            # /admin/applications
│   │       │   └── [id]/
│   │       │       └── page.tsx        # /admin/applications/[id]
│   │       ├── pricing/
│   │       │   └── page.tsx            # /admin/pricing
│   │       └── contact/
│   │           └── page.tsx            # /admin/contact
│   ├── api/
│   │   ├── applications/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── contact/
│   │   │   └── route.ts
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts
│   ├── layout.tsx
│   ├── globals.css
│   └── favicon.ico
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── table.tsx
│   │   └── modal.tsx
│   ├── marketing/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   └── event-card.tsx
│   ├── admin/
│   │   ├── sidebar.tsx
│   │   ├── admin-header.tsx
│   │   ├── application-table.tsx
│   │   └── tier-selector.tsx
│   └── forms/
│       ├── application-form.tsx
│       └── contact-form.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── admin.ts
│   │   └── types.ts
│   ├── stripe/
│   │   ├── client.ts
│   │   └── checkout.ts
│   ├── email/
│   │   ├── send.ts
│   │   └── templates/
│   │       ├── approval.tsx
│   │       └── payment-confirmed.tsx
│   └── utils.ts
└── types/
    └── index.ts
```

**Root-level files:**

```
dhc-website/
├── .env.local              # API keys (not committed)
├── .env.example            # Template for env vars
├── middleware.ts            # Protect /admin routes
├── next.config.ts
├── tsconfig.json
├── package.json
└── public/
    ├── images/             # Event photos, speaker headshots
    └── logo.svg            # When provided
```

## Design Notes

- Light mode only (no dark mode)
- Tone: professional, authoritative, modern — healthcare/legal/tech audience
- Logo, color palette, and brand guidelines pending from founder
- Past events are static pages (1-3 events), not database-driven

## Open Items (Requires Founder Input)

1. Official company/brand name (DHC vs DHG)
2. Logo + color palette
3. Application form fields (current schema is a reasonable default)
4. Pricing tier names and amounts
5. Past event content (speakers, photos, summaries)
6. 2026 Summit details (date, location, description)
7. Email sending domain
8. Supabase project + Stripe account + Vercel account setup
9. Privacy policy and terms of service
