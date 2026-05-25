// src/app/dashboard/licensee/playground/page.tsx
"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Upload,
  ArrowRight,
  ArrowLeft,
  Send,
  Shield,
  FlaskConical,
  RotateCcw,
  Plus,
  Trash2,
  Play,
  Layers,
  ClipboardCheck,
  Fingerprint,
  Lock,
  Eye,
  ChevronDown,
  Info,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type FieldType = "text" | "number" | "textarea" | "date" | "select";

interface TemplateField {
  key: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string; // comma-separated for select
  hint?: string;
}

interface SandboxTemplate {
  name: string;
  code: string;
  description: string;
  fields: TemplateField[];
}

// ─── Lifecycle steps (shared between tabs) ────────────────────────────────────
const lifecycleSteps = [
  {
    number: "01",
    title: "Provisioning",
    description: "A BOBS Administrator selects a service template and assigns it to your organisation with a compliance deadline.",
    icon: <Layers className="w-5 h-5" />,
    color: "var(--brand-mid)",
  },
  {
    number: "02",
    title: "Guided Data Entry",
    description: "The Instance Runner presents a structured form. Every field, file requirement, and validation rule is defined upfront — no guesswork, no back-and-forth emails.",
    icon: <ClipboardCheck className="w-5 h-5" />,
    color: "var(--accent)",
  },
  {
    number: "03",
    title: "Integrity Verification",
    description: "Documents are SHA-256 hashed on upload. The system verifies nothing was altered in transit and validates data against the template schema in real-time.",
    icon: <Fingerprint className="w-5 h-5" />,
    color: "#f5a623",
  },
  {
    number: "04",
    title: "Sign & Submit",
    description: "A JWT-signed digital receipt is generated, cryptographically binding the submission to your organisation. Data moves to the immutable compliance vault.",
    icon: <Lock className="w-5 h-5" />,
    color: "#e07b39",
  },
  {
    number: "05",
    title: "BOBS Review",
    description: "Officers review with full access to all submitted data, documents, and automated analytics. Approve, flag for correction, or reject with notes.",
    icon: <Eye className="w-5 h-5" />,
    color: "var(--brand)",
  },
];

// ─── Preset sandbox templates ─────────────────────────────────────────────────
const PRESET_TEMPLATES: SandboxTemplate[] = [
  {
    name: "ISO 9001 Surveillance",
    code: "QMS-SURV",
    description: "Annual quality management system surveillance report for certified organisations.",
    fields: [
      { key: "company_name", label: "Company Name", type: "text", required: true },
      { key: "certificate_number", label: "Certificate Number", type: "text", required: true, hint: "e.g. BOBS/QMS/2024/001" },
      { key: "reporting_period", label: "Reporting Period", type: "text", required: true, hint: "e.g. Q1 2025" },
      { key: "internal_audits", label: "Internal Audits Conducted", type: "number", required: true },
      { key: "nonconformities", label: "Non-conformities Identified", type: "number", required: true },
      { key: "corrective_actions", label: "Corrective Actions Closed", type: "number", required: true },
      { key: "management_review", label: "Management Review Held", type: "select", required: true, options: "Yes,No,Pending" },
      { key: "notes", label: "Additional Notes", type: "textarea", required: false },
    ],
  },
  {
    name: "Import Inspection (CoC)",
    code: "IMPORT-COC",
    description: "Certificate of Conformity request for controlled imported products.",
    fields: [
      { key: "importer_name", label: "Importer / Company Name", type: "text", required: true },
      { key: "product_description", label: "Product Description", type: "text", required: true },
      { key: "hs_code", label: "HS Tariff Code", type: "text", required: true, hint: "e.g. 6901.10" },
      { key: "country_of_origin", label: "Country of Origin", type: "text", required: true },
      { key: "quantity", label: "Quantity", type: "number", required: true },
      { key: "unit", label: "Unit of Measure", type: "select", required: true, options: "kg,tonnes,units,litres,metres" },
      { key: "invoice_value_bwp", label: "Invoice Value (BWP)", type: "number", required: true },
      { key: "port_of_entry", label: "Port of Entry", type: "select", required: true, options: "Tlokweng Gate,Ramatlabama,Kazungula,Martins Drift,Pioneer Gate,Ramokgwebana" },
      { key: "notes", label: "Remarks", type: "textarea", required: false },
    ],
  },
];

const BLANK_TEMPLATE: SandboxTemplate = {
  name: "My Custom Template",
  code: "CUSTOM",
  description: "",
  fields: [],
};

