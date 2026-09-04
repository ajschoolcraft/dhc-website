import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Application } from "@/types";
import {
  APPLICATION_TYPES,
  DIETARY_RESTRICTIONS,
  ROLE_CATEGORIES,
  TOPIC_INTERESTS,
} from "@/types";

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function lookupLabel(
  options: readonly { value: string; label: string }[],
  value: string
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const applications = data as Application[];

  const headers = [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Title",
    "Organization",
    "Organization Website",
    "LinkedIn",
    "City",
    "State",
    "Country",
    "Application Types",
    "Role Category",
    "Topic Interests",
    "Current Role Description",
    "Questions to Explore",
    "Practical Experience",
    "Speaker Topic Proposal",
    "Registration Category",
    "Dietary Restrictions",
    "Dietary Restrictions (Other)",
    "Reduced Fee Interest",
    "Status",
    "Submitted",
    "Reviewed",
    "Paid",
  ];

  const rows = applications.map((app) => [
    app.first_name,
    app.last_name,
    app.email,
    app.phone ?? "",
    app.title ?? "",
    app.organization,
    app.organization_website ?? "",
    app.linkedin ?? "",
    app.city ?? "",
    app.state ?? "",
    app.country ?? "",
    (app.application_types ?? [])
      .map((v) => lookupLabel(APPLICATION_TYPES, v))
      .join("; "),
    lookupLabel(ROLE_CATEGORIES, app.role_category),
    (app.topic_interests ?? [])
      .map((v) => lookupLabel(TOPIC_INTERESTS, v))
      .join("; "),
    app.current_role_description ?? "",
    app.questions_to_explore ?? "",
    app.practical_experience ?? "",
    app.speaker_topic_proposal ?? "",
    app.registration_category?.replace(/_/g, " ") ?? "",
    (app.dietary_restrictions ?? [])
      .map((v) => lookupLabel(DIETARY_RESTRICTIONS, v))
      .join("; "),
    app.dietary_restrictions_other ?? "",
    app.reduced_fee_interest ? "Yes" : "No",
    app.status,
    app.created_at,
    app.reviewed_at ?? "",
    app.paid_at ?? "",
  ]);

  const csv = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) => row.map(escapeCsv).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dhc-applications-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
