export type SubscriptionPlan = 'commuter' | 'weekly' | 'corporate';

export interface SubscriptionPlanDefinition {
  plan: SubscriptionPlan;
  ridesIncluded: number;
  priceTzs: number;
  description: string;
}

export const subscriptionPlans: SubscriptionPlanDefinition[] = [
  {
    plan: 'commuter',
    ridesIncluded: 20,
    priceTzs: 180000,
    description: 'Daily commuter plan for regular city routes.'
  },
  {
    plan: 'weekly',
    ridesIncluded: 4,
    priceTzs: 140000,
    description: 'Airport and recurring weekly travel plan.'
  },
  {
    plan: 'corporate',
    ridesIncluded: Number.POSITIVE_INFINITY,
    priceTzs: 850000,
    description: 'Unlimited rides with dedicated fleet support.'
  }
];

export function getPlanByName(plan: SubscriptionPlan) {
  return subscriptionPlans.find((item) => item.plan === plan) ?? subscriptionPlans[0];
}

export function getBulkDiscount(rides: number) {
  if (rides >= 10 && rides < 20) return 0.1;
  if (rides >= 20 && rides < 30) return 0.15;
  if (rides >= 30) return 0.25;
  return 0;
}
