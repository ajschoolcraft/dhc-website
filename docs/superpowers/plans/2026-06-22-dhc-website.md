# DHC Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional website for Digital Health Council with public marketing pages, summit application workflow, admin dashboard, Stripe payments, and Resend email notifications.

**Architecture:** Next.js 15 App Router with feature-grouped route groups — `(public)` for marketing pages with header/footer layout, `(admin)` for the protected admin dashboard with sidebar layout. All third-party integrations (Supabase, Stripe, Resend) are isolated in `src/lib/` with thin wrapper modules. API routes handle form submissions, application management, and Stripe webhooks.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Supabase (database + auth), Stripe (payments), Resend (email), Vercel (hosting)

**Design Spec:** `docs/superpowers/specs/2026-06-22-dhc-website-design.md`

---

## File Structure

### New files to create

**Environment & Config:**
- `.env.example` — environment variable template
- `middleware.ts` — auth protection for /admin routes

**Types & Utilities:**
- `src/types/index.ts` — shared TypeScript types matching DB schema
- `src/lib/utils.ts` — utility functions (cn helper, formatters)

**Supabase:**
- `src/lib/supabase/client.ts` — browser client
- `src/lib/supabase/server.ts` — server component / route handler client
- `src/lib/supabase/admin.ts` — service role client (bypasses RLS)
- `src/lib/supabase/types.ts` — re-export of generated DB types
- `supabase/migrations/001_initial_schema.sql` — database migration

**Stripe:**
- `src/lib/stripe/client.ts` — Stripe SDK instance
- `src/lib/stripe/checkout.ts` — checkout session creation helper

**Email:**
- `src/lib/email/send.ts` — Resend wrapper
- `src/lib/email/templates/approval.tsx` — approval + payment link email
- `src/lib/email/templates/payment-confirmed.tsx` — payment confirmation email

**UI Components:**
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/table.tsx`
- `src/components/ui/modal.tsx`

**Marketing Components:**
- `src/components/marketing/header.tsx`
- `src/components/marketing/footer.tsx`
- `src/components/marketing/hero.tsx`
- `src/components/marketing/event-card.tsx`

**Admin Components:**
- `src/components/admin/sidebar.tsx`
- `src/components/admin/admin-header.tsx`
- `src/components/admin/application-table.tsx`
- `src/components/admin/tier-selector.tsx`

**Form Components:**
- `src/components/forms/application-form.tsx`
- `src/components/forms/contact-form.tsx`

**Public Pages:**
- `src/app/(public)/layout.tsx`
- `src/app/(public)/page.tsx`
- `src/app/(public)/events/page.tsx`
- `src/app/(public)/events/[slug]/page.tsx`
- `src/app/(public)/summit-2026/page.tsx`
- `src/app/(public)/contact/page.tsx`

**Admin Pages:**
- `src/app/(admin)/layout.tsx`
- `src/app/(admin)/admin/page.tsx`
- `src/app/(admin)/admin/dashboard/page.tsx`
- `src/app/(admin)/admin/applications/page.tsx`
- `src/app/(admin)/admin/applications/[id]/page.tsx`
- `src/app/(admin)/admin/pricing/page.tsx`
- `src/app/(admin)/admin/contact/page.tsx`

**API Routes:**
- `src/app/api/applications/route.ts`
- `src/app/api/applications/[id]/route.ts`
- `src/app/api/contact/route.ts`
- `src/app/api/webhooks/stripe/route.ts`

### Files to modify

- `src/app/layout.tsx` — update metadata, simplify fonts
- `src/app/globals.css` — remove dark mode, set up theme colors
- `src/app/page.tsx` — remove (moved to route group)
- `package.json` — add dependencies
- `next.config.ts` — add image config if needed

---

## Task 1: Install Dependencies & Environment Setup

**Files:**
- Modify: `package.json`
- Create: `.env.example`

- [ ] **Step 1: Install production dependencies**

```bash
npm install @supabase/supabase-js @supabase/ssr stripe resend @react-email/components clsx
```

- [ ] **Step 2: Create environment variable template**

Create `.env.example`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend
RESEND_API_KEY=
EMAIL_FROM=noreply@example.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

- [ ] **Step 3: Create `.env.local` from template**

```bash
cp .env.example .env.local
```

Verify `.env.local` is in `.gitignore` (it is by default with Next.js).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .env.example
git commit -m "feat: install dependencies and add env template"
```

---

## Task 2: Clean Up Defaults & Update Root Layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Delete: `src/app/page.tsx` (will be replaced by route group page)
- Delete: `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`

- [ ] **Step 1: Update root layout**

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
    default: "Digital Health Council",
    template: "%s | Digital Health Council",
  },
  description:
    "Convening, educating and empowering leaders dedicated to transforming health care through technology, policy, and innovation.",
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

- [ ] **Step 2: Update globals.css for light-only theme**

Replace `src/app/globals.css`:

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-inter);
  --color-primary: #1e3a5f;
  --color-primary-light: #2d5a8e;
  --color-primary-dark: #0f2440;
  --color-accent: #2a9d8f;
  --color-accent-light: #3dbdad;
  --color-surface: #f8f9fa;
  --color-surface-dark: #e9ecef;
  --color-text: #1a1a2e;
  --color-text-light: #6c757d;
  --color-border: #dee2e6;
}

body {
  background: #ffffff;
  color: var(--color-text);
}
```

- [ ] **Step 3: Delete default page and assets**

```bash
rm src/app/page.tsx
rm public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000` — should show a 404 (no page.tsx in app root). That's expected.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: update root layout, set color theme, remove defaults"
```

---

## Task 3: Shared Types & Utilities

**Files:**
- Create: `src/types/index.ts`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create shared types**

Create `src/types/index.ts`:

