import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, jsonb, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (authentication)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Consumers table (consumidores)
export const consumers = pgTable("consumers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  document: text("document"), // CPF or CNPJ
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: varchar("created_by").notNull(),
});

// Plants table (usinas solares)
export const plants = pgTable("plants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  cnpj: text("cnpj").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: varchar("created_by").notNull(),
});

// Units table (unidades consumidoras)
export const units = pgTable("units", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ucNumber: text("uc_number").notNull(),
  distributor: text("distributor").notNull(),
  consumerId: varchar("consumer_id").references(() => consumers.id),
  plantId: varchar("plant_id").references(() => plants.id),
  addressJson: jsonb("address_json"), // Endereço completo em JSON
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: varchar("created_by").notNull(),
});

// Invoices table (faturas)
export const invoices = pgTable("invoices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // 'distributor' | 'proprietary'
  storagePath: text("storage_path").notNull(),
  sha256: text("sha256").notNull().unique(),
  status: text("status").notNull().default('uploaded'), // 'uploaded' | 'parsed' | 'error'
  parsed: jsonb("parsed"), // Dados extraídos pela IA
  amountTotal: decimal("amount_total", { precision: 10, scale: 2 }),
  dueDate: date("due_date"),
  kwhCompensated: decimal("kwh_compensated", { precision: 10, scale: 2 }),
  referenceMonth: integer("reference_month"),
  referenceYear: integer("reference_year"),
  band: text("band"), // Bandeira tarifária
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: varchar("created_by").notNull(),
});

// Billing Records table (registros de faturamento)
export const billingRecords = pgTable("billing_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceId: varchar("invoice_id").references(() => invoices.id),
  distributorInvoiceId: varchar("distributor_invoice_id").references(() => invoices.id),
  consumerId: varchar("consumer_id").references(() => consumers.id),
  status: text("status").notNull().default('pending'), // 'pending' | 'sent' | 'paid' | 'overdue'
  asaasCustomerId: text("asaas_customer_id"),
  asaasPaymentId: text("asaas_payment_id"),
  pixPayload: text("pix_payload"),
  pixBase64: text("pix_base64"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: varchar("created_by").notNull(),
});

// Apportionments table (rateios)
export const apportionments = pgTable("apportionments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  plantId: varchar("plant_id").references(() => plants.id).notNull(),
  unitId: varchar("unit_id").references(() => units.id).notNull(),
  percent: decimal("percent", { precision: 5, scale: 2 }).notNull(),
  validFrom: date("valid_from").notNull(),
  validTo: date("valid_to"),
  status: text("status").notNull().default('draft'), // 'draft' | 'active' | 'inactive'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: varchar("created_by").notNull(),
});

// Performance Records table (registros de desempenho)
export const performanceRecords = pgTable("performance_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  plantId: varchar("plant_id").references(() => plants.id),
  unitId: varchar("unit_id").references(() => units.id),
  energyGenerated: decimal("energy_generated", { precision: 10, scale: 2 }),
  energyConsumed: decimal("energy_consumed", { precision: 10, scale: 2 }).notNull(),
  energyCompensated: decimal("energy_compensated", { precision: 10, scale: 2 }).notNull(),
  billing: decimal("billing", { precision: 10, scale: 2 }).notNull(),
  consumerSavings: decimal("consumer_savings", { precision: 10, scale: 2 }),
  referenceMonth: text("reference_month").notNull(), // 'YYYY-MM'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: varchar("created_by").notNull(),
});

// Documents table (documentos genéricos)
export const documents = pgTable("documents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bucket: text("bucket").notNull(),
  path: text("path").notNull(),
  processing: boolean("processing").default(false),
  sizeBytes: integer("size_bytes"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  uploadedBy: varchar("uploaded_by").notNull(),
});

// Document Extractions table (extrações de documentos)
export const documentExtractions = pgTable("document_extractions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  documentId: varchar("document_id").references(() => documents.id).notNull(),
  docType: text("doc_type").notNull(), // 'energy_invoice' | 'contract' | 'id_document' | 'generic'
  jsonData: jsonb("json_data").notNull(),
  confidence: decimal("confidence", { precision: 3, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Email History table (histórico de emails)
export const emailHistory = pgTable("email_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  toEmail: text("to_email").notNull(),
  subject: text("subject").notNull(),
  status: text("status").notNull(), // 'sent' | 'failed' | 'pending'
  attachments: jsonb("attachments"),
  htmlPreview: text("html_preview"),
  providerMessageId: text("provider_message_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Email Templates table (templates de email)
export const emailTemplates = pgTable("email_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  html: text("html").notNull(),
  schemaVersion: integer("schema_version").default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Schemas for validation
export const insertConsumerSchema = createInsertSchema(consumers);
export const selectConsumerSchema = createSelectSchema(consumers);
export type InsertConsumer = z.infer<typeof insertConsumerSchema>;
export type Consumer = typeof consumers.$inferSelect;

export const insertPlantSchema = createInsertSchema(plants);
export const selectPlantSchema = createSelectSchema(plants);
export type InsertPlant = z.infer<typeof insertPlantSchema>;
export type Plant = typeof plants.$inferSelect;

export const insertUnitSchema = createInsertSchema(units);
export const selectUnitSchema = createSelectSchema(units);
export type InsertUnit = z.infer<typeof insertUnitSchema>;
export type Unit = typeof units.$inferSelect;

export const insertInvoiceSchema = createInsertSchema(invoices);
export const selectInvoiceSchema = createSelectSchema(invoices);
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type Invoice = typeof invoices.$inferSelect;

export const insertBillingRecordSchema = createInsertSchema(billingRecords);
export const selectBillingRecordSchema = createSelectSchema(billingRecords);
export type InsertBillingRecord = z.infer<typeof insertBillingRecordSchema>;
export type BillingRecord = typeof billingRecords.$inferSelect;

export const insertApportionmentSchema = createInsertSchema(apportionments);
export const selectApportionmentSchema = createSelectSchema(apportionments);
export type InsertApportionment = z.infer<typeof insertApportionmentSchema>;
export type Apportionment = typeof apportionments.$inferSelect;

export const insertPerformanceRecordSchema = createInsertSchema(performanceRecords);
export const selectPerformanceRecordSchema = createSelectSchema(performanceRecords);
export type InsertPerformanceRecord = z.infer<typeof insertPerformanceRecordSchema>;
export type PerformanceRecord = typeof performanceRecords.$inferSelect;

export const insertDocumentSchema = createInsertSchema(documents);
export const selectDocumentSchema = createSelectSchema(documents);
export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export const insertDocumentExtractionSchema = createInsertSchema(documentExtractions);
export const selectDocumentExtractionSchema = createSelectSchema(documentExtractions);
export type InsertDocumentExtraction = z.infer<typeof insertDocumentExtractionSchema>;
export type DocumentExtraction = typeof documentExtractions.$inferSelect;

export const insertEmailHistorySchema = createInsertSchema(emailHistory);
export const selectEmailHistorySchema = createSelectSchema(emailHistory);
export type InsertEmailHistory = z.infer<typeof insertEmailHistorySchema>;
export type EmailHistory = typeof emailHistory.$inferSelect;

export const insertEmailTemplateSchema = createInsertSchema(emailTemplates);
export const selectEmailTemplateSchema = createSelectSchema(emailTemplates);
export type InsertEmailTemplate = z.infer<typeof insertEmailTemplateSchema>;
export type EmailTemplate = typeof emailTemplates.$inferSelect;
