import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createCheckoutSession } from "@/lib/stripe/checkout";
import { sendEmail } from "@/lib/email/send";
import { ApprovalEmail } from "@/lib/email/templates/approval";
import { formatCents } from "@/lib/utils";

type Params = { id: string };

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { status, pricing_tier_id } = body as {
    status: "approved" | "declined";
    pricing_tier_id?: string;
  };

  if (!status || !["approved", "declined"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const admin = createAdminClient();

  const { data: application, error: fetchError } = await admin
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !application) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

  if (status === "approved") {
    if (!pricing_tier_id) {
      return NextResponse.json(
        { error: "Pricing tier is required for approval" },
        { status: 400 }
      );
    }

    const { data: tier, error: tierError } = await admin
      .from("pricing_tiers")
      .select("*")
      .eq("id", pricing_tier_id)
      .single();

    if (tierError || !tier) {
      return NextResponse.json(
        { error: "Pricing tier not found" },
        { status: 400 }
      );
    }

    const paymentUrl = await createCheckoutSession({
      applicationId: id,
      applicantEmail: application.email,
      tierName: tier.name,
      priceCents: tier.price_cents,
    });

    const { error: updateError } = await admin
      .from("applications")
      .update({
        status: "approved",
        pricing_tier_id,
        stripe_payment_link: paymentUrl,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    let emailSent = true;
    try {
      await sendEmail({
        to: application.email,
        subject: "Your 2026 DHC Summit Application Has Been Approved",
        react: ApprovalEmail({
          firstName: application.first_name,
          tierName: tier.name,
          amount: formatCents(tier.price_cents),
          paymentUrl,
        }),
      });
    } catch {
      emailSent = false;
      console.error(`Failed to send approval email to ${application.email}`);
    }

    return NextResponse.json({ status: "approved", paymentUrl, emailSent });
  }

  // Declined
  const { error: updateError } = await admin
    .from("applications")
    .update({
      status: "declined",
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ status: "declined" });
}
