import { NextRequest, NextResponse } from "next/server";
import { createStripeClient } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send";
import { PaymentConfirmedEmail } from "@/lib/email/templates/payment-confirmed";
import { formatCents } from "@/lib/utils";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const stripe = createStripeClient();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const applicationId = session.metadata?.application_id;

    if (!applicationId) {
      return NextResponse.json({ error: "Missing application ID" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: application, error: fetchError } = await supabase
      .from("applications")
      .select("*, pricing_tiers(*)")
      .eq("id", applicationId)
      .single();

    if (fetchError || !application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const { error: updateError } = await supabase
      .from("applications")
      .update({
        status: "paid",
        stripe_session_id: session.id,
        paid_at: new Date().toISOString(),
      })
      .eq("id", applicationId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    const tier = application.pricing_tiers;

    await sendEmail({
      to: application.email,
      subject: "Payment Confirmed — 2026 DHC Summit Registration",
      react: PaymentConfirmedEmail({
        firstName: application.first_name,
        tierName: tier?.name ?? "General",
        amount: formatCents(tier?.price_cents ?? 0),
      }),
    });
  }

  return NextResponse.json({ received: true });
}
