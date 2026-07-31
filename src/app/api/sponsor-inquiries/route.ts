import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send";
import { SponsorInquiryNotificationEmail } from "@/lib/email/templates/sponsor-inquiry-notification";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.organization) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: body.name,
      email: body.email,
      message: body.message || `Sponsor inquiry: ${body.sponsor_level_interest || "General interest"}`,
      type: "sponsorship",
      organization: body.organization,
      phone: body.phone || null,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const recipients = [process.env.ADMIN_EMAIL, process.env.FOUNDER_EMAIL].filter(Boolean) as string[];
    if (recipients.length > 0) {
      try {
        await sendEmail({
          to: recipients,
          subject: `New Sponsor Inquiry: ${body.name} — ${body.organization}`,
          react: SponsorInquiryNotificationEmail({
            name: body.name,
            email: body.email,
            organization: body.organization,
            phone: body.phone,
            message: body.message,
          }),
        });
      } catch (err) {
        console.error("Failed to send sponsor inquiry notification email", err);
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
