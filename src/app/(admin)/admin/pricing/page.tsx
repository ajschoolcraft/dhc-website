import { createAdminClient } from "@/lib/supabase/admin";
import { PricingManager } from "./pricing-manager";
import type { PricingTier } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pricing Tiers — Admin" };
export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("pricing_tiers")
    .select("*")
    .order("price_cents", { ascending: true });

  return <PricingManager initialTiers={(data ?? []) as PricingTier[]} />;
}