```ts
export type ApplicationStatus = "pending" | "approved" | "declined" | "paid";

export type Application = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
  title: string | null;
  attendee_type: string;
  reason: string | null;
  status: ApplicationStatus;
  pricing_tier_id: string | null;
  stripe_payment_link: string | null;
  stripe_session_id: string | null;
  reviewed_at: string | null;
  paid_at: string | null;
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
};

export type ApplicationFormData = {
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
  title: string;
  attendee_type: string;
  reason: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};
```

- [ ] **Step 2: Create utility functions**

Create `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
```

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts src/lib/utils.ts
git commit -m "feat: add shared types and utility functions"
```

---

## Task 4: Supabase Setup — Clients & Migration

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/admin.ts`
- Create: `src/lib/supabase/types.ts`
- Create: `supabase/migrations/001_initial_schema.sql`

- [ ] **Step 1: Create browser client**

Create `src/lib/supabase/client.ts`:

```ts
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] **Step 2: Create server client**

Create `src/lib/supabase/server.ts`:

```ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — ignore.
          }
        },
      },
    }
  );
}
```

- [ ] **Step 3: Create admin client**

Create `src/lib/supabase/admin.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
```

- [ ] **Step 4: Create types re-export**

Create `src/lib/supabase/types.ts`:

```ts
export type { Application, PricingTier, ContactSubmission } from "@/types";
```

- [ ] **Step 5: Create database migration**

Create `supabase/migrations/001_initial_schema.sql`:

```sql
-- Pricing tiers (must exist before applications references it)
create table pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_cents integer not null,
  description text,
  active boolean not null default true
);

alter table pricing_tiers enable row level security;

create policy "Anyone can read active pricing tiers"
  on pricing_tiers for select
  using (active = true);

create policy "Authenticated users can manage pricing tiers"
  on pricing_tiers for all
  to authenticated
  using (true)
  with check (true);

-- Applications
create table applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  organization text not null,
  title text,
  attendee_type text not null,
  reason text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'declined', 'paid')),
  pricing_tier_id uuid references pricing_tiers(id),
  stripe_payment_link text,
  stripe_session_id text,
  reviewed_at timestamptz,
  paid_at timestamptz
);

alter table applications enable row level security;

create policy "Anyone can submit an application"
  on applications for insert
  with check (true);

create policy "Authenticated users can read applications"
  on applications for select
  to authenticated
  using (true);

create policy "Authenticated users can update applications"
  on applications for update
  to authenticated
  using (true)
  with check (true);

-- Contact submissions
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null,
  read boolean not null default false
);

alter table contact_submissions enable row level security;

create policy "Anyone can submit a contact form"
  on contact_submissions for insert
  with check (true);

create policy "Authenticated users can read contact submissions"
  on contact_submissions for select
  to authenticated
  using (true);

create policy "Authenticated users can update contact submissions"
  on contact_submissions for update
  to authenticated
  using (true)
  with check (true);
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/supabase/ supabase/
git commit -m "feat: add Supabase clients and database migration"
```

---

## Task 5: UI Component Library

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/table.tsx`
- Create: `src/components/ui/modal.tsx`

- [ ] **Step 1: Create Button component**

Create `src/components/ui/button.tsx`:

```tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-light",
  secondary: "bg-surface text-text border border-border hover:bg-surface-dark",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "text-text-light hover:bg-surface",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
```

- [ ] **Step 2: Create Input component**

Create `src/components/ui/input.tsx`:

```tsx
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-text">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-text">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-text-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
```

- [ ] **Step 3: Create Card component**

Create `src/components/ui/card.tsx`:

```tsx
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("text-lg font-semibold text-text", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn(className)}>{children}</div>;
}
```

- [ ] **Step 4: Create Badge component**

Create `src/components/ui/badge.tsx`:

```tsx
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface text-text-light",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function statusBadgeVariant(
  status: string
): BadgeVariant {
  switch (status) {
    case "pending":
      return "warning";
    case "approved":
      return "info";
    case "declined":
      return "danger";
    case "paid":
      return "success";
    default:
      return "default";
  }
}
```

- [ ] **Step 5: Create Table component**

Create `src/components/ui/table.tsx`:

```tsx
import { cn } from "@/lib/utils";

type TableProps = {
  children: React.ReactNode;
  className?: string;
};

export function Table({ children, className }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className={cn("w-full text-sm", className)}>{children}</table>
    </div>
  );
}

export function TableHeader({ children, className }: TableProps) {
  return (
    <thead className={cn("bg-surface border-b border-border", className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableProps) {
  return <tbody className={cn("divide-y divide-border", className)}>{children}</tbody>;
}

export function TableRow({ children, className }: TableProps) {
  return (
    <tr className={cn("hover:bg-surface/50 transition-colors", className)}>
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-light",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("px-4 py-3 text-text", className)}>{children}</td>
  );
}
```

- [ ] **Step 6: Create Modal component**

Create `src/components/ui/modal.tsx`:

```tsx
"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        "rounded-xl border border-border bg-white p-0 shadow-xl backdrop:bg-black/50 max-w-lg w-full",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        <button
          onClick={onClose}
          className="text-text-light hover:text-text transition-colors"
          aria-label="Close"
        >
          &#x2715;
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}
```

- [ ] **Step 7: Verify build**

```bash
npm run build
```

Fix any TypeScript errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add UI component library (button, input, card, badge, table, modal)"
```

---

## Task 6: Public Layout — Header & Footer

**Files:**
- Create: `src/components/marketing/header.tsx`
- Create: `src/components/marketing/footer.tsx`
- Create: `src/app/(public)/layout.tsx`

- [ ] **Step 1: Create Header component**

Create `src/components/marketing/header.tsx`:

```tsx
import Link from "next/link";

