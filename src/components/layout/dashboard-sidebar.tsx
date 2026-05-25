"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, FileBox, ClipboardCheck, BarChart3,
  Layers, Grid3X3, Key, Landmark, BookOpen, LogOut,
  ChevronLeft, ChevronRight, PlusCircle, FlaskConical,
} from "lucide-react";

interface NavItem  { href: string; label: string; icon: React.ReactNode }
interface NavGroup { title: string; items: NavItem[] }

const adminNav: NavGroup[] = [
  { title: "Operations", items: [
    { href: "/dashboard/admin",           label: "Overview",      icon: <LayoutDashboard size={16} /> },
    { href: "/dashboard/admin/instances", label: "All Instances", icon: <FileBox size={16} /> },
    { href: "/dashboard/admin/review",    label: "Review Queue",  icon: <ClipboardCheck size={16} /> },
    { href: "/dashboard/reports",         label: "Reports",       icon: <BarChart3 size={16} /> },
  ]},
  { title: "Configuration", items: [
    { href: "/dashboard/admin/templates", label: "Templates",     icon: <Layers size={16} /> },
    { href: "/dashboard/admin/matrix",    label: "Matrix",        icon: <Grid3X3 size={16} /> },
    { href: "/dashboard/admin/api-keys",  label: "API Keys",      icon: <Key size={16} /> },
  ]},
  { title: "Resources", items: [
    { href: "/dashboard/licensee/playground", label: "Playground", icon: <FlaskConical size={16} /> },
    { href: "/dashboard/standards",           label: "Standards",  icon: <BookOpen size={16} /> },
    { href: "/dashboard/legacy",              label: "Legacy",     icon: <Landmark size={16} /> },
  ]},
];

const reviewerNav: NavGroup[] = [
  { title: "Operations", items: [
    { href: "/dashboard/admin",           label: "Overview",      icon: <LayoutDashboard size={16} /> },
    { href: "/dashboard/admin/instances", label: "All Instances", icon: <FileBox size={16} /> },
    { href: "/dashboard/admin/review",    label: "Review Queue",  icon: <ClipboardCheck size={16} /> },
    { href: "/dashboard/reports",         label: "Reports",       icon: <BarChart3 size={16} /> },
  ]},
];

const licenseeNav: NavGroup[] = [
  { title: "My Workspace", items: [
    { href: "/dashboard/licensee",            label: "Overview",     icon: <LayoutDashboard size={16} /> },
    { href: "/dashboard/licensee/instances",  label: "My Instances", icon: <FileBox size={16} /> },
    { href: "/dashboard/licensee/playground", label: "Playground",   icon: <FlaskConical size={16} /> },
  ]},
  { title: "Resources", items: [
    { href: "/dashboard/standards", label: "Standards Catalogue", icon: <BookOpen size={16} /> },
    { href: "/dashboard/legacy",    label: "Legacy Services",     icon: <Landmark size={16} /> },
  ]},
];

interface Props { role: string; userName: string; userEmail: string; }

export function DashboardSidebar({ role, userName, userEmail }: Props) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const groups = role === "TENANT_ADMIN" ? adminNav : role === "REVIEWER" ? reviewerNav : licenseeNav;

  const overviewExact = ["/dashboard/admin", "/dashboard/licensee"];
  function isActive(href: string) {
    if (overviewExact.includes(href)) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  const S = {
    bg:         "var(--sidebar-bg)",
    border:     "var(--sidebar-border)",
    activeBg:   "var(--sidebar-active-bg)",
    active:     "var(--sidebar-active)",
    hover:      "var(--sidebar-hover)",
    dim:        "var(--sidebar-text)",
    main:       "var(--sidebar-text-main)",
  };

  return (
    <aside style={{
      width: collapsed ? 56 : 240,
      height: "100vh",
      position: "sticky",
      top: 0,
      background: S.bg,
      borderRight: `1px solid ${S.border}`,
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      transition: "width 0.2s",
      overflowY: "hidden",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: collapsed ? "16px 10px" : "16px", borderBottom: `1px solid ${S.border}`, flexShrink: 0 }}>
        {!collapsed && (
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", minWidth: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 11, letterSpacing: "0.03em" }}>IN</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: S.main, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>Instances</p>
              <p style={{ fontSize: 10, color: S.dim, whiteSpace: "nowrap" }}>v2.0.0</p>
            </div>
          </Link>
        )}
        {collapsed && (
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>IN</span>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          style={{ flexShrink: 0, width: 24, height: 24, borderRadius: 6, border: "none", background: "none", cursor: "pointer", color: S.dim, display: "flex", alignItems: "center", justifyContent: "center", marginLeft: collapsed ? "auto" : 4 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = S.hover; (e.currentTarget as HTMLElement).style.color = S.main; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = S.dim; }}>
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
        {groups.map((group) => (
          <div key={group.title} style={{ marginBottom: 24 }}>
            {!collapsed && (
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: S.dim, padding: "0 8px", marginBottom: 4 }}>
                {group.title}
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href} title={collapsed ? item.label : undefined}
                    style={{ display: "flex", alignItems: "center", gap: 9, padding: collapsed ? "9px 0" : "8px 10px", borderRadius: 8, fontSize: 13, fontWeight: active ? 600 : 400, textDecoration: "none", color: active ? S.active : S.dim, background: active ? S.activeBg : "transparent", justifyContent: collapsed ? "center" : "flex-start", borderLeft: active ? `2px solid ${S.active}` : "2px solid transparent", transition: "all 0.12s" }}
                    onMouseEnter={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background = S.hover; (e.currentTarget as HTMLElement).style.color = S.main; } }}
                    onMouseLeave={(e) => { if (!active) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = S.dim; } }}>
                    <span style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                    {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {!collapsed && role === "TENANT_ADMIN" && (
          <div style={{ paddingTop: 12, borderTop: `1px solid ${S.border}` }}>
            <Link href="/dashboard/admin/instances"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", color: "#6ea8fe", border: "1px solid rgba(110,168,254,0.25)", background: "rgba(110,168,254,0.08)" }}>
              <PlusCircle size={14} />
              <span>Provision instance</span>
            </Link>
          </div>
        )}
      </nav>

      {/* User footer */}
      <div style={{ padding: "12px 8px", borderTop: `1px solid ${S.border}`, flexShrink: 0 }}>
        {!collapsed && (
          <div style={{ padding: "0 8px", marginBottom: 8 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: S.main, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userName}</p>
            <p style={{ fontSize: 11, color: S.dim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userEmail}</p>
            <p style={{ fontSize: 10, fontWeight: 700, color: S.active, marginTop: 2, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {role === "TENANT_ADMIN" ? "Admin" : role === "REVIEWER" ? "Reviewer" : "Licensee"}
            </p>
          </div>
        )}
        <button onClick={() => signOut({ callbackUrl: "/" })} title={collapsed ? "Sign out" : undefined}
          style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: collapsed ? "9px 0" : "8px 10px", borderRadius: 8, fontSize: 13, fontWeight: 400, border: "none", background: "none", cursor: "pointer", color: S.dim, justifyContent: collapsed ? "center" : "flex-start" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,80,80,0.08)"; (e.currentTarget as HTMLElement).style.color = "#ff8080"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = S.dim; }}>
          <LogOut size={15} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}