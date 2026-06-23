"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import type { ApplicationFormData } from "@/types";

const attendeeTypes = [
  { value: "provider", label: "Healthcare Provider" },
  { value: "vendor", label: "Industry Vendor / Developer" },
  { value: "investor", label: "Investor" },
  { value: "researcher", label: "Researcher / Academic" },
  { value: "legal", label: "Legal / Policy Professional" },
  { value: "other", label: "Other" },
];

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data: ApplicationFormData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      organization: formData.get("organization") as string,
      title: formData.get("title") as string,
      attendee_type: formData.get("attendee_type") as string,
      reason: formData.get("reason") as string,
    };

    try {
      const res = await fetch("/api/applications", {
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
          Application Submitted
        </h3>
        <p className="mt-2 text-sm text-green-700">
          Thank you for your interest. We will review your application and
          follow up via email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input id="first_name" name="first_name" label="First Name" required placeholder="Jane" />
        <Input id="last_name" name="last_name" label="Last Name" required placeholder="Doe" />
      </div>
      <Input id="email" name="email" type="email" label="Email" required placeholder="jane@example.com" />
      <Input id="organization" name="organization" label="Organization" required placeholder="Your company or institution" />
      <Input id="title" name="title" label="Job Title" placeholder="Chief Medical Officer" />
      <div className="space-y-1">
        <label htmlFor="attendee_type" className="block text-sm font-medium text-text">
          Attendee Type
        </label>
        <select
          id="attendee_type"
          name="attendee_type"
          required
          className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Select your role</option>
          {attendeeTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <Textarea id="reason" name="reason" label="Why are you interested in attending?" placeholder="Tell us about your interest in the summit..." rows={4} />

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
