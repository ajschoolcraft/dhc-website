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
import { formatDate, formatCents } from "@/lib/utils";
import { STATUS_LABELS } from "@/types";
import type { Application } from "@/types";

type ApplicationWithTier = Application & {
  pricing_tiers: { name: string; price_cents: number } | null;
};

type ApplicationTableProps = {
  applications: ApplicationWithTier[];
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
          <TableHead>Pricing Tier</TableHead>
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
            <TableCell className="text-xs">
              {app.pricing_tiers ? (
                <span>
                  {app.pricing_tiers.name}{" "}
                  <span className="text-text-light">
                    ({formatCents(app.pricing_tiers.price_cents)})
                  </span>
                </span>
              ) : (
                <span className="text-text-light">—</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
