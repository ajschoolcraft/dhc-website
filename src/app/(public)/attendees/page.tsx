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
