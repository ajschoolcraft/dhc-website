"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

const sponsorLevels = [
  "Anchor Sponsor",
  "Strategic Track Sponsor",
  "Legal Operations Sponsor",
  "GC / Legal Leadership Dinner Sponsor",
  "Speaker / Faculty Dinner Sponsor",
  "Reception Sponsor",
  "Supporting Sponsor",
  "Not sure — tell me more",
];

export function SponsorInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      organization: form.get("organization") as string,
      phone: form.get("phone") as string,
      sponsor_level_interest: form.get("sponsor_level_interest") as string,
      message: form.get("message") as string,
    };

    try {
      const res = await fetch("/api/sponsor-inquiries", {
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
        <h3 className="text-lg font-semibold text-green-800">
          Inquiry Submitted
        </h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for your interest in sponsoring DHC26. We will follow up
          with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="name" name="name" label="Your Name" required />
        <Input id="email" name="email" type="email" label="Email" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="organization" name="organization" label="Organization" required />
        <Input id="phone" name="phone" type="tel" label="Phone" />
      </div>
      <div className="space-y-1">
        <label htmlFor="sponsor_level_interest" className="block text-sm font-medium text-text">
          Sponsorship Level of Interest
        </label>
        <select
          id="sponsor_level_interest"
          name="sponsor_level_interest"
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        >
          <option value="">Select level</option>
          {sponsorLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>
      <Textarea
        id="message"
        name="message"
        label="Message (optional)"
        rows={4}
        placeholder="Tell us about your organization and interest in sponsoring..."
      />

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Sponsor Inquiry"}
      </Button>
    </form>
  );
}