const navLinks = [
  { href: "/events", label: "Past Events" },
  { href: "/summit-2026", label: "2026 Summit" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold text-primary">
          DHC
        </Link>
        <nav className="hidden sm:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-light hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create Footer component**

Create `src/components/marketing/footer.tsx`:

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider">
              Digital Health Council
            </h3>
            <p className="mt-2 text-sm text-text-light">
              Convening, educating and empowering leaders dedicated to
              transforming health care.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/events" className="text-sm text-text-light hover:text-primary">
                  Past Events
                </Link>
              </li>
              <li>
                <Link href="/summit-2026" className="text-sm text-text-light hover:text-primary">
                  2026 Summit
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-light hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <span className="text-sm text-text-light">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-text-light">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-text-light">
          &copy; {new Date().getFullYear()} Digital Health Group, LLC. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create public layout**

Create `src/app/(public)/layout.tsx`:

```tsx
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/ src/app/\(public\)/layout.tsx
git commit -m "feat: add public marketing layout with header and footer"
```

---

## Task 7: Homepage

**Files:**
- Create: `src/components/marketing/hero.tsx`
- Create: `src/app/(public)/page.tsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/marketing/hero.tsx`:

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Transforming Health Care
          <span className="block text-accent-light">Through Innovation</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80">
          Digital Health Council convenes, educates and empowers leaders
          dedicated to transforming health care through technology, policy, and
          innovation.
        </p>
        <div className="mt-10 flex gap-4">
          <Link href="/summit-2026">
            <Button size="lg" className="bg-accent hover:bg-accent-light text-white">
              2026 Summit
            </Button>
          </Link>
          <Link href="/events">
            <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">
              Past Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create homepage**

Create `src/app/(public)/page.tsx`:

```tsx
import { Hero } from "@/components/marketing/hero";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const highlights = [
  {
    title: "Annual Summits",
    description:
      "Multi-day events bringing together leaders in healthcare, law, technology, and policy to address the most pressing challenges in digital health.",
  },
  {
    title: "Strategic Consulting",
    description:
      "Expert guidance on complex legal, policy, and operational issues facing health IT developers, providers, researchers, and entrepreneurs.",
  },
  {
    title: "Education & Community",
    description:
      "Webinars, in-person events, and a growing network of professionals dedicated to advancing digital health innovation.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-text">
          What We Do
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-text-light">
          DHC helps address complex legal, policy and operational issues in
          support of information technology developers, health care providers,
          researchers, investors and digital health entrepreneurs.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardContent>
                <p className="mt-2 text-sm text-text-light">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-text">2026 DHC Summit</h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-light">
            Join healthcare, legal, and technology leaders for our premier annual
            event. Applications are now open.
          </p>
          <div className="mt-8">
            <Link
              href="/summit-2026"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary-light transition-colors"
            >
              Learn More & Apply
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000` — should see the homepage with hero, highlights, and summit CTA.

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/hero.tsx src/app/\(public\)/page.tsx
git commit -m "feat: add homepage with hero, highlights, and summit CTA"
```

---

## Task 8: Events Pages

**Files:**
- Create: `src/components/marketing/event-card.tsx`
- Create: `src/app/(public)/events/page.tsx`
- Create: `src/app/(public)/events/[slug]/page.tsx`

- [ ] **Step 1: Create EventCard component**

Create `src/components/marketing/event-card.tsx`:

```tsx
import Link from "next/link";
import { Card } from "@/components/ui/card";

type EventCardProps = {
  slug: string;
  title: string;
  date: string;
  location: string;
  summary: string;
};

export function EventCard({ slug, title, date, location, summary }: EventCardProps) {
  return (
    <Link href={`/events/${slug}`}>
      <Card className="hover:shadow-md transition-shadow h-full">
        <div className="aspect-video bg-surface-dark rounded-lg mb-4 flex items-center justify-center text-text-light text-sm">
          Event Photo
        </div>
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <p className="mt-1 text-sm text-text-light">
          {date} &middot; {location}
        </p>
        <p className="mt-3 text-sm text-text-light line-clamp-3">{summary}</p>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 2: Define placeholder event data**

Create `src/app/(public)/events/page.tsx`:

```tsx
import { EventCard } from "@/components/marketing/event-card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Events",
  description: "Explore past Digital Health Council summit events.",
};

const pastEvents = [
  {
    slug: "2025-summit",
    title: "2025 DHC Annual Summit",
    date: "October 2025",
    location: "Washington, D.C.",
    summary:
      "Placeholder summary for the 2025 summit. Content will be provided by the founder including speaker information, photos, and event highlights.",
  },
  {
    slug: "2024-summit",
    title: "2024 DHC Annual Summit",
    date: "October 2024",
    location: "Washington, D.C.",
    summary:
      "Placeholder summary for the 2024 summit. Content will be provided by the founder including speaker information, photos, and event highlights.",
  },
];

export default function EventsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text">Past Events</h1>
      <p className="mt-4 text-text-light max-w-2xl">
        Explore our history of bringing together leaders in healthcare, law, and
        technology.
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

- [ ] **Step 3: Create individual event page**

Create `src/app/(public)/events/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type EventData = {
  title: string;
  date: string;
  location: string;
  description: string;
  speakers: { name: string; title: string; organization: string }[];
};

const events: Record<string, EventData> = {
  "2025-summit": {
    title: "2025 DHC Annual Summit",
    date: "October 2025",
    location: "Washington, D.C.",
    description:
      "Placeholder description for the 2025 summit. The founder will provide detailed content including session summaries, keynote highlights, and takeaways.",
    speakers: [
      { name: "Speaker Name", title: "Title", organization: "Organization" },
      { name: "Speaker Name", title: "Title", organization: "Organization" },
    ],
  },
  "2024-summit": {
    title: "2024 DHC Annual Summit",
    date: "October 2024",
    location: "Washington, D.C.",
    description:
      "Placeholder description for the 2024 summit. The founder will provide detailed content including session summaries, keynote highlights, and takeaways.",
    speakers: [
      { name: "Speaker Name", title: "Title", organization: "Organization" },
    ],
  },
};

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = events[slug];
  if (!event) return { title: "Event Not Found" };
  return { title: event.title, description: event.description };
}

export function generateStaticParams(): Params[] {
  return Object.keys(events).map((slug) => ({ slug }));
}

export default async function EventPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const event = events[slug];

  if (!event) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-text">{event.title}</h1>
      <p className="mt-2 text-text-light">
        {event.date} &middot; {event.location}
      </p>

      <div className="mt-8 aspect-video bg-surface-dark rounded-xl flex items-center justify-center text-text-light">
        Event Photo Gallery Placeholder
      </div>

      <div className="mt-8 prose prose-slate max-w-none">
        <p className="text-text-light">{event.description}</p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-text">Speakers</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {event.speakers.map((speaker, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-surface-dark flex items-center justify-center text-text-light text-xs">
                Photo
              </div>
              <h3 className="mt-3 font-semibold text-text">{speaker.name}</h3>
              <p className="text-sm text-text-light">{speaker.title}</p>
              <p className="text-sm text-text-light">{speaker.organization}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Check `http://localhost:3000/events` and `http://localhost:3000/events/2025-summit`.

- [ ] **Step 5: Commit**

```bash
git add src/components/marketing/event-card.tsx src/app/\(public\)/events/
git commit -m "feat: add events listing and individual event pages"
```

---

## Task 9: Summit 2026 Page & Application Form

**Files:**
- Create: `src/components/forms/application-form.tsx`
- Create: `src/app/(public)/summit-2026/page.tsx`

- [ ] **Step 1: Create ApplicationForm component**

Create `src/components/forms/application-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import type { ApplicationFormData } from "@/types";

const attendeeTypes = [
  { value: "provider", label: "Healthcare Provider" },
  { value: "vendor", label: "Industry Vendor / Developer" },
  { value: "investor", label: "Investor" },
  { value: "researcher", label: "Researcher / Academic" },
  { value: "legal", label: "Legal / Policy Professional" },
  { value: "other", label: "Other" },
];

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data: ApplicationFormData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      title: formData.get("title") as string,
      attendee_type: formData.get("attendee_type") as string,
      reason: formData.get("reason") as string,
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
          Thank you for your interest. We will review your application and
          follow up via email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          id="first_name"
          name="first_name"
          label="First Name"
          required
          placeholder="Jane"
        />
        <Input
          id="last_name"
          name="last_name"
          label="Last Name"
          required
          placeholder="Doe"
        />
      </div>
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        required
        placeholder="jane@example.com"
      />
      <Input
        id="organization"
        name="organization"
        label="Organization"
        required
        placeholder="Your company or institution"
      />
      <Input
        id="title"
        name="title"
        label="Job Title"
        placeholder="Chief Medical Officer"
      />
      <div className="space-y-1">
        <label htmlFor="attendee_type" className="block text-sm font-medium text-text">
          Attendee Type
        </label>
        <select
          id="attendee_type"
          name="attendee_type"
          required
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Select your role</option>
          {attendeeTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <Textarea
        id="reason"
        name="reason"
        label="Why are you interested in attending?"
        placeholder="Tell us about your interest in the summit..."
        rows={4}
      />

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

- [ ] **Step 2: Create Summit 2026 page**

Create `src/app/(public)/summit-2026/page.tsx`:

```tsx
import { ApplicationForm } from "@/components/forms/application-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026 DHC Summit",
  description:
    "Apply to attend the 2026 Digital Health Council Annual Summit.",
};

export default async function Summit2026Page({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { payment } = await searchParams;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
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
        <h1 className="text-3xl font-bold text-text">2026 DHC Annual Summit</h1>
        <p className="mt-4 text-text-light">
          Join healthcare, legal, and technology leaders for our premier annual
          event focused on the intersection of law, healthcare, and AI.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg bg-surface p-4">
            <p className="text-sm font-medium text-text-light">Date</p>
            <p className="mt-1 font-semibold text-text">TBD</p>
          </div>
          <div className="rounded-lg bg-surface p-4">
            <p className="text-sm font-medium text-text-light">Location</p>
            <p className="mt-1 font-semibold text-text">TBD</p>
          </div>
          <div className="rounded-lg bg-surface p-4">
            <p className="text-sm font-medium text-text-light">Format</p>
            <p className="mt-1 font-semibold text-text">In-Person</p>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-text">Apply to Attend</h2>
          <p className="mt-2 text-sm text-text-light">
            Attendance is by application only. Submit your application below and
            we will review it and follow up via email.
          </p>
          <div className="mt-8">
            <ApplicationForm />
          </div>
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Check `http://localhost:3000/summit-2026` — form should render with all fields. Submit button won't work yet (API route not built).

- [ ] **Step 4: Commit**

```bash
git add src/components/forms/application-form.tsx src/app/\(public\)/summit-2026/
git commit -m "feat: add summit 2026 page with application form"
```

---

## Task 10: Contact Page & Form

**Files:**
- Create: `src/components/forms/contact-form.tsx`
- Create: `src/app/(public)/contact/page.tsx`

- [ ] **Step 1: Create ContactForm component**

Create `src/components/forms/contact-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import type { ContactFormData } from "@/types";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
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
        <h3 className="text-lg font-semibold text-green-800">Message Sent</h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for reaching out. We will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input id="name" name="name" label="Name" required placeholder="Your name" />
      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        required
        placeholder="you@example.com"
      />
      <Textarea
        id="message"
        name="message"
        label="Message"
        required
        placeholder="How can we help?"
        rows={5}
      />

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Create Contact page**

Create `src/app/(public)/contact/page.tsx`:

```tsx
import { ContactForm } from "@/components/forms/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Digital Health Council.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold text-text">Contact Us</h1>
        <p className="mt-4 text-text-light">
          Have a question or want to learn more about Digital Health Council?
          We&apos;d love to hear from you.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

Check `http://localhost:3000/contact`.

- [ ] **Step 4: Commit**

```bash
git add src/components/forms/contact-form.tsx src/app/\(public\)/contact/
git commit -m "feat: add contact page with contact form"
```

---

## Task 11: Applications API Route (POST + GET)

**Files:**
- Create: `src/app/api/applications/route.ts`

- [ ] **Step 1: Create applications route**

Create `src/app/api/applications/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { ApplicationFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ApplicationFormData = await request.json();

    if (!body.first_name || !body.last_name || !body.email || !body.organization || !body.attendee_type) {
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
        organization: body.organization,
        title: body.title || null,
        attendee_type: body.attendee_type,
        reason: body.reason || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
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

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/applications/route.ts
git commit -m "feat: add applications API route (POST submit, GET list)"
```

---

## Task 12: Contact API Route

**Files:**
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create contact route**

Create `src/app/api/contact/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ContactFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: body.name,
      email: body.email,
      message: body.message,
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

- [ ] **Step 2: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: add contact form API route"
```

---

## Task 13: Stripe Client & Checkout Helper

**Files:**
- Create: `src/lib/stripe/client.ts`
- Create: `src/lib/stripe/checkout.ts`

- [ ] **Step 1: Create Stripe client**

Create `src/lib/stripe/client.ts`:

```ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});
```

- [ ] **Step 2: Create checkout session helper**

Create `src/lib/stripe/checkout.ts`:

```ts
import { stripe } from "./client";

type CreateCheckoutParams = {
  applicationId: string;
  applicantEmail: string;
  tierName: string;
  priceCents: number;
};

export async function createCheckoutSession({
  applicationId,
  applicantEmail,
  tierName,
  priceCents,
}: CreateCheckoutParams): Promise<string> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: applicantEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: priceCents,
          product_data: {
            name: `2026 DHC Summit — ${tierName}`,
            description: "Attendance fee for the 2026 DHC Annual Summit",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      application_id: applicationId,
    },
    success_url: `${appUrl}/summit-2026?payment=success`,
    cancel_url: `${appUrl}/summit-2026?payment=cancelled`,
  });

  return session.url!;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/stripe/
git commit -m "feat: add Stripe client and checkout session helper"
```

---

## Task 14: Email Client & Templates

**Files:**
- Create: `src/lib/email/send.ts`
- Create: `src/lib/email/templates/approval.tsx`
- Create: `src/lib/email/templates/payment-confirmed.tsx`

- [ ] **Step 1: Create Resend wrapper**

Create `src/lib/email/send.ts`:

```ts
import { Resend } from "resend";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY!);

type SendEmailParams = {
  to: string;
  subject: string;
  react: ReactElement;
};

export async function sendEmail({ to, subject, react }: SendEmailParams) {
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    react,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
```

- [ ] **Step 2: Create approval email template**

Create `src/lib/email/templates/approval.tsx`:

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ApprovalEmailProps = {
  firstName: string;
  tierName: string;
  amount: string;
  paymentUrl: string;
};

export function ApprovalEmail({
  firstName,
  tierName,
  amount,
  paymentUrl,
}: ApprovalEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your application to the 2026 DHC Summit has been approved</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Application Approved</Heading>
          <Text style={textStyle}>Dear {firstName},</Text>
          <Text style={textStyle}>
            We are pleased to inform you that your application to attend the
            2026 DHC Annual Summit has been approved.
          </Text>
          <Section style={detailsStyle}>
            <Text style={detailLabelStyle}>Registration Type</Text>
            <Text style={detailValueStyle}>{tierName}</Text>
            <Text style={detailLabelStyle}>Amount</Text>
            <Text style={detailValueStyle}>{amount}</Text>
          </Section>
          <Text style={textStyle}>
            Please complete your registration by clicking the button below to
            process your payment.
          </Text>
          <Section style={{ textAlign: "center", margin: "32px 0" }}>
            <Link href={paymentUrl} style={buttonStyle}>
              Complete Payment
            </Link>
          </Section>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            Digital Health Council &middot; Digital Health Group, LLC
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: "#f8f9fa",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const containerStyle = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "40px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const headingStyle = {
  color: "#1e3a5f",
  fontSize: "24px",
  fontWeight: "700" as const,
  margin: "0 0 24px",
};

const textStyle = {
  color: "#1a1a2e",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
};

const detailsStyle = {
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  padding: "16px 24px",
  margin: "24px 0",
};

const detailLabelStyle = {
  color: "#6c757d",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "8px 0 0",
};

const detailValueStyle = {
  color: "#1a1a2e",
  fontSize: "16px",
  fontWeight: "600" as const,
  margin: "2px 0 8px",
};

const buttonStyle = {
  backgroundColor: "#1e3a5f",
  borderRadius: "8px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600" as const,
  padding: "12px 32px",
  textDecoration: "none",
};

const hrStyle = {
  borderColor: "#dee2e6",
  margin: "32px 0",
};

const footerStyle = {
  color: "#6c757d",
  fontSize: "12px",
  textAlign: "center" as const,
};
```

- [ ] **Step 3: Create payment confirmed email template**

Create `src/lib/email/templates/payment-confirmed.tsx`:

```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

type PaymentConfirmedEmailProps = {
  firstName: string;
  tierName: string;
  amount: string;
};

export function PaymentConfirmedEmail({
  firstName,
  tierName,
  amount,
}: PaymentConfirmedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Payment confirmed — you&apos;re registered for the 2026 DHC Summit</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>Payment Confirmed</Heading>
          <Text style={textStyle}>Dear {firstName},</Text>
          <Text style={textStyle}>
            Your payment of {amount} for the 2026 DHC Annual Summit has been
            confirmed. You are now registered to attend.
          </Text>
          <Text style={detailLabelStyle}>Registration Type</Text>
          <Text style={detailValueStyle}>{tierName}</Text>
          <Text style={textStyle}>
            We will share event details, including the agenda and venue
            information, closer to the date. If you have any questions, please
            contact us.
          </Text>
          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            Digital Health Council &middot; Digital Health Group, LLC
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: "#f8f9fa",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const containerStyle = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "40px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const headingStyle = {
  color: "#1e3a5f",
  fontSize: "24px",
  fontWeight: "700" as const,
  margin: "0 0 24px",
};

const textStyle = {
  color: "#1a1a2e",
  fontSize: "14px",
  lineHeight: "24px",
  margin: "16px 0",
};

const detailLabelStyle = {
  color: "#6c757d",
  fontSize: "12px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "16px 0 0",
};

const detailValueStyle = {
  color: "#1a1a2e",
  fontSize: "16px",
  fontWeight: "600" as const,
  margin: "2px 0",
};

const hrStyle = {
  borderColor: "#dee2e6",
  margin: "32px 0",
};

const footerStyle = {
  color: "#6c757d",
  fontSize: "12px",
  textAlign: "center" as const,
};
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/email/
git commit -m "feat: add Resend email client and templates (approval, payment confirmed)"
```

---

## Task 15: Application Approval API Route

**Files:**
- Create: `src/app/api/applications/[id]/route.ts`

- [ ] **Step 1: Create approval/decline route**

Create `src/app/api/applications/[id]/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createCheckoutSession } from "@/lib/stripe/checkout";
import { sendEmail } from "@/lib/email/send";
import { ApprovalEmail } from "@/lib/email/templates/approval";
import { formatCents } from "@/lib/utils";

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
    status: "approved" | "declined";
    pricing_tier_id?: string;
  };

  if (!status || !["approved", "declined"].includes(status)) {
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

  if (status === "approved") {
    if (!pricing_tier_id) {
      return NextResponse.json(
        { error: "Pricing tier is required for approval" },
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
        status: "approved",
        pricing_tier_id,
        stripe_payment_link: paymentUrl,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    await sendEmail({
      to: application.email,
      subject: "Your 2026 DHC Summit Application Has Been Approved",
      react: ApprovalEmail({
        firstName: application.first_name,
        tierName: tier.name,
        amount: formatCents(tier.price_cents),
        paymentUrl,
      }),
    });

    return NextResponse.json({ status: "approved", paymentUrl });
  }

  // Declined
  const { error: updateError } = await admin
    .from("applications")
    .update({
      status: "declined",
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ status: "declined" });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/applications/\[id\]/route.ts
git commit -m "feat: add application approval/decline API with Stripe checkout and email"
```

---

## Task 16: Stripe Webhook Handler

**Files:**
- Create: `src/app/api/webhooks/stripe/route.ts`

- [ ] **Step 1: Create webhook route**

Create `src/app/api/webhooks/stripe/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send";
import { PaymentConfirmedEmail } from "@/lib/email/templates/payment-confirmed";
import { formatCents } from "@/lib/utils";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const applicationId = session.metadata?.application_id;

    if (!applicationId) {
      return NextResponse.json({ error: "Missing application ID" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: application, error: fetchError } = await supabase
      .from("applications")
      .select("*, pricing_tiers(*)")
      .eq("id", applicationId)
      .single();

    if (fetchError || !application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const { error: updateError } = await supabase
      .from("applications")
      .update({
        status: "paid",
        stripe_session_id: session.id,
        paid_at: new Date().toISOString(),
      })
      .eq("id", applicationId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    const tier = application.pricing_tiers;

    await sendEmail({
      to: application.email,
      subject: "Payment Confirmed — 2026 DHC Summit Registration",
      react: PaymentConfirmedEmail({
        firstName: application.first_name,
        tierName: tier?.name ?? "General",
        amount: formatCents(tier?.price_cents ?? 0),
      }),
    });
  }

  return NextResponse.json({ received: true });
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/webhooks/stripe/route.ts
git commit -m "feat: add Stripe webhook handler for payment confirmation"
```

---

## Task 17: Auth Middleware

**Files:**
- Create: `middleware.ts` (project root)

- [ ] **Step 1: Create middleware**

Create `middleware.ts`:

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin";

  if (isAdminRoute && !isLoginPage && !user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isLoginPage && user) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

- [ ] **Step 2: Commit**

```bash
git add middleware.ts
git commit -m "feat: add auth middleware to protect admin routes"
```

---

## Task 18: Admin Layout & Login Page

**Files:**
- Create: `src/components/admin/sidebar.tsx`
- Create: `src/components/admin/admin-header.tsx`
- Create: `src/app/(admin)/layout.tsx`
- Create: `src/app/(admin)/admin/page.tsx`

- [ ] **Step 1: Create Sidebar component**

Create `src/components/admin/sidebar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/contact", label: "Contact" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-white min-h-screen p-4">
      <div className="mb-8">
        <Link href="/admin/dashboard" className="text-lg font-bold text-primary">
          DHC Admin
        </Link>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith(item.href)
                ? "bg-primary/10 text-primary"
                : "text-text-light hover:bg-surface hover:text-text"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
```

- [ ] **Step 2: Create AdminHeader component**

Create `src/components/admin/admin-header.tsx`:

```tsx
"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function AdminHeader() {
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
      <div />
      <Button variant="ghost" size="sm" onClick={handleSignOut}>
        Sign Out
      </Button>
    </header>
  );
}
```

- [ ] **Step 3: Create admin layout**

Create `src/app/(admin)/layout.tsx`:

```tsx
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 bg-surface p-6">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create admin login page**

Create `src/app/(admin)/admin/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="w-full max-w-sm rounded-xl border border-border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-text text-center">Admin Login</h1>
        <p className="mt-2 text-sm text-text-light text-center">
          Sign in to manage applications
        </p>
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Check `http://localhost:3000/admin` — should see the login form.

- [ ] **Step 6: Commit**

```bash
git add src/components/admin/sidebar.tsx src/components/admin/admin-header.tsx src/app/\(admin\)/
git commit -m "feat: add admin layout, sidebar, header, and login page"
```

---

## Task 19: Admin Dashboard

**Files:**
- Create: `src/app/(admin)/admin/dashboard/page.tsx`

- [ ] **Step 1: Create dashboard page**

Create `src/app/(admin)/admin/dashboard/page.tsx`:

```tsx
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Application, ApplicationStatus } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = createAdminClient();

  const { data: applications } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: contactCount } = await supabase
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .eq("read", false);

  const apps = (applications ?? []) as Application[];

  const counts = {
    pending: apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
    paid: apps.filter((a) => a.status === "paid").length,
    declined: apps.filter((a) => a.status === "declined").length,
    total: apps.length,
  };

  const recent = apps.slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-text">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(
          [
            { label: "Pending", value: counts.pending, variant: "warning" },
            { label: "Approved", value: counts.approved, variant: "info" },
            { label: "Paid", value: counts.paid, variant: "success" },
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
                    {app.status}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
          {apps.length > 5 && (
            <Link
              href="/admin/applications"
              className="mt-4 block text-sm font-medium text-primary hover:underline"
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

- [ ] **Step 2: Commit**

```bash
git add src/app/\(admin\)/admin/dashboard/
git commit -m "feat: add admin dashboard with application stats and recent list"
```

---

## Task 20: Admin Applications Pages

**Files:**
- Create: `src/components/admin/application-table.tsx`
- Create: `src/components/admin/tier-selector.tsx`
- Create: `src/app/(admin)/admin/applications/page.tsx`
- Create: `src/app/(admin)/admin/applications/[id]/page.tsx`

- [ ] **Step 1: Create TierSelector component**

Create `src/components/admin/tier-selector.tsx`:

```tsx
"use client";

import type { PricingTier } from "@/types";
import { formatCents } from "@/lib/utils";

type TierSelectorProps = {
  tiers: PricingTier[];
  value: string;
  onChange: (tierId: string) => void;
};

export function TierSelector({ tiers, value, onChange }: TierSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      <option value="">Select pricing tier</option>
      {tiers.map((tier) => (
        <option key={tier.id} value={tier.id}>
          {tier.name} — {formatCents(tier.price_cents)}
        </option>
      ))}
    </select>
  );
}
```

- [ ] **Step 2: Create ApplicationTable component**

Create `src/components/admin/application-table.tsx`:

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
          <TableHead>Type</TableHead>
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
                className="font-medium text-primary hover:underline"
              >
                {app.first_name} {app.last_name}
              </Link>
            </TableCell>
            <TableCell>{app.organization}</TableCell>
            <TableCell className="capitalize">{app.attendee_type}</TableCell>
            <TableCell>{formatDate(app.created_at)}</TableCell>
            <TableCell>
              <Badge variant={statusBadgeVariant(app.status)}>
                {app.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

- [ ] **Step 3: Create applications list page**

Create `src/app/(admin)/admin/applications/page.tsx`:

```tsx
import { createAdminClient } from "@/lib/supabase/admin";
import { ApplicationTable } from "@/components/admin/application-table";
import type { Application } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Applications" };

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

  const filters = ["all", "pending", "approved", "declined", "paid"];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Applications</h1>

      <div className="flex gap-2">
        {filters.map((f) => (
          <a
            key={f}
            href={f === "all" ? "/admin/applications" : `/admin/applications?status=${f}`}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              (f === "all" && !status) || f === status
                ? "bg-primary text-white"
                : "bg-white text-text-light border border-border hover:bg-surface"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </a>
        ))}
      </div>

      <ApplicationTable applications={applications} />
    </div>
  );
}
```

- [ ] **Step 4: Create application detail page**

Create `src/app/(admin)/admin/applications/[id]/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TierSelector } from "@/components/admin/tier-selector";
import { formatDate } from "@/lib/utils";
import type { Application, PricingTier } from "@/types";

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();

  const [application, setApplication] = useState<Application | null>(null);
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [selectedTier, setSelectedTier] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const [appRes, tiersRes] = await Promise.all([
        supabase.from("applications").select("*").eq("id", id).single(),
        supabase.from("pricing_tiers").select("*").eq("active", true),
      ]);

      if (appRes.data) setApplication(appRes.data as Application);
      if (tiersRes.data) setTiers(tiersRes.data as PricingTier[]);
      setLoading(false);
    }
    load();
  }, [id, supabase]);

  async function handleAction(status: "approved" | "declined") {
    setActionLoading(true);

    const body: Record<string, string> = { status };
    if (status === "approved") {
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
      alert(data.error || "Something went wrong");
      setActionLoading(false);
    }
  }

  if (loading) {
    return <p className="text-text-light">Loading...</p>;
  }

  if (!application) {
    return <p className="text-text-light">Application not found.</p>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">
          {application.first_name} {application.last_name}
        </h1>
        <Badge variant={statusBadgeVariant(application.status)}>
          {application.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Detail label="Email" value={application.email} />
          <Detail label="Organization" value={application.organization} />
          <Detail label="Title" value={application.title || "—"} />
          <Detail label="Attendee Type" value={application.attendee_type} />
          <Detail label="Reason" value={application.reason || "—"} />
          <Detail label="Submitted" value={formatDate(application.created_at)} />
          {application.reviewed_at && (
            <Detail label="Reviewed" value={formatDate(application.reviewed_at)} />
          )}
          {application.paid_at && (
            <Detail label="Paid" value={formatDate(application.paid_at)} />
          )}
        </CardContent>
      </Card>

      {application.status === "pending" && (
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Pricing Tier (required for approval)
              </label>
              <TierSelector
                tiers={tiers}
                value={selectedTier}
                onChange={setSelectedTier}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => handleAction("approved")}
                disabled={actionLoading || !selectedTier}
              >
                {actionLoading ? "Processing..." : "Approve & Send Payment Link"}
              </Button>
              <Button
                variant="danger"
                onClick={() => handleAction("declined")}
                disabled={actionLoading}
              >
                Decline
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-text-light">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-text">{value}</p>
    </div>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/admin/application-table.tsx src/components/admin/tier-selector.tsx src/app/\(admin\)/admin/applications/
git commit -m "feat: add admin applications list and detail pages with approve/decline"
```

---

## Task 21: Admin Pricing Management

**Files:**
- Create: `src/app/(admin)/admin/pricing/page.tsx`

- [ ] **Step 1: Create pricing management page**

Create `src/app/(admin)/admin/pricing/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { formatCents } from "@/lib/utils";
import type { PricingTier } from "@/types";

export default function PricingPage() {
  const supabase = createClient();
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);

  async function loadTiers() {
    const { data } = await supabase
      .from("pricing_tiers")
      .select("*")
      .order("price_cents", { ascending: true });
    if (data) setTiers(data as PricingTier[]);
  }

  useEffect(() => {
    loadTiers();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const price = Math.round(parseFloat(form.get("price") as string) * 100);
    const description = form.get("description") as string;

    if (editingTier) {
      await supabase
        .from("pricing_tiers")
        .update({ name, price_cents: price, description })
        .eq("id", editingTier.id);
    } else {
      await supabase
        .from("pricing_tiers")
        .insert({ name, price_cents: price, description });
    }

    setShowModal(false);
    setEditingTier(null);
    loadTiers();
  }

  async function toggleActive(tier: PricingTier) {
    await supabase
      .from("pricing_tiers")
      .update({ active: !tier.active })
      .eq("id", tier.id);
    loadTiers();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Pricing Tiers</h1>
        <Button
          onClick={() => {
            setEditingTier(null);
            setShowModal(true);
          }}
        >
          Add Tier
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.id} className={!tier.active ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                <Badge variant={tier.active ? "success" : "default"}>
                  {tier.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-text">
                {formatCents(tier.price_cents)}
              </p>
              {tier.description && (
                <p className="mt-2 text-sm text-text-light">
                  {tier.description}
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setEditingTier(tier);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleActive(tier)}
                >
                  {tier.active ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingTier(null);
        }}
        title={editingTier ? "Edit Tier" : "Add Tier"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            id="name"
            name="name"
            label="Tier Name"
            required
            defaultValue={editingTier?.name ?? ""}
            placeholder="e.g., Healthcare Provider"
          />
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            label="Price (USD)"
            required
            defaultValue={
              editingTier ? (editingTier.price_cents / 100).toFixed(2) : ""
            }
            placeholder="500.00"
          />
          <Input
            id="description"
            name="description"
            label="Description (optional)"
            defaultValue={editingTier?.description ?? ""}
          />
          <Button type="submit" className="w-full">
            {editingTier ? "Save Changes" : "Create Tier"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/\(admin\)/admin/pricing/
git commit -m "feat: add admin pricing tier management page"
```

---

## Task 22: Admin Contact Submissions

**Files:**
- Create: `src/app/(admin)/admin/contact/page.tsx`

- [ ] **Step 1: Create contact submissions page**

Create `src/app/(admin)/admin/contact/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { ContactSubmission } from "@/types";

export default function AdminContactPage() {
  const supabase = createClient();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  async function loadSubmissions() {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubmissions(data as ContactSubmission[]);
  }

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function markAsRead(id: string) {
    await supabase
      .from("contact_submissions")
      .update({ read: true })
      .eq("id", id);
    loadSubmissions();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Contact Submissions</h1>

      {submissions.length === 0 ? (
        <p className="text-sm text-text-light">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <Card key={sub.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-text">{sub.name}</p>
                    <p className="text-sm text-text-light">{sub.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={sub.read ? "default" : "info"}>
                      {sub.read ? "Read" : "New"}
                    </Badge>
                    <span className="text-xs text-text-light">
                      {formatDate(sub.created_at)}
                    </span>
                    {!sub.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(sub.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm text-text whitespace-pre-wrap">
                  {sub.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify full build**

```bash
npm run build
```

Fix any TypeScript errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/\(admin\)/admin/contact/
git commit -m "feat: add admin contact submissions page"
```

---

## Task 23: Final Verification & Cleanup

- [ ] **Step 1: Verify all public routes**

```bash
npm run dev
```

Visit each route and confirm it renders:
- `http://localhost:3000` — homepage with hero, highlights, CTA
- `http://localhost:3000/events` — events listing
- `http://localhost:3000/events/2025-summit` — individual event
- `http://localhost:3000/summit-2026` — summit page with application form
- `http://localhost:3000/contact` — contact form
- `http://localhost:3000/admin` — login page

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Fix any lint errors.

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Confirm clean build with no errors.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve lint and build errors"
```
