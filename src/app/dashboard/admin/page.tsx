// src/app/dashboard/admin/page.tsx
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: number | string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
      <p
        className="text-2xl font-bold"
        style={{ color: accent ?? "var(--text-primary)" }}
      >
        {value}
      </p>
      <p className="text-sm font-medium mt-0.5" style={{ color: "var(--text-primary)" }}>{label}</p>
      {sub ? <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{sub}</p> : null}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: "badge-pending",
    IN_PROGRESS: "badge-progress",
    SUBMITTED: "badge-submitted",
    APPROVED: "badge-approved",
    FLAGGED: "badge-flagged",
    REJECTED: "badge-rejected",
  };
  const labels: Record<string, string> = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    SUBMITTED: "Submitted",
    APPROVED: "Approved",
    FLAGGED: "Flagged",
    REJECTED: "Rejected",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status] ?? ""}`}>
      {labels[status] ?? status}
    </span>
  );
}

export default async function AdminOverviewPage() {
  const session = await auth();
  if (!session?.user?.tenantId) redirect("/login");
  if (session.user.role !== "TENANT_ADMIN" && session.user.role !== "REVIEWER") {
    redirect("/dashboard");
  }

  const tid = session.user.tenantId;

  const [
    templateCount,
    totalInstances,
    pendingCount,
    inProgressCount,
    submittedCount,
    approvedCount,
    flaggedCount,
    recentInstances,
    overdue,
  ] = await Promise.all([
    prisma.template.count({ where: { tenantId: tid } }),
    prisma.instance.count({ where: { tenantId: tid } }),
    prisma.instance.count({ where: { tenantId: tid, status: "PENDING" } }),
    prisma.instance.count({ where: { tenantId: tid, status: "IN_PROGRESS" } }),
    prisma.instance.count({ where: { tenantId: tid, status: "SUBMITTED" } }),
    prisma.instance.count({ where: { tenantId: tid, status: "APPROVED" } }),
    prisma.instance.count({ where: { tenantId: tid, status: "FLAGGED" } }),
    prisma.instance.findMany({
      where: { tenantId: tid },
      include: {
        template: { select: { name: true, code: true } },
        assignee: { select: { name: true, email: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 8,
    }),
    prisma.instance.count({
      where: {
        tenantId: tid,
        status: { in: ["PENDING", "IN_PROGRESS"] },
        deadline: { lt: new Date() },
      },
    }),
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 960 }}>
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Overview</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          Compliance operations dashboard
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <StatCard label="Total submissions" value={totalInstances} />
        <StatCard label="Awaiting review" value={submittedCount} accent="#5b21b6" sub="Submitted, pending decision" />
        <StatCard label="Flagged" value={flaggedCount} accent="#c2410c" sub="Returned to licensee" />
        <StatCard label="Overdue" value={overdue} accent="#991b1b" sub="Past deadline, unsubmitted" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        <StatCard label="Templates published" value={templateCount} />
        <StatCard label="Pending" value={pendingCount} accent="#854d0e" />
        <StatCard label="In progress" value={inProgressCount} accent="#1d4ed8" />
        <StatCard label="Approved" value={approvedCount} accent="#166534" />
      </div>

      {/* Quick actions */}
      {session.user.role === "TENANT_ADMIN" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Link
            href="/dashboard/admin/instances"
            className="rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ background: "var(--text-primary)" }}
          >
            + Provision submission
          </Link>
          <Link
            href="/dashboard/admin/review"
            className="rounded-md px-4 py-2 text-sm font-medium text-white"
            style={{ background: "var(--brand-mid)" }}
          >
            Review queue ({submittedCount})
          </Link>
          <Link
            href="/dashboard/admin/templates"
            className="rounded-md border px-4 py-2 text-sm font-medium"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          >
            Manage templates
          </Link>
        </div>
      )}

      {/* Recent activity */}
      <div>
        <h2 className="text-base font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Recent activity</h2>
        <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Organisation</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Template</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-secondary)" }}>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {recentInstances.map((inst, i) => (
                <tr
                  key={inst.id}
                  style={{ borderTop: i === 0 ? undefined : "1px solid var(--border)" }}
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{inst.assignee.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{inst.assignee.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm" style={{ color: "var(--text-primary)" }}>{inst.template.name}</p>
                    <p className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>{inst.template.code}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={inst.status} />
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                    {new Date(inst.deadline).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentInstances.length === 0 && (
            <p className="px-4 py-6 text-sm text-center" style={{ color: "var(--text-secondary)" }}>No submissions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}