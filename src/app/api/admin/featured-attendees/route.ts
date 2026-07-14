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
  const { first_name, last_name, title, organization } = body as {
    first_name: string;
    last_name: string;
    title?: string;
    organization: string;
  };

  if (!first_name || !last_name || !organization) {
    return NextResponse.json(
      { error: "First name, last name, and organization are required" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("featured_attendees")
    .insert({
      first_name,
      last_name,
      title: title || null,
      organization,
      added_by: user.email ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
