# Clay-Inspired Design Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply clay.global-inspired visual polish to the DHC homepage and shared elements — sticky nav, typography drama, scroll animations, borderless cards, generous spacing, and refined CTAs.

**Architecture:** CSS-first approach using Tailwind class swaps, one new `<AnimateIn>` component using `motion`, one scroll listener in the header, and one CSS keyframe. Every change is independently revertible. No structural/layout changes to page content.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, motion (framer-motion v12+)

## Global Constraints

- All changes must be independently revertible (class swaps, component wrappers)
- No color palette changes — keep existing navy (#1a1040) / magenta (#c020a0)
- No font family changes — keep Inter
- No changes to admin pages, forms, or event detail pages
- No structural/layout changes to page content
- Use `motion` package (not `framer-motion` — the package was renamed in v12)
- This project has no automated test suite — verification is visual via `npm run dev`

---

### Task 1: Install motion dependency + create AnimateIn component + float keyframe

**Files:**
- Modify: `package.json` (add `motion` dependency)
- Create: `src/components/ui/animate-in.tsx`
- Modify: `src/app/globals.css`

**Produces:**
- `AnimateIn` component: `({ children, className?, delay? }: { children: React.ReactNode; className?: string; delay?: number }) => JSX.Element`
- `animate-float` CSS class available globally

- [ ] **Step 1: Install motion**

```bash
npm install motion
```

- [ ] **Step 2: Create the AnimateIn component**

Create `src/components/ui/animate-in.tsx`:

```tsx
"use client";

import { motion } from "motion/react";

type AnimateInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function AnimateIn({ children, className, delay = 0 }: AnimateInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Add float keyframe to globals.css**

Add after the existing `body` rule in `src/app/globals.css`:

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Open http://localhost:3000 — page should load without errors. No visual changes yet.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/animate-in.tsx src/app/globals.css package.json package-lock.json
git commit -m "feat: add AnimateIn component and float keyframe for design polish"
```

---

### Task 2: Sticky nav with backdrop blur

**Files:**
- Modify: `src/components/marketing/header.tsx`

**Consumes:** Nothing from other tasks.

- [ ] **Step 1: Rewrite header.tsx**

Replace the full contents of `src/components/marketing/header.tsx`:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/summit-2026", label: "DHC26" },
  { href: "/events", label: "Past Summits" },
  { href: "/apply", label: "Apply" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border/50 text-text"
          : "bg-transparent text-white"
      }`}
    >
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
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-text-light hover:text-text"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden ${
            scrolled
              ? "text-text-light hover:text-text"
              : "text-white/80 hover:text-white"
          }`}
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
        <nav
          className={`md:hidden border-t px-4 py-4 space-y-2 ${
            scrolled
              ? "border-border/50 bg-white/80 backdrop-blur-md"
              : "border-white/10 bg-primary/90 backdrop-blur-md"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                scrolled
                  ? "text-text-light hover:bg-surface hover:text-text"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
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

- [ ] **Step 2: Verify**

Run `npm run dev`. Open http://localhost:3000.

Check:
- Header is transparent over the dark hero — logo and links are white
- Scroll down past the hero — header becomes white/blurred with dark text
- Scroll back up — header returns to transparent
- Open mobile menu in both states — styling adapts
- Header stays fixed at the top while scrolling

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/header.tsx
git commit -m "feat: sticky nav with backdrop blur and scroll-aware colors"
```

---

### Task 3: Hero typography, spacing & float animation

**Files:**
- Modify: `src/components/marketing/hero.tsx`

**Consumes:** `animate-float` CSS class from Task 1 (globals.css).

- [ ] **Step 1: Update hero.tsx**

Apply these edits to `src/components/marketing/hero.tsx`:

1. Change section padding from `py-24 sm:px-6 lg:py-32` to `py-32 sm:px-6 lg:py-40`

2. Change h1 classes from `text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl` to `text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl`

3. Condense the two body `<p>` tags (the ones with `text-white/70`) into one:

```tsx
<p className="mt-6 max-w-2xl text-lg text-white/70">
  The curated summit for the lawyers and leaders building the
  legal, governance, and trust infrastructure for healthcare AI —
  from evidence and contracting to data rights and legal operations.
</p>
```

4. Add `animate-float` class to the logo Image wrapper div. Change:
```tsx
<div className="flex-shrink-0">
```
to:
```tsx
<div className="flex-shrink-0 animate-float">
```

5. Update the ghost button border from `border border-white/20` to `border border-white/30`

- [ ] **Step 2: Verify**

Run `npm run dev`. Open http://localhost:3000.

Check:
- Hero heading is noticeably larger — dominates the viewport
- More vertical breathing room above and below the hero content
- Logo image gently floats up and down (6s cycle)
- Body text is one concise paragraph instead of two
- Ghost button border is slightly more visible

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/hero.tsx
git commit -m "feat: hero typography scale-up, spacing, and float animation"
```

---

### Task 4: Card redesign + button hover effects

**Files:**
- Modify: `src/components/ui/card.tsx`
- Modify: `src/components/ui/button.tsx`

**Consumes:** Nothing from other tasks.

- [ ] **Step 1: Update card.tsx**

In `src/components/ui/card.tsx`, change the Card component's default classes from:
```
"rounded-xl border border-border bg-white p-6 shadow-sm"
```
to:
```
"rounded-2xl bg-surface p-8 transition-colors hover:bg-surface-dark"
```

- [ ] **Step 2: Update button.tsx**

In `src/components/ui/button.tsx`, add scale effects to the base button classes. Change:
```
"inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none"
```
to:
```
"inline-flex items-center justify-center rounded-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-50 disabled:pointer-events-none"
```

Note: `transition-colors` becomes `transition-all` to include the scale transform.

- [ ] **Step 3: Verify**

Run `npm run dev`. Open http://localhost:3000.

Check:
- Cards have no borders or shadows — soft gray background, larger rounded corners, more padding
- Cards on white backgrounds show `bg-surface` (light gray)
- Hovering a card shifts it to a slightly darker gray
- Buttons scale up slightly on hover and compress on click
- Check the "Why DHC26 Matters" section — cards on `bg-surface` parent will blend in (this is expected; fixed in Task 5 with className overrides)

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/card.tsx src/components/ui/button.tsx
git commit -m "feat: borderless cards and button hover scale effects"
```

---

### Task 5: Homepage section spacing, card overrides, animation wrappers & CTA links

**Files:**
- Modify: `src/app/(public)/page.tsx`

**Consumes:**
- `AnimateIn` from `src/components/ui/animate-in.tsx` (Task 1)
- Updated `Card` from `src/components/ui/card.tsx` (Task 4)

- [ ] **Step 1: Update page.tsx**

Replace the full contents of `src/app/(public)/page.tsx`:

```tsx
import Image from "next/image";
import { Hero } from "@/components/marketing/hero";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateIn } from "@/components/ui/animate-in";
import Link from "next/link";

const whyDhc26 = [
  { title: "AI Governance", description: "Frameworks for health system AI oversight, risk management, and institutional accountability." },
  { title: "Vendor Diligence & Contracting", description: "Practical approaches to evaluating, negotiating, and contracting with healthcare AI vendors." },
  { title: "Liability & Risk Allocation", description: "Emerging liability frameworks and allocation of responsibility across the AI value chain." },
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

      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
        <AnimateIn>
          <div className="mt-8 flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="lg:flex-1">
              <h2 className="text-center text-3xl font-bold text-text">
                About Digital Health Counsel
              </h2>
              <p className="mt-6 text-text-light text-lg">
                Digital Health Counsel is a convening platform for leaders working at
                the intersection of healthcare, technology, artificial intelligence,
                law, governance, privacy, data strategy, and innovation.
              </p>
              <p className="mt-4 text-text-light">
                Healthcare AI has moved beyond the question of whether the technology
                is impressive. The next phase is about evidence, governance,
                contracting, liability allocation, data rights, product counsel,
                consumer-facing AI, legal operations, and institutional trust.
              </p>
            </div>
            <div className="flex flex-col items-center lg:w-64 shrink-0">
              <p className="text-sm font-semibold uppercase tracking-wider text-text-light">
                Founding Sponsor:
              </p>
              <div className="mt-4">
                <Image
                  src="/images/sponsors/omw-logo-blue.png"
                  alt="Ogden Murphy Wallace — Founding Sponsor"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <AnimateIn>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src="/images/landing-page-photo.jpg"
              alt="DHC 2025 summit — attendees and panelists during a session"
              fill
              className="object-cover"
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority
            />
          </div>
        </AnimateIn>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
          <AnimateIn>
            <h2 className="text-center text-3xl font-bold text-text">
              Why DHC26 Matters
            </h2>
          </AnimateIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyDhc26.map((item, i) => (
              <AnimateIn key={item.title} delay={i * 0.05}>
                <Card className="bg-white hover:bg-surface-dark h-full">
                  <CardContent>
                    <h3 className="font-semibold text-text">{item.title}</h3>
                    <p className="mt-2 text-sm text-text-light">{item.description}</p>
                  </CardContent>
                </Card>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
        <AnimateIn>
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
        </AnimateIn>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
          <AnimateIn>
            <h2 className="text-center text-3xl font-bold text-text">
              Past Summit Highlights
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-text-light">
              Digital Health Counsel has grown into a serious recurring convening
              for healthcare AI, law, policy, technology, and governance leaders.
            </p>
          </AnimateIn>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { name: "DHC23", desc: "Our inaugural summit convening healthcare AI and legal leaders." },
              { name: "DHC24", desc: "Expanded to include product counsel, privacy, and AI governance tracks." },
              { name: "DHC25", desc: "Our largest gathering with speakers from health systems, regulators, and AI companies." },
            ].map((event, i) => (
              <AnimateIn key={event.name} delay={i * 0.1}>
                <Card className="bg-white hover:bg-surface-dark h-full">
                  <CardContent>
                    <h3 className="font-semibold text-text">{event.name}</h3>
                    <p className="mt-2 text-sm text-text-light">{event.desc}</p>
                  </CardContent>
                </Card>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn>
            <div className="mt-8 text-center">
              <Link
                href="/events"
                className="group inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-dark"
              >
                View all past summits
                <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 text-center">
          <AnimateIn>
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
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
```

Key changes from the original:
- All `py-20` → `py-28`
- Each section's content wrapped in `<AnimateIn>`
- "Why DHC26" and "Past Summit" cards individually wrapped with staggered `delay`
- Cards on `bg-surface` sections get `className="bg-white hover:bg-surface-dark h-full"` override
- Arrow link uses `group` + `group-hover:translate-x-1` on the arrow
- Photo section gets `py-4` instead of no vertical padding (more float)

- [ ] **Step 2: Verify**

Run `npm run dev`. Open http://localhost:3000.

Check:
- Sections have more vertical breathing room
- Scrolling down reveals content with a smooth fade-up animation
- "Why DHC26" cards appear in a staggered sequence (left to right)
- "Past Summit" cards also stagger
- Cards on the gray sections show white backgrounds (not invisible)
- Arrow on "View all past summits" slides right on hover
- Photo has more space above and below it

- [ ] **Step 3: Commit**

```bash
git add src/app/\(public\)/page.tsx
git commit -m "feat: homepage section spacing, scroll animations, and CTA polish"
```

---

### Task 6: Footer refinement

**Files:**
- Modify: `src/components/marketing/footer.tsx`

**Consumes:** Nothing from other tasks.

- [ ] **Step 1: Update footer.tsx**

Apply these edits to `src/components/marketing/footer.tsx`:

1. Change footer's opening tag class from `bg-primary text-white mt-auto` to `bg-primary text-white mt-auto border-t border-accent/30`

2. Change inner div padding from `py-12` to `py-16`

3. Change link list spacing from `space-y-2` to `space-y-3`

4. Change copyright section from `mt-8 border-t border-white/10 pt-8` to `mt-12 border-t border-white/10 pt-8`

- [ ] **Step 2: Verify**

Run `npm run dev`. Open http://localhost:3000, scroll to the bottom.

Check:
- Thin magenta accent line visible at the very top of the footer
- More vertical space inside the footer
- Links have slightly more spacing between them
- Copyright line has more separation from the content above

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/footer.tsx
git commit -m "feat: footer spacing refinement and accent border"
```
