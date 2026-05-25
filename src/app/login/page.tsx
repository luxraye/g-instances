"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const DEMO_ACCOUNTS = [
  { label: "Platform Admin",  email: "platform@instances.app" },
  { label: "Org Admin",       email: "admin@instances.app" },
  { label: "Reviewer",        email: "reviewer@instances.app" },
  { label: "Acme Corp",       email: "quality@acme.instances.app" },
  { label: "Nexus Ltd",       email: "compliance@nexus.instances.app" },
  { label: "Apex Group",      email: "qms@apex.instances.app" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid credentials. Demo password: Bobs2026!");
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 56, display: "flex", alignItems: "center", gap: 10 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>IN</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>Instances</span>
        </Link>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>/ Sign in</span>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          {/* Main card */}
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 14, padding: 36, marginBottom: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>Sign in to Instances</h1>
              <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Enter your credentials to continue</p>
            </div>

            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--text-secondary)" }}>Email address</label>
                <input type="email" autoComplete="email" required className="inp" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--text-secondary)" }}>Password</label>
                <input type="password" autoComplete="current-password" required className="inp" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>

              {error && (
                <div style={{ background: "var(--status-rejected-bg)", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "var(--danger)" }}>{error}</div>
              )}

              <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: 4, padding: "12px", fontSize: 15 }}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>

          {/* Demo accounts */}
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 14, padding: 24, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}>
            <div style={{ marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Demo accounts</p>
              <code style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", background: "var(--accent-light)", padding: "2px 8px", borderRadius: 5 }}>Bobs2026!</code>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {DEMO_ACCOUNTS.map((a) => (
                <button key={a.email} type="button"
                  onClick={() => { setEmail(a.email); setPassword("Bobs2026!"); }}
                  style={{ borderRadius: 8, padding: "10px 12px", textAlign: "left", border: "1px solid var(--border)", background: "var(--bg-page)", cursor: "pointer", transition: "background 0.15s, border-color 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--brand-light)"; (e.currentTarget as HTMLElement).style.borderColor = "#c7d7f0"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-page)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{a.label}</p>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.email}</p>
                </button>
              ))}
            </div>
          </div>

          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--text-muted)" }}>
            <Link href="/" style={{ color: "var(--brand)", textDecoration: "none", fontWeight: 500 }}>← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
