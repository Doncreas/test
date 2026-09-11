'use client';

import { Copy, TicketPercent } from 'lucide-react';

interface ReferralLinkProps {
  code?: string;
}

export function ReferralLink({ code = 'KARIBU-JOSEPH' }: ReferralLinkProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Referral</p>
          <h3 className="mt-2 text-2xl font-black text-ink">Your unique code</h3>
        </div>
        <div className="rounded-full bg-sage/10 p-3 text-sage">
          <TicketPercent size={18} />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Code</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xl font-black text-ink">{code}</span>
          <button type="button" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
            <Copy size={14} />
            Copy
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        Rewards: 1 referral = 200 pts, 5 = 1,500 pts, 20 = Platinum invite.
      </div>
    </div>
  );
}
