export type PassTier = 'free' | 'pass' | 'passplus' | 'black';

export interface PassPlan {
  tier: PassTier;
  priceTzs: number;
  monthlyDiscountPercent: number;
  annualDiscountPercent: number;
  freeWaitMinutes: number;
  priorityDispatch: boolean;
  freeFirstKm: number;
  freeUpgradePerMonth: number;
  loungeAccess: boolean;
  luxuryVehicleOnly: boolean;
  airportConcierge: boolean;
  familySeats: number;
}

export const PASS_PLANS: Record<PassTier, PassPlan> = {
  free: {
    tier: 'free',
    priceTzs: 0,
    monthlyDiscountPercent: 0,
    annualDiscountPercent: 0,
    freeWaitMinutes: 0,
    priorityDispatch: false,
    freeFirstKm: 0,
    freeUpgradePerMonth: 0,
    loungeAccess: false,
    luxuryVehicleOnly: false,
    airportConcierge: false,
    familySeats: 1,
  },
  pass: {
    tier: 'pass',
    priceTzs: 9900,
    monthlyDiscountPercent: 10,
    annualDiscountPercent: 16.7,
    freeWaitMinutes: 10,
    priorityDispatch: true,
    freeFirstKm: 0,
    freeUpgradePerMonth: 0,
    loungeAccess: false,
    luxuryVehicleOnly: false,
    airportConcierge: false,
    familySeats: 2,
  },
  passplus: {
    tier: 'passplus',
    priceTzs: 24900,
    monthlyDiscountPercent: 20,
    annualDiscountPercent: 16.7,
    freeWaitMinutes: 20,
    priorityDispatch: true,
    freeFirstKm: 5,
    freeUpgradePerMonth: 1,
    loungeAccess: true,
    luxuryVehicleOnly: false,
    airportConcierge: false,
    familySeats: 3,
  },
  black: {
    tier: 'black',
    priceTzs: 49900,
    monthlyDiscountPercent: 25,
    annualDiscountPercent: 16.7,
    freeWaitMinutes: 30,
    priorityDispatch: true,
    freeFirstKm: 8,
    freeUpgradePerMonth: 2,
    loungeAccess: true,
    luxuryVehicleOnly: true,
    airportConcierge: true,
    familySeats: 4,
  },
};

export function calculateAnnualPrice(tier: PassTier) {
  const monthly = PASS_PLANS[tier].priceTzs;
  const annualTotal = monthly * 12;
  const discount = annualTotal * (PASS_PLANS[tier].annualDiscountPercent / 100);
  return {
    monthly,
    annualTotal,
    annualDiscount: Math.round(discount),
    actualAnnualPrice: Math.round(annualTotal - discount),
  };
}

export function estimateSavings(tier: PassTier, monthlySpendTzs: number) {
  const discountRate = PASS_PLANS[tier].monthlyDiscountPercent / 100;
  return Math.round(monthlySpendTzs * discountRate);
}

export function getPlanValue(tier: PassTier, ridesThisMonth: number, savedThisMonth: number) {
  const plan = PASS_PLANS[tier];
  const totalPerks = ridesThisMonth * (plan.monthlyDiscountPercent / 100) * 20000;
  return {
    ridesThisMonth,
    savedThisMonth,
    totalPerksAvailable: Math.round(Math.max(totalPerks, savedThisMonth)),
    valueScore: Math.min(100, Math.round(((savedThisMonth || 1) / Math.max(plan.priceTzs, 1)) * 100 * 2)),
  };
}
