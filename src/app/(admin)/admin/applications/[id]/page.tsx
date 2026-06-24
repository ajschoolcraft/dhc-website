"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TierSelector } from "@/components/admin/tier-selector";
import { formatDate } from "@/lib/utils";
import {
  STATUS_LABELS,
  APPLICATION_TYPES,
  ROLE_CATEGORIES,
  TOPIC_INTERESTS,
} from "@/types";
import type { Application, ApplicationStatus, PricingTier } from "@/types";

const STATUS_OPTIONS: ApplicationStatus[] = [
  "new", "needs_review",
  "accepted_complimentary", "accepted_reduced", "accepted_paid",
  "speaker_consideration", "sponsor_followup",
  "waitlist", "declined", "needs_more_info",
  "registered", "withdrawn",
];

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [application, setApplication] = useState<Application | null>(null);
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>("new");
  const [selectedTier, setSelectedTier] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      supabase.from("applications").select("*").eq("id", id).single(),
      supabase.from("pricing_tiers").select("*").eq("active", true),
    ]).then(([appRes, tiersRes]) => {
      if (cancelled) return;
      if (appRes.data) {
        const app = appRes.data as Application;
        setApplication(app);
        setSelectedStatus(app.status);
      }
      if (tiersRes.data) setTiers(tiersRes.data as PricingTier[]);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [id, supabase]);

  const needsTier = selectedStatus === "accepted_paid" || selectedStatus === "accepted_reduced";

  async function handleUpdateStatus() {
    setActionLoading(true);
    setError("");

    const body: Record<string, string> = { status: selectedStatus };
    if (needsTier) {
      if (!selectedTier) {
        setError("Please select a pricing tier.");
        setActionLoading(false);
        return;
      }
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

  if (loading) return <p className="text-text-light">Loading...</p>;
  if (!application) return <p className="text-text-light">Application not found.</p>;

  const roleName = ROLE_CATEGORIES.find((r) => r.value === application.role_category)?.label ?? application.role_category;
  const appTypeNames = application.application_types
    .map((t) => APPLICATION_TYPES.find((at) => at.value === t)?.label ?? t);
  const topicNames = application.topic_interests
    .map((t) => TOPIC_INTERESTS.find((ti) => ti.value === t)?.label ?? t);

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">
          {application.first_name} {application.last_name}
        </h1>
        <Badge variant={statusBadgeVariant(application.status)}>
          {STATUS_LABELS[application.status] ?? application.status}
        </Badge>
      </div>

      <Card>
        <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Detail label="Email" value={application.email} />
          <Detail label="Phone" value={application.phone || "—"} />
          <Detail label="Organization" value={application.organization} />
          <Detail label="Website" value={application.organization_website || "—"} />
          <Detail label="Title" value={application.title || "—"} />
          <Detail label="LinkedIn" value={application.linkedin || "—"} />
          <Detail label="Location" value={[application.city, application.state, application.country].filter(Boolean).join(", ") || "—"} />
          <Detail label="Submitted" value={formatDate(application.created_at)} />
          {application.reviewed_at && <Detail label="Reviewed" value={formatDate(application.reviewed_at)} />}
          {application.paid_at && <Detail label="Paid" value={formatDate(application.paid_at)} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Application Details</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Detail label="Application Type" value={appTypeNames.join(", ") || "—"} />
          <Detail label="Role Category" value={roleName} />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-light">Topic Interests</p>
            {topicNames.length > 0 ? (
              <div className="mt-1 flex flex-wrap gap-1">
                {topicNames.map((name) => (
                  <Badge key={name} variant="default">{name}</Badge>
                ))}
              </div>
            ) : (
              <p className="mt-0.5 text-sm text-text">—</p>
            )}
          </div>
          <Detail label="Registration Category" value={application.registration_category?.replace(/_/g, " ") || "—"} />
          <Detail label="Reduced Fee Interest" value={application.reduced_fee_interest ? "Yes" : "No"} />
        </CardContent>
      </Card>

      {(application.current_role_description || application.questions_to_explore || application.practical_experience || application.speaker_topic_proposal) && (
        <Card>
          <CardHeader><CardTitle>Responses</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {application.current_role_description && (
              <LongDetail label="Current Role & Relevance" value={application.current_role_description} />
            )}
            {application.questions_to_explore && (
              <LongDetail label="Questions to Explore" value={application.questions_to_explore} />
            )}
            {application.practical_experience && (
              <LongDetail label="Practical Experience to Share" value={application.practical_experience} />
            )}
            {application.speaker_topic_proposal && (
              <LongDetail label="Speaker Topic Proposal" value={application.speaker_topic_proposal} />
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Update Status</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-text mb-1">
              Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ApplicationStatus)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>

          {needsTier && (
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Pricing Tier (required)
              </label>
              <TierSelector tiers={tiers} value={selectedTier} onChange={setSelectedTier} />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            onClick={handleUpdateStatus}
            disabled={actionLoading || selectedStatus === application.status}
          >
            {actionLoading ? "Updating..." : "Update Status"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-text-light">{label}</p>
      <p className="mt-0.5 text-sm text-text">{value}</p>
    </div>
  );
}

function LongDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-text-light">{label}</p>
      <p className="mt-1 text-sm text-text whitespace-pre-wrap">{value}</p>
    </div>
  );
}
