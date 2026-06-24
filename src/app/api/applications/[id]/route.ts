import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createCheckoutSession } from "@/lib/stripe/checkout";
import { sendEmail } from "@/lib/email/send";
import { ApprovalEmail } from "@/lib/email/templates/approval";
import { formatCents } from "@/lib/utils";
import type { ApplicationStatus } from "@/types";

const VALID_STATUSES: ApplicationStatus[] = [
  "new", "needs_review",
  "accepted_complimentary", "accepted_reduced", "accepted_paid",
  "speaker_consideration", "sponsor_followup",
  "waitlist", "declined", "needs_more_info",
  "registered", "withdrawn",
];

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
    status: ApplicationStatus;
    pricing_tier_id?: string;
  };

  if (!status || !VALID_STATUSES.includes(status)) {
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

  // Acceptance with payment
  if (status === "accepted_paid" || status === "accepted_reduced") {
    if (!pricing_tier_id) {
      return NextResponse.json(
        { error: "Pricing tier is required for paid acceptance" },
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
        status,
        pricing_tier_id,
        stripe_payment_link: paymentUrl,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    let emailSent = true;
    try {
      await sendEmail({
        to: application.email,
        subject: "Your DHC26 Application Has Been Accepted",
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

    return NextResponse.json({ status, paymentUrl, emailSent });
  }

  // Complimentary acceptance — no payment
  if (status === "accepted_complimentary") {
    const { error: updateError } = await admin
      .from("applications")
      .update({
        status,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    let emailSent = true;
    try {
      await sendEmail({
        to: application.email,
        subject: "Your DHC26 Application Has Been Accepted",
        react: ApprovalEmail({
          firstName: application.first_name,
          tierName: "Complimentary",
          amount: "Complimentary",
          paymentUrl: null,
        }),
      });
    } catch {
      emailSent = false;
      console.error(`Failed to send approval email to ${application.email}`);
    }

    return NextResponse.json({ status, emailSent });
  }

  // All other status changes
  const { error: updateError } = await admin
    .from("applications")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ status });
}
