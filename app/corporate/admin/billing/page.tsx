const invoiceRows = [
  { description: 'Airport transfer riders', amount: 'TSh 640,000', vat: 'TSh 64,000' },
  { description: 'Field ride wait time', amount: 'TSh 260,000', vat: 'TSh 26,000' },
  { description: 'Bulk dispatch convoy rides', amount: 'TSh 380,000', vat: 'TSh 38,000' },
];

export default function CorporateBillingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Billing</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Invoices and payment terms</h1>
        </div>
        <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">Export invoice</button>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-5 md:flex-row md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Company</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Amani Health Group</h2>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm text-slate-500">Payment terms</p>
            <p className="mt-2 font-semibold text-ink">Net 15 · VAT registered</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {invoiceRows.map((row) => (
            <div key={row.description} className="grid grid-cols-3 gap-4 border-b border-slate-100 py-3 text-sm">
              <span className="text-slate-600">{row.description}</span>
              <span className="text-right text-slate-600">{row.amount}</span>
              <span className="text-right font-semibold text-ink">{row.vat}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 ml-auto max-w-sm space-y-2 text-sm text-slate-600">
          <div className="flex justify-between"><span>Subtotal</span><span>TSh 1,280,000</span></div>
          <div className="flex justify-between"><span>VAT (10%)</span><span>TSh 128,000</span></div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-black text-ink"><span>Total due</span><span>TSh 1,408,000</span></div>
        </div>
      </div>
    </main>
  );
}
