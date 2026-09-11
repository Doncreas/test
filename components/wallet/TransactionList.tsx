'use client';

import { ArrowDownLeft, ArrowUpRight, Download, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export type WalletTransaction = {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending';
  method: string;
};

interface TransactionListProps {
  transactions: WalletTransaction[];
}

const filterOptions = ['all', 'topup', 'payment', 'transfer', 'refund'] as const;

export function TransactionList({ transactions }: TransactionListProps) {
  const [filter, setFilter] = useState<(typeof filterOptions)[number]>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return transactions;
    return transactions.filter((item) => item.title.toLowerCase().includes(filter) || item.method.toLowerCase().includes(filter));
  }, [filter, transactions]);

  const exportCsv = () => {
    const rows = [
      ['Date', 'Title', 'Method', 'Amount', 'Type', 'Status'],
      ...filtered.map((item) => [
        item.date,
        item.title,
        item.method,
        item.amount,
        item.type,
        item.status
      ])
    ];

    const csv = rows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'karibu-wallet-history.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded-[32px] border border-sage/10 bg-white p-5 shadow-[0_24px_80px_rgba(10,31,28,0.06)] sm:p-6">
      <div className="flex flex-col gap-4 border-b border-sage/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage/70">Activity</p>
          <h3 className="mt-2 text-2xl font-black text-ink">Transaction history</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-full border border-sage/10 bg-cream px-3 py-2 text-sm font-semibold text-sage"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 rounded-full border border-sage/10 bg-cream px-3 py-2 text-sm text-sage/70">
          <Search className="h-4 w-4" />
          <input
            className="w-full bg-transparent text-sm outline-none placeholder:text-sage/50"
            placeholder="Search transactions"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                filter === option
                  ? 'bg-sage text-white'
                  : 'border border-sage/10 bg-white text-sage/70 hover:bg-cream'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl border border-sage/10 bg-cream/60 p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {item.type === 'credit' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
              </div>
              <div>
                <p className="font-bold text-ink">{item.title}</p>
                <p className="text-sm text-ink/55">{item.date} • {item.method}</p>
              </div>
            </div>

            <div className="text-right">
              <p className={`font-black ${item.type === 'credit' ? 'text-emerald-600' : 'text-ink'}`}>
                {item.type === 'credit' ? '+' : '-'}TZS {new Intl.NumberFormat('en-US').format(item.amount)}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage/60">{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
