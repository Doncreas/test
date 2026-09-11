'use client';

const approvals = [
  { id: 'APR-101', amount: 'TSh 62,000', department: 'Operations', status: 'Pending manager approval' },
  { id: 'APR-102', amount: 'TSh 42,000', department: 'Clinical', status: 'Approved' },
  { id: 'APR-103', amount: 'TSh 89,000', department: 'Field Ops', status: 'Escalated' },
];

export function ApprovalFlow() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Approval flow</p>
          <h3 className="mt-2 text-xl font-black text-ink">Policy checks</h3>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">3 pending</span>
      </div>

      <div className="space-y-3">
        {approvals.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div>
              <p className="font-bold text-ink">{item.id}</p>
              <p className="text-xs text-slate-500">{item.department}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-ink">{item.amount}</p>
              <p className="text-xs text-slate-600">{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
