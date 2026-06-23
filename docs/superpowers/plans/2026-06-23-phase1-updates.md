# Phase 1: DHC Website Updates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the DHC website to match the founder's build spec — rebrand to "Digital Health Counsel," new color theme (navy-indigo + magenta), expanded application form with 30+ fields, 12 review statuses, real content on all pages, new Apply and Sponsorship pages, and application confirmation + admin notification emails.

**Architecture:** Modify existing Next.js 16 App Router site. New DB migration expands the applications table and contact_submissions. Application form becomes a multi-section form with checkboxes, multi-selects, and short-answer fields. Mixed dark/light theme — dark header/footer/hero with light content areas.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Supabase, Stripe, Resend

---

## File Structure

**Create:**
- `supabase/migrations/002_phase1_expansion.sql` — schema expansion
- `src/app/(public)/apply/page.tsx` — dedicated apply page
- `src/app/(public)/sponsorship/page.tsx` — sponsorship page
- `src/components/forms/sponsor-inquiry-form.tsx` — sponsor inquiry form
- `src/lib/email/templates/application-received.tsx` — confirmation to applicant
- `src/lib/email/templates/admin-notification.tsx` — notification to admin
- `src/app/api/sponsor-inquiries/route.ts` — sponsor inquiry API

**Modify:**
- `src/app/globals.css` — new color palette
- `src/app/layout.tsx` — rebrand metadata
- `src/types/index.ts` — expanded types + new statuses
- `src/components/ui/button.tsx` — primary variant uses accent color
- `src/components/ui/badge.tsx` — expanded status variants
- `src/components/marketing/header.tsx` — rebrand + expanded nav + mobile menu
- `src/components/marketing/footer.tsx` — rebrand + new nav links
- `src/components/marketing/hero.tsx` — DHC26 content
- `src/app/(public)/page.tsx` — full homepage content
- `src/app/(public)/summit-2026/page.tsx` — real event details
- `src/app/(public)/events/page.tsx` — "Past Summits" with real content
- `src/app/(public)/events/[slug]/page.tsx` — expanded event data
- `src/app/(public)/contact/page.tsx` — add sponsorship link
- `src/components/forms/application-form.tsx` — complete rewrite (6 sections)
- `src/app/api/applications/route.ts` — expanded fields + emails
- `src/app/api/applications/[id]/route.ts` — expanded statuses
- `src/app/(admin)/admin/dashboard/page.tsx` — new status counts
- `src/app/(admin)/admin/applications/page.tsx` — new status filters
- `src/app/(admin)/admin/applications/[id]/page.tsx` — expanded fields + statuses
- `src/components/admin/application-table.tsx` — show role_category
- `src/lib/email/templates/approval.tsx` — rebrand + handle complimentary
- `src/lib/email/templates/payment-confirmed.tsx` — rebrand

---

## Task 1: Color Theme + Branding Foundation

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/ui/button.tsx`

- [ ] **Step 1: Rename logo file**

```bash
mv "public/images/DHC Logo.jpeg" public/images/dhc-logo.jpeg
```

- [ ] **Step 2: Update globals.css with new color palette**

Replace the full contents of `src/app/globals.css`:

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --color-primary: #1a1040;
  --color-primary-light: #2a1a5e;
  --color-primary-dark: #0f0a2e;
  --color-accent: #d6297b;
  --color-accent-light: #e8468f;
  --color-accent-dark: #b01e65;
  --color-surface: #f8f9fa;
  --color-surface-dark: #e9ecef;
  --color-text: #1a1a2e;
  --color-text-light: #6c757d;
  --color-border: #dee2e6;
}

body {
  color: var(--color-text);
  background: white;
}
```

- [ ] **Step 3: Update root layout metadata**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Digital Health Counsel",
    template: "%s | Digital Health Counsel",
  },
  description:
    "A convening platform for leaders working at the intersection of healthcare, technology, artificial intelligence, law, governance, privacy, data strategy, and innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Update Button primary variant to use accent color**

In `src/components/ui/button.tsx`, change the `variantStyles` object:

```ts
const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-white hover:bg-accent-light",
  secondary: "bg-surface text-text border border-border hover:bg-surface-dark",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "text-text-light hover:bg-surface",
};
```

Also update the focus ring from `focus-visible:ring-primary/50` to `focus-visible:ring-accent/50` in the base className.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: update color theme and rebrand to Digital Health Counsel"
```

---

## Task 2: Header + Footer Rebrand

**Files:**
- Modify: `src/components/marketing/header.tsx`
- Modify: `src/components/marketing/footer.tsx`

- [ ] **Step 1: Rewrite header with dark theme, expanded nav, and mobile menu**

Replace `src/components/marketing/header.tsx`:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { href: "/summit-2026", label: "DHC26" },
  { href: "/events", label: "Past Summits" },
  { href: "/apply", label: "Apply" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/dhc-logo.jpeg"
            alt="Digital Health Counsel"
            width={40}
            height={40}
            className="rounded"
          />
          <span className="text-lg font-bold tracking-tight">
            Digital Health Counsel
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white/80 hover:text-white"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <nav className="md:hidden border-t border-white/10 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Rewrite footer with dark theme and updated links**

Replace `src/components/marketing/footer.tsx`:

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Digital Health Counsel
            </h3>
            <p className="mt-2 text-sm text-white/60">
              A convening platform for leaders working at the intersection of
              healthcare, technology, AI, law, governance, privacy, data
              strategy, and innovation.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/summit-2026" className="text-sm text-white/60 hover:text-white">
                  DHC26
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-white/60 hover:text-white">
                  Past Summits
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-sm text-white/60 hover:text-white">
                  Apply
                </Link>
              </li>
              <li>
                <Link href="/sponsorship" className="text-sm text-white/60 hover:text-white">
                  Sponsorship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/60 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <span className="text-sm text-white/60">info@digitalhealthcounsel.com</span>
              </li>
              <li>
                <span className="text-sm text-white/60">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-white/60">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} Digital Health Counsel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/header.tsx src/components/marketing/footer.tsx
git commit -m "feat: rebrand header and footer with dark theme and expanded navigation"
```

---

## Task 3: Hero + Homepage Content

**Files:**
- Modify: `src/components/marketing/hero.tsx`
- Modify: `src/app/(public)/page.tsx`

- [ ] **Step 1: Rewrite hero with DHC26 content**

Replace `src/components/marketing/hero.tsx`:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          December 2–3, 2026 &middot; Bell Harbor Conference Center, Seattle
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Digital Health Counsel
        </h1>
        <p className="mt-4 text-xl font-medium text-accent-light sm:text-2xl">
          From Promise to Proof: The Legal Operating System for Healthcare AI
        </p>
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          The curated summit for the lawyers and leaders responsible for making
          healthcare AI provable, governable, contractable, and trustworthy.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/apply">
            <Button size="lg">Apply to Participate</Button>
          </Link>
          <Link href="/events">
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
              Explore Past Summits
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite homepage with all spec sections**

Replace `src/app/(public)/page.tsx`:

