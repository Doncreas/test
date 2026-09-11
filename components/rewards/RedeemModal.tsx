'use client';

import { X } from 'lucide-react';

interface RedeemModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const rewards = [
  { label: '1,000 TZS ride credit', cost: 1000 },
  { label: 'Free 30 min wait', cost: 2500 },
  { label: 'Priority dispatch', cost: 5000 },
  { label: 'Airport lounge access', cost: 12000 }
];

export function RedeemModal({ isOpen = true, onClose }: RedeemModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
      <div className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-[0_30px_80px_rgba(10,30,25,0.2)]">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Redeem</p>
            <h3 className="mt-2 text-2xl font-black text-ink">Use your points</h3>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {rewards.map((reward) => (
            <button
              key={reward.label}
              type="button"
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:border-sage/40"
            >
              <span className="font-semibold text-slate-800">{reward.label}</span>
              <span className="rounded-full bg-sage/10 px-2 py-1 text-sm font-bold text-sage">
                {reward.cost.toLocaleString()} pts
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
