import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { TransactionList, WalletTransaction } from '@/components/wallet/TransactionList';

const transactions: WalletTransaction[] = [
  { id: '1', title: 'M-Pesa top-up', date: '2026-08-14 08:40', amount: 200000, type: 'credit', status: 'completed', method: 'M-Pesa' },
  { id: '2', title: 'Airport ride payment', date: '2026-08-13 18:35', amount: 42000, type: 'debit', status: 'completed', method: 'Wallet' },
  { id: '3', title: 'P2P transfer from A. Kivumbi', date: '2026-08-12 12:15', amount: 50000, type: 'credit', status: 'completed', method: 'P2P' },
  { id: '4', title: 'Savings vault deposit', date: '2026-08-11 09:00', amount: 15000, type: 'debit', status: 'completed', method: 'Vault' },
  { id: '5', title: 'Refund', date: '2026-08-10 16:20', amount: 6000, type: 'credit', status: 'pending', method: 'Refund' }
];

export default function WalletHistoryPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/wallet" className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
            <ArrowLeft size={16} /> Back to wallet
          </Link>
          <button className="inline-flex items-center gap-2 rounded-full border border-sage/10 bg-white px-4 py-2 text-sm font-semibold text-sage">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>

        <TransactionList transactions={transactions} />
      </div>
    </main>
  );
}