```tsx
import { Hero } from "@/components/marketing/hero";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const whyDhc26 = [
  { title: "AI Governance", description: "Frameworks for health system AI oversight, risk management, and institutional accountability." },
  { title: "Vendor Diligence & Contracting", description: "Practical approaches to evaluating, negotiating, and contracting with healthcare AI vendors." },
  { title: "Liability & Allocation", description: "Emerging liability frameworks and allocation of responsibility across the AI value chain." },
  { title: "Evidence of Value", description: "Standards for substantiating clinical and operational claims made by AI-enabled products." },
  { title: "FDA, SaMD & CDS", description: "Regulatory pathways for software as a medical device and clinical decision support." },
  { title: "Health Data Rights & Privacy", description: "Data rights, de-identification, secondary use, and privacy in the age of model training." },
  { title: "Consumer Health AI", description: "Legal and ethical challenges of consumer-facing AI, chatbots, and mental health tools." },
  { title: "AI for Legal Operations", description: "How healthcare legal teams are using AI to transform their own workflows and operations." },
];

const whoShouldApply = [
  "Health system GCs, AGCs, and in-house counsel",
  "Product counsel at digital health, health IT, AI, medtech, and life sciences companies",
  "Privacy, compliance, cybersecurity, and data governance leaders",
  "Legal operations leaders",
  "Outside counsel working deeply in healthcare AI, digital health, FDA, privacy, technology transactions, and risk management",
  "Regulators, academics, and policy leaders",
  "Selected technology, insurance, consulting, and legal tech leaders with substantive experience in the space",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-text">
          About Digital Health Counsel
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-text-light text-lg">
          Digital Health Counsel is a convening platform for leaders working at
          the intersection of healthcare, technology, artificial intelligence,
          law, governance, privacy, data strategy, and innovation.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-text-light">
          Healthcare AI has moved beyond the question of whether the technology
          is impressive. The next phase is about evidence, governance,
          contracting, liability allocation, data rights, product counsel,
          consumer-facing AI, legal operations, and institutional trust.
        </p>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-text">
            Why DHC26 Matters
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyDhc26.map((item) => (
              <Card key={item.title}>
                <CardContent>
                  <h3 className="font-semibold text-text">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-light">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-text">
          Who Should Apply
        </h2>
        <ul className="mx-auto mt-8 max-w-2xl space-y-3">
          {whoShouldApply.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
              <span className="text-text-light">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-text">
            Past Summit Highlights
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-text-light">
            Digital Health Counsel has grown into a serious recurring convening
            for healthcare AI, law, policy, technology, and governance leaders.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { name: "DHC 2023", desc: "Our inaugural summit convening healthcare AI and legal leaders." },
              { name: "DHC 2024", desc: "Expanded to include product counsel, privacy, and AI governance tracks." },
              { name: "DHC 2025", desc: "Our largest gathering with speakers from health systems, regulators, and AI companies." },
            ].map((event) => (
              <Card key={event.name}>
                <CardContent>
                  <h3 className="font-semibold text-text">{event.name}</h3>
                  <p className="mt-2 text-sm text-text-light">{event.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/events"
              className="text-sm font-medium text-accent hover:text-accent-dark"
            >
              View all past summits &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
          <h2 className="text-3xl font-bold">Apply to DHC26</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Applications are reviewed on a rolling basis. Accepted applicants
            will receive registration details after review.
          </p>
          <div className="mt-8">
            <Link
              href="/apply"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-medium text-white hover:bg-accent-light transition-colors"
            >
              Apply to Participate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/hero.tsx src/app/\(public\)/page.tsx
git commit -m "feat: rewrite hero and homepage with DHC26 content from founder spec"
```

---

## Task 4: Database Migration + Types Expansion

**Files:**
- Create: `supabase/migrations/002_phase1_expansion.sql`
- Modify: `src/types/index.ts`

- [ ] **Step 1: Create migration**

Create `supabase/migrations/002_phase1_expansion.sql`:

```sql
-- Expand applications table

-- New contact fields
ALTER TABLE applications ADD COLUMN phone text;
ALTER TABLE applications ADD COLUMN linkedin text;
ALTER TABLE applications ADD COLUMN city text;
ALTER TABLE applications ADD COLUMN state text;
ALTER TABLE applications ADD COLUMN country text;
ALTER TABLE applications ADD COLUMN organization_website text;

-- Application type (checkboxes)
ALTER TABLE applications ADD COLUMN application_types text[] NOT NULL DEFAULT '{}';

-- Rename attendee_type to role_category
ALTER TABLE applications RENAME COLUMN attendee_type TO role_category;

-- Topic interests (select up to 5)
ALTER TABLE applications ADD COLUMN topic_interests text[] NOT NULL DEFAULT '{}';

-- Short answer questions
ALTER TABLE applications ADD COLUMN current_role_description text;
ALTER TABLE applications ADD COLUMN questions_to_explore text;
ALTER TABLE applications ADD COLUMN practical_experience text;
ALTER TABLE applications ADD COLUMN speaker_topic_proposal text;

-- Registration preferences
ALTER TABLE applications ADD COLUMN registration_category text;
ALTER TABLE applications ADD COLUMN reduced_fee_interest boolean NOT NULL DEFAULT false;
ALTER TABLE applications ADD COLUMN consent_acknowledged boolean NOT NULL DEFAULT false;

-- Expand status values
ALTER TABLE applications DROP CONSTRAINT applications_status_check;

UPDATE applications SET status = 'new' WHERE status = 'pending';
UPDATE applications SET status = 'accepted_paid' WHERE status = 'approved';
UPDATE applications SET status = 'registered' WHERE status = 'paid';

ALTER TABLE applications ADD CONSTRAINT applications_status_check
  CHECK (status IN (
    'new', 'needs_review',
    'accepted_complimentary', 'accepted_reduced', 'accepted_paid',
    'speaker_consideration', 'sponsor_followup',
    'waitlist', 'declined', 'needs_more_info',
    'registered', 'withdrawn'
  ));

ALTER TABLE applications ALTER COLUMN status SET DEFAULT 'new';

-- Expand contact_submissions for sponsorship inquiries
ALTER TABLE contact_submissions ADD COLUMN type text NOT NULL DEFAULT 'general';
ALTER TABLE contact_submissions ADD COLUMN organization text;
ALTER TABLE contact_submissions ADD COLUMN phone text;
```

- [ ] **Step 2: Update types**

Replace `src/types/index.ts`:

