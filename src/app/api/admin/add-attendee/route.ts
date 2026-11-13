import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    first_name,
    last_name,
    email,
    title,
    organization,
    role_category,
    dietary_restrictions,
    dietary_restrictions_other,
  } = body as {
    first_name: string;
    last_name: string;
    email: string;
    title?: string;
    organization: string;
    role_category?: string;
    dietary_restrictions?: string[];
    dietary_restrictions_other?: string;
  };

  if (!first_name || !last_name || !email || !organization) {
    return NextResponse.json(
      { error: "First name, last name, email, and organization are required" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  const { data: existing } = await admin
    .from("applications")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "An application with this email already exists" },
      { status: 409 }
    );
  }

  const { data, error } = await admin
    .from("applications")
    .insert({
      first_name,
      last_name,
      email,
      title: title || null,
      organization,
      role_category: role_category || "other",
      application_types: ["attend"],
      status: "registered",
      consent_acknowledged: true,
      topic_interests: [],
      dietary_restrictions: dietary_restrictions ?? [],
      dietary_restrictions_other: dietary_restrictions_other || null,
      reduced_fee_interest: false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
