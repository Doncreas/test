export type SafariSeason = 'low' | 'shoulder' | 'high';

export interface SeasonWindow {
  season: SafariSeason;
  label: string;
  months: number[];
  priceMultiplier: number;
  summary: string;
}

export const SAFARI_SEASONS: Record<SafariSeason, SeasonWindow> = {
  low: {
    season: 'low',
    label: 'Low season',
    months: [3, 4, 5],
    priceMultiplier: 0.8,
    summary: 'Green landscapes, fewer crowds and the best value.',
  },
  shoulder: {
    season: 'shoulder',
    label: 'Shoulder season',
    months: [1, 2, 6, 11],
    priceMultiplier: 1,
    summary: 'Good wildlife viewing with a balance of value and availability.',
  },
  high: {
    season: 'high',
    label: 'High season',
    months: [7, 8, 9, 10, 12],
    priceMultiplier: 1.25,
    summary: 'Peak dry-season travel and strong migration demand.',
  },
};

export const SAFARI_SEASON_ORDER: SafariSeason[] = ['low', 'shoulder', 'high'];

export function getSafariSeason(date: Date | string = new Date()): SafariSeason {
  const month = (date instanceof Date ? date : new Date(date)).getUTCMonth() + 1;

  const season = SAFARI_SEASON_ORDER.find((key) => SAFARI_SEASONS[key].months.includes(month));
  return season ?? 'shoulder';
}

export function getSeasonWindow(date: Date | string = new Date()): SeasonWindow {
  return SAFARI_SEASONS[getSafariSeason(date)];
}

export function getSeasonPriceMultiplier(date: Date | string = new Date()): number {
  return getSeasonWindow(date).priceMultiplier;
}