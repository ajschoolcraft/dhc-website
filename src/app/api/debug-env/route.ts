import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return NextResponse.json({
    supabase_url_set: !!url,
    supabase_url_value: url,
    anon_key_set: !!key,
    anon_key_length: key.length,
    anon_key_trimmed_length: key.trim().length,
    anon_key_has_newline: key.includes("\n") || key.includes("\r"),
    anon_key_first_10: key.slice(0, 10),
    anon_key_last_10: key.slice(-10),
  });
}
