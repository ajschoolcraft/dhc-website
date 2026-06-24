"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import {
  APPLICATION_TYPES,
  ROLE_CATEGORIES,
  TOPIC_INTERESTS,
} from "@/types";

export function ApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [applicationTypes, setApplicationTypes] = useState<string[]>([]);
  const [topicInterests, setTopicInterests] = useState<string[]>([]);

  function toggleApplicationType(value: string) {
    setApplicationTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function toggleTopic(value: string) {
    setTopicInterests((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (prev.length >= 5) return prev;
      return [...prev, value];
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (applicationTypes.length === 0) {
      setErrorMessage("Please select at least one application type.");
      setStatus("error");
      return;
    }

    const form = new FormData(e.currentTarget);
    const consent = form.get("consent_acknowledged");
    if (!consent) {
      setErrorMessage("You must acknowledge the consent statement.");
      setStatus("error");
      return;
    }

    const data = {
      first_name: form.get("first_name") as string,
      last_name: form.get("last_name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      organization: form.get("organization") as string,
      organization_website: form.get("organization_website") as string,
      title: form.get("title") as string,
      linkedin: form.get("linkedin") as string,
      city: form.get("city") as string,
      state: form.get("state") as string,
      country: form.get("country") as string,
      application_types: applicationTypes,
      role_category: form.get("role_category") as string,
      topic_interests: topicInterests,
      current_role_description: form.get("current_role_description") as string,
      questions_to_explore: form.get("questions_to_explore") as string,
      practical_experience: form.get("practical_experience") as string,
      speaker_topic_proposal: form.get("speaker_topic_proposal") as string,
      registration_category: form.get("registration_category") as string,
      reduced_fee_interest: form.get("reduced_fee_interest") === "on",
      consent_acknowledged: true,
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
          Thank you for your interest in DHC26. We will review your application
          and follow up via email. Submission does not guarantee attendance.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Section 1: Contact Information */}
      <fieldset className="space-y-6">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          Contact Information
        </legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <Input id="first_name" name="first_name" label="First Name" required />
          <Input id="last_name" name="last_name" label="Last Name" required />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Input id="email" name="email" type="email" label="Email" required />
          <Input id="phone" name="phone" type="tel" label="Phone" />
        </div>
        <Input id="title" name="title" label="Title" />
        <div className="grid gap-6 sm:grid-cols-2">
          <Input id="organization" name="organization" label="Organization" required />
          <Input id="organization_website" name="organization_website" type="url" label="Organization Website" placeholder="https://" />
        </div>
        <Input id="linkedin" name="linkedin" type="url" label="LinkedIn Profile" placeholder="https://linkedin.com/in/..." />
        <div className="grid gap-6 sm:grid-cols-3">
          <Input id="city" name="city" label="City" />
          <Input id="state" name="state" label="State / Province" />
          <Input id="country" name="country" label="Country" />
        </div>
      </fieldset>

      {/* Section 2: Application Type */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          Application Type
        </legend>
        <p className="text-sm text-text-light">Select all that apply:</p>
        <div className="space-y-3">
          {APPLICATION_TYPES.map((type) => (
            <label key={type.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={applicationTypes.includes(type.value)}
                onChange={() => toggleApplicationType(type.value)}
                className="h-4 w-4 rounded border-border text-accent focus:ring-accent/20"
              />
              <span className="text-sm text-text">{type.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Section 3: Role Category */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          Role Category
        </legend>
        <div className="space-y-1">
          <label htmlFor="role_category" className="block text-sm font-medium text-text">
            Which best describes your role?
          </label>
          <select
            id="role_category"
            name="role_category"
            required
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="">Select your role</option>
            {ROLE_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* Section 4: Topic Interests */}
      <fieldset className="space-y-4">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          Topic Interests
        </legend>
        <p className="text-sm text-text-light">
          Select up to 5 topics ({topicInterests.length}/5 selected):
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {TOPIC_INTERESTS.map((topic) => (
            <label
              key={topic.value}
              className={`flex items-start gap-3 cursor-pointer rounded-lg border p-3 transition-colors ${
                topicInterests.includes(topic.value)
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-border"
              } ${
                !topicInterests.includes(topic.value) && topicInterests.length >= 5
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={topicInterests.includes(topic.value)}
                onChange={() => toggleTopic(topic.value)}
                disabled={!topicInterests.includes(topic.value) && topicInterests.length >= 5}
                className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent/20"
              />
              <span className="text-sm text-text">{topic.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Section 5: Short Answer Questions */}
      <fieldset className="space-y-6">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          About You
        </legend>
        <Textarea
          id="current_role_description"
          name="current_role_description"
          label="Briefly describe your current role and how your work relates to healthcare AI, digital health, health data, legal operations, or healthcare technology."
          rows={4}
        />
        <Textarea
          id="questions_to_explore"
          name="questions_to_explore"
          label="What specific questions or challenges are you hoping to explore at DHC26?"
          rows={4}
        />
        <Textarea
          id="practical_experience"
          name="practical_experience"
          label="What practical experience would you be willing to share?"
          rows={4}
        />
        {applicationTypes.includes("speak") && (
          <Textarea
            id="speaker_topic_proposal"
            name="speaker_topic_proposal"
            label="If applying to speak, what topic would you propose and what practical takeaways would attendees receive?"
            rows={4}
          />
        )}
      </fieldset>

      {/* Section 6: Registration & Consent */}
      <fieldset className="space-y-6">
        <legend className="text-xl font-bold text-text border-b border-border pb-2 w-full">
          Registration & Consent
        </legend>
        <div className="space-y-1">
          <label htmlFor="registration_category" className="block text-sm font-medium text-text">
            If accepted, which registration category best applies?
          </label>
          <select
            id="registration_category"
            name="registration_category"
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="">Select category</option>
            <option value="in_house_counsel">In-house counsel</option>
            <option value="outside_counsel">Outside counsel / law firm</option>
            <option value="government_academic">Government / academic / nonprofit</option>
            <option value="technology_company">Technology / digital health company</option>
            <option value="consultant_advisory">Consultant / advisory</option>
            <option value="other">Other</option>
          </select>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="reduced_fee_interest"
            className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent/20"
          />
          <span className="text-sm text-text">
            I would like to be considered for complimentary or reduced-fee
            registration if available.
          </span>
        </label>

        <div className="rounded-lg bg-surface p-4 space-y-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent_acknowledged"
              required
              className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent/20"
            />
            <span className="text-sm text-text">
              I acknowledge that submitting this application does not guarantee
              attendance or a speaking role. Accepted applicants will receive
              registration details after review. Registration fees may vary by
              category. DHC may use submitted information for event planning and
              communications. Applicant information will not be sold.
            </span>
          </label>
        </div>
      </fieldset>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
