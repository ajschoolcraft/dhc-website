"use client";

export default function DebugPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <div style={{ padding: 40, fontFamily: "monospace" }}>
      <h1>Client-side env check</h1>
      <p>URL set: {String(!!url)}</p>
      <p>URL value: {url ?? "UNDEFINED"}</p>
      <p>Key set: {String(!!key)}</p>
      <p>Key length: {key?.length ?? "UNDEFINED"}</p>
      <p>Key first 10: {key?.slice(0, 10) ?? "UNDEFINED"}</p>
    </div>
  );
}
