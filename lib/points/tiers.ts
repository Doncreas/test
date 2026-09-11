export type LoyaltyTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';

export interface TierDefinition {
  name: LoyaltyTier;
  min: number;
  max: number;
  perks: string[];
}

export const tierDefinitions: TierDefinition[] = [
  {
    name: 'Bronze',
    min: 0,
    max: 2499,
    perks: ['Basic rewards', 'Standard support']
  },
  {
    name: 'Silver',
    min: 2500,
    max: 9999,
    perks: ['Free wait +5 min', 'Priority support']
  },
  {
    name: 'Gold',
    min: 10000,
    max: 24999,
    perks: ['Priority dispatch', 'Free upgrades', '10 min wait']
  },
  {
    name: 'Platinum',
    min: 25000,
    max: 49999,
    perks: ['Dedicated hotline', 'Airport lounge access']
  },
  {
    name: 'Diamond',
    min: 50000,
    max: Number.POSITIVE_INFINITY,
    perks: ['Personal driver', 'Quarterly free rides']
  }
];

export function getTierForPoints(points: number): LoyaltyTier {
  const tier = tierDefinitions.findLast((item) => points >= item.min) ?? tierDefinitions[0];
  return tier.name;
}

export function getTierProgress(points: number) {
  const current = getTierForPoints(points);
  const index = tierDefinitions.findIndex((tier) => tier.name === current);
  const next = tierDefinitions[index + 1];

  return {
    current,
    next,
    progress: next ? ((points - tierDefinitions[index].min) / (next.min - tierDefinitions[index].min)) * 100 : 100
  };
}
