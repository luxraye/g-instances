"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Layers, ClipboardCheck, Fingerprint, Lock, Eye } from "lucide-react";

const lifecycleSteps = [
  { number: "01", title: "Provisioning",      icon: <Layers size={18} />,        color: "#1a3a6b", description: "An administrator selects a compliance template and assigns it to the regulated entity with a deadline." },
  { number: "02", title: "Guided Data Entry", icon: <ClipboardCheck size={18} />, color: "#0f7b5c", description: "The Instance Runner presents a structured form. Every field, file requirement, and validation rule is defined upfront." },
  { number: "03", title: "Integrity Check",   icon: <Fingerprint size={18} />,    color: "#b45309", description: "Documents are SHA-256 hashed on upload. The system verifies nothing was altered in transit and validates data in real-time." },
  { number: "04", title: "Sign & Submit",     icon: <Lock size={18} />,           color: "#6d28d9", description: "A JWT-signed digital receipt is generated, cryptographically binding the submission to the entity's identity." },
  { number: "05", title: "Regulator Review",  icon: <Eye size={18} />,            color: "#be185d", description: "Officers review the full submission — all data, files, and analytics — and approve, flag, or reject with written notes." },
];

const matrixSamples = [
  { code: "QMS",    label: "Quality Management",    example: "ISO 9001 surveillance for a food manufacturer" },
  { code: "PROD",   label: "Product Certification", example: "Standard Mark application for bottled water" },
  { code: "IMPORT", label: "Import Inspection",     example: "Certificate of Conformity for imported cement" },
  { code: "CALIB",  label: "Metrology & Calibration", example: "Calibration request for weighing instruments" },
];

function Collapsible({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", background: "#fff" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 3 }}>{title}</h3>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{subtitle}</p>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "var(--bg-subtle)", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
          <ChevronDown size={16} style={{ color: "var(--text-secondary)" }} />
        </div>
      </button>
      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows 0.25s ease" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ padding: "0 24px 24px", borderTop: "1px solid var(--border)" }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function InstanceExplainer() {
  return (
    <section id="how-it-works" style={{ padding: "80px 24px", background: "var(--bg-page)", borderBottom: "1px solid var(--border)", scrollMarginTop: 64 }}>
      <div style={{ margin: "0 auto", maxWidth: 1160 }}>
        <div style={{ maxWidth: 520, marginBottom: 56 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 10, color: "var(--brand)", textTransform: "uppercase" }}>How it works</p>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 14, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>From paper forms to a structured digital workflow</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)" }}>
            Instances replaces the slow, error-prone cycle of emailed PDFs and manual tracking with guided, verifiable compliance submissions.
          </p>
        </div>

        {/* Before / After */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
          <div style={{ borderRadius: 12, padding: 24, background: "#fff", border: "1px solid #fecaca" }}>
            <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: 14, color: "var(--danger)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#fee2e2", color: "var(--danger)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✕</span>
              Without Instances
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {["Email forms with no version control or audit trail", "Manual data re-entry by compliance officers from PDFs", "Weeks of back-and-forth for missing documents", "No visibility on submission status", "Lost submissions and duplicated effort"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "var(--text-secondary)" }}>
                  <span style={{ color: "#fca5a5", flexShrink: 0, marginTop: 1 }}>—</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ borderRadius: 12, padding: 24, background: "#fff", border: "1px solid #bbf7d0" }}>
            <h3 style={{ fontWeight: 600, marginBottom: 16, fontSize: 14, color: "var(--accent)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#dcfce7", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>✓</span>
              With Instances
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {["Structured, schema-validated submissions every time", "Real-time status tracking from your dashboard", "Cryptographic receipts prove what was submitted and when", "Instant notification when your submission is reviewed", "Full audit trail — nothing is lost or altered"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Collapsible title="The 5-step compliance lifecycle" subtitle="From assignment to decision — click to explore">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, paddingTop: 20 }}>
              {lifecycleSteps.map((step) => (
                <div key={step.number} style={{ borderRadius: 10, padding: 16, background: "var(--bg-page)", border: "1px solid var(--border)" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, background: `${step.color}12`, color: step.color }}>{step.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase" }}>Step {step.number}</div>
                  <h4 style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: "var(--text-primary)" }}>{step.title}</h4>
                  <p style={{ fontSize: 12, lineHeight: 1.5, color: "var(--text-secondary)" }}>{step.description}</p>
                </div>
              ))}
            </div>
          </Collapsible>

          <Collapsible title="Service templates & classification" subtitle="Each service type has a tailored template — click to see examples">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, paddingTop: 20 }}>
              {matrixSamples.map((m) => (
                <div key={m.code} style={{ borderRadius: 10, padding: 16, background: "var(--bg-page)", border: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--brand)", marginBottom: 6, letterSpacing: "-0.01em" }}>{m.code}</div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{m.label}</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)" }}>{m.example}</p>
                </div>
              ))}
            </div>
            <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "var(--brand)", textDecoration: "none", marginTop: 16 }}>
              Sign in to see all templates <ArrowRight size={13} />
            </Link>
          </Collapsible>
        </div>

        <div style={{ marginTop: 32, borderRadius: 14, padding: 36, background: "#fff", border: "1px solid var(--border)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div style={{ maxWidth: 520 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: "var(--text-primary)" }}>Your organisation, already in the system</h3>
            <p style={{ lineHeight: 1.7, color: "var(--text-secondary)", fontSize: 14 }}>
              Your organisation has been provisioned with an Instances account. Sign in with your credentials to access your compliance dashboard.
            </p>
          </div>
          <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 9, fontWeight: 600, color: "#fff", background: "var(--brand)", textDecoration: "none", fontSize: 14, flexShrink: 0, transition: "background 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--brand-mid)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--brand)"; }}>
            Access your portal <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
