// Tipos adicionais para a aplicação

export type InvoiceType = 'solar' | 'distributor' | 'generation';
export type InvoiceEntityType = 'plant' | 'unit';
export type BillingStatus = 'pending' | 'paid' | 'overdue' | 'sent' | 'not_billed';
export type DocumentType = 'energy_invoice' | 'contract' | 'id_document' | 'generic';
export type EmailStatus = 'sent' | 'failed' | 'pending';
export type ApportionmentStatus = 'draft' | 'active' | 'inactive';

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface InvoiceParsedData {
  ucNumber?: string;
  distributor?: string;
  referenceMonth?: number;
  referenceYear?: number;
  dueDate?: string;
  amountTotal?: number;
  kwhCompensated?: number;
  kwhConsumed?: number;
  band?: string;
  [key: string]: any;
}

export interface BillingRecordWithDetails {
  id: string;
  invoiceId: string;
  distributorInvoiceId: string;
  consumerId: string;
  status: BillingStatus;
  createdAt: string;
  invoice?: {
    id: string;
    amountTotal: string | null;
    dueDate: string | null;
    referenceMonth: number | null;
    referenceYear: number | null;
  };
  distributorInvoice?: {
    id: string;
    storagePath: string;
  };
  consumer?: {
    id: string;
    name: string;
    email: string | null;
    document: string | null;
  };
  unit?: {
    id: string;
    ucNumber: string;
  };
}

export interface DashboardStats {
  totalConsumers: number;
  totalUnits: number;
  totalInvoices: number;
  totalReceivable: number;
  paidInvoices: number;
  pendingInvoices: number;
  overdueInvoices: number;
}

export interface PerformanceSummary {
  energyGenerated: number;
  energyConsumed: number;
  energyCompensated: number;
  totalBilling: number;
  consumerSavings: number;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  variables: string[];
}

export interface FileUpload {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}
