# Attendee List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public "Who's Attending" feature showing registered attendees to create social proof and drive registrations.

**Architecture:** A Postgres view (`public_attendees`) unions registered applications with a manually-managed `featured_attendees` table. A Postgres function exposes the view for anonymous access. The frontend queries via `supabase.rpc()` in server components. A dedicated `/attendees` page shows the full list; a preview section on `/summit-2026` shows the first 6.

**Tech Stack:** Next.js 16, Supabase (Postgres + RLS), Tailwind CSS 4, TypeScript

## Global Constraints

- All database changes go in numbered migration files under `supabase/migrations/`.
- Use `createAdminClient()` from `@/lib/supabase/admin` for server-side writes.
- Use `createClient()` from `@/lib/supabase/server` for auth-gated reads.
- Public pages are server components under `src/app/(public)/`.
- Admin pages are server components under `src/app/(admin)/admin/`.
- Admin API routes authenticate via `supabase.auth.getUser()` and return 401 if no user.
- Types live in `src/types/index.ts`.
- UI components follow existing Card/Table/Button patterns in `src/components/ui/`.
- Styling uses Tailwind with custom theme tokens: `text`, `text-light`, `accent`, `primary`, `border`, `surface`.

---

### Task 1: Database Migration

**Files:**
- Create: `supabase/migrations/003_attendee_list.sql`

**Interfaces:**
- Consumes: existing `applications` table with `status` column
- Produces: `show_on_attendee_list` column on `applications`, `featured_attendees` table, `public_attendees` view, `get_public_attendees()` RPC function

- [ ] **Step 1: Create the migration file**

```sql
-- Add opt-out column to applications
ALTER TABLE applications ADD COLUMN show_on_attendee_list boolean NOT NULL DEFAULT true;

-- Table for manually-added attendees (speakers, guests, etc.)
CREATE TABLE featured_attendees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  title text,
  organization text NOT NULL,
  added_by text
);

ALTER TABLE featured_attendees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage featured attendees"
  ON featured_attendees FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- View that unions both sources (only public display fields)
CREATE VIEW public_attendees AS
  SELECT first_name, last_name, title, organization
  FROM applications
  WHERE status = 'registered' AND show_on_attendee_list = true
UNION ALL
  SELECT first_name, last_name, title, organization
  FROM featured_attendees;

-- RPC function for anonymous access (Supabase doesn't support RLS on views)
CREATE OR REPLACE FUNCTION get_public_attendees()
RETURNS TABLE (
  first_name text,
  last_name text,
  title text,
  organization text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT first_name, last_name, title, organization
  FROM public_attendees
  ORDER BY last_name, first_name;
$$;
```

- [ ] **Step 2: Apply the migration to the Supabase database**

Run the migration SQL against the database via the Supabase dashboard SQL editor or CLI:

```bash
npx supabase db push
```

Or paste the SQL into the Supabase dashboard SQL Editor and run it.

- [ ] **Step 3: Verify the migration**

Run this query in the Supabase SQL Editor to confirm everything works:

```sql
SELECT * FROM get_public_attendees();
```

Expected: empty result set (no registered attendees yet), no errors.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/003_attendee_list.sql
git commit -m "feat: add attendee list migration (view, featured table, RPC)"
```

---

### Task 2: TypeScript Types

**Files:**
- Modify: `src/types/index.ts`

**Interfaces:**
- Consumes: database schema from Task 1
- Produces: `PublicAttendee` type, `FeaturedAttendee` type (used by Tasks 3-6)

- [ ] **Step 1: Add the new types to `src/types/index.ts`**

Add after the existing `ContactFormData` type (around line 96):

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

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add PublicAttendee and FeaturedAttendee types"
```

---

### Task 3: Attendee Card Component

**Files:**
- Create: `src/components/marketing/attendee-card.tsx`

**Interfaces:**
- Consumes: `PublicAttendee` from `src/types/index.ts`
- Produces: `AttendeeCard` component — `({ attendee: PublicAttendee }) => JSX.Element`

- [ ] **Step 1: Create the attendee card component**

Create `src/components/marketing/attendee-card.tsx`:

```tsx
import { Card } from "@/components/ui/card";
import type { PublicAttendee } from "@/types";

type AttendeeCardProps = {
  attendee: PublicAttendee;
};

export function AttendeeCard({ attendee }: AttendeeCardProps) {
  return (
    <Card className="p-4">
      <p className="font-semibold text-text">
        {attendee.first_name} {attendee.last_name}
      </p>
      {attendee.title && (
        <p className="mt-1 text-sm text-text-light">{attendee.title}</p>
      )}
      <p className="mt-1 text-sm text-text-light">{attendee.organization}</p>
    </Card>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/marketing/attendee-card.tsx
git commit -m "feat: add AttendeeCard component"
```

---

### Task 4: Dedicated `/attendees` Page and Nav Link

