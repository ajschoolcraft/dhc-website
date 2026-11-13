"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROLE_CATEGORIES, DIETARY_RESTRICTIONS } from "@/types";

export function AddAttendeeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

  function toggleDietary(value: string) {
    setDietaryRestrictions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/admin/add-attendee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        title: formData.get("title"),
        organization: formData.get("organization"),
        role_category: formData.get("role_category") || undefined,
        dietary_restrictions: dietaryRestrictions,
        dietary_restrictions_other: formData.get("dietary_restrictions_other") || undefined,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Failed to add attendee");
      setLoading(false);
      return;
    }

    const data = await res.json();
    form.reset();
    setDietaryRestrictions([]);
    setLoading(false);
    setSuccess(
      `${data.first_name} ${data.last_name} has been added as a registered attendee.`
    );
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="first_name" placeholder="First name" required />
        <Input name="last_name" placeholder="Last name" required />
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="organization" placeholder="Organization" required />
        <Input name="title" placeholder="Title (optional)" />
        <div>
          <select
            name="role_category"
            defaultValue=""
            className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="">Role category (optional)</option>
            {ROLE_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-text mb-2">Dietary restrictions (optional)</p>
        <div className="flex flex-wrap gap-2">
          {DIETARY_RESTRICTIONS.map((d) => (
            <button
              key={d.value}
              type="button"
              onClick={() => toggleDietary(d.value)}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                dietaryRestrictions.includes(d.value)
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-white text-text-light hover:bg-surface"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        {dietaryRestrictions.includes("other") && (
          <Input
            name="dietary_restrictions_other"
            placeholder="Please specify"
            className="mt-2 max-w-sm"
          />
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Attendee"}
      </Button>
    </form>
  );
}
