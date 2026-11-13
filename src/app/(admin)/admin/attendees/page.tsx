import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { AddAttendeeForm } from "./add-attendee-form";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Attendees — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminAttendeesPage() {
  const supabase = createAdminClient();

  const { data: registered } = await supabase
    .from("applications")
    .select("id, first_name, last_name, email, title, organization, created_at")
    .eq("status", "registered")
    .order("last_name", { ascending: true });

  const attendees = registered ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text">Attendees</h1>
        <p className="mt-1 text-sm text-text-light">
          {attendees.length} registered attendee{attendees.length === 1 ? "" : "s"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Attendee</CardTitle>
          <p className="text-sm text-text-light">
            Add speakers, OMW team, or other attendees directly. They'll be
            created as a registered attendee with a full application record.
          </p>
        </CardHeader>
        <CardContent>
          <AddAttendeeForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registered Attendees ({attendees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {attendees.length === 0 ? (
            <p className="text-sm text-text-light py-4 text-center">
              No registered attendees yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Organization</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">
                      {a.first_name} {a.last_name}
                    </TableCell>
                    <TableCell className="text-sm text-text-light">
                      {a.email}
                    </TableCell>
                    <TableCell className="text-sm text-text-light">
                      {a.title ?? "—"}
                    </TableCell>
                    <TableCell>{a.organization}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
