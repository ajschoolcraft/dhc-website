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