// ─── Collapsible ──────────────────────────────────────────────────────────────
function Collapsible({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden bg-white" style={{ border: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <div>
          <h3 className="text-base font-bold" style={{ color: "var(--brand)" }}>{title}</h3>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>{subtitle}</p>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300"
          style={{ background: "var(--brand-light)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: "var(--brand-mid)" }} />
        </div>
      </button>
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Learn ───────────────────────────────────────────────────────────────
function LearnTab() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl p-5" style={{ background: "var(--brand-light)", border: "1px solid #c7d7f0" }}>
        <p className="text-sm leading-relaxed" style={{ color: "var(--brand)" }}>
          <strong>An Instance</strong> is a single, structured compliance task assigned to your organisation by BOBS. Think of it as a smart digital form — except it knows exactly what data is required, validates everything in real time, hashes your files to prove integrity, and generates a cryptographic receipt when you submit.
        </p>
      </div>

      {/* Before / After */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl p-5" style={{ background: "#fff5f5", border: "1px solid #fecaca" }}>
          <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "#991b1b" }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#fecaca", color: "#991b1b" }}>✕</span>
            The old way
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: "#b91c1c" }}>
            {[
              "Email forms with no version control or audit trail",
              "Manual data re-entry by BOBS staff from PDFs",
              "Weeks of back-and-forth for missing documents",
              "No visibility on submission status",
              "Lost submissions and duplicated effort",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2"><span className="mt-0.5 flex-shrink-0">—</span>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-5" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "#166534" }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#bbf7d0", color: "#166534" }}>✓</span>
            The Instances way
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: "#15803d" }}>
            {[
              "Schema-validated, structured submissions every time",
              "Real-time status tracking from your dashboard",
              "Cryptographic receipts prove what was submitted and when",
              "Instant notification when BOBS reviews your filing",
              "Full audit trail — nothing is lost or altered",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2"><span className="mt-0.5 flex-shrink-0">✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collapsibles */}
      <Collapsible title="The 5-step Instance lifecycle" subtitle="From assignment to BOBS decision — click to explore">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {lifecycleSteps.map((step, i) => (
            <div key={step.number} className="relative">
              <div className="rounded-xl p-4 h-full" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
                <div className="w-9 h-9 rounded-lg text-white flex items-center justify-center mb-2" style={{ background: step.color }}>
                  {step.icon}
                </div>
                <div className="text-xs font-mono mb-1" style={{ color: "#9ca3af" }}>Step {step.number}</div>
                <h4 className="font-semibold text-sm mb-1.5" style={{ color: "var(--brand)" }}>{step.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step.description}</p>
              </div>
              {i < lifecycleSteps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Collapsible>

      <Collapsible title="What makes Instances different from a regular form?" subtitle="The technical guarantees that matter for compliance">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: "Schema-driven", body: "Every Instance is generated from a Template that defines required fields, data types, and validation rules. There's no room for ambiguity — the system tells you exactly what's needed before you start.", color: "var(--brand-mid)" },
            { title: "Cryptographic integrity", body: "Files are SHA-256 hashed in your browser before upload. The server recomputes the hash on receipt. If even a single byte was changed in transit, the submission is rejected automatically.", color: "var(--accent)" },
            { title: "Immutable record", body: "Once submitted, data is locked. A JWT-signed receipt binds your submission to your identity and a timestamp. Neither you nor BOBS can alter the record — giving both sides a single source of truth.", color: "var(--brand)" },
          ].map((card) => (
            <div key={card.title} className="rounded-lg p-4" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
              <div className="w-2 h-2 rounded-full mb-2" style={{ background: card.color }} />
              <h4 className="font-semibold text-sm mb-1.5" style={{ color: "var(--brand)" }}>{card.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{card.body}</p>
            </div>
          ))}
        </div>
      </Collapsible>

      <Collapsible title="BOBS service templates" subtitle="Each service type has a tailored Instance template">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { code: "QMS", label: "Quality Management", example: "ISO 9001 surveillance for a food manufacturer" },
            { code: "PROD", label: "Product Certification", example: "Standard Mark application for bottled water" },
            { code: "IMPORT", label: "Import Inspection", example: "Certificate of Conformity for imported cement" },
            { code: "CALIB", label: "Metrology & Calibration", example: "Calibration request for weighing instruments" },
          ].map((m) => (
            <div key={m.code} className="rounded-lg p-4" style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}>
              <span className="font-mono font-bold text-lg" style={{ color: "var(--brand-mid)" }}>{m.code}</span>
              <p className="text-sm font-medium mt-1" style={{ color: "var(--brand)" }}>{m.label}</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{m.example}</p>
            </div>
          ))}
        </div>
      </Collapsible>
    </div>
  );
}

