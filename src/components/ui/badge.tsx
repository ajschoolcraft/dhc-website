import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface text-text-light",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function statusBadgeVariant(
  status: string
): BadgeVariant {
  switch (status) {
    case "new":
      return "warning";
    case "needs_review":
      return "warning";
    case "accepted_complimentary":
    case "accepted_reduced":
    case "accepted_paid":
      return "info";
    case "speaker_consideration":
    case "sponsor_followup":
      return "info";
    case "waitlist":
    case "needs_more_info":
      return "warning";
    case "declined":
    case "withdrawn":
      return "danger";
    case "registered":
      return "success";
    default:
      return "default";
  }
}