```ts
export type ApplicationStatus =
  | "new"
  | "needs_review"
  | "accepted_complimentary"
  | "accepted_reduced"
  | "accepted_paid"
  | "speaker_consideration"
  | "sponsor_followup"
  | "waitlist"
  | "declined"
  | "needs_more_info"
  | "registered"
  | "withdrawn";

export type Application = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  organization: string;
  organization_website: string | null;
  title: string | null;
  linkedin: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  application_types: string[];
  role_category: string;
  topic_interests: string[];
  reason: string | null;
  current_role_description: string | null;
  questions_to_explore: string | null;
  practical_experience: string | null;
  speaker_topic_proposal: string | null;
  registration_category: string | null;
  reduced_fee_interest: boolean;
  consent_acknowledged: boolean;
  status: ApplicationStatus;
  pricing_tier_id: string | null;
  stripe_payment_link: string | null;
  stripe_session_id: string | null;
  reviewed_at: string | null;
  paid_at: string | null;
};

export type ApplicationFormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  organization: string;
  organization_website: string;
  title: string;
  linkedin: string;
  city: string;
  state: string;
  country: string;
  application_types: string[];
  role_category: string;
  topic_interests: string[];
  current_role_description: string;
  questions_to_explore: string;
  practical_experience: string;
  speaker_topic_proposal: string;
  registration_category: string;
  reduced_fee_interest: boolean;
  consent_acknowledged: boolean;
};

export type PricingTier = {
  id: string;
  name: string;
  price_cents: number;
  description: string | null;
  active: boolean;
};

export type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  type: string;
  organization: string | null;
  phone: string | null;
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export type SponsorInquiryFormData = {
  name: string;
  email: string;
  organization: string;
  phone: string;
  message: string;
  sponsor_level_interest: string;
};

export const APPLICATION_TYPES = [
  { value: "attend", label: "Attend DHC26" },
  { value: "speak", label: "Be considered as a speaker" },
  { value: "moderate", label: "Moderate a session or roundtable" },
  { value: "small_group", label: "Participate in a small-group discussion" },
  { value: "sponsor", label: "Sponsor or partner" },
  { value: "nominate", label: "Nominate someone else" },
] as const;

export const ROLE_CATEGORIES = [
  { value: "health_system_counsel", label: "Health system GC / AGC / in-house counsel" },
  { value: "digital_health_counsel", label: "In-house counsel at digital health, health IT, AI, medtech, or life sciences company" },
  { value: "product_counsel", label: "Product counsel" },
  { value: "privacy_compliance", label: "Privacy / security / data governance / compliance leader" },
  { value: "legal_ops", label: "Legal operations leader" },
  { value: "ai_governance", label: "Healthcare AI governance leader" },
  { value: "clinical_tech", label: "Clinical, operational, or technology leader involved in AI deployment" },
  { value: "government_regulator", label: "Government / regulator / policy leader" },
  { value: "academic_researcher", label: "Academic / researcher" },
  { value: "outside_counsel", label: "Outside counsel / law firm lawyer" },
  { value: "legal_tech", label: "Legal technology company" },
  { value: "healthcare_tech", label: "Healthcare technology company" },
  { value: "insurance_risk", label: "Insurance / broker / risk advisory" },
  { value: "consultant", label: "Consultant" },
  { value: "investor_vc", label: "Investor / venture capital" },
  { value: "other", label: "Other" },
] as const;

export const TOPIC_INTERESTS = [
  { value: "health_system_ai_governance", label: "Health system AI governance" },
  { value: "ai_vendor_diligence", label: "AI vendor diligence and procurement" },
  { value: "contracting_healthcare_ai", label: "Contracting for healthcare AI" },
  { value: "evidence_of_value", label: "Evidence of value and claims substantiation" },
  { value: "liability_allocation", label: "Liability and allocation of responsibility" },
  { value: "fda_samd_cds", label: "FDA, SaMD, and clinical decision support" },
  { value: "consumer_health_ai", label: "Consumer health AI, chatbots, and mental health tools" },
  { value: "privacy_cybersecurity", label: "Privacy, cybersecurity, and health data governance" },
  { value: "data_rights", label: "Data rights, de-identification, model training, and secondary use" },
  { value: "product_counsel_issues", label: "Product counsel issues for healthcare AI companies" },
  { value: "interoperability", label: "Interoperability, EHRs, APIs, and data infrastructure" },
  { value: "rural_ai_adoption", label: "AI adoption in rural or resource-constrained healthcare settings" },
  { value: "ai_legal_operations", label: "AI for legal operations in healthcare legal teams" },
  { value: "insurance_risk_transfer", label: "Insurance, risk transfer, and professional liability" },
  { value: "board_oversight", label: "Board, executive, and enterprise risk oversight" },
  { value: "us_eu_regulation", label: "U.S./EU comparative regulation" },
] as const;

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "New",
  needs_review: "Needs Review",
  accepted_complimentary: "Accepted — Complimentary",
  accepted_reduced: "Accepted — Reduced Fee",
  accepted_paid: "Accepted — Paid",
  speaker_consideration: "Speaker Consideration",
  sponsor_followup: "Sponsor Follow-up",
  waitlist: "Waitlist",
  declined: "Declined",
  needs_more_info: "Needs More Info",
  registered: "Registered",
  withdrawn: "Withdrawn",
};
```

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/002_phase1_expansion.sql src/types/index.ts
git commit -m "feat: expand database schema and types for Phase 1"
```

---

## Task 5: Application Form Rewrite

**Files:**
- Modify: `src/components/forms/application-form.tsx`

- [ ] **Step 1: Rewrite application form with 6 sections**

Replace `src/components/forms/application-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import {
  APPLICATION_TYPES,
  ROLE_CATEGORIES,
  TOPIC_INTERESTS,
} from "@/types";

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [applicationTypes, setApplicationTypes] = useState<string[]>([]);
  const [topicInterests, setTopicInterests] = useState<string[]>([]);

  function toggleApplicationType(value: string) {
    setApplicationTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function toggleTopic(value: string) {
    setTopicInterests((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (prev.length >= 5) return prev;
      return [...prev, value];
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (applicationTypes.length === 0) {
      setErrorMessage("Please select at least one application type.");
      setStatus("error");
      return;
    }

    const form = new FormData(e.currentTarget);
    const consent = form.get("consent_acknowledged");
    if (!consent) {
      setErrorMessage("You must acknowledge the consent statement.");
      setStatus("error");
      return;
    }

    const data = {
      first_name: form.get("first_name") as string,
      last_name: form.get("last_name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      organization: form.get("organization") as string,
      organization_website: form.get("organization_website") as string,
      title: form.get("title") as string,
      linkedin: form.get("linkedin") as string,
      city: form.get("city") as string,
      state: form.get("state") as string,
      country: form.get("country") as string,
      application_types: applicationTypes,
      role_category: form.get("role_category") as string,
      topic_interests: topicInterests,
      current_role_description: form.get("current_role_description") as string,
      questions_to_explore: form.get("questions_to_explore") as string,
      practical_experience: form.get("practical_experience") as string,
      speaker_topic_proposal: form.get("speaker_topic_proposal") as string,
      registration_category: form.get("registration_category") as string,
      reduced_fee_interest: form.get("reduced_fee_interest") === "on",
      consent_acknowledged: true,
    };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
        <h3 className="text-lg font-semibold text-green-800">
          Application Submitted
        </h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for your interest in DHC26. We will review your application
          and follow up via email. Submission does not guarantee attendance.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Section 1: Contact Information */}
      <fieldset className="space-y-6">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          Contact Information
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Input id="first_name" name="first_name" label="First Name" required />
          <Input id="last_name" name="last_name" label="Last Name" required />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Input id="email" name="email" type="email" label="Email" required />
          <Input id="phone" name="phone" type="tel" label="Phone" />
        </div>
        <Input id="title" name="title" label="Title" />
        <div className="grid gap-6 sm:grid-cols-2">
          <Input id="organization" name="organization" label="Organization" required />
          <Input id="organization_website" name="organization_website" type="url" label="Organization Website" placeholder="https://" />
        </div>
        <Input id="linkedin" name="linkedin" type="url" label="LinkedIn Profile" placeholder="https://linkedin.com/in/..." />
        <div className="grid gap-6 sm:grid-cols-3">
          <Input id="city" name="city" label="City" />
          <Input id="state" name="state" label="State / Province" />
          <Input id="country" name="country" label="Country" />
        </div>
      </fieldset>

      {/* Section 2: Application Type */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          Application Type
        </legend>
        <p className="text-sm text-text-light">Select all that apply:</p>
        <div className="space-y-3">
          {APPLICATION_TYPES.map((type) => (
            <label key={type.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={applicationTypes.includes(type.value)}
                onChange={() => toggleApplicationType(type.value)}
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent/20"
              />
              <span className="text-sm text-text">{type.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Section 3: Role Category */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          Role Category
        </legend>
        <div className="space-y-1">
          <label htmlFor="role_category" className="block text-sm font-medium text-text">
            Which best describes your role?
          </label>
          <select
            id="role_category"
            name="role_category"
            required
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="">Select your role</option>
            {ROLE_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* Section 4: Topic Interests */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          Topic Interests
        </legend>
        <p className="text-sm text-text-light">
          Select up to 5 topics ({topicInterests.length}/5 selected):
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {TOPIC_INTERESTS.map((topic) => (
            <label
              key={topic.value}
              className={`flex items-start gap-3 cursor-pointer rounded-lg border p-3 transition-colors ${
                topicInterests.includes(topic.value)
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-border"
              } ${
                !topicInterests.includes(topic.value) && topicInterests.length >= 5
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={topicInterests.includes(topic.value)}
                onChange={() => toggleTopic(topic.value)}
                disabled={!topicInterests.includes(topic.value) && topicInterests.length >= 5}
                className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent/20"
              />
              <span className="text-sm text-text">{topic.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Section 5: Short Answer Questions */}
      <fieldset className="space-y-6">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          About You
        </legend>
        <Textarea
          id="current_role_description"
          name="current_role_description"
          label="Briefly describe your current role and how your work relates to healthcare AI, digital health, health data, legal operations, or healthcare technology."
          rows={4}
        />
        <Textarea
          id="questions_to_explore"
          name="questions_to_explore"
          label="What specific questions or challenges are you hoping to explore at DHC26?"
          rows={4}
        />
        <Textarea
          id="practical_experience"
          name="practical_experience"
          label="What practical experience would you be willing to share?"
          rows={4}
        />
        {applicationTypes.includes("speak") && (
          <Textarea
            id="speaker_topic_proposal"
            name="speaker_topic_proposal"
            label="If applying to speak, what topic would you propose and what practical takeaways would attendees receive?"
            rows={4}
          />
        )}
      </fieldset>

      {/* Section 6: Registration & Consent */}
      <fieldset className="space-y-6">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          Registration & Consent
        </legend>
        <div className="space-y-1">
          <label htmlFor="registration_category" className="block text-sm font-medium text-text">
            If accepted, which registration category best applies?
          </label>
          <select
            id="registration_category"
            name="registration_category"
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="">Select category</option>
            <option value="in_house_counsel">In-house counsel</option>
            <option value="outside_counsel">Outside counsel / law firm</option>
            <option value="government_academic">Government / academic / nonprofit</option>
            <option value="technology_company">Technology / digital health company</option>
            <option value="consultant_advisory">Consultant / advisory</option>
            <option value="other">Other</option>
          </select>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="reduced_fee_interest"
            className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent/20"
          />
          <span className="text-sm text-text">
            I would like to be considered for complimentary or reduced-fee
            registration if available.
          </span>
        </label>

        <div className="rounded-lg bg-surface p-4 space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent_acknowledged"
              required
              className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent/20"
            />
            <span className="text-sm text-text">
              I acknowledge that submitting this application does not guarantee
              attendance or a speaking role. Accepted applicants will receive
              registration details after review. Registration fees may vary by
              category. DHC may use submitted information for event planning and
              communications. Applicant information will not be sold.
            </span>
          </label>
        </div>
      </fieldset>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/forms/application-form.tsx
git commit -m "feat: rewrite application form with 6 sections and 30+ fields"
```

---

## Task 6: Application API Update + Apply Page

**Files:**
- Modify: `src/app/api/applications/route.ts`
- Create: `src/app/(public)/apply/page.tsx`

- [ ] **Step 1: Update applications POST route for expanded fields**

Replace `src/app/api/applications/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send";
import { ApplicationReceivedEmail } from "@/lib/email/templates/application-received";
import { AdminNotificationEmail } from "@/lib/email/templates/admin-notification";
import type { ApplicationFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ApplicationFormData = await request.json();

    if (
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.organization ||
      !body.role_category ||
      !body.application_types?.length ||
      !body.consent_acknowledged
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("applications")
      .insert({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone || null,
        organization: body.organization,
        organization_website: body.organization_website || null,
        title: body.title || null,
        linkedin: body.linkedin || null,
        city: body.city || null,
        state: body.state || null,
        country: body.country || null,
        application_types: body.application_types,
        role_category: body.role_category,
        topic_interests: body.topic_interests || [],
        current_role_description: body.current_role_description || null,
        questions_to_explore: body.questions_to_explore || null,
        practical_experience: body.practical_experience || null,
        speaker_topic_proposal: body.speaker_topic_proposal || null,
        registration_category: body.registration_category || null,
        reduced_fee_interest: body.reduced_fee_interest || false,
        consent_acknowledged: body.consent_acknowledged,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    try {
      await sendEmail({
        to: body.email,
        subject: "DHC26 Application Received",
        react: ApplicationReceivedEmail({ firstName: body.first_name }),
      });
    } catch {
      console.error(`Failed to send confirmation email to ${body.email}`);
    }

    if (process.env.ADMIN_EMAIL) {
      try {
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New DHC26 Application: ${body.first_name} ${body.last_name}`,
          react: AdminNotificationEmail({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            organization: body.organization,
            roleCategory: body.role_category,
            applicationTypes: body.application_types,
          }),
        });
      } catch {
        console.error("Failed to send admin notification email");
      }
    }

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
```

- [ ] **Step 2: Create apply page**

Create `src/app/(public)/apply/page.tsx`:

```tsx
import { ApplicationForm } from "@/components/forms/application-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply to DHC26",
  description:
    "Submit your application to attend the 2026 Digital Health Counsel AI Summit.",
};

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text">Apply to DHC26</h1>
      <p className="mt-4 text-text-light">
        DHC26 uses a curated application-first process. Submission does not
        guarantee attendance. Accepted applicants will receive registration
        details after review. Registration fees may vary by attendee category
        and participation role. Complimentary or reduced-fee registration may be
        available for selected in-house, government, academic, and nonprofit
        participants.
      </p>
      <p className="mt-2 text-sm text-text-light">
        Questions? Contact us at{" "}
        <a href="mailto:info@digitalhealthcounsel.com" className="text-accent hover:underline">
          info@digitalhealthcounsel.com
        </a>
      </p>
      <div className="mt-10">
        <ApplicationForm />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add ADMIN_EMAIL to .env.example**

Append to `.env.example`:

```
ADMIN_EMAIL=
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/applications/route.ts src/app/\(public\)/apply/ .env.example
git commit -m "feat: update applications API for expanded fields and add apply page"
```

---

## Task 7: Application Email Templates

**Files:**
- Create: `src/lib/email/templates/application-received.tsx`
- Create: `src/lib/email/templates/admin-notification.tsx`

- [ ] **Step 1: Create application received email**

Create `src/lib/email/templates/application-received.tsx`:

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  firstName: string;
};

export function ApplicationReceivedEmail({ firstName }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your DHC26 application has been received</Preview>
      <Body style={{ backgroundColor: "#f8f9fa", fontFamily: "sans-serif" }}>
        <Container style={{ margin: "0 auto", padding: "40px 20px", maxWidth: "560px" }}>
          <Section style={{ backgroundColor: "#1a1040", padding: "32px", borderRadius: "12px 12px 0 0" }}>
            <Heading style={{ color: "#ffffff", fontSize: "24px", margin: 0 }}>
              Application Received
            </Heading>
          </Section>
          <Section style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "0 0 12px 12px" }}>
            <Text style={{ fontSize: "16px", color: "#1a1a2e" }}>
              Dear {firstName},
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d", lineHeight: "1.6" }}>
              Thank you for your interest in DHC26 — the 2026 Digital Health
              Counsel AI Summit, December 2–3, 2026, at Bell Harbor Conference
              Center in Seattle.
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d", lineHeight: "1.6" }}>
              We have received your application and will review it carefully.
              Please note that submission does not guarantee attendance.
              Accepted applicants will receive registration details after review.
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d", lineHeight: "1.6" }}>
              If you have any questions, please reach out to us at
              info@digitalhealthcounsel.com.
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d", marginTop: "24px" }}>
              — Digital Health Counsel
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 2: Create admin notification email**

Create `src/lib/email/templates/admin-notification.tsx`:

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { ROLE_CATEGORIES, APPLICATION_TYPES } from "@/types";

type Props = {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  roleCategory: string;
  applicationTypes: string[];
};

export function AdminNotificationEmail({
  firstName,
  lastName,
  email,
  organization,
  roleCategory,
  applicationTypes,
}: Props) {
  const roleName =
    ROLE_CATEGORIES.find((r) => r.value === roleCategory)?.label ?? roleCategory;
  const typeNames = applicationTypes
    .map((t) => APPLICATION_TYPES.find((at) => at.value === t)?.label ?? t)
    .join(", ");

  return (
    <Html>
      <Head />
      <Preview>New DHC26 application from {firstName} {lastName}</Preview>
      <Body style={{ backgroundColor: "#f8f9fa", fontFamily: "sans-serif" }}>
        <Container style={{ margin: "0 auto", padding: "40px 20px", maxWidth: "560px" }}>
          <Section style={{ backgroundColor: "#1a1040", padding: "32px", borderRadius: "12px 12px 0 0" }}>
            <Heading style={{ color: "#ffffff", fontSize: "24px", margin: 0 }}>
              New Application
            </Heading>
          </Section>
          <Section style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "0 0 12px 12px" }}>
            <Text style={{ fontSize: "16px", color: "#1a1a2e", fontWeight: "bold" }}>
              {firstName} {lastName}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d" }}>
              <strong>Organization:</strong> {organization}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d" }}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d" }}>
              <strong>Role:</strong> {roleName}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d" }}>
              <strong>Applying to:</strong> {typeNames}
            </Text>
            <Text style={{ fontSize: "14px", color: "#6c757d", marginTop: "16px" }}>
              Review the full application in the admin dashboard.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/email/templates/application-received.tsx src/lib/email/templates/admin-notification.tsx
git commit -m "feat: add application received and admin notification email templates"
```

---

## Task 8: Sponsorship Page + Inquiry Form

**Files:**
- Create: `src/app/(public)/sponsorship/page.tsx`
- Create: `src/components/forms/sponsor-inquiry-form.tsx`
- Create: `src/app/api/sponsor-inquiries/route.ts`

- [ ] **Step 1: Create sponsor inquiry form**

Create `src/components/forms/sponsor-inquiry-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

const sponsorLevels = [
  "Anchor Sponsor",
  "Strategic Track Sponsor",
  "Legal Operations Sponsor",
  "GC / Legal Leadership Dinner Sponsor",
  "Speaker / Faculty Dinner Sponsor",
  "Reception Sponsor",
  "Supporting Sponsor",
  "Not sure — tell me more",
];

export function SponsorInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      organization: form.get("organization") as string,
      phone: form.get("phone") as string,
      sponsor_level_interest: form.get("sponsor_level_interest") as string,
      message: form.get("message") as string,
    };

    try {
      const res = await fetch("/api/sponsor-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
        <h3 className="text-lg font-semibold text-green-800">
          Inquiry Submitted
        </h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for your interest in sponsoring DHC26. We will follow up
          with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="name" name="name" label="Your Name" required />
        <Input id="email" name="email" type="email" label="Email" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="organization" name="organization" label="Organization" required />
        <Input id="phone" name="phone" type="tel" label="Phone" />
      </div>
      <div className="space-y-1">
        <label htmlFor="sponsor_level_interest" className="block text-sm font-medium text-text">
          Sponsorship Level of Interest
        </label>
        <select
          id="sponsor_level_interest"
          name="sponsor_level_interest"
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <option value="">Select level</option>
          {sponsorLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      <Textarea
        id="message"
        name="message"
        label="Message (optional)"
        rows={4}
        placeholder="Tell us about your organization and interest in sponsoring..."
      />

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Sponsor Inquiry"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Create sponsor inquiries API route**

Create `src/app/api/sponsor-inquiries/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.organization) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: body.name,
      email: body.email,
      message: body.message || `Sponsor inquiry: ${body.sponsor_level_interest || "General interest"}`,
      type: "sponsorship",
      organization: body.organization,
      phone: body.phone || null,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
```

- [ ] **Step 3: Create sponsorship page**

Create `src/app/(public)/sponsorship/page.tsx`:

```tsx
import { SponsorInquiryForm } from "@/components/forms/sponsor-inquiry-form";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorship",
  description: "Sponsor the 2026 Digital Health Counsel AI Summit.",
};

const sponsorTiers = [
  { name: "Anchor Sponsor", description: "Premier visibility and strategic alignment with DHC26." },
  { name: "Strategic Track Sponsor", description: "Align your brand with a specific DHC26 content track." },
  { name: "Legal Operations Sponsor", description: "Support the AI for legal operations programming." },
  { name: "GC / Legal Leadership Dinner Sponsor", description: "Host the exclusive dinner for general counsel and legal leadership." },
  { name: "Speaker / Faculty Dinner Sponsor", description: "Host the speakers and faculty dinner." },
  { name: "Reception Sponsor", description: "Sponsor the networking reception." },
  { name: "Supporting Sponsor", description: "Support DHC26 and gain brand visibility." },
];

export default function SponsorshipPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-text">Sponsor DHC26</h1>
        <p className="mt-4 text-text-light text-lg">
          DHC26 brings together a curated audience of senior legal and governance
          leaders from health systems, digital health companies, AI companies,
          regulators, academics, law firms, insurers, consultants, and legal tech.
        </p>
        <p className="mt-4 text-text-light">
          Sponsoring DHC26 is an opportunity to support serious education and
          responsible healthcare AI adoption while engaging directly with the
          decision-makers shaping the legal infrastructure for healthcare AI.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text">Sponsorship Categories</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {sponsorTiers.map((tier) => (
            <Card key={tier.name}>
              <CardContent>
                <h3 className="font-semibold text-text">{tier.name}</h3>
                <p className="mt-1 text-sm text-text-light">{tier.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-xl">
        <h2 className="text-2xl font-bold text-text">Submit Sponsor Inquiry</h2>
        <p className="mt-2 text-sm text-text-light">
          Interested in sponsoring? Fill out the form below or contact us at{" "}
          <a href="mailto:info@digitalhealthcounsel.com" className="text-accent hover:underline">
            info@digitalhealthcounsel.com
          </a>
        </p>
        <div className="mt-8">
          <SponsorInquiryForm />
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/\(public\)/sponsorship/ src/components/forms/sponsor-inquiry-form.tsx src/app/api/sponsor-inquiries/
git commit -m "feat: add sponsorship page with inquiry form and API route"
```

---

## Task 9: Summit Page Content

**Files:**
- Modify: `src/app/(public)/summit-2026/page.tsx`

- [ ] **Step 1: Rewrite summit page with real content**

Replace `src/app/(public)/summit-2026/page.tsx`:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DHC26 — 2026 Digital Health Counsel AI Summit",
  description:
    "December 2–3, 2026 at Bell Harbor Conference Center, Seattle. From Promise to Proof: The Legal Operating System for Healthcare AI.",
};

const keyTopics = [
  "Health system AI governance",
  "AI vendor diligence and contracting",
  "Evidence of value and claims substantiation",
  "Liability and risk allocation",
  "Product counsel for healthcare AI companies",
  "Consumer health AI, chatbots, and mental health tools",
  "Data rights, privacy, de-identification, and secondary use",
  "AI for legal operations in healthcare legal teams",
  "Rural and community health AI adoption",
];

export default async function Summit2026Page({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {payment === "success" && (
        <div className="mb-8 rounded-xl bg-green-50 border border-green-200 p-6 text-center">
          <h3 className="text-lg font-semibold text-green-800">
            Payment Confirmed
          </h3>
          <p className="mt-2 text-sm text-green-700">
            Thank you! Your registration is complete. You will receive a
            confirmation email shortly.
          </p>
        </div>
      )}
      {payment === "cancelled" && (
        <div className="mb-8 rounded-xl bg-yellow-50 border border-yellow-200 p-6 text-center">
          <h3 className="text-lg font-semibold text-yellow-800">
            Payment Cancelled
          </h3>
          <p className="mt-2 text-sm text-yellow-700">
            Your payment was not completed. You can use the link in your
            approval email to try again.
          </p>
        </div>
      )}

      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          December 2–3, 2026
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          DHC26: The Legal Operating System for Healthcare AI
        </h1>
        <p className="mt-2 text-lg text-text-light">
          Bell Harbor Conference Center, Seattle
        </p>
        <p className="mt-6 text-text-light">
          Healthcare AI has moved beyond the question of whether the technology
          is impressive. DHC26 is the curated summit for the lawyers and leaders
          responsible for making healthcare AI provable, governable,
          contractable, and trustworthy.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text">Agenda Preview</h2>
        <p className="mt-2 text-sm text-text-light italic">
          Agenda subject to change.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardContent>
              <h3 className="font-semibold text-accent">Day One — December 2</h3>
              <p className="mt-2 text-sm font-medium text-text">
                Healthcare AI Risk, Evidence, Governance, Liability, and Trust
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="font-semibold text-accent">Day Two — December 3</h3>
              <p className="mt-2 text-sm font-medium text-text">
                The Legal Work of Healthcare AI: Contracting, Product Counsel,
                Data Rights, Legal Operations, and Implementation
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text">Key Topics</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {keyTopics.map((topic) => (
            <li key={topic} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
              <span className="text-text-light">{topic}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-text">Application Process</h2>
        <div className="mt-4 space-y-3 text-text-light">
          <p>
            DHC26 uses a curated application model. Submission does not guarantee
            attendance. Accepted applicants receive registration details after
            review.
          </p>
          <p>
            Registration fees may vary by attendee category and participation
            role. Complimentary or reduced-fee registration may be available for
            selected in-house, government, academic, and nonprofit participants.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/apply">
            <Button size="lg">Apply to Attend / Speak / Participate</Button>
          </Link>
          <Link href="/sponsorship">
            <Button size="lg" variant="secondary">Sponsor Inquiry</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(public\)/summit-2026/page.tsx
git commit -m "feat: rewrite summit page with full DHC26 content"
```

---

## Task 10: Past Summits Content

**Files:**
- Modify: `src/app/(public)/events/page.tsx`
- Modify: `src/app/(public)/events/[slug]/page.tsx`

- [ ] **Step 1: Rewrite events listing as Past Summits**

Replace `src/app/(public)/events/page.tsx`:

```tsx
import { EventCard } from "@/components/marketing/event-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Summits",
  description: "A history of Digital Health Counsel summits and workshops.",
};

const pastEvents = [
  {
    slug: "dhc-2025",
    title: "DHC 2025",
    date: "2025",
    location: "Seattle, WA",
    summary:
      "Our largest gathering with speakers from health systems, regulators, AI companies, and law firms. Expanded tracks on AI governance, product counsel, and legal operations.",
  },
  {
    slug: "microsoft-workshop-2025",
    title: "Spring 2025 Microsoft Workshop",
    date: "Spring 2025",
    location: "Microsoft Campus, Redmond, WA",
    summary:
      "An intensive workshop in collaboration with Microsoft exploring healthcare AI deployment, responsible AI frameworks, and enterprise governance strategies.",
  },
  {
    slug: "dhc-2024",
    title: "DHC 2024",
    date: "2024",
    location: "Seattle, WA",
    summary:
      "Expanded to include product counsel, privacy, and AI governance tracks. Featured speakers from leading health systems, digital health companies, and regulatory bodies.",
  },
  {
    slug: "dhc-2023",
    title: "DHC 2023",
    date: "2023",
    location: "Seattle, WA",
    summary:
      "Our inaugural summit convening healthcare AI and legal leaders. Established the foundation for Digital Health Counsel as a serious recurring convening platform.",
  },
];

export default function PastSummitsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text">Past Summits</h1>
      <p className="mt-4 max-w-2xl text-text-light">
        Digital Health Counsel has grown into a serious recurring convening for
        healthcare AI, law, policy, technology, and governance leaders.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {pastEvents.map((event) => (
          <EventCard key={event.slug} {...event} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite individual event pages**

Replace `src/app/(public)/events/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

type Speaker = { name: string; title: string; organization: string };

type EventData = {
  title: string;
  date: string;
  location: string;
  description: string;
  themes: string[];
  speakers: Speaker[];
};

const events: Record<string, EventData> = {
  "dhc-2025": {
    title: "DHC 2025",
    date: "2025",
    location: "Seattle, WA",
    description:
      "The third annual Digital Health Counsel summit and our largest gathering to date. DHC 2025 brought together general counsel, product counsel, privacy leaders, legal operations leaders, AI governance leaders, regulators, academics, and technology executives for two days of focused programming on the legal and governance infrastructure required for healthcare AI.",
    themes: [
      "Health system AI governance frameworks",
      "AI vendor diligence and procurement",
      "Contracting for healthcare AI",
      "Product counsel for digital health companies",
      "Privacy, cybersecurity, and health data governance",
      "AI for legal operations",
    ],
    speakers: [
      { name: "Speaker details", title: "Coming soon", organization: "Check back for updates" },
    ],
  },
  "microsoft-workshop-2025": {
    title: "Spring 2025 Microsoft Workshop",
    date: "Spring 2025",
    location: "Microsoft Campus, Redmond, WA",
    description:
      "An intensive workshop held in collaboration with Microsoft, bringing together healthcare AI leaders, enterprise technology strategists, and legal professionals. The workshop focused on responsible AI deployment in healthcare, enterprise governance frameworks, and practical strategies for managing AI risk at scale.",
    themes: [
      "Responsible AI in healthcare",
      "Enterprise AI governance",
      "Microsoft healthcare AI capabilities",
      "AI risk management at scale",
    ],
    speakers: [
      { name: "Speaker details", title: "Coming soon", organization: "Check back for updates" },
    ],
  },
  "dhc-2024": {
    title: "DHC 2024",
    date: "2024",
    location: "Seattle, WA",
    description:
      "The second annual Digital Health Counsel summit expanded to include dedicated tracks on product counsel, privacy and data governance, and AI governance. DHC 2024 featured speakers from leading health systems, digital health companies, regulatory bodies, and law firms.",
    themes: [
      "Product counsel for healthcare AI",
      "Privacy and data governance",
      "AI governance and risk management",
      "Evidence of value for AI products",
      "Liability and risk allocation",
    ],
    speakers: [
      { name: "Speaker details", title: "Coming soon", organization: "Check back for updates" },
    ],
  },
  "dhc-2023": {
    title: "DHC 2023",
    date: "2023",
    location: "Seattle, WA",
    description:
      "The inaugural Digital Health Counsel summit brought together healthcare AI and legal leaders for focused discussions on the emerging legal infrastructure needed for healthcare AI adoption. DHC 2023 established the foundation for what has become a serious recurring convening platform.",
    themes: [
      "Healthcare AI legal landscape",
      "AI governance foundations",
      "Digital health contracting",
      "Regulatory frameworks for healthcare AI",
    ],
    speakers: [
      { name: "Speaker details", title: "Coming soon", organization: "Check back for updates" },
    ],
  },
  // Keep old slugs as redirects
  "2025-summit": {
    title: "DHC 2025",
    date: "2025",
    location: "Seattle, WA",
    description: "Redirected. See dhc-2025.",
    themes: [],
    speakers: [],
  },
  "2024-summit": {
    title: "DHC 2024",
    date: "2024",
    location: "Seattle, WA",
    description: "Redirected. See dhc-2024.",
    themes: [],
    speakers: [],
  },
};

export function generateStaticParams() {
  return Object.keys(events).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events[slug];
  if (!event) return { title: "Event Not Found" };
  return { title: event.title };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events[slug];

  if (!event) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-4">
        <Badge variant="info">{event.date}</Badge>
      </div>
      <h1 className="text-3xl font-bold text-text">{event.title}</h1>
      <p className="mt-2 text-text-light">{event.location}</p>

      <div className="mt-8 prose prose-gray max-w-none">
        <p className="text-text-light leading-relaxed">{event.description}</p>
      </div>

      {event.themes.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-text">Key Themes</h2>
          <ul className="mt-4 space-y-2">
            {event.themes.map((theme) => (
              <li key={theme} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <span className="text-text-light">{theme}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {event.speakers.length > 0 && event.speakers[0].name !== "Speaker details" && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-text">Speakers</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {event.speakers.map((speaker, i) => (
              <div key={i} className="rounded-lg border border-border p-4">
                <p className="font-medium text-text">{speaker.name}</p>
                <p className="text-sm text-text-light">{speaker.title}</p>
                <p className="text-sm text-text-light">{speaker.organization}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 rounded-xl bg-surface p-6 text-center">
        <p className="text-sm text-text-light">
          Photos, detailed speaker information, and session summaries will be
          added as content is provided.
        </p>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/\(public\)/events/
git commit -m "feat: update past summits with DHC23, DHC24, Microsoft workshop, and DHC25"
```

---

## Task 11: Admin Status + Badge Updates

**Files:**
- Modify: `src/components/ui/badge.tsx`
- Modify: `src/app/api/applications/[id]/route.ts`

- [ ] **Step 1: Update badge variants for new statuses**

Replace the `statusBadgeVariant` function in `src/components/ui/badge.tsx`:

```ts
export function statusBadgeVariant(
  status: string
): BadgeVariant {
  switch (status) {
    case "new":
      return "warning";
    case "needs_review":
      return "warning";
    case "accepted_complimentary":
    case "accepted_reduced":
    case "accepted_paid":
      return "info";
    case "speaker_consideration":
    case "sponsor_followup":
      return "info";
    case "waitlist":
    case "needs_more_info":
      return "warning";
    case "declined":
    case "withdrawn":
      return "danger";
    case "registered":
      return "success";
    default:
      return "default";
  }
}
```

- [ ] **Step 2: Update PATCH endpoint for expanded statuses**

Replace `src/app/api/applications/[id]/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createCheckoutSession } from "@/lib/stripe/checkout";
import { sendEmail } from "@/lib/email/send";
import { ApprovalEmail } from "@/lib/email/templates/approval";
import { formatCents } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";

const VALID_STATUSES: ApplicationStatus[] = [
  "new", "needs_review",
  "accepted_complimentary", "accepted_reduced", "accepted_paid",
  "speaker_consideration", "sponsor_followup",
  "waitlist", "declined", "needs_more_info",
  "registered", "withdrawn",
];

type Params = { id: string };

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status, pricing_tier_id } = body as {
    status: ApplicationStatus;
    pricing_tier_id?: string;
  };

  if (!status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: application, error: fetchError } = await admin
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !application) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

  // Acceptance with payment
  if (status === "accepted_paid" || status === "accepted_reduced") {
    if (!pricing_tier_id) {
      return NextResponse.json(
        { error: "Pricing tier is required for paid acceptance" },
        { status: 400 }
      );
    }

    const { data: tier, error: tierError } = await admin
      .from("pricing_tiers")
      .select("*")
      .eq("id", pricing_tier_id)
      .single();

    if (tierError || !tier) {
      return NextResponse.json(
        { error: "Pricing tier not found" },
        { status: 400 }
      );
    }

    const paymentUrl = await createCheckoutSession({
      applicationId: id,
      applicantEmail: application.email,
      tierName: tier.name,
      priceCents: tier.price_cents,
    });

    const { error: updateError } = await admin
      .from("applications")
      .update({
        status,
        pricing_tier_id,
        stripe_payment_link: paymentUrl,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    let emailSent = true;
    try {
      await sendEmail({
        to: application.email,
        subject: "Your DHC26 Application Has Been Accepted",
        react: ApprovalEmail({
          firstName: application.first_name,
          tierName: tier.name,
          amount: formatCents(tier.price_cents),
          paymentUrl,
        }),
      });
    } catch {
      emailSent = false;
      console.error(`Failed to send approval email to ${application.email}`);
    }

    return NextResponse.json({ status, paymentUrl, emailSent });
  }

  // Complimentary acceptance — no payment
  if (status === "accepted_complimentary") {
    const { error: updateError } = await admin
      .from("applications")
      .update({
        status,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    let emailSent = true;
    try {
      await sendEmail({
        to: application.email,
        subject: "Your DHC26 Application Has Been Accepted",
        react: ApprovalEmail({
          firstName: application.first_name,
          tierName: "Complimentary",
          amount: "Complimentary",
          paymentUrl: null,
        }),
      });
    } catch {
      emailSent = false;
      console.error(`Failed to send approval email to ${application.email}`);
    }

    return NextResponse.json({ status, emailSent });
  }

  // All other status changes
  const { error: updateError } = await admin
    .from("applications")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ status });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/badge.tsx src/app/api/applications/\[id\]/route.ts
git commit -m "feat: expand review statuses and update approval API"
```

---

## Task 12: Admin Pages Update

**Files:**
- Modify: `src/components/admin/application-table.tsx`
- Modify: `src/app/(admin)/admin/dashboard/page.tsx`
- Modify: `src/app/(admin)/admin/applications/page.tsx`
- Modify: `src/app/(admin)/admin/applications/[id]/page.tsx`
- Modify: `src/app/(admin)/admin/contact/page.tsx`

- [ ] **Step 1: Update application table to show role category**

In `src/components/admin/application-table.tsx`, update the table to show role_category instead of attendee_type. Replace `role_category` references:

Change the `<TableHead>Type</TableHead>` to `<TableHead>Role</TableHead>` and the corresponding cell from `{app.attendee_type}` to:

```tsx
<TableCell className="capitalize text-xs">{app.role_category?.replace(/_/g, " ")}</TableCell>
```

Also import and show application_types with a small badge. Update the imports to include the full `Application` type field changes.

Replace the full file `src/components/admin/application-table.tsx`:

```tsx
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { STATUS_LABELS } from "@/types";
import type { Application } from "@/types";

type ApplicationTableProps = {
  applications: Application[];
};

export function ApplicationTable({ applications }: ApplicationTableProps) {
  if (applications.length === 0) {
    return (
      <p className="text-sm text-text-light py-8 text-center">
        No applications found.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => (
          <TableRow key={app.id}>
            <TableCell>
              <Link
                href={`/admin/applications/${app.id}`}
                className="font-medium text-accent hover:underline"
              >
                {app.first_name} {app.last_name}
              </Link>
            </TableCell>
            <TableCell>{app.organization}</TableCell>
            <TableCell className="text-xs">
              {app.role_category?.replace(/_/g, " ")}
            </TableCell>
            <TableCell>{formatDate(app.created_at)}</TableCell>
            <TableCell>
              <Badge variant={statusBadgeVariant(app.status)}>
                {STATUS_LABELS[app.status] ?? app.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

- [ ] **Step 2: Update dashboard with new status counts**

Replace `src/app/(admin)/admin/dashboard/page.tsx`:

```tsx
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { STATUS_LABELS } from "@/types";
import Link from "next/link";
import type { Application } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createAdminClient();

  const { data: applications } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  const apps = (applications ?? []) as Application[];

  const counts = {
    new: apps.filter((a) => a.status === "new").length,
    needs_review: apps.filter((a) => a.status === "needs_review").length,
    accepted: apps.filter((a) => a.status.startsWith("accepted_")).length,
    registered: apps.filter((a) => a.status === "registered").length,
    waitlist: apps.filter((a) => a.status === "waitlist").length,
    declined: apps.filter((a) => a.status === "declined").length,
    total: apps.length,
  };

  const recent = apps.slice(0, 10);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-text">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {(
          [
            { label: "New", value: counts.new, variant: "warning" },
            { label: "Needs Review", value: counts.needs_review, variant: "warning" },
            { label: "Accepted", value: counts.accepted, variant: "info" },
            { label: "Registered", value: counts.registered, variant: "success" },
            { label: "Waitlist", value: counts.waitlist, variant: "warning" },
            { label: "Declined", value: counts.declined, variant: "danger" },
          ] as const
        ).map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <p className="text-sm text-text-light">{stat.label}</p>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-text">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-sm text-text-light">No applications yet.</p>
          ) : (
            <div className="space-y-3">
              {recent.map((app) => (
                <Link
                  key={app.id}
                  href={`/admin/applications/${app.id}`}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-surface transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-text">
                      {app.first_name} {app.last_name}
                    </p>
                    <p className="text-xs text-text-light">
                      {app.organization} &middot; {formatDate(app.created_at)}
                    </p>
                  </div>
                  <Badge variant={statusBadgeVariant(app.status)}>
                    {STATUS_LABELS[app.status] ?? app.status}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
          {apps.length > 10 && (
            <Link
              href="/admin/applications"
              className="mt-4 block text-sm font-medium text-accent hover:underline"
            >
              View all applications
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 3: Update applications list filters**

Replace `src/app/(admin)/admin/applications/page.tsx`:

```tsx
import { createAdminClient } from "@/lib/supabase/admin";
import { ApplicationTable } from "@/components/admin/application-table";
import Link from "next/link";
import type { Application } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Applications" };
export const dynamic = "force-dynamic";

const filters = [
  "all",
  "new",
  "needs_review",
  "accepted_complimentary",
  "accepted_reduced",
  "accepted_paid",
  "speaker_consideration",
  "sponsor_followup",
  "waitlist",
  "declined",
  "needs_more_info",
  "registered",
  "withdrawn",
];

const filterLabels: Record<string, string> = {
  all: "All",
  new: "New",
  needs_review: "Review",
  accepted_complimentary: "Comp",
  accepted_reduced: "Reduced",
  accepted_paid: "Paid",
  speaker_consideration: "Speaker",
  sponsor_followup: "Sponsor",
  waitlist: "Waitlist",
  declined: "Declined",
  needs_more_info: "Need Info",
  registered: "Registered",
  withdrawn: "Withdrawn",
};

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const supabase = createAdminClient();

  let query = supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data } = await query;
  const applications = (data ?? []) as Application[];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Applications</h1>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f}
            href={f === "all" ? "/admin/applications" : `/admin/applications?status=${f}`}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              (f === "all" && !status) || f === status
                ? "bg-accent text-white"
                : "bg-white text-text-light border border-border hover:bg-surface"
            }`}
          >
            {filterLabels[f] ?? f}
          </Link>
        ))}
      </div>

      <ApplicationTable applications={applications} />
    </div>
  );
}
```

- [ ] **Step 4: Update application detail page with expanded fields and status actions**

Replace `src/app/(admin)/admin/applications/[id]/page.tsx`:

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TierSelector } from "@/components/admin/tier-selector";
import { formatDate } from "@/lib/utils";
import {
  STATUS_LABELS,
  APPLICATION_TYPES,
  ROLE_CATEGORIES,
  TOPIC_INTERESTS,
} from "@/types";
import type { Application, ApplicationStatus, PricingTier } from "@/types";

const STATUS_OPTIONS: ApplicationStatus[] = [
  "new", "needs_review",
  "accepted_complimentary", "accepted_reduced", "accepted_paid",
  "speaker_consideration", "sponsor_followup",
  "waitlist", "declined", "needs_more_info",
  "registered", "withdrawn",
];

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [application, setApplication] = useState<Application | null>(null);
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>("new");
  const [selectedTier, setSelectedTier] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      supabase.from("applications").select("*").eq("id", id).single(),
      supabase.from("pricing_tiers").select("*").eq("active", true),
    ]).then(([appRes, tiersRes]) => {
      if (cancelled) return;
      if (appRes.data) {
        const app = appRes.data as Application;
        setApplication(app);
        setSelectedStatus(app.status);
      }
      if (tiersRes.data) setTiers(tiersRes.data as PricingTier[]);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [id, supabase]);

  const needsTier = selectedStatus === "accepted_paid" || selectedStatus === "accepted_reduced";

  async function handleUpdateStatus() {
    setActionLoading(true);
    setError("");

    const body: Record<string, string> = { status: selectedStatus };
    if (needsTier) {
      if (!selectedTier) {
        setError("Please select a pricing tier.");
        setActionLoading(false);
        return;
      }
      body.pricing_tier_id = selectedTier;
    }

    const res = await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/applications");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setActionLoading(false);
    }
  }

  if (loading) return <p className="text-text-light">Loading...</p>;
  if (!application) return <p className="text-text-light">Application not found.</p>;

  const roleName = ROLE_CATEGORIES.find((r) => r.value === application.role_category)?.label ?? application.role_category;
  const appTypeNames = application.application_types
    .map((t) => APPLICATION_TYPES.find((at) => at.value === t)?.label ?? t);
  const topicNames = application.topic_interests
    .map((t) => TOPIC_INTERESTS.find((ti) => ti.value === t)?.label ?? t);

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">
          {application.first_name} {application.last_name}
        </h1>
        <Badge variant={statusBadgeVariant(application.status)}>
          {STATUS_LABELS[application.status] ?? application.status}
        </Badge>
      </div>

      <Card>
        <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Detail label="Email" value={application.email} />
          <Detail label="Phone" value={application.phone || "—"} />
          <Detail label="Organization" value={application.organization} />
          <Detail label="Website" value={application.organization_website || "—"} />
          <Detail label="Title" value={application.title || "—"} />
          <Detail label="LinkedIn" value={application.linkedin || "—"} />
          <Detail label="Location" value={[application.city, application.state, application.country].filter(Boolean).join(", ") || "—"} />
          <Detail label="Submitted" value={formatDate(application.created_at)} />
          {application.reviewed_at && <Detail label="Reviewed" value={formatDate(application.reviewed_at)} />}
          {application.paid_at && <Detail label="Paid" value={formatDate(application.paid_at)} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Application Details</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Detail label="Application Type" value={appTypeNames.join(", ") || "—"} />
          <Detail label="Role Category" value={roleName} />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-light">Topic Interests</p>
            {topicNames.length > 0 ? (
              <div className="mt-1 flex flex-wrap gap-1">
                {topicNames.map((name) => (
                  <Badge key={name} variant="default">{name}</Badge>
                ))}
              </div>
            ) : (
              <p className="mt-0.5 text-sm text-text">—</p>
            )}
          </div>
          <Detail label="Registration Category" value={application.registration_category?.replace(/_/g, " ") || "—"} />
          <Detail label="Reduced Fee Interest" value={application.reduced_fee_interest ? "Yes" : "No"} />
        </CardContent>
      </Card>

      {(application.current_role_description || application.questions_to_explore || application.practical_experience || application.speaker_topic_proposal) && (
        <Card>
          <CardHeader><CardTitle>Responses</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {application.current_role_description && (
              <LongDetail label="Current Role & Relevance" value={application.current_role_description} />
            )}
            {application.questions_to_explore && (
              <LongDetail label="Questions to Explore" value={application.questions_to_explore} />
            )}
            {application.practical_experience && (
              <LongDetail label="Practical Experience to Share" value={application.practical_experience} />
            )}
            {application.speaker_topic_proposal && (
              <LongDetail label="Speaker Topic Proposal" value={application.speaker_topic_proposal} />
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Update Status</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-text mb-1">
              Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ApplicationStatus)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>

          {needsTier && (
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Pricing Tier (required)
              </label>
              <TierSelector tiers={tiers} value={selectedTier} onChange={setSelectedTier} />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            onClick={handleUpdateStatus}
            disabled={actionLoading || selectedStatus === application.status}
          >
            {actionLoading ? "Updating..." : "Update Status"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-text-light">{label}</p>
      <p className="mt-0.5 text-sm text-text">{value}</p>
    </div>
  );
}

function LongDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-text-light">{label}</p>
      <p className="mt-1 text-sm text-text whitespace-pre-wrap">{value}</p>
    </div>
  );
}
```

- [ ] **Step 5: Update admin contact page to show submission type**

In `src/app/(admin)/admin/contact/page.tsx`, add a badge showing the submission type. After the existing `<Badge variant={sub.read ? "default" : "info"}>` badge, add:

```tsx
{sub.type === "sponsorship" && (
  <Badge variant="info">Sponsor</Badge>
)}
```

This requires the `ContactSubmission` type to already include the `type` field, which it does from Task 4.

- [ ] **Step 6: Commit**

```bash
git add src/components/admin/ src/app/\(admin\)/
git commit -m "feat: update admin pages for expanded application data and 12 review statuses"
```

---

## Task 13: Email Template Rebranding

**Files:**
- Modify: `src/lib/email/templates/approval.tsx`
- Modify: `src/lib/email/templates/payment-confirmed.tsx`

- [ ] **Step 1: Update approval email**

Update `src/lib/email/templates/approval.tsx`:
- Change all references from "Digital Health Council" to "Digital Health Counsel"
- Change heading color from `#1e3a5f` to `#1a1040`
- Change button color from `#1e3a5f` to `#d6297b`
- Update footer from "Digital Health Council & Digital Health Group, LLC" to "Digital Health Counsel"
- Make `paymentUrl` prop accept `string | null` and conditionally show the payment button:

```tsx
type Props = {
  firstName: string;
  tierName: string;
  amount: string;
  paymentUrl: string | null;
};
```

When `paymentUrl` is null, show "Your registration is complimentary. No payment is required." instead of the payment button.

- [ ] **Step 2: Update payment confirmed email**

Update `src/lib/email/templates/payment-confirmed.tsx`:
- Change all references from "Digital Health Council" to "Digital Health Counsel"
- Change heading color from `#1e3a5f` to `#1a1040`
- Change "2026 DHC Annual Summit" to "DHC26"
- Update footer text

- [ ] **Step 3: Commit**

```bash
git add src/lib/email/templates/
git commit -m "feat: rebrand email templates with new colors and Digital Health Counsel name"
```

---

## Task 14: Contact Page Update

**Files:**
- Modify: `src/app/(public)/contact/page.tsx`

- [ ] **Step 1: Add sponsorship inquiry link to contact page**

Read the current contact page and add a section above or below the form:

```tsx
<div className="mt-8 rounded-lg bg-surface p-6">
  <h2 className="text-lg font-semibold text-text">Sponsorship Inquiries</h2>
  <p className="mt-2 text-sm text-text-light">
    Interested in sponsoring DHC26? Visit our{" "}
    <a href="/sponsorship" className="text-accent hover:underline">
      sponsorship page
    </a>{" "}
    or email us at{" "}
    <a href="mailto:info@digitalhealthcounsel.com" className="text-accent hover:underline">
      info@digitalhealthcounsel.com
    </a>
  </p>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(public\)/contact/
git commit -m "feat: add sponsorship inquiry link to contact page"
```

---

## Task 15: Final Verification

- [ ] **Step 1: Run lint**

```bash
npm run lint
```

Fix any lint errors.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Confirm clean build with all routes rendering.

- [ ] **Step 3: Verify all routes in dev**

```bash
npm run dev
```

Check each route renders:
- `/` — homepage with hero, mission, why DHC26, who should apply, past highlights, CTA
- `/summit-2026` — full event page with agenda preview, topics, application process
- `/events` — past summits listing (4 events)
- `/events/dhc-2025` — individual summit page
- `/apply` — application form with 6 sections
- `/sponsorship` — sponsor tiers and inquiry form
- `/contact` — contact form with sponsorship link
- `/admin` — login page
- `/admin/dashboard` — stats with new status counts
- `/admin/applications` — filter tabs with all 12 statuses
- `/admin/applications/[id]` — expanded detail view with status dropdown

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve lint and build errors"
```
