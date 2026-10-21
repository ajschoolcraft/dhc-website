"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import type { ContactFormData } from "@/types";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formLoadedAt = useRef(0);

  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData & { _company_url?: string; _t?: number } = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      _company_url: formData.get("_company_url") as string,
      _t: formLoadedAt.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-green-50 border border-green-200 p-8 text-center">
        <h3 className="text-lg font-semibold text-green-800">Message Sent</h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for reaching out. We will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
        <label htmlFor="_company_url">Company URL</label>
        <input type="text" id="_company_url" name="_company_url" tabIndex={-1} autoComplete="off" />
      </div>
      <Input id="name" name="name" label="Name" required placeholder="Your name" />
      <Input id="email" name="email" type="email" label="Email" required placeholder="you@example.com" />
      <Textarea id="message" name="message" label="Message" required placeholder="How can we help?" rows={5} />

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
