"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowRightLeft, CreditCard, History, Plus, ShieldCheck, Wallet2 } from 'lucide-react';
import { useState } from 'react';
import { BalanceCard } from '@/components/wallet/BalanceCard';
import { TopUpModal } from '@/components/wallet/TopUpModal';
import { TransactionList, WalletTransaction } from '@/components/wallet/TransactionList';

export const dynamic = 'force-dynamic';

const transactions: WalletTransaction[] = [
  { id: '1', title: 'M-Pesa top-up', date: 'Today, 08:40', amount: 200000, type: 'credit', status: 'completed', method: 'M-Pesa' },
  { id: '2', title: 'Airport ride payment', date: 'Yesterday, 18:35', amount: 42000, type: 'debit', status: 'completed', method: 'Wallet' },
  { id: '3', title: 'P2P transfer from A. Kivumbi', date: 'Mon, 12:15', amount: 50000, type: 'credit', status: 'completed', method: 'P2P' },
  { id: '4', title: 'Savings vault deposit', date: 'Sun, 09:00', amount: 15000, type: 'debit', status: 'completed', method: 'Vault' },
  { id: '5', title: 'Refund', date: 'Fri, 16:20', amount: 6000, type: 'credit', status: 'pending', method: 'Refund' }
];

export default function WalletPage() {
  const [topUpOpen, setTopUpOpen] = useState(false);

  const handleTopUp = (method: 'mpesa' | 'card' | 'bank', amount: number) => {
    setTopUpOpen(false);
    alert(`Top-up request: ${method} • TZS ${amount.toLocaleString()}`);
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
            <ArrowLeft size={16} /> Back to home
          </Link>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-sage/10 bg-white px-4 py-2 text-sm font-semibold text-sage">
              <Wallet2 className="h-4 w-4" /> Wallet
            </button>
          </div>
        </div>

        <BalanceCard balance={180000} vaultBalance={65000} autoTopup={true} />

        <div className="grid gap-4 md:grid-cols-3">
          <button onClick={() => setTopUpOpen(true)} className="rounded-[24px] border border-sage/10 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-sage/70">Top up</span>
              <Plus className="h-5 w-5 text-sage" />
            </div>
            <p className="mt-4 text-xl font-black text-ink">Add funds</p>
            <p className="mt-2 text-sm text-ink/60">M-Pesa, card, or bank transfer</p>
          </button>

          <Link href="/wallet/history" className="rounded-[24px] border border-sage/10 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-sage/70">History</span>
              <History className="h-5 w-5 text-sage" />
            </div>
            <p className="mt-4 text-xl font-black text-ink">Recent activity</p>
            <p className="mt-2 text-sm text-ink/60">Filter, search, and export CSV</p>
          </Link>

          <Link href="/wallet/topup" className="rounded-[24px] border border-sage/10 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-sage/70">Auto top-up</span>
              <ShieldCheck className="h-5 w-5 text-sage" />
            </div>
            <p className="mt-4 text-xl font-black text-ink">Keep min 20,000 TZS</p>
            <p className="mt-2 text-sm text-ink/60">Stay protected on every trip</p>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <TransactionList transactions={transactions} />

          <aside className="space-y-5 rounded-[32px] border border-sage/10 bg-white p-5 shadow-[0_24px_80px_rgba(10,31,28,0.06)] sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage/70">Wallet perks</p>
              <h3 className="mt-2 text-2xl font-black text-ink">Tanzania-first benefits</h3>
            </div>

            <div className="space-y-3">
              {[
                'Instant M-Pesa top-ups to ride faster',
                'Savings vault with 4% APY on parked funds',
                'Split payments for group airport travel',
                'P2P transfers between Karibu users' 
              ].map((perk) => (
                <div key={perk} className="flex gap-3 rounded-2xl border border-sage/10 bg-cream p-3">
                  <div className="mt-1 rounded-full bg-sage/10 p-2 text-sage">
                    <ArrowRightLeft className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium text-ink/75">{perk}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[24px] bg-gradient-to-br from-ink via-sage to-[#1b5c45] p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Preferred currency</p>
              <p className="mt-3 text-3xl font-black">TZS + USD</p>
              <p className="mt-2 text-sm text-white/75">Show cash value in TZS and your chosen foreign currency.</p>
            </div>
          </aside>
        </div>
      </div>

      <TopUpModal open={topUpOpen} onClose={() => setTopUpOpen(false)} onSubmit={handleTopUp} />
    </main>
  );
}
