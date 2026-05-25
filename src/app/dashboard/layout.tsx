import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const role = session.user.role ?? "LICENSEE";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-page)" }}>
      <DashboardSidebar
        role={role}
        userName={session.user.name ?? ""}
        userEmail={session.user.email ?? ""}
      />
      <main style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
        <div style={{ padding: "36px 40px", maxWidth: 1200 }}>
          {children}
        </div>
      </main>
    </div>
  );
}