export type QuickBooksSyncStatus = 'queued' | 'synced' | 'failed';

export interface QuickBooksInvoicePayload {
  companyId: string;
  vendor: string;
  invoiceNumber: string;
  totalTzs: number;
  vatTzs: number;
  customerName: string;
  dueDate: string;
}

export async function syncInvoiceToQuickBooks(payload: QuickBooksInvoicePayload) {
  return {
    status: 'queued' as QuickBooksSyncStatus,
    syncId: `qb_${Date.now()}`,
    provider: 'quickbooks',
    payload,
  };
}

export async function syncExpenseReportToQuickBooks(report: { companyId: string; total: number; month: string }) {
  return {
    status: 'queued' as QuickBooksSyncStatus,
    syncId: `exp_${Date.now()}`,
    provider: 'quickbooks',
    report,
  };
}
