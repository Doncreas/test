import { CreditCard, Landmark, Smartphone, X } from 'lucide-react';

interface TopUpModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (method: 'mpesa' | 'card' | 'bank', amount: number) => void;
}

const methods = [
  { id: 'mpesa', label: 'M-Pesa STK Push', icon: Smartphone },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'bank', label: 'Bank transfer', icon: Landmark }
] as const;

export function TopUpModal({ open, onClose, onSubmit }: TopUpModalProps) {
  if (!open) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const method = form.get('method') as 'mpesa' | 'card' | 'bank';
    const amount = Number(form.get('amount') || 0);
    if (amount > 0) onSubmit(method, amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[32px] border border-sage/10 bg-white p-6 shadow-[0_30px_90px_rgba(10,31,28,0.18)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage/70">Top up</p>
            <h3 className="mt-2 text-2xl font-black text-ink">Add funds to wallet</h3>
          </div>
          <button onClick={onClose} className="rounded-full border border-sage/10 p-2 text-sage">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-ink/70">Amount (TZS)</label>
            <input
              name="amount"
              type="number"
              min={1000}
              defaultValue={20000}
              className="mt-2 w-full rounded-2xl border border-sage/10 bg-cream px-4 py-3 text-lg font-bold text-ink outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink/70">Payment method</label>
            <div className="mt-2 space-y-2">
              {methods.map(({ id, label, icon: Icon }) => (
                <label key={id} className="flex cursor-pointer items-center justify-between rounded-2xl border border-sage/10 bg-cream p-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white p-2 text-sage">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-semibold text-ink">{label}</span>
                  </div>
                  <input type="radio" name="method" value={id} defaultChecked={id === 'mpesa'} className="h-4 w-4 accent-sunset" />
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 rounded-full border border-sage/10 bg-white px-4 py-3 font-semibold text-sage">
              Cancel
            </button>
            <button type="submit" className="flex-1 rounded-full bg-gradient-to-r from-sunset to-[#ff9447] px-4 py-3 font-semibold text-white shadow-[0_18px_40px_rgba(255,122,26,0.2)]">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
