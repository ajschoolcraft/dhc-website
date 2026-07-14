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
import { formatDate } from "@/lib/utils";
import { FeaturedAttendeeForm } from "./featured-attendee-form";
import type { FeaturedAttendee } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Attendees — Admin" };
export const dynamic = "force-dynamic";

export default async function AdminAttendeesPage() {
  const supabase = createAdminClient();

  const { data: featured } = await supabase
    .from("featured_attendees")
    .select("*")
    .order("last_name", { ascending: true });

  const { data: attendeeData } = await supabase.rpc("get_public_attendees");

  const featuredAttendees = (featured ?? []) as FeaturedAttendee[];
  const totalCount = (attendeeData ?? []).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text">Attendees</h1>
        <p className="mt-1 text-sm text-text-light">
          {totalCount} attendee{totalCount === 1 ? "" : "s"} visible on the
          public list
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Featured Attendee</CardTitle>
        </CardHeader>
        <CardContent>
          <FeaturedAttendeeForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Featured Attendees ({featuredAttendees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {featuredAttendees.length === 0 ? (
            <p className="text-sm text-text-light py-4 text-center">
              No featured attendees added yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead>{" "}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {featuredAttendees.map((attendee) => (
                  <FeaturedAttendeeRow
                    key={attendee.id}
                    attendee={attendee}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function FeaturedAttendeeRow({ attendee }: { attendee: FeaturedAttendee }) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {attendee.first_name} {attendee.last_name}
      </TableCell>
      <TableCell className="text-sm text-text-light">
        {attendee.title ?? "—"}
      </TableCell>
      <TableCell>{attendee.organization}</TableCell>
      <TableCell className="text-sm text-text-light">
        {formatDate(attendee.created_at)}
      </TableCell>
      <TableCell>
        <RemoveButton id={attendee.id} />
      </TableCell>
    </TableRow>
  );
}

function RemoveButton({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        "use server";
        const { createAdminClient } = await import("@/lib/supabase/admin");
        const supabase = createAdminClient();
        await supabase.from("featured_attendees").delete().eq("id", id);
        const { revalidatePath } = await import("next/cache");
        revalidatePath("/admin/attendees");
        revalidatePath("/attendees");
        revalidatePath("/summit-2026");
      }}
    >
      <button
        type="submit"
        className="text-sm text-red-600 hover:text-red-800 hover:underline"
      >
        Remove
      </button>
    </form>
  );
}
