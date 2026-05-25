"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#services",     label: "Services" },
  { href: "/#security",     label: "Security" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "0.05em" }}>IN</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>Instances</span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", fontWeight: 500, transition: "background 0.15s, color 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/login" style={{ padding: "8px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none", border: "1px solid var(--border)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}>
            Sign in
          </Link>
          <Link href="/login" style={{ padding: "8px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: "#fff", background: "var(--brand)", textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--brand-mid)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--brand)"; }}>
            Request access
          </Link>
        </div>
      </div>
    </header>
  );
}
