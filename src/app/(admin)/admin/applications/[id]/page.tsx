import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Application, PricingTier } from "@/types";
import type { Metadata } from "next";
import { ApplicationDetail } from "./application-detail";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("applications")
    .select("first_name, last_name")
    .eq("id", id)
    .single();

  return {
    title: data ? `${data.first_name} ${data.last_name}` : "Application",
  };
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [appRes, tiersRes] = await Promise.all([
    supabase.from("applications").select("*").eq("id", id).single(),
    supabase.from("pricing_tiers").select("*").eq("active", true),
  ]);

  if (!appRes.data) notFound();

  return (
    <ApplicationDetail
      application={appRes.data as Application}
      tiers={(tiersRes.data ?? []) as PricingTier[]}
    />
  );
}
