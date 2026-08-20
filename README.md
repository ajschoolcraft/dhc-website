# Digital Health Counsel — DHC26 Website

The official website for [Digital Health Counsel](https://digitalhealthcounsel.com) and the DHC26 AI Summit (December 2–3, 2026, Bell Harbor Conference Center, Seattle).

Built as a full-stack production application handling public marketing, a curated application pipeline, payment processing, and admin operations — all deployed on Vercel.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL + Auth + Row-Level Security)
- **Payments:** Stripe Checkout
- **Email:** Resend with React Email templates
- **Hosting:** Vercel

## Features

### Public Pages
- Homepage with event overview and sponsor showcase
- Summit 2026 details page
- About page with founder bio and contact CTA
- Sponsorship page with inquiry form and past sponsor history
- Contact form with email notifications
- Past event archive (DHC 2023, DHC 2024, Microsoft Workshop 2025) with full agendas and speaker photos

### Application Pipeline
- 30+ field curated application form across 6 sections
- Automated confirmation emails to applicants
- Admin notification emails on new submissions
- 12-status review workflow (new → under review → approved → registered, etc.)
- Three approval tracks: complimentary, reduced-fee, and paid
- Stripe Checkout integration for paid registrations
- Payment confirmation emails with receipt details

### Admin Dashboard
- Supabase Auth–protected admin area
- Application review with status management and notes
- Attendee list with registration tracking
- Contact submission inbox
- Pricing tier management

### Email System
- 5 transactional email templates built with React Email
- Application received confirmation
- Admin notification (new applications + sponsor inquiries)
- Approval notification with next-steps
- Payment confirmation

## Getting Started

```bash
npm install
cp .env.local.example .env.local  # Add your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See [`.env.local.example`](.env.local.example) for the full list with descriptions.

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `RESEND_API_KEY` | Resend API key |
| `EMAIL_FROM` | Sender email address |
| `ADMIN_EMAIL` | Admin notification recipient |
| `NEXT_PUBLIC_APP_URL` | Site URL (used in email links) |

## Project Structure

```
src/
├── app/
│   ├── (admin)/admin/          # Admin dashboard (auth-protected)
│   │   ├── applications/       # Application list + detail review
│   │   ├── attendees/          # Registered attendee list
│   │   ├── contact/            # Contact submission inbox
│   │   ├── dashboard/          # Admin overview
│   │   └── pricing/            # Pricing tier management
│   ├── (public)/               # Public marketing pages
│   │   ├── about/              # Founder bio & contact
│   │   ├── apply/              # Curated application form
│   │   ├── contact/            # Contact form
│   │   ├── events/             # Past event archive
│   │   ├── sponsorship/        # Sponsorship info & inquiry form
│   │   └── summit-2026/        # DHC26 summit details
│   ├── admin/                  # Admin login (outside auth layout)
│   └── api/
│       ├── admin/              # Admin data endpoints
│       ├── applications/       # Application submission + management
│       ├── contact/            # Contact form handler
│       ├── sponsor-inquiries/  # Sponsor inquiry handler
│       └── webhooks/           # Stripe webhook receiver
├── components/
│   ├── admin/                  # Dashboard UI (tables, sidebar, header)
│   ├── forms/                  # Application, contact, sponsor inquiry forms
│   ├── marketing/              # Header, footer, hero, event & attendee cards
│   └── ui/                     # Shared primitives (button, card, input, modal, table, badge)
├── lib/
│   ├── email/                  # Resend client + 5 React Email templates
│   ├── stripe/                 # Stripe client & checkout session creation
│   ├── supabase/               # Supabase clients (browser, server, admin)
│   └── utils.ts                # Shared utilities
└── types/                      # TypeScript types & constants
```

## Database

Migrations are in `supabase/migrations/`:

| Migration | Description |
|-----------|-------------|
| `001_initial_schema.sql` | Base tables (applications, pricing_tiers, contact_submissions) |
| `002_phase1_expansion.sql` | Expanded application fields, 12 statuses, sponsorship support |
| `003_attendee_list.sql` | Attendee tracking and registration management |
