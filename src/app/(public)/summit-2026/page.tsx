import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import { AttendeeCard } from "@/components/marketing/attendee-card";
import type { PublicAttendee } from "@/types";

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

  const supabase = createAdminClient();
  const { data: attendeeData } = await supabase.rpc("get_public_attendees");
  const attendees = (attendeeData ?? []) as PublicAttendee[];

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
      </section>

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

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/apply">
          <Button size="lg">Apply to Attend / Speak / Participate</Button>
        </Link>
        <Link href="/sponsorship">
          <Button size="lg" variant="secondary">Sponsor Inquiry</Button>
        </Link>
      </div>
    </div>
  );
}
