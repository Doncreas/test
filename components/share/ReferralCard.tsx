'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, Gift, Share2, Sparkles } from 'lucide-react';
import {
  createReferralCode,
  getNextReferralMilestone,
  getReferralLink,
  getReferralRewards,
} from '@/lib/marketing/referral';

interface ReferralCardProps {
  displayName: string;
  userId?: string;
  referralCount?: number;
  baseUrl?: string;
}

export function ReferralCard({
  displayName,
  userId,
  referralCount = 0,
  baseUrl,
}: ReferralCardProps) {
  const [copied, setCopied] = useState(false);
  const code = useMemo(() => createReferralCode(displayName, userId), [displayName, userId]);
  const link = useMemo(() => getReferralLink(code, baseUrl), [baseUrl, code]);
  const rewards = getReferralRewards(referralCount);
  const nextMilestone = getNextReferralMilestone(referralCount);

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function shareLink() {
    if (navigator.share) {
      await navigator.share({ title: 'Join me on TANZALIFT', text: 'Use my referral link for TANZALIFT rides.', url: link });
      return;
    }
    await copyLink();
  }

  return (
    <section className="rounded-3xl border border-sage/10 bg-ink p-6 text-white shadow-[0_24px_70px_rgba(10,31,28,0.16)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold"><Gift size={14} /> Refer friends</p>
          <h2 className="mt-3 text-2xl font-black">Share the ride, earn rewards.</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/65">Invite friends to TANZALIFT and unlock points, free rides, and status rewards.</p>
        </div>
        <Sparkles className="flex-shrink-0 text-sunset" size={24} />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Your referral code</p>
        <p className="mt-2 font-mono text-2xl font-black tracking-wide text-gold">{code}</p>
        <p className="mt-2 break-all text-xs text-white/55">{link}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={copyLink} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-bold text-white hover:bg-white/15">
          {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy link'}
        </button>
        <button type="button" onClick={shareLink} className="inline-flex items-center justify-center gap-2 rounded-full bg-sunset px-4 py-3 text-sm font-bold text-white hover:bg-[#e96d13]">
          <Share2 size={16} /> Share
        </button>
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Successful referrals</span>
          <span className="font-black text-white">{referralCount}</span>
        </div>
        {nextMilestone ? (
          <p className="mt-3 text-sm text-white/70">Next reward at {nextMilestone.referrals}: <span className="font-bold text-gold">{nextMilestone.label}</span></p>
        ) : (
          <p className="mt-3 text-sm font-bold text-emerald-300">You have unlocked every referral milestone.</p>
        )}
        {rewards.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {rewards.map((reward) => <span key={`${reward.kind}-${reward.referrals}`} className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-xs font-bold text-emerald-200">{reward.label}</span>)}
          </div>
        ) : null}
      </div>
    </section>
  );
}
