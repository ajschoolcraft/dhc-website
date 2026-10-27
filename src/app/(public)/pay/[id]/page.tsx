import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createCheckoutSession } from "@/lib/stripe/checkout";

export const dynamic = "force-dynamic";

type Params = { id: string };

export default async function PayPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: application } = await supabase
    .from("applications")
    .select("*, pricing_tiers(*)")
    .eq("id", id)
    .single();

  if (!application) {
    redirect("/?payment=invalid");
  }

  if (application.status === "registered") {
    redirect("/?payment=already_registered");
  }

  if (
    application.status !== "accepted_paid" &&
    application.status !== "accepted_reduced"
  ) {
    redirect("/?payment=invalid");
  }

  const tier = application.pricing_tiers;
  if (!tier) {
    redirect("/?payment=invalid");
  }

  const checkoutUrl = await createCheckoutSession({
    applicationId: application.id,
    applicantEmail: application.email,
    tierName: tier.name,
    priceCents: tier.price_cents,
  });

  redirect(checkoutUrl);
}
