import { getSeasonWindow, type SafariSeason } from './seasonality';

export type SafariPackageId = 'serengeti-classic' | 'northern-circuit' | 'migration-premium' | 'family-safari';

export interface SafariPackage {
  id: SafariPackageId;
  name: string;
  tagline: string;
  durationDays: number;
  destinations: string[];
  highlights: string[];
  idealFor: string;
  basePricePerPerson: number;
  groupMinimum: number;
  maxGroupSize: number;
  image: string;
}

export interface SafariPriceRequest {
  packageId: SafariPackageId;
  startDate: string | Date;
  travelers: number;
}

export interface SafariPriceQuote {
  package: SafariPackage;
  travelers: number;
  season: SafariSeason;
  seasonLabel: string;
  seasonMultiplier: number;
  basePrice: number;
  totalPrice: number;
  currency: 'TZS';
  savings: number;
  validUntil: string;
}

export const SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: 'serengeti-classic',
    name: 'Serengeti Classic',
    tagline: 'Big skies, big cats, and timeless safari camps.',
    durationDays: 4,
    destinations: ['Arusha', 'Ngorongoro', 'Serengeti'],
    highlights: ['Crater game drive', 'Central Serengeti wildlife', 'Small-group 4x4 safari'],
    idealFor: 'First-time safari travelers',
    basePricePerPerson: 2850000,
    groupMinimum: 1,
    maxGroupSize: 6,
    image: '/images/safari-serengeti.jpg',
  },
  {
    id: 'northern-circuit',
    name: 'Northern Circuit Explorer',
    tagline: 'A deeper route through Tanzania’s most famous parks.',
    durationDays: 7,
    destinations: ['Tarangire', 'Lake Manyara', 'Ngorongoro', 'Serengeti'],
    highlights: ['Elephant country', 'Rift Valley viewpoints', 'Four national park stops'],
    idealFor: 'Travelers who want variety',
    basePricePerPerson: 4750000,
    groupMinimum: 2,
    maxGroupSize: 6,
    image: '/images/safari-northern-circuit.jpg',
  },
  {
    id: 'migration-premium',
    name: 'Migration Premium',
    tagline: 'Follow the herds with elevated camps and expert guiding.',
    durationDays: 6,
    destinations: ['Northern Serengeti', 'Central Serengeti', 'Ngorongoro'],
    highlights: ['Migration-route planning', 'Premium tented camps', 'Private guide upgrade'],
    idealFor: 'Wildlife photographers and couples',
    basePricePerPerson: 6900000,
    groupMinimum: 1,
    maxGroupSize: 4,
    image: '/images/safari-migration.jpg',
  },
  {
    id: 'family-safari',
    name: 'Family Safari',
    tagline: 'A comfortable, flexible wildlife adventure for every age.',
    durationDays: 5,
    destinations: ['Arusha', 'Tarangire', 'Ngorongoro', 'Lake Manyara'],
    highlights: ['Shorter game drives', 'Family-friendly lodges', 'Junior ranger activities'],
    idealFor: 'Families and multigenerational groups',
    basePricePerPerson: 3350000,
    groupMinimum: 2,
    maxGroupSize: 8,
    image: '/images/safari-family.jpg',
  },
];

export function getSafariPackage(packageId: string): SafariPackage | undefined {
  return SAFARI_PACKAGES.find((safariPackage) => safariPackage.id === packageId);
}

export function calculateSafariPrice({
  packageId,
  startDate,
  travelers,
}: SafariPriceRequest): SafariPriceQuote {
  const safariPackage = getSafariPackage(packageId);
  if (!safariPackage) {
    throw new Error(`Unknown safari package: ${packageId}`);
  }

  if (!Number.isInteger(travelers) || travelers < safariPackage.groupMinimum || travelers > safariPackage.maxGroupSize) {
    throw new Error(
      `${safariPackage.name} requires ${safariPackage.groupMinimum}-${safariPackage.maxGroupSize} travelers.`,
    );
  }

  const season = getSeasonWindow(startDate);
  const basePrice = safariPackage.basePricePerPerson * travelers;
  const totalPrice = Math.round(basePrice * season.priceMultiplier);
  const savings = season.priceMultiplier < 1 ? basePrice - totalPrice : 0;

  return {
    package: safariPackage,
    travelers,
    season: season.season,
    seasonLabel: season.label,
    seasonMultiplier: season.priceMultiplier,
    basePrice,
    totalPrice,
    currency: 'TZS',
    savings,
    validUntil: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  };
}
