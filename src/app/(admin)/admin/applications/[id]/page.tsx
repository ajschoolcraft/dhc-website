"use client";

import { useEffect, useMemo, useState } from "react";
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
  const supabase = useMemo(() => createClient(), []);

  const [application, setApplication] = useState<Application | null>(null);
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [selectedTier, setSelectedTier] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

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
      setError(data.error || "Something went wrong");
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
            {error && <p className="text-sm text-red-600">{error}</p>}
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
