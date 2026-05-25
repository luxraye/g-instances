import Link from "next/link";
import { signOutAction } from "@/app/actions/sign-out";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)" }}>
      <header style={{ borderBottom: "1px solid var(--border)", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 10 }}>IN</span>
            </div>
            <Link href="/platform" style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", textDecoration: "none" }}>
              Instances <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>/ Platform Admin</span>
            </Link>
          </div>
          <form action={signOutAction}>
            <button type="submit" style={{ fontSize: 13, color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", padding: "6px 12px", borderRadius: 6 }}>
              Sign out
            </button>
          </form>
        </div>
      </header>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 32px" }}>{children}</main>
    </div>
  );
}