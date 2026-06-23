"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { formatCents } from "@/lib/utils";
import type { PricingTier } from "@/types";

export default function PricingPage() {
  const supabase = useMemo(() => createClient(), []);
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);
  const [error, setError] = useState("");

  async function loadTiers() {
    const { data } = await supabase
      .from("pricing_tiers")
      .select("*")
      .order("price_cents", { ascending: true });
    if (data) setTiers(data as PricingTier[]);
  }

  useEffect(() => {
    loadTiers();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const price = Math.round(parseFloat(form.get("price") as string) * 100);
    const description = form.get("description") as string;

    const { error: saveError } = editingTier
      ? await supabase
          .from("pricing_tiers")
          .update({ name, price_cents: price, description })
          .eq("id", editingTier.id)
      : await supabase
          .from("pricing_tiers")
          .insert({ name, price_cents: price, description });

    if (saveError) {
      setError(saveError.message);
      return;
    }

    setError("");
    setShowModal(false);
    setEditingTier(null);
    loadTiers();
  }

  async function toggleActive(tier: PricingTier) {
    const { error: toggleError } = await supabase
      .from("pricing_tiers")
      .update({ active: !tier.active })
      .eq("id", tier.id);
    if (toggleError) {
      setError(toggleError.message);
      return;
    }
    setError("");
    loadTiers();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text">Pricing Tiers</h1>
        <Button
          onClick={() => {
            setEditingTier(null);
            setShowModal(true);
          }}
        >
          Add Tier
        </Button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card key={tier.id} className={!tier.active ? "opacity-60" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                <Badge variant={tier.active ? "success" : "default"}>
                  {tier.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-text">
                {formatCents(tier.price_cents)}
              </p>
              {tier.description && (
                <p className="mt-2 text-sm text-text-light">
                  {tier.description}
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setEditingTier(tier);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleActive(tier)}
                >
                  {tier.active ? "Deactivate" : "Activate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingTier(null);
        }}
        title={editingTier ? "Edit Tier" : "Add Tier"}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            id="name"
            name="name"
            label="Tier Name"
            required
            defaultValue={editingTier?.name ?? ""}
            placeholder="e.g., Healthcare Provider"
          />
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            label="Price (USD)"
            required
            defaultValue={
              editingTier ? (editingTier.price_cents / 100).toFixed(2) : ""
            }
            placeholder="500.00"
          />
          <Input
            id="description"
            name="description"
            label="Description (optional)"
            defaultValue={editingTier?.description ?? ""}
          />
          <Button type="submit" className="w-full">
            {editingTier ? "Save Changes" : "Create Tier"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