// ─── Tab: Template Builder ────────────────────────────────────────────────────
function TemplateBuilderTab({ onDeploy }: { onDeploy: (t: SandboxTemplate) => void }) {
  const [template, setTemplate] = useState<SandboxTemplate>({ ...BLANK_TEMPLATE, fields: [] });
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  function loadPreset(preset: SandboxTemplate) {
    setTemplate({ ...preset, fields: preset.fields.map((f) => ({ ...f })) });
    setSelectedPreset(preset.code);
  }

  function addField() {
    setTemplate((t) => ({
      ...t,
      fields: [...t.fields, { key: `field_${Date.now()}`, label: "", type: "text", required: false }],
    }));
  }

  function updateField(index: number, changes: Partial<TemplateField>) {
    setTemplate((t) => {
      const fields = [...t.fields];
      fields[index] = { ...fields[index], ...changes };
      // auto-generate key from label
      if (changes.label !== undefined) {
        fields[index].key = changes.label.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
      }
      return { ...t, fields };
    });
  }

  function removeField(index: number) {
    setTemplate((t) => ({ ...t, fields: t.fields.filter((_, i) => i !== index) }));
  }

  function handleDeploy() {
    if (!template.name.trim()) return alert("Give your template a name first.");
    if (template.fields.length === 0) return alert("Add at least one field.");
    const unlabelled = template.fields.find((f) => !f.label.trim());
    if (unlabelled) return alert("All fields need a label.");
    onDeploy(template);
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "var(--brand-light)", border: "1px solid #c7d7f0" }}>
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--brand-mid)" }} />
        <p className="text-sm" style={{ color: "var(--brand)" }}>
          Design a template by defining fields, then deploy it to the Sandbox to experience the full Instance runner workflow. Start from a BOBS preset or build your own from scratch.
        </p>
      </div>

      {/* Presets */}
      <div>
        <p className="text-sm font-semibold mb-2" style={{ color: "var(--brand)" }}>Start from a preset</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRESET_TEMPLATES.map((p) => (
            <button
              key={p.code}
              onClick={() => loadPreset(p)}
              className="text-left rounded-xl p-4 transition-all"
              style={{
                border: selectedPreset === p.code ? "2px solid var(--brand-mid)" : "1px solid var(--border)",
                background: selectedPreset === p.code ? "var(--brand-light)" : "#ffffff",
              }}
            >
              <span className="font-mono font-bold text-sm" style={{ color: "var(--brand-mid)" }}>{p.code}</span>
              <p className="font-semibold text-sm mt-0.5" style={{ color: "var(--brand)" }}>{p.name}</p>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{p.description}</p>
            </button>
          ))}
        </div>
        <button
          onClick={() => { setTemplate({ ...BLANK_TEMPLATE, fields: [] }); setSelectedPreset(null); }}
          className="mt-2 text-xs underline"
          style={{ color: "var(--text-secondary)" }}
        >
          or start blank
        </button>
      </div>

      {/* Template metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "var(--brand)" }}>Template Name *</label>
          <input
            value={template.name}
            onChange={(e) => setTemplate((t) => ({ ...t, name: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2"
            style={{ borderColor: "var(--border)" }}
            placeholder="e.g. ISO 9001 Surveillance Report"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: "var(--brand)" }}>Service Code</label>
          <input
            value={template.code}
            onChange={(e) => setTemplate((t) => ({ ...t, code: e.target.value.toUpperCase() }))}
            className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 font-mono"
            style={{ borderColor: "var(--border)" }}
            placeholder="QMS"
          />
        </div>
      </div>

      {/* Field builder */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: "var(--brand)" }}>Fields ({template.fields.length})</p>
          <button
            onClick={addField}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition text-white"
            style={{ background: "var(--brand-mid)" }}
          >
            <Plus className="w-4 h-4" /> Add Field
          </button>
        </div>

        {template.fields.length === 0 && (
          <div className="rounded-xl p-6 text-center" style={{ border: "1px dashed var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No fields yet. Add a field or load a preset above.</p>
          </div>
        )}

        <div className="space-y-3">
          {template.fields.map((field, i) => (
            <div key={i} className="rounded-xl p-4" style={{ border: "1px solid var(--border)", background: "#fafafa" }}>
              <div className="grid grid-cols-12 gap-2 items-start">
                <div className="col-span-5">
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Label *</label>
                  <input
                    value={field.label}
                    onChange={(e) => updateField(i, { label: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg text-sm border focus:outline-none focus:ring-1"
                    style={{ borderColor: "var(--border)" }}
                    placeholder="e.g. Company Name"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Type</label>
                  <select
                    value={field.type}
                    onChange={(e) => updateField(i, { type: e.target.value as FieldType })}
                    className="w-full px-2 py-1.5 rounded-lg text-sm border focus:outline-none focus:ring-1"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="textarea">Text Area</option>
                    <option value="date">Date</option>
                    <option value="select">Dropdown</option>
                  </select>
                </div>
                <div className="col-span-2 flex items-center justify-center pt-5">
                  <label className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: "var(--text-secondary)" }}>
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => updateField(i, { required: e.target.checked })}
                      className="rounded"
                    />
                    Required
                  </label>
                </div>
                <div className="col-span-2 flex justify-end pt-4">
                  <button onClick={() => removeField(i)} className="p-1.5 rounded-lg hover:bg-red-50 transition">
                    <Trash2 className="w-4 h-4" style={{ color: "#dc2626" }} />
                  </button>
                </div>
                {field.type === "select" && (
                  <div className="col-span-12">
                    <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Options (comma-separated)</label>
                    <input
                      value={field.options || ""}
                      onChange={(e) => updateField(i, { options: e.target.value })}
                      className="w-full px-2 py-1.5 rounded-lg text-sm border focus:outline-none"
                      style={{ borderColor: "var(--border)" }}
                      placeholder="Option A,Option B,Option C"
                    />
                  </div>
                )}
                <div className="col-span-12">
                  <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-secondary)" }}>Helper hint (optional)</label>
                  <input
                    value={field.hint || ""}
                    onChange={(e) => updateField(i, { hint: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg text-sm border focus:outline-none"
                    style={{ borderColor: "var(--border)" }}
                    placeholder="e.g. Enter the format as Q1 2025"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {template.fields.length > 0 && (
        <button
          onClick={handleDeploy}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition hover:opacity-90"
          style={{ background: "var(--brand)" }}
        >
          <Play className="w-4 h-4" /> Deploy to Sandbox &rarr;
        </button>
      )}
    </div>
  );
}

// ─── Tab: Sandbox Runner ──────────────────────────────────────────────────────
function SandboxRunner({ template, onReset }: { template: SandboxTemplate; onReset: () => void }) {
  const [step, setStep] = useState(0);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const stepLabels = ["Data Entry", "File Upload", "Review & Submit"];

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    template.fields.forEach((f) => {
      if (f.required && !fieldValues[f.key]?.trim()) {
        newErrors[f.key] = `${f.label} is required`;
      }
      if (f.type === "number" && fieldValues[f.key]) {
        if (isNaN(Number(fieldValues[f.key]))) newErrors[f.key] = "Must be a number";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (step === 0 && !validate()) return;
    setStep((s) => Math.min(s + 1, 2));
  }

  if (submitted) {
    return (
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "var(--brand)" }}>
              <CheckCircle2 className="w-5 h-5" style={{ color: "var(--accent)" }} /> Sandbox Submission Complete
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>This is how BOBS would see your submission. Nothing was saved.</p>
          </div>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition text-white"
            style={{ background: "var(--brand)" }}
          >
            <RotateCcw className="w-4 h-4" /> Start Over
          </button>
        </div>

        <div className="rounded-xl p-5 mb-4" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
          <p className="text-sm" style={{ color: "#166534" }}>
            In production, this payload would be signed with a JWT receipt, locked in the compliance vault, and visible to a reviewers immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-xl p-5" style={{ border: "1px solid var(--border)", background: "#fff" }}>
            <h3 className="font-semibold mb-3" style={{ color: "var(--brand)" }}>Submitted Data</h3>
            <div className="space-y-2">
              {template.fields.map((f) => (
                <div key={f.key} className="flex justify-between text-sm py-1.5" style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <span style={{ color: "var(--text-secondary)" }}>{f.label}</span>
                  <span className="font-medium" style={{ color: "var(--brand)" }}>{fieldValues[f.key] || "—"}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ border: "1px solid var(--border)", background: "#fff" }}>
            <h3 className="font-semibold mb-3" style={{ color: "var(--brand)" }}>What BOBS Receives</h3>
            <div className="space-y-3">
              <div className="rounded-lg p-3" style={{ background: "var(--bg-subtle)" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Template</p>
                <p className="font-mono font-bold" style={{ color: "var(--brand-mid)" }}>{template.code}</p>
                <p className="text-sm" style={{ color: "var(--brand)" }}>{template.name}</p>
              </div>
              <div className="rounded-lg p-3" style={{ background: "var(--bg-subtle)" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Files Attached</p>
                {Object.keys(uploadedFiles).length > 0 ? (
                  Object.entries(uploadedFiles).map(([key, file]) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span style={{ color: "var(--brand)" }}>{file.name}</span>
                      <span className="text-xs font-mono" style={{ color: "#9ca3af" }}>SHA-256 verified ✓</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>No files uploaded</p>
                )}
              </div>
              <div className="rounded-lg p-3" style={{ background: "var(--brand-light)", border: "1px solid #c7d7f0" }}>
                <p className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>Digital Receipt (JWT)</p>
                <p className="font-mono text-xs break-all" style={{ color: "var(--brand-mid)" }}>
                  eyJhbGciOiJIUzI1NiJ9.eyJ0ZW1wbGF0ZSI6IntcImNvZGVcIjoi<br />
                  {template.code}...
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>In production: cryptographically signed, non-repudiable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--brand)" }}>
            <span className="font-mono text-sm px-2 py-0.5 rounded" style={{ background: "var(--brand-light)", color: "var(--brand-mid)" }}>{template.code}</span>
            {template.name}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>Sandbox Instance — nothing is saved</p>
        </div>
        <button onClick={onReset} className="text-sm underline" style={{ color: "var(--text-secondary)" }}>← Change template</button>
      </div>

      <div className="rounded-xl p-4 mb-5 flex items-start gap-2" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
        <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#d97706" }} />
        <p className="text-sm" style={{ color: "#92400e" }}>
          <strong>Sandbox mode.</strong> Data entered here is not saved and does not affect your compliance record.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
              style={{ background: i <= step ? "var(--brand-mid)" : "#e5e7eb", color: i <= step ? "#fff" : "#6b7280" }}
            >
              {i < step ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className="text-sm" style={{ color: i <= step ? "var(--brand)" : "#9ca3af", fontWeight: i <= step ? 600 : 400 }}>{label}</span>
            {i < 2 && <div className="w-6 h-px mx-1" style={{ background: "#e5e7eb" }} />}
          </div>
        ))}
      </div>

      <div className="rounded-xl p-6" style={{ border: "1px solid var(--border)", background: "#fff" }}>
        {/* Step 0: Data entry */}
        {step === 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-4" style={{ color: "var(--brand)" }}>Enter Compliance Data</h3>
            {template.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--brand)" }}>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.hint && <p className="text-xs mb-1.5" style={{ color: "var(--text-secondary)" }}>{field.hint}</p>}
                {field.type === "textarea" ? (
                  <textarea
                    value={fieldValues[field.key] || ""}
                    onChange={(e) => setFieldValues((p) => ({ ...p, [field.key]: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2"
                    style={{ borderColor: errors[field.key] ? "#dc2626" : "var(--border)" }}
                  />
                ) : field.type === "select" ? (
                  <select
                    value={fieldValues[field.key] || ""}
                    onChange={(e) => setFieldValues((p) => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2"
                    style={{ borderColor: errors[field.key] ? "#dc2626" : "var(--border)" }}
                  >
                    <option value="">Select…</option>
                    {(field.options || "").split(",").map((o) => (
                      <option key={o.trim()} value={o.trim()}>{o.trim()}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                    value={fieldValues[field.key] || ""}
                    onChange={(e) => setFieldValues((p) => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2"
                    style={{ borderColor: errors[field.key] ? "#dc2626" : "var(--border)" }}
                  />
                )}
                {errors[field.key] && <p className="text-xs mt-1 text-red-500">{errors[field.key]}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Step 1: File upload */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-2" style={{ color: "var(--brand)" }}>Attach Supporting Files (Optional)</h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>In production, required documents would be enforced by the template schema.</p>
            <div className="rounded-xl p-5" style={{ border: "1px dashed var(--border)" }}>
              <label className="flex flex-col items-center gap-2 cursor-pointer">
                <Upload className="w-6 h-6" style={{ color: "var(--brand-mid)" }} />
                <p className="text-sm font-medium" style={{ color: "var(--brand-mid)" }}>
                  {uploadedFiles["sandbox_doc"] ? uploadedFiles["sandbox_doc"].name : "Click to upload any file"}
                </p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>PDF, XLSX, CSV — max 10MB</p>
                {uploadedFiles["sandbox_doc"] && (
                  <span className="flex items-center gap-1 text-xs" style={{ color: "var(--accent)" }}>
                    <CheckCircle2 size={12} /> Uploaded
                  </span>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setUploadedFiles((p) => ({ ...p, sandbox_doc: file }));
                  }}
                />
              </label>
            </div>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-semibold" style={{ color: "var(--brand)" }}>Review Sandbox Submission</h3>
            <div className="rounded-lg p-4" style={{ background: "var(--bg-subtle)" }}>
              <h4 className="text-sm font-medium mb-2" style={{ color: "var(--brand)" }}>Fields</h4>
              {template.fields.map((f) => (
                <div key={f.key} className="flex justify-between text-sm py-1" style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <span style={{ color: "var(--text-secondary)" }}>{f.label}</span>
                  <span className="font-medium" style={{ color: "var(--brand)" }}>{fieldValues[f.key] || "—"}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg p-4" style={{ background: "var(--bg-subtle)" }}>
              <h4 className="text-sm font-medium mb-2" style={{ color: "var(--brand)" }}>Files</h4>
              <div className="flex justify-between text-sm">
                <span style={{ color: "var(--text-secondary)" }}>Supporting document</span>
                <span className="font-medium" style={{ color: "var(--brand)" }}>{uploadedFiles["sandbox_doc"]?.name || "Not uploaded"}</span>
              </div>
            </div>
            <div className="rounded-lg p-4 flex items-center gap-2" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
              <FlaskConical size={16} style={{ color: "#d97706" }} />
              <p className="text-sm" style={{ color: "#92400e" }}>Sandbox only — no data will be saved or signed.</p>
            </div>
          </div>
        )}

        {/* Nav */}
        <div className="flex justify-between mt-6 pt-4" style={{ borderTop: "1px solid #f0f0f0" }}>
          <button
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition disabled:opacity-30"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft size={15} /> Previous
          </button>
          {step < 2 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white transition hover:opacity-90"
              style={{ background: "var(--brand-mid)" }}
            >
              Next <ArrowRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white transition hover:opacity-90"
              style={{ background: "var(--accent)" }}
            >
              <Send size={15} /> Submit (Sandbox)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
type Tab = "learn" | "build" | "sandbox";

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<Tab>("learn");
  const [deployedTemplate, setDeployedTemplate] = useState<SandboxTemplate | null>(null);

  function handleDeploy(template: SandboxTemplate) {
    setDeployedTemplate(template);
    setActiveTab("sandbox");
  }

  function handleReset() {
    setDeployedTemplate(null);
    setActiveTab("build");
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "learn", label: "What are Instances?", icon: <Eye className="w-4 h-4" /> },
    { id: "build", label: "Template Builder", icon: <Layers className="w-4 h-4" /> },
    { id: "sandbox", label: "Instance Runner", icon: <FlaskConical className="w-4 h-4" /> },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: "var(--brand)" }}>
          <FlaskConical className="w-6 h-6" style={{ color: "var(--brand-mid)" }} />
          Instances Playground
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          Learn how Instances work, design a template, and run a sandbox submission — no data is saved.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: "var(--bg-subtle)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === "sandbox" && !deployedTemplate) {
                setActiveTab("build");
                return;
              }
              setActiveTab(tab.id);
            }}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === tab.id ? "#ffffff" : "transparent",
              color: activeTab === tab.id ? "var(--brand)" : "var(--text-secondary)",
              boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              opacity: tab.id === "sandbox" && !deployedTemplate ? 0.5 : 1,
            }}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "learn" && <LearnTab />}
      {activeTab === "build" && <TemplateBuilderTab onDeploy={handleDeploy} />}
      {activeTab === "sandbox" && deployedTemplate && (
        <SandboxRunner template={deployedTemplate} onReset={handleReset} />
      )}
      {activeTab === "sandbox" && !deployedTemplate && (
        <div className="rounded-xl p-10 text-center" style={{ border: "1px dashed var(--border)" }}>
          <FlaskConical className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--border)" }} />
          <p className="font-medium mb-1" style={{ color: "var(--brand)" }}>No template deployed yet</p>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>Go to Template Builder, design your Instance, then deploy it here.</p>
          <button
            onClick={() => setActiveTab("build")}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: "var(--brand-mid)" }}
          >
            Go to Template Builder
          </button>
        </div>
      )}
    </div>
  );
}
