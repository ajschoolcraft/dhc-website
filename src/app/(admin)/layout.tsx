import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 bg-surface p-6">{children}</main>
      </div>
    </div>
  );
}
