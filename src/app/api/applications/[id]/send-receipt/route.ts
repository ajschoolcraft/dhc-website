import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send";
import { PaymentReceiptEmail } from "@/lib/email/templates/payment-receipt";
import { formatCents, formatDate } from "@/lib/utils";

type Params = { id: string };

export async function POST(
  _request: NextRequest,
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
  const admin = createAdminClient();

  const { data: application, error: fetchError } = await admin
    .from("applications")
    .select("*, pricing_tiers(*)")
    .eq("id", id)
    .single();

  if (fetchError || !application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  if (application.status !== "registered") {
    return NextResponse.json(
      { error: "Application has not completed payment" },
      { status: 400 }
    );
  }

  const tier = application.pricing_tiers;
  const isComplimentary = !tier;

  try {
    await sendEmail({
      to: application.email,
      cc: "akondepudi@omwlaw.com",
      subject: isComplimentary
        ? "Registration Confirmation — 2026 DHC Summit"
        : "Payment Receipt — 2026 DHC Summit Registration",
      react: PaymentReceiptEmail({
        firstName: application.first_name,
        lastName: application.last_name,
        organization: application.organization,
        tierName: isComplimentary ? "Complimentary" : tier.name,
        amount: isComplimentary ? "Complimentary" : formatCents(tier.price_cents),
        paidAt: formatDate(application.paid_at),
      }),
    });
  } catch {
    return NextResponse.json({ error: "Failed to send receipt" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
