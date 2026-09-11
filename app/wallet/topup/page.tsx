"use client";

import Link from 'next/link';
import { ArrowLeft, CheckCircle2, CreditCard, Landmark, Smartphone, Wallet } from 'lucide-react';
import { useState } from 'react';

export default function WalletTopUpPage() {
  const [amount, setAmount] = useState(20000);
  const [method, setMethod] = useState<'mpesa' | 'card' | 'bank'>('mpesa');
  const [submitted, setSubmitted] = useState(false);

  const methods = [
    { id: 'mpesa', label: 'M-Pesa STK Push', icon: Smartphone, note: 'Instant • 15 seconds' },
    { id: 'card', label: 'Card (Stripe)', icon: CreditCard, note: 'Encrypted • 3D secure' },
    { id: 'bank', label: 'Bank transfer', icon: Landmark, note: 'Manual review • 2 hrs' }
  ] as const;

  const handleSubmit = () => setSubmitted(true);

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/wallet" className="inline-flex w-fit items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
          <ArrowLeft size={16} /> Back to wallet
        </Link>

        <div className="mt-8 grid gap-8 rounded-[36px] border border-sage/10 bg-white p-6 shadow-[0_24px_80px_rgba(10,31,28,0.08)] sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sage/70">Top up</p>
            <h1 className="mt-3 text-4xl font-black text-ink">Fund your wallet</h1>
            <div className="mt-6 space-y-3">
              <label className="block text-sm font-semibold text-ink/70">Amount (TZS)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value || 0))}
                className="w-full rounded-2xl border border-sage/10 bg-cream px-4 py-3 text-lg font-bold text-ink outline-none"
              />
            </div>

            <div className="mt-6 space-y-3">
              {methods.map(({ id, label, icon: Icon, note }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                    method === id ? 'border-sage bg-sage/5 ring-2 ring-sage/10' : 'border-sage/10 bg-cream'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white p-2 text-sage">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-ink">{label}</p>
                      <p className="text-sm text-ink/60">{note}</p>
                    </div>
                  </div>
                  <div className={`h-5 w-5 rounded-full border-2 ${method === id ? 'border-sage bg-sage' : 'border-sage/20'}`} />
                </button>
              ))}
            </div>

            <button onClick={handleSubmit} className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sunset to-[#ff9447] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_40px_rgba(255,122,26,0.25)]">
              Continue with {method === 'mpesa' ? 'M-Pesa' : method === 'card' ? 'Card' : 'Bank transfer'}
            </button>
          </div>

          <aside className="rounded-[28px] bg-gradient-to-br from-ink via-sage to-[#1c5d46] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-3">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">Quick summary</p>
                <p className="mt-1 text-lg font-bold">Karibu Wallet</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 rounded-[24px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-white/80">
                <span>Amount</span>
                <span className="font-bold text-white">TZS {amount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Method</span>
                <span className="font-bold text-white">{method.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between text-white/80">
                <span>Processing</span>
                <span className="font-bold text-white">{method === 'mpesa' ? 'Instant' : method === 'card' ? 'Secured' : '2 hrs'}</span>
              </div>
            </div>

            {submitted && (
              <div className="mt-8 rounded-[24px] bg-emerald-500/10 p-4 text-emerald-100">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="h-5 w-5" />
                  Request queued
                </div>
                <p className="mt-2 text-sm text-emerald-100/85">Your top-up is being processed. You’ll receive a confirmation message once funds are available.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
