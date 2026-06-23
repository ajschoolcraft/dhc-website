"use client";

import type { PricingTier } from "@/types";
import { formatCents } from "@/lib/utils";

type TierSelectorProps = {
  tiers: PricingTier[];
  value: string;
  onChange: (tierId: string) => void;
};

export function TierSelector({ tiers, value, onChange }: TierSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      <option value="">Select pricing tier</option>
      {tiers.map((tier) => (
        <option key={tier.id} value={tier.id}>
          {tier.name} — {formatCents(tier.price_cents)}
        </option>
      ))}
    </select>
  );
}
