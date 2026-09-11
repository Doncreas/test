export interface EarnRuleResult {
  points: number;
  source: string;
}

export function calculateEarnedPoints({
  amountTzs,
  rating,
  hasPhoto,
  isCorporate,
  isBirthdayMonth,
  isMultiStop,
  isAiConcierge,
  referralCount = 0,
  streakCount = 0
}: {
  amountTzs?: number;
  rating?: number;
  hasPhoto?: boolean;
  isCorporate?: boolean;
  isBirthdayMonth?: boolean;
  isMultiStop?: boolean;
  isAiConcierge?: boolean;
  referralCount?: number;
  streakCount?: number;
}): number {
  let total = 0;

  if (typeof amountTzs === 'number' && amountTzs > 0) {
    total += Math.floor(amountTzs / 10000) * 100;
  }

  if (typeof rating === 'number' && rating >= 5 && hasPhoto) {
    total += 500;
  }

  if (referralCount > 0) {
    total += referralCount * 200;
  }

  if (isMultiStop) {
    total += 100;
  }

  if (isAiConcierge) {
    total += 50;
  }

  if (isCorporate) {
    total *= 2;
  }

  if (isBirthdayMonth) {
    total *= 5;
  }

  if (streakCount >= 5) {
    total += 500;
  }

  return total;
}

export function calculateRedemptionCost(points: number) {
  return {
    rideDiscount: Math.floor(points / 1000) * 1000,
    freeWaitMinutes: points >= 2500 ? 5 : 0,
    tierUpgrades: points >= 10000
  };
}
