import { Card } from "@/components/ui/card";
import type { PublicAttendee } from "@/types";

type AttendeeCardProps = {
  attendee: PublicAttendee;
};

export function AttendeeCard({ attendee }: AttendeeCardProps) {
  return (
    <Card className="p-4">
      <p className="font-semibold text-text">
        {attendee.first_name} {attendee.last_name}
      </p>
      {attendee.title && (
        <p className="mt-1 text-sm text-text-light">{attendee.title}</p>
      )}
      <p className="mt-1 text-sm text-text-light">{attendee.organization}</p>
    </Card>
  );
}
