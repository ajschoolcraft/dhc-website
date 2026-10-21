import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ContactFormData } from "@/types";

const MIN_SUBMIT_TIME_MS = 5_000;

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData & { _company_url?: string; _t?: number } =
      await request.json();

    if (body._company_url) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (body._t && Date.now() - body._t < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
