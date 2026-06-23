import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
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
