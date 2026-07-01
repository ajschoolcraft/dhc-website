# Digital Health Counsel — DHC26 Website

The official website for [Digital Health Counsel](https://digitalhealthcounsel.com) and the DHC26 AI Summit (December 2–3, 2026, Bell Harbor Conference Center, Seattle).

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL + Auth)
- **Payments:** Stripe Checkout
- **Email:** Resend with React Email templates
- **Hosting:** Vercel

## Features

- Public marketing pages (homepage, summit, past events, sponsorship, contact)
- 30+ field curated application form with 6 sections
- Admin dashboard with 12 review statuses
- Application approval workflow (complimentary, reduced-fee, paid)
- Stripe checkout for paid registrations
- Automated emails (application confirmation, admin notification, approval, payment confirmation)
- Supabase Auth for admin access

## Getting Started

```bash
npm install
cp .env.local.example .env.local  # Add your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

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
| `NEXT_PUBLIC_APP_URL` | Site URL (used for email links) |

## Project Structure

```
src/
├── app/
│   ├── (admin)/admin/     # Admin dashboard pages
│   ├── (public)/          # Public marketing pages
│   ├── admin/             # Admin login (outside admin layout)
│   └── api/               # API routes (applications, webhooks, etc.)
├── components/
│   ├── admin/             # Admin UI components
│   ├── forms/             # Application & contact forms
│   ├── marketing/         # Header, footer, hero
│   └── ui/                # Shared UI primitives
├── lib/
│   ├── email/             # Resend client & email templates
│   ├── stripe/            # Stripe client & checkout
│   └── supabase/          # Supabase clients (browser, server, admin)
└── types/                 # TypeScript types & constants
```

## Database Migrations

Migrations are in `supabase/migrations/`. Run them in the Supabase SQL Editor:

1. `001_initial_schema.sql` — Base tables (applications, pricing_tiers, contact_submissions)
2. `002_phase1_expansion.sql` — Expanded application fields, 12 statuses, sponsorship support
