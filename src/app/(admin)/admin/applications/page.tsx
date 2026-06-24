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
