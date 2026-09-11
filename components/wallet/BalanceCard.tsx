import { ArrowDownLeft, ArrowUpRight, PiggyBank, ShieldCheck } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  vaultBalance: number;
  autoTopup: boolean;
  preferredCurrency?: string;
}

const formatTzs = (amount: number) => `TZS ${new Intl.NumberFormat('en-US').format(amount)}`;

export function BalanceCard({
  balance,
  vaultBalance,
  autoTopup,
  preferredCurrency = 'USD'
}: BalanceCardProps) {
  const displayBalance = (balance / 2600).toFixed(0);

  return (
    <section className="rounded-[32px] bg-gradient-to-br from-sunset via-[#ff8d2e] to-[#d86a17] p-[1px] shadow-[0_30px_80px_rgba(255,122,26,0.25)]">
      <div className="rounded-[31px] bg-gradient-to-br from-[#ff8c2a] via-[#ff7a1a] to-[#d85c11] p-6 text-white sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">Karibu Wallet</p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">{formatTzs(balance)}</h2>
          </div>
          <div className="rounded-2xl border border-white/25 bg-white/10 p-3 backdrop-blur-sm">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/85">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
            <ArrowDownLeft className="h-4 w-4" />
            <span>{preferredCurrency} {displayBalance}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
            <PiggyBank className="h-4 w-4" />
            <span>{autoTopup ? 'Auto top-up enabled' : 'Auto top-up off'}</span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Savings vault</p>
              <ArrowUpRight className="h-4 w-4 text-amber-100" />
            </div>
            <p className="mt-3 text-2xl font-black">{formatTzs(vaultBalance)}</p>
            <p className="mt-1 text-sm text-white/80">4.0% APY • parked funds</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-black/10 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-white/70">Priority</p>
              <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Wallet-first</span>
            </div>
            <p className="mt-3 text-lg font-bold">Wallet &gt; M-Pesa &gt; Card &gt; Cash</p>
            <p className="mt-1 text-sm text-white/80">cash requires pre-authorization</p>
          </div>
        </div>
      </div>
    </section>
  );
}
