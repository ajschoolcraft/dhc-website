"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/attendees", label: "Attendees" },
  { href: "/admin/pricing", label: "Pricing" },
  { href: "/admin/contact", label: "Contact" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-white min-h-screen p-4">
      <div className="mb-8">
        <Link href="/admin/dashboard" className="text-lg font-bold text-primary">
          DHC Admin
        </Link>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith(item.href)
                ? "bg-primary/10 text-primary"
                : "text-text-light hover:bg-surface hover:text-text"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
