export function Footer() {
  const links = {
    product:  [["/#how-it-works","How it works"],["/#services","Services"],["/#security","Security"],["/dashboard/licensee/playground","Playground"]],
    platform: [["/login","Sign in"],["#","Documentation"],["#","API Reference"],["#","Status"]],
  };
  return (
    <footer style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: "56px 24px 40px" }}>
      <div style={{ margin: "0 auto", maxWidth: 1200 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 11 }}>IN</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>Instances</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--text-muted)", maxWidth: 300 }}>
              Compliance infrastructure for regulatory bodies and enterprises. Self-reporting. Verifiable. Auditable.
            </p>
          </div>
          {(["product","platform"] as const).map((section) => (
            <div key={section}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 16, color: "var(--text-muted)", textTransform: "uppercase" }}>
                {section === "product" ? "Product" : "Platform"}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links[section].map(([href, label]) => (
                  <li key={label}>
                    <a href={href} style={{ fontSize: 13, color: "var(--text-secondary)", textDecoration: "none" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>© {new Date().getFullYear()} Instances. Built for regulated environments.</p>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>v2.0.0</p>
        </div>
      </div>
    </footer>
  );
}
