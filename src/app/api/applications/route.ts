import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send";
import { ApplicationReceivedEmail } from "@/lib/email/templates/application-received";
import { AdminNotificationEmail } from "@/lib/email/templates/admin-notification";
import type { ApplicationFormData } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ApplicationFormData = await request.json();

    if (
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.organization ||
      !body.role_category ||
      !body.application_types?.length ||
      !body.consent_acknowledged
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("applications")
      .insert({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone || null,
        organization: body.organization,
        organization_website: body.organization_website || null,
        title: body.title || null,
        linkedin: body.linkedin || null,
        city: body.city || null,
        state: body.state || null,
        country: body.country || null,
        application_types: body.application_types,
        role_category: body.role_category,
        topic_interests: body.topic_interests || [],
        current_role_description: body.current_role_description || null,
        questions_to_explore: body.questions_to_explore || null,
        practical_experience: body.practical_experience || null,
        speaker_topic_proposal: body.speaker_topic_proposal || null,
        registration_category: body.registration_category || null,
        reduced_fee_interest: body.reduced_fee_interest || false,
        consent_acknowledged: body.consent_acknowledged,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    try {
      await sendEmail({
        to: body.email,
        subject: "DHC26 Application Received",
        react: ApplicationReceivedEmail({ firstName: body.first_name }),
      });
    } catch (err) {
      console.error(`Failed to send confirmation email to ${body.email}`, err);
    }

    if (process.env.ADMIN_EMAIL) {
      try {
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: `New DHC26 Application: ${body.first_name} ${body.last_name}`,
          react: AdminNotificationEmail({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            organization: body.organization,
            roleCategory: body.role_category,
            applicationTypes: body.application_types,
          }),
        });
      } catch (err) {
        console.error("Failed to send admin notification email", err);
      }
    }

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
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

  return NextResponse.json(data);
}
