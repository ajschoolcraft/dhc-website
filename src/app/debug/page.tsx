"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DebugPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const [result, setResult] = useState("Not tested yet");

  async function testDirectFetch() {
    try {
      const res = await fetch(`${url}/auth/v1/settings`, {
        headers: { apikey: key! },
      });
      setResult(`Direct fetch: ${res.status} ${res.statusText}`);
    } catch (err) {
      setResult(`Direct fetch error: ${String(err)}`);
    }
  }

  async function testSupabaseSignIn() {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: "test@test.com",
        password: "test",
      });
      setResult(`Supabase result: ${error ? error.message : "success"}`);
    } catch (err) {
      setResult(`Supabase error: ${String(err)}`);
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: "monospace" }}>
      <h1>Debug</h1>
      <p>URL: {url ?? "UNDEFINED"}</p>
      <p>Key length: {key?.length ?? "UNDEFINED"}</p>
      <p>Key first 10: {key?.slice(0, 10) ?? "UNDEFINED"}</p>
      <hr />
      <button onClick={testDirectFetch} style={{ margin: 8, padding: "8px 16px" }}>
        Test Direct Fetch
      </button>
      <button onClick={testSupabaseSignIn} style={{ margin: 8, padding: "8px 16px" }}>
        Test Supabase SignIn
      </button>
      <p style={{ marginTop: 16 }}>Result: {result}</p>
    </div>
  );
}
