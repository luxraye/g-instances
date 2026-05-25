"use client";
import Link from "next/link";
import { PublicHeader } from "@/components/layout/public-header";
import { Footer } from "@/components/layout/footer";
import { InstanceExplainer } from "@/components/home/instance-explainer";
import { Lock, Fingerprint, Eye, FileCheck, ArrowRight, ArrowUpRight, Shield } from "lucide-react";

const services = [
  { code: "QMS",    title: "Quality Management",       desc: "Surveillance, certification renewals, and internal audit submissions for any QMS framework.",       color: "#1a3a6b" },
  { code: "PROD",   title: "Product Certification",    desc: "Conformity declarations and standard mark applications for manufactured or imported products.",     color: "#0f7b5c" },
  { code: "IMPORT", title: "Import Inspection",        desc: "Certificate of Conformity requests and customs documentation for regulated imports.",               color: "#6d28d9" },
  { code: "CALIB",  title: "Metrology & Calibration",  desc: "Instrument calibration requests with results submission and traceability records.",                 color: "#b45309" },
  { code: "AUDIT",  title: "Site Audit Evidence",      desc: "On-site inspection reports with photo and video evidence — directly attached to the Instance.",     color: "#be185d" },
  { code: "CUSTOM", title: "Custom Templates",         desc: "Define any compliance workflow with the template builder. Any field type. Any file format.",        color: "var(--text-primary)" },
];

const securityPillars = [
  { icon: <Lock size={20} />,        title: "SHA-256 File Integrity",  desc: "Every file is hashed client-side and recomputed on receipt. Any alteration in transit is detected and rejected automatically.",   accent: "#0f7b5c" },
  { icon: <Fingerprint size={20} />, title: "JWT-Signed Receipts",     desc: "Submission receipts cryptographically bind the payload to the submitter's identity, template version, and precise timestamp.",    accent: "#1a3a6b" },
  { icon: <Eye size={20} />,         title: "Immutable Audit Log",     desc: "Every action — draft, submit, review, approve — is appended to an append-only log. Non-repudiable. Fully queryable.",            accent: "#6d28d9" },
  { icon: <FileCheck size={20} />,   title: "Role-Based Access",       desc: "Granular roles with strict boundary enforcement. Platform admins, tenant admins, reviewers, and regulated entities stay in their lanes.", accent: "#b45309" },
];

const stats = [
  { n: "5",    label: "Steps to submit",  sub: "Provision · Fill · Upload · Verify · Sign" },
  { n: "100%", label: "Audit trail",      sub: "Every action recorded, non-repudiable" },
  { n: "0",    label: "Manual re-entry",  sub: "Data flows directly to reviewer dashboard" },
  { n: "JWT",  label: "Signed receipts",  sub: "Cryptographic proof of every submission" },
];

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "var(--bg-page)" }}>
      <PublicHeader />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", borderBottom: "1px solid var(--border)", padding: "96px 24px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 999, marginBottom: 32, background: "var(--brand-light)", border: "1px solid #c7d7f0" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand)", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--brand)", letterSpacing: "0.06em" }}>COMPLIANCE INFRASTRUCTURE · SELF-REPORTING ENGINE</span>
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: 24, letterSpacing: "-0.025em", color: "var(--text-primary)" }}>
            Every compliance event.<br />
            <span style={{ color: "var(--brand)" }}>Structured. Verified. Sealed.</span>
          </h1>

          <p style={{ maxWidth: 580, margin: "0 auto 40px", fontSize: 18, lineHeight: 1.7, color: "var(--text-secondary)" }}>
            Instances shifts the burden of evidence collection onto regulated entities — giving oversight bodies a complete, cryptographically verified record without lifting a pen.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 72 }}>
            <Link href="/login" style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 9, fontWeight: 600, color: "#fff", background: "var(--brand)", textDecoration: "none", fontSize: 15, transition: "background 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--brand-mid)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--brand)"; }}>
              Access platform <ArrowUpRight size={15} />
            </Link>
            <Link href="#how-it-works" style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 9, fontWeight: 600, border: "1px solid var(--border-strong)", color: "var(--text-secondary)", textDecoration: "none", fontSize: 15, background: "#fff", transition: "background 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}>
              How it works <ArrowRight size={15} />
            </Link>
          </div>

          {/* Stats band */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 16px", borderRight: i < 3 ? "1px solid var(--border)" : undefined, textAlign: "center" }}>
                <p style={{ fontSize: 34, fontWeight: 700, marginBottom: 4, color: "var(--brand)", letterSpacing: "-0.02em" }}>{s.n}</p>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "var(--text-primary)" }}>{s.label}</p>
                <p style={{ fontSize: 11, lineHeight: 1.4, color: "var(--text-muted)" }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InstanceExplainer />

      {/* ── Services grid ───────────────────────────────────────────────── */}
      <section id="services" style={{ padding: "80px 24px", background: "#fff", borderBottom: "1px solid var(--border)" }}>
        <div style={{ margin: "0 auto", maxWidth: 1160 }}>
          <div style={{ maxWidth: 520, marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10, color: "var(--brand)", textTransform: "uppercase" }}>Service Templates</p>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Built for any compliance workflow</h2>
            <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>Deploy pre-built templates or define your own. Any field type, any file format.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {services.map((s) => (
              <div key={s.code} style={{ borderRadius: 12, padding: 24, background: "#fff", border: "1px solid var(--border)", transition: "box-shadow 0.2s, border-color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}>
                <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, marginBottom: 14, background: `${s.color}12`, color: s.color, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", border: `1px solid ${s.color}25` }}>{s.code}</div>
                <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, color: "var(--text-primary)" }}>{s.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security pillars ─────────────────────────────────────────────── */}
      <section id="security" style={{ padding: "80px 24px", background: "var(--bg-page)" }}>
        <div style={{ margin: "0 auto", maxWidth: 1160 }}>
          <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 56px" }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10, color: "var(--accent)", textTransform: "uppercase" }}>Integrity by Design</p>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Trust the process, not the paperwork</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)" }}>
              Because compliance data is self-reported, the security model ensures integrity at every step — so oversight teams focus on <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>verification and decisions</strong>, not data collection.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {securityPillars.map((p) => (
              <div key={p.title} style={{ borderRadius: 12, padding: 24, background: "#fff", border: "1px solid var(--border)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, background: `${p.accent}10`, color: p.accent }}>{p.icon}</div>
                <h4 style={{ fontWeight: 600, marginBottom: 8, fontSize: 14, color: "var(--text-primary)" }}>{p.title}</h4>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-secondary)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "72px 24px", background: "var(--brand)" }}>
        <div style={{ margin: "0 auto", maxWidth: 640, textAlign: "center" }}>
          <Shield size={36} style={{ color: "rgba(255,255,255,0.7)", marginBottom: 20 }} />
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14, color: "#fff", letterSpacing: "-0.02em" }}>See it in action</h2>
          <p style={{ maxWidth: 440, margin: "0 auto 36px", fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.75)" }}>
            The Instances Playground lets you design a template, run a sandbox submission, and see the full review experience — no account required, no data saved.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link href="/login" style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 9, fontWeight: 600, color: "var(--brand)", background: "#fff", textDecoration: "none", fontSize: 15 }}>
              Access platform <ArrowUpRight size={15} />
            </Link>
            <Link href="/login" style={{ display: "flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 9, fontWeight: 600, color: "#fff", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 15 }}>
              Open Playground <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
