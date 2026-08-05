# Clay-Inspired Design Polish — DHC Website

**Date:** 2026-08-04
**Scope:** Homepage + shared elements (nav, footer, cards)
**Approach:** CSS-first polish — all changes are Tailwind class swaps, one new component, one scroll listener, one CSS keyframe. Independently revertible.
**Inspiration:** [clay.global](https://clay.global/) — premium spacing, scroll animations, borderless content, typography drama.

---

## 1. Sticky Nav with Backdrop Blur

**File:** `src/components/marketing/header.tsx`

**Changes:**
- Add `sticky top-0 z-50` to the header element
- Add a `useEffect` scroll listener that toggles a `scrolled` state (threshold ~64px)
- Default state (over hero): `bg-transparent` — blends with the dark hero
- Scrolled state: `bg-white/80 backdrop-blur-md border-b border-border/50` with dark text (`text-text`)
- Nav link colors and logo text color swap based on scroll state
- Mobile menu adapts to match the current scroll state
- Transition: `transition-colors duration-300`

**Revert:** Remove `sticky`, remove scroll listener, restore `bg-primary`.

---

## 2. Hero Typography & Spacing

**File:** `src/components/marketing/hero.tsx`

**Changes:**
- Heading: `text-3xl sm:text-5xl lg:text-6xl` → `text-4xl sm:text-6xl lg:text-7xl`
- Maintain `tracking-tight font-bold`
- Section padding: `py-24 lg:py-32` → `py-32 lg:py-40`
- Logo image: add a gentle CSS float animation (defined in `globals.css`)
  ```css
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  ```
  Applied via class `animate-float` with `animation: float 6s ease-in-out infinite`
- Condense the two body paragraphs into one tighter paragraph

**Revert:** Swap text sizes back, remove keyframe, restore paragraphs.

---

## 3. Scroll-Reveal Animations

**New file:** `src/components/ui/animate-in.tsx`

**Implementation:**
- Install `framer-motion` as a dependency
- Create `<AnimateIn>` component:
  ```tsx
  // Client component using framer-motion
  // Props: children, className?, delay?
  // Uses motion.div with:
  //   initial={{ opacity: 0, y: 20 }}
  //   whileInView={{ opacity: 1, y: 0 }}
  //   viewport={{ once: true, margin: "-50px" }}
  //   transition={{ duration: 0.5, ease: "easeOut", delay }}
  ```
- Create `<StaggerChildren>` variant that wraps multiple items with incremental delays

**Usage in homepage (`src/app/(public)/page.tsx`):**
- Wrap each `<section>` content in `<AnimateIn>`
- Wrap the "Why DHC26" card grid children with staggered delays (0.05s increments)
- Wrap "Past Summit Highlights" cards with staggered delays

**Revert:** Remove `<AnimateIn>` wrappers, uninstall `framer-motion`.

---

## 4. Card Redesign & Section Transitions

**File:** `src/components/ui/card.tsx`

**Changes:**
- Current: `rounded-xl border border-border bg-white p-6 shadow-sm`
- New default: `rounded-2xl bg-surface p-8 transition-colors hover:bg-surface-dark`
- Remove border and shadow entirely
- On `bg-surface` parent sections (like "Why DHC26 Matters"), cards keep `bg-white` so they remain visible — this is handled via the existing `className` prop override at the call site, not a Card component change
- `CardContent` unchanged

**File:** `src/app/(public)/page.tsx`

**Changes:**
- Section padding: `py-20` → `py-28` on all sections
- The `bg-surface` sections keep their background but gain extra top/bottom padding
- Full-page photo section: increase vertical margin for more float

**Revert:** Restore card classes to original border/shadow style, restore `py-20`.

---

## 5. CTAs & Link Styling

**Files:** `src/app/(public)/page.tsx`, `src/components/ui/button.tsx`

**Changes:**
- Arrow links ("View all past summits →"): wrap in a `group` div, arrow gets `transition-transform group-hover:translate-x-1`
- Button component: add `hover:scale-[1.02] active:scale-[0.98] transition-transform` to base styles
- Hero ghost button: update border to `border-white/30` with `hover:bg-white/10`

**Revert:** Remove hover utility classes from links, remove scale from button base.

---

## 6. Footer Refinement

**File:** `src/components/marketing/footer.tsx`

**Changes:**
- Padding: `py-12` → `py-16`
- Add `border-t border-accent/30` above the footer (thin magenta accent line)
- Link spacing: `space-y-2` → `space-y-3`
- Copyright separator: `mt-8 pt-8` → `mt-12 pt-8` for more separation

**Revert:** Swap padding/spacing classes back, remove accent border.

---

## Dependencies

- **Add:** `framer-motion` (for scroll-reveal animations only)
- **No other new dependencies**

## Files Changed (Summary)

| File | Type of change |
|---|---|
| `src/components/marketing/header.tsx` | Sticky nav + scroll listener |
| `src/components/marketing/hero.tsx` | Typography scale + spacing |
| `src/components/marketing/footer.tsx` | Spacing + accent border |
| `src/components/ui/card.tsx` | Remove borders/shadows |
| `src/components/ui/button.tsx` | Hover scale effect |
| `src/components/ui/animate-in.tsx` | **New** — scroll reveal wrapper |
| `src/app/(public)/page.tsx` | Section spacing + animation wrappers |
| `src/app/globals.css` | Float keyframe animation |

## Out of Scope

- No structural/layout changes to page content
- No changes to admin pages
- No changes to forms
- No changes to event detail pages (dhc-2023, dhc-2024, etc.)
- No color palette changes — keeping existing navy/magenta brand
- No font family changes — keeping Inter
