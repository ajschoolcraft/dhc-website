"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import type { ContactSubmission } from "@/types";

export default function AdminContactPage() {
  const supabase = useMemo(() => createClient(), []);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  async function loadSubmissions() {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSubmissions(data as ContactSubmission[]);
  }

  useEffect(() => {
    loadSubmissions();
  }, []);

  async function markAsRead(id: string) {
    await supabase
      .from("contact_submissions")
      .update({ read: true })
      .eq("id", id);
    loadSubmissions();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text">Contact Submissions</h1>

      {submissions.length === 0 ? (
        <p className="text-sm text-text-light">No submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <Card key={sub.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-text">{sub.name}</p>
                    <p className="text-sm text-text-light">{sub.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={sub.read ? "default" : "info"}>
                      {sub.read ? "Read" : "New"}
                    </Badge>
                    <span className="text-xs text-text-light">
                      {formatDate(sub.created_at)}
                    </span>
                    {!sub.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(sub.id)}
                      >
                        Mark Read
                      </Button>
                    )}
                  </div>
                </div>
                <p className="mt-4 text-sm text-text whitespace-pre-wrap">
                  {sub.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
