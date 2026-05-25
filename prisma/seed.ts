// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const pw = await bcrypt.hash("Bobs2026!", 10);

  const tenant = await prisma.tenant.upsert({
    where:  { slug: "instances" },
    create: { name: "Instances Demo Organisation", slug: "instances", primaryColor: "#7c1d2e", status: "ACTIVE" },
    update: { primaryColor: "#7c1d2e" },
  });

  await prisma.user.upsert({
    where:  { email: "platform@instances.app" },
    create: { email: "platform@instances.app", name: "Platform Admin", passwordHash: pw, role: "PLATFORM_ADMIN" },
    update: { passwordHash: pw },
  });

  const admin = await prisma.user.upsert({
    where:  { email: "admin@instances.app" },
    create: { email: "admin@instances.app", name: "Org Administrator", passwordHash: pw, role: "TENANT_ADMIN", tenantId: tenant.id },
    update: { passwordHash: pw, tenantId: tenant.id },
  });

  const reviewer = await prisma.user.upsert({
    where:  { email: "reviewer@instances.app" },
    create: { email: "reviewer@instances.app", name: "Compliance Reviewer", passwordHash: pw, role: "REVIEWER", tenantId: tenant.id },
    update: { passwordHash: pw, tenantId: tenant.id },
  });

  const licensees = [
    { email: "quality@acme.instances.app",      name: "Acme Corp"   },
    { email: "compliance@nexus.instances.app",   name: "Nexus Ltd"   },
    { email: "qms@apex.instances.app",           name: "Apex Group"  },
    { email: "audit@meridian.instances.app",     name: "Meridian Co" },
    { email: "standards@vantage.instances.app",  name: "Vantage Inc" },
  ];

  const licenseeUsers: Awaited<ReturnType<typeof prisma.user.upsert>>[] = [];
  for (const l of licensees) {
    const u = await prisma.user.upsert({
      where:  { email: l.email },
      create: { email: l.email, name: l.name, passwordHash: pw, role: "LICENSEE", tenantId: tenant.id },
      update: { passwordHash: pw, tenantId: tenant.id },
    });
    licenseeUsers.push(u);
  }

  // Templates
  const qms = await prisma.template.upsert({
    where:  { tenantId_code_version: { tenantId: tenant.id, code: "QMS-SURV", version: 1 } },
    create: {
      tenantId: tenant.id, code: "QMS-SURV", name: "QMS Surveillance Report", version: 1,
      description: "Annual quality management system surveillance for certified organisations.",
      status: "PUBLISHED",
      schema: {
        fields: [
          { key: "company_name",      label: "Company Name",               type: "text",     required: true },
          { key: "certificate_no",    label: "Certificate Number",          type: "text",     required: true },
          { key: "reporting_period",  label: "Reporting Period",            type: "text",     required: true },
          { key: "internal_audits",   label: "Internal Audits Run",         type: "number",   required: true },
          { key: "ncrs_raised",       label: "Non-conformities Raised",     type: "number",   required: true },
          { key: "ncrs_closed",       label: "Non-conformities Closed",     type: "number",   required: true },
          { key: "management_review", label: "Management Review Held",      type: "select",   required: true, options: ["Yes","No","Scheduled"] },
          { key: "notes",             label: "Additional Notes",            type: "textarea", required: false },
        ],
        fileSlots: [
          { key: "audit_report", label: "Internal Audit Report",        required: true,  accept: ["pdf","docx"] },
          { key: "corrective",   label: "Corrective Action Evidence",   required: false, accept: ["pdf","docx","xlsx","jpg","png","mp4","mov"] },
        ],
      },
    },
    update: {},
  });

  const importCoC = await prisma.template.upsert({
    where:  { tenantId_code_version: { tenantId: tenant.id, code: "IMPORT-COC", version: 1 } },
    create: {
      tenantId: tenant.id, code: "IMPORT-COC", name: "Import Inspection (CoC)", version: 1,
      description: "Certificate of Conformity request for regulated imported products.",
      status: "PUBLISHED",
      schema: {
        fields: [
          { key: "importer",  label: "Importer Name",       type: "text",   required: true },
          { key: "product",   label: "Product Description", type: "text",   required: true },
          { key: "hs_code",   label: "HS Tariff Code",      type: "text",   required: true },
          { key: "origin",    label: "Country of Origin",   type: "text",   required: true },
          { key: "quantity",  label: "Quantity",            type: "number", required: true },
          { key: "unit",      label: "Unit",                type: "select", required: true, options: ["kg","tonnes","units","litres","metres"] },
          { key: "value",     label: "Invoice Value",       type: "number", required: true },
          { key: "port",      label: "Port of Entry",       type: "text",   required: true },
        ],
        fileSlots: [
          { key: "invoice",      label: "Commercial Invoice", required: true,  accept: ["pdf","jpg","png"] },
          { key: "packing_list", label: "Packing List",       required: false, accept: ["pdf","xlsx"] },
          { key: "test_report",  label: "Test Report",        required: false, accept: ["pdf","docx","xlsx"] },
        ],
      },
    },
    update: {},
  });

  // Demo instances
  const statuses = ["PENDING","IN_PROGRESS","SUBMITTED","APPROVED","FLAGGED","PENDING","IN_PROGRESS","SUBMITTED","APPROVED"];
  for (let i = 0; i < licenseeUsers.length; i++) {
    const u = licenseeUsers[i];
    const tpl = i % 2 === 0 ? qms : importCoC;
    const status = statuses[i % statuses.length];
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 30 - i * 5);
    await prisma.instance.upsert({
      where: { id: `demo-instance-${i}` },
      create: {
        id: `demo-instance-${i}`,
        tenantId: tenant.id,
        assigneeId: u.id,
        templateId: tpl.id,
        provisionedById: admin.id,
        status,
        deadline,
        draftPayload: {},
      },
      update: { status },
    });
  }

  console.log("\n✅  Instances seed complete");
  console.log("─".repeat(50));
  console.log("Demo credentials (password: Bobs2026!)");
  console.log("  platform@instances.app     — Platform Admin");
  console.log("  admin@instances.app        — Org Admin");
  console.log("  reviewer@instances.app     — Reviewer");
  console.log("  quality@acme.instances.app — Licensee (Acme Corp)");
  console.log("  ...and 4 more licensee accounts\n");
}

main().catch(console.error).finally(() => prisma.$disconnect());