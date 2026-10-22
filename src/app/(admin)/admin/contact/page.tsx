import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { MarkReadButton } from "./mark-read-button";
import type { ContactSubmission } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact Submissions — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const supabase = createAdminClient();

  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const submissions = (data ?? []) as ContactSubmission[];

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
                    {sub.type === "sponsorship" && (
                      <Badge variant="info">Sponsor</Badge>
                    )}
                    <span className="text-xs text-text-light">
                      {formatDate(sub.created_at)}
                    </span>
                    {!sub.read && <MarkReadButton id={sub.id} />}
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
