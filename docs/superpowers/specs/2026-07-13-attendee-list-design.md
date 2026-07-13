# Attendee List Feature — Design Spec

## Overview

Add a public "Who's Attending" feature to the DHC website so prospective applicants and accepted attendees can see who has already registered for DHC26. This creates social proof and drives registrations.

## Requirements

- **Visibility:** Fully public (no auth required). May be gated to approved applicants in the future.
- **Display fields:** First name, last name, title, organization.
- **Consent model:** Registered attendees are listed by default (`show_on_attendee_list = true`). They can request removal by contacting the admin, who toggles the flag.
- **Eligibility:** Only attendees with status `registered` (paid) appear from the applications table.
- **Manual additions:** Admins can add speakers, guests, or anyone else who didn't go through the application flow via a `featured_attendees` table.
- **Placement:** Dedicated `/attendees` page linked from the nav, plus a preview section on the `/summit-2026` page.

## Data Layer

### Migration: `003_attendee_list.sql`

**New column on `applications`:**

```sql
ALTER TABLE applications ADD COLUMN show_on_attendee_list boolean NOT NULL DEFAULT true;
```

**New table `featured_attendees`:**

```sql
CREATE TABLE featured_attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  title text,
  organization text NOT NULL,
  added_by text
);
```

- RLS: admin-only write access (authenticated users), no anonymous access to the raw table.

**New view `public_attendees`:**

```sql
CREATE VIEW public_attendees AS
  SELECT first_name, last_name, title, organization
  FROM applications
  WHERE status = 'registered' AND show_on_attendee_list = true
UNION ALL
  SELECT first_name, last_name, title, organization
  FROM featured_attendees;
```

- Anonymous read access to the view only.
- Only the 4 display fields are exposed — no email, phone, or other PII.

### RLS Policies

- `featured_attendees`: authenticated users can insert/update/delete. No anonymous access.
- `public_attendees` view: Supabase does not support RLS on views directly. Expose the view data via a Postgres function (`get_public_attendees()`) with `SECURITY DEFINER` that returns the view contents. The frontend calls this via `supabase.rpc('get_public_attendees')`.

## Frontend — Dedicated Page (`/attendees`)

- **Route:** `src/app/(public)/attendees/page.tsx`
- **Type:** Server component, queries `public_attendees` view.
- **Layout:** Grid of attendee cards — 1 column mobile, 2 tablet, 3 desktop.
- **Card content:** Name (bold), title and organization below in lighter text. Uses existing Card component style.
- **Sorting:** Alphabetical by last name.
- **Header:** Shows attendee count (e.g., "42 Confirmed Attendees").
- **Empty state:** "Registered attendees will appear here as registrations are confirmed."
- **CTA:** Apply button at the bottom of the page.
- **Nav:** Added to the header nav links.

## Frontend — Summit Page Preview Section

- **Location:** New section on `/summit-2026`, below "Application Process" and above the CTAs.
- **Heading:** "Who's Attending"
- **Content:** First 6 attendee cards in the same grid/card style.
- **Link:** "View all N attendees" pointing to `/attendees`.
- **Empty behavior:** Section is hidden entirely if no attendees are registered yet.

## Admin — Featured Attendees Management

- **Route:** `src/app/(admin)/admin/attendees/page.tsx`
- **Purpose:** Add/remove manually-featured attendees (speakers, guests, etc.).
- **Form fields:** First name, last name, title, organization.
- **Table:** Lists current featured attendees with a remove button.
- **Auth:** Uses existing admin layout and authentication patterns.
- **Opt-out handling:** Admin toggles `show_on_attendee_list` on the applications table for registered attendees who request removal. No self-service UI for attendees at this time.

## Data Access

- **Public pages:** Server components call `supabase.rpc('get_public_attendees')` directly — no API route needed (consistent with existing patterns).
- **Admin page:** Server component queries `featured_attendees` table directly for the listing. Mutations use API routes:
  - `POST /api/admin/featured-attendees` — adds a featured attendee.
  - `DELETE /api/admin/featured-attendees/[id]` — removes a featured attendee.

## Types

```typescript
export type PublicAttendee = {
  first_name: string;
  last_name: string;
  title: string | null;
  organization: string;
};

export type FeaturedAttendee = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  title: string | null;
  organization: string;
  added_by: string | null;
};
```

## Future Considerations

- **Auth gate:** Wrap the attendee list query in an auth check to restrict to approved applicants only.
- **Search/filter:** Add client-side search if the list exceeds ~200 attendees.
- **Speakers table union:** When Phase 2 speakers/sessions management is built, the `public_attendees` view can be extended with a UNION from the speakers table, replacing or supplementing `featured_attendees`.
- **Self-service opt-out:** Add a `show_on_attendee_list` checkbox to the registration flow when self-service registration is built.
