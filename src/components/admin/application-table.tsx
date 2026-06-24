import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge, statusBadgeVariant } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { STATUS_LABELS } from "@/types";
import type { Application } from "@/types";

type ApplicationTableProps = {
  applications: Application[];
};

export function ApplicationTable({ applications }: ApplicationTableProps) {
  if (applications.length === 0) {
    return (
      <p className="text-sm text-text-light py-8 text-center">
        No applications found.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((app) => (
          <TableRow key={app.id}>
            <TableCell>
              <Link
                href={`/admin/applications/${app.id}`}
                className="font-medium text-accent hover:underline"
              >
                {app.first_name} {app.last_name}
              </Link>
            </TableCell>
            <TableCell>{app.organization}</TableCell>
            <TableCell className="text-xs">
              {app.role_category?.replace(/_/g, " ")}
            </TableCell>
            <TableCell>{formatDate(app.created_at)}</TableCell>
            <TableCell>
              <Badge variant={statusBadgeVariant(app.status)}>
                {STATUS_LABELS[app.status] ?? app.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
