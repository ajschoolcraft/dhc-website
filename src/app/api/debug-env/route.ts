import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    supabase_url_set: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabase_url_prefix: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 20),
    anon_key_set: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    anon_key_length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length,
    service_key_set: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    resend_key_set: !!process.env.RESEND_API_KEY,
  });
}
