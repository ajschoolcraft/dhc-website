import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send";
import { ApprovalEmail } from "@/lib/email/templates/approval";
import { formatCents } from "@/lib/utils";

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

  if (application.status !== "accepted_paid" && application.status !== "accepted_reduced") {
    return NextResponse.json(
      { error: "Application is not in an accepted-with-payment status" },
      { status: 400 }
    );
  }

  const tier = application.pricing_tiers;
  if (!tier) {
    return NextResponse.json({ error: "No pricing tier found" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const paymentUrl = `${appUrl}/pay/${id}`;

  await admin
    .from("applications")
    .update({ stripe_payment_link: paymentUrl })
    .eq("id", id);

  try {
    await sendEmail({
      to: application.email,
      subject: "DHC26 — Complete Your Registration",
      react: ApprovalEmail({
        firstName: application.first_name,
        tierName: tier.name,
        amount: formatCents(tier.price_cents),
        paymentUrl,
      }),
    });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
