import { Gift, Trophy, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PointsCard } from '@/components/rewards/PointsCard';
import { TierProgress } from '@/components/rewards/TierProgress';
import { RedeemModal } from '@/components/rewards/RedeemModal';
import { ReferralLink } from '@/components/rewards/ReferralLink';
import { getTierForPoints } from '@/lib/points/tiers';

export const dynamic = 'force-dynamic';

const stats = [
  { label: 'Ride spend', value: 'TSh 180,000', icon: Zap },
  { label: 'Referrals', value: '4 active', icon: Users },
  { label: 'Rewards earned', value: '12,400 pts', icon: Gift },
  { label: 'Tier', value: 'Gold', icon: Trophy }
];

export default function RewardsPage() {
  const points = 12400;
  const tier = getTierForPoints(points);

  return (
    <main className="min-h-screen bg-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Loyalty rewards</p>
            <h1 className="mt-2 text-4xl font-black text-ink">TATC Points</h1>
          </div>
          <Button type="button" variant="secondary">Redeem rewards</Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <PointsCard balance={points} tier={tier} streak={5} />
            <TierProgress points={points} />

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Earning rules</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">100 points per 10,000 TZS spent</div>
                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">500 points for 5-star review with photo</div>
                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">200 points per referral</div>
                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">100 points per multi-stop booking</div>
                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">50 points per AI concierge booking</div>
                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">1000 points signup bonus</div>
                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">2x points on corporate rides</div>
                <div className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">5x points in birthday month</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <ReferralLink />
            <RedeemModal />

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Account stats</p>
              <div className="mt-5 grid gap-3">
                {stats.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3">
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="rounded-full bg-white p-2 text-sage">
                        <Icon size={16} />
                      </div>
                      <span>{label}</span>
                    </div>
                    <span className="font-bold text-ink">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
