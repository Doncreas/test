import { PASS_PLANS, PassTier } from '@/lib/pass/billing';

interface TierCardProps {
  tier: PassTier;
  selected?: boolean;
  isBlack?: boolean;
}

const tierLabels = {
  free: 'Free',
  pass: 'Karibu Pass',
  passplus: 'Karibu Pass+',
  black: 'Karibu Black',
};

export function TierCard({ tier, selected = false, isBlack = false }: TierCardProps) {
  const plan = PASS_PLANS[tier];
  const label = tierLabels[tier];

  return (
    <div
      className={[
        'rounded-[28px] border p-5 shadow-sm transition-all',
        isBlack
          ? 'border-amber-300 bg-gradient-to-b from-amber-100 via-white to-white text-ink'
          : 'border-slate-200 bg-white text-ink',
        selected ? 'ring-2 ring-sage' : '',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">{label}</p>
          <h3 className="mt-3 text-3xl font-black">{plan.priceTzs === 0 ? 'Free' : `TSh ${plan.priceTzs.toLocaleString()}`}</h3>
        </div>
        {tier !== 'free' && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
            /mo
          </span>
        )}
      </div>

      <p className="mt-4 text-sm text-slate-600">
        {tier === 'free' && 'Standard access with no recurring fee.'}
        {tier === 'pass' && '10% off rides, priority dispatch, and extra wait time.'}
        {tier === 'passplus' && '20% off rides, lounge access, and one free upgrade monthly.'}
        {tier === 'black' && 'Luxury-only rides, airport concierge, and premium support.'}
      </p>

      <ul className="mt-5 space-y-2 text-sm text-slate-700">
        {tier === 'free' && <li>• Standard all rides</li>}
        {tier === 'pass' && (
          <>
            <li>• 10% off all rides</li>
            <li>• Free wait +10 min</li>
            <li>• Priority dispatch</li>
          </>
        )}
        {tier === 'passplus' && (
          <>
            <li>• 20% off all rides</li>
            <li>• Free wait +20 min</li>
            <li>• Free first 5km</li>
            <li>• 1 upgrade/month</li>
            <li>• Lounge access</li>
          </>
        )}
        {tier === 'black' && (
          <>
            <li>• Luxury vehicles only</li>
            <li>• Dedicated hotline</li>
            <li>• 2 upgrades/month</li>
            <li>• Airport concierge</li>
            <li>• Lounge access included</li>
          </>
        )}
      </ul>

      <button className={[
        'mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold',
        isBlack ? 'bg-ink text-white' : 'border border-slate-300 bg-white text-ink',
      ].join(' ')}>
        {tier === 'free' ? 'Current plan' : 'Upgrade'}
      </button>
    </div>
  );
}