**Files:**
- Create: `src/app/(public)/attendees/page.tsx`
- Modify: `src/components/marketing/header.tsx` (add nav link)

**Interfaces:**
- Consumes: `get_public_attendees` RPC (Task 1), `AttendeeCard` (Task 3), `PublicAttendee` (Task 2)
- Produces: public `/attendees` route

- [ ] **Step 1: Create the attendees page**

Create `src/app/(public)/attendees/page.tsx`:

```tsx
import { createAdminClient } from "@/lib/supabase/admin";
import { AttendeeCard } from "@/components/marketing/attendee-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { PublicAttendee } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attendees — DHC26",
  description:
    "See who is attending the 2026 Digital Health Counsel AI Summit.",
};

export const dynamic = "force-dynamic";

export default async function AttendeesPage() {
  const supabase = createAdminClient();

  const { data } = await supabase.rpc("get_public_attendees");

  const attendees = (data ?? []) as PublicAttendee[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          DHC26
        </p>
        <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
          Who&rsquo;s Attending
        </h1>
        <p className="mt-4 text-text-light">
          {attendees.length > 0
            ? `${attendees.length} confirmed attendee${attendees.length === 1 ? "" : "s"} for the 2026 Digital Health Counsel AI Summit.`
            : "Registered attendees will appear here as registrations are confirmed."}
        </p>
      </div>

      {attendees.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {attendees.map((attendee, i) => (
            <AttendeeCard key={i} attendee={attendee} />
          ))}
        </div>
      )}

      <div className="mt-12">
        <Link href="/apply">
          <Button size="lg">Apply to Attend DHC26</Button>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add "Attendees" to the header nav**

In `src/components/marketing/header.tsx`, add the attendees link to the `navLinks` array. Insert it after the "DHC26" entry:

Change:

```typescript
const navLinks = [
  { href: "/summit-2026", label: "DHC26" },
  { href: "/events", label: "Past Summits" },
  { href: "/apply", label: "Apply" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/contact", label: "Contact" },
];
```

To:

```typescript
const navLinks = [
  { href: "/summit-2026", label: "DHC26" },
  { href: "/attendees", label: "Attendees" },
  { href: "/events", label: "Past Summits" },
  { href: "/apply", label: "Apply" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/contact", label: "Contact" },
];
```

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Run the dev server and verify**

```bash
npm run dev
```

Visit `http://localhost:3000/attendees`. Expected: page renders with heading, empty-state message, and CTA button. Nav bar shows "Attendees" link.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(public\)/attendees/page.tsx src/components/marketing/header.tsx
git commit -m "feat: add /attendees page and nav link"
```

---

### Task 5: Summit Page Preview Section

**Files:**
- Modify: `src/app/(public)/summit-2026/page.tsx`

**Interfaces:**
- Consumes: `get_public_attendees` RPC (Task 1), `AttendeeCard` (Task 3), `PublicAttendee` (Task 2)
- Produces: "Who's Attending" section on the summit page (hidden when empty)

- [ ] **Step 1: Add the attendee preview section to the summit page**

In `src/app/(public)/summit-2026/page.tsx`, add imports at the top:

```typescript
import { createAdminClient } from "@/lib/supabase/admin";
import { AttendeeCard } from "@/components/marketing/attendee-card";
import type { PublicAttendee } from "@/types";
```

Add data fetching at the start of the component function body, right after `const { payment } = await searchParams;`:

```typescript
  const supabase = createAdminClient();
  const { data: attendeeData } = await supabase.rpc("get_public_attendees");
  const attendees = (attendeeData ?? []) as PublicAttendee[];
```

Add this section between the "Application Process" `</section>` closing tag (line ~125) and the CTA `<div>` with the buttons (line ~126). Move the CTA div below this new section:

```tsx
      {attendees.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-text">Who&rsquo;s Attending</h2>
          <p className="mt-2 text-text-light">
            {attendees.length} confirmed attendee{attendees.length === 1 ? "" : "s"}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {attendees.slice(0, 6).map((attendee, i) => (
              <AttendeeCard key={i} attendee={attendee} />
            ))}
          </div>
          {attendees.length > 6 && (
            <Link
              href="/attendees"
              className="mt-6 inline-block text-sm font-medium text-accent hover:underline"
            >
              View all {attendees.length} attendees &rarr;
            </Link>
          )}
        </section>
      )}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify in the browser**

Visit `http://localhost:3000/summit-2026`. When no attendees exist, the section should be hidden. (We'll test with real data after Task 6.)

- [ ] **Step 4: Commit**

```bash
git add src/app/\(public\)/summit-2026/page.tsx
git commit -m "feat: add attendee preview section to summit page"
```

---

### Task 6: Admin Featured Attendees Page and API Routes

**Files:**
- Create: `src/app/(admin)/admin/attendees/page.tsx`
- Create: `src/app/api/admin/featured-attendees/route.ts`
- Create: `src/app/api/admin/featured-attendees/[id]/route.ts`
- Modify: `src/components/admin/sidebar.tsx` (add nav link)

**Interfaces:**
- Consumes: `FeaturedAttendee` type (Task 2), `createAdminClient` and `createClient` (existing libs)
- Produces: admin UI for adding/removing featured attendees, API routes for mutations

- [ ] **Step 1: Create the POST API route**

Create `src/app/api/admin/featured-attendees/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { first_name, last_name, title, organization } = body as {
    first_name: string;
    last_name: string;
    title?: string;
    organization: string;
  };

  if (!first_name || !last_name || !organization) {
    return NextResponse.json(
      { error: "First name, last name, and organization are required" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("featured_attendees")
    .insert({
      first_name,
      last_name,
      title: title || null,
      organization,
      added_by: user.email ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
```

- [ ] **Step 2: Create the DELETE API route**

Create `src/app/api/admin/featured-attendees/[id]/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

type Params = { id: string };

export async function DELETE(
  _request: NextRequest,
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
  const admin = createAdminClient();

  const { error } = await admin
    .from("featured_attendees")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 3: Create the admin attendees page**

Create `src/app/(admin)/admin/attendees/page.tsx`:

```tsx
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { FeaturedAttendeeForm } from "./featured-attendee-form";
import type { FeaturedAttendee } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Attendees — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminAttendeesPage() {
  const supabase = createAdminClient();

  const { data: featured } = await supabase
    .from("featured_attendees")
    .select("*")
    .order("last_name", { ascending: true });

  const { data: attendeeData } = await supabase.rpc("get_public_attendees");

  const featuredAttendees = (featured ?? []) as FeaturedAttendee[];
  const totalCount = (attendeeData ?? []).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text">Attendees</h1>
        <p className="mt-1 text-sm text-text-light">
          {totalCount} attendee{totalCount === 1 ? "" : "s"} visible on the
          public list
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Featured Attendee</CardTitle>
        </CardHeader>
        <CardContent>
          <FeaturedAttendeeForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Featured Attendees ({featuredAttendees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {featuredAttendees.length === 0 ? (
            <p className="text-sm text-text-light py-4 text-center">
              No featured attendees added yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featuredAttendees.map((attendee) => (
                  <FeaturedAttendeeRow
                    key={attendee.id}
                    attendee={attendee}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function FeaturedAttendeeRow({ attendee }: { attendee: FeaturedAttendee }) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {attendee.first_name} {attendee.last_name}
      </TableCell>
      <TableCell className="text-sm text-text-light">
        {attendee.title ?? "—"}
      </TableCell>
      <TableCell>{attendee.organization}</TableCell>
      <TableCell className="text-sm text-text-light">
        {formatDate(attendee.created_at)}
      </TableCell>
      <TableCell>
        <RemoveButton id={attendee.id} />
      </TableCell>
    </TableRow>
  );
}

function RemoveButton({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        "use server";
        const { createAdminClient } = await import("@/lib/supabase/admin");
        const supabase = createAdminClient();
        await supabase.from("featured_attendees").delete().eq("id", id);
        const { revalidatePath } = await import("next/cache");
        revalidatePath("/admin/attendees");
        revalidatePath("/attendees");
        revalidatePath("/summit-2026");
      }}
    >
      <button
        type="submit"
        className="text-sm text-red-600 hover:text-red-800 hover:underline"
      >
        Remove
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Create the featured attendee form (client component)**

Create `src/app/(admin)/admin/attendees/featured-attendee-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FeaturedAttendeeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/admin/featured-attendees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        title: formData.get("title"),
        organization: formData.get("organization"),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to add attendee");
      setLoading(false);
      return;
    }

    form.reset();
    setLoading(false);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="first_name" placeholder="First name" required />
        <Input name="last_name" placeholder="Last name" required />
        <Input name="title" placeholder="Title (optional)" />
        <Input name="organization" placeholder="Organization" required />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Featured Attendee"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 5: Add "Attendees" to the admin sidebar**

In `src/components/admin/sidebar.tsx`, add to the `navItems` array after "Applications":

Change:

```typescript
const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/contact", label: "Contact" },
];
```

To:

```typescript
const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/attendees", label: "Attendees" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/contact", label: "Contact" },
];
```

- [ ] **Step 6: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Test the full flow in the browser**

1. Visit `http://localhost:3000/admin/attendees`. Verify the form and empty table render.
2. Add a featured attendee via the form. Verify it appears in the table.
3. Visit `http://localhost:3000/attendees`. Verify the featured attendee appears.
4. Visit `http://localhost:3000/summit-2026`. Verify the "Who's Attending" section appears with the attendee.
5. Go back to admin and click "Remove". Verify the attendee disappears from all pages.

- [ ] **Step 8: Commit**

```bash
git add src/app/\(admin\)/admin/attendees/ src/app/api/admin/featured-attendees/ src/components/admin/sidebar.tsx
git commit -m "feat: add admin featured attendees page and API routes"
```
