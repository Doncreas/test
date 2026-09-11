export type ReferralRewardKind = 'points' | 'free-ride' | 'platinum-invite' | 'diamond-month';

export interface ReferralMilestone {
  referrals: number;
  reward: number | string;
  kind: ReferralRewardKind;
  label: string;
}

export const REFERRAL_MILESTONES: ReferralMilestone[] = [
  { referrals: 1, reward: 200, kind: 'points', label: '200 points' },
  { referrals: 4, reward: 1, kind: 'free-ride', label: '1 free ride' },
  { referrals: 5, reward: 1500, kind: 'points', label: '1,500 points' },
  { referrals: 20, reward: 'Platinum', kind: 'platinum-invite', label: 'Platinum invite' },
];

export const LEADERBOARD_REWARD: ReferralMilestone = {
  referrals: 0,
  reward: 1,
  kind: 'diamond-month',
  label: 'Diamond status free for 1 month',
};

function normalizeReferralName(name: string): string {
  const normalized = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toUpperCase();

  return normalized.slice(0, 24) || 'FRIEND';
}

export function createReferralCode(displayName: string, userId?: string): string {
  const name = normalizeReferralName(displayName);
  const suffix = userId ? userId.replace(/[^a-zA-Z0-9]/g, '').slice(-4).toUpperCase() : '';

  return `KARIBU-${name}${suffix && name === 'FRIEND' ? `-${suffix}` : ''}`;
}

export function getReferralLink(code: string, baseUrl = 'https://karibu.tz'): string {
  const normalizedCode = encodeURIComponent(code.trim().toUpperCase());
  return `${baseUrl.replace(/\/$/, '')}/signup?ref=${normalizedCode}`;
}

export function getReferralQrUrl(code: string, baseUrl = 'https://karibu.tz'): string {
  const referralLink = encodeURIComponent(getReferralLink(code, baseUrl));
  return `https://quickchart.io/qr?text=${referralLink}&size=320&margin=2`;
}

export function getReferralRewards(referralCount: number): ReferralMilestone[] {
  const count = Math.max(0, Math.floor(referralCount));
  return REFERRAL_MILESTONES.filter((milestone) => milestone.referrals <= count);
}

export function getNextReferralMilestone(referralCount: number): ReferralMilestone | undefined {
  const count = Math.max(0, Math.floor(referralCount));
  return REFERRAL_MILESTONES.find((milestone) => milestone.referrals > count);
}