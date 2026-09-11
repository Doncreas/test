export type PickupType = 'airport' | 'address';
export type VehicleType = 'sedan' | 'suv' | 'van';
export type PassengerTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface RoutePoint {
  lat: number;
  lng: number;
  type: PickupType;
}

export interface PricingFactor {
  name: string;
  impact: number;
  detail?: string;
}

export interface QuoteRequest {
  pickup: RoutePoint;
  dropoff: RoutePoint;
  time: string;
  vehicleType: VehicleType;
  passengerTier: PassengerTier;
  passengerCount?: number;
}

export interface QuoteResponse {
  basePrice: number;
  surgeMultiplier: number;
  finalPrice: number;
  factors: PricingFactor[];
  savings: number;
  validUntil: string;
}

export const vehicleBasePrice: Record<VehicleType, number> = {
  sedan: 25000,
  suv: 34000,
  van: 46000,
};

export const tierDiscountMap: Record<PassengerTier, number> = {
  bronze: 0,
  silver: 0.05,
  gold: 0.1,
  platinum: 0.15,
  diamond: 0.2,
};

export const tierSurgeCap: Record<PassengerTier, number> = {
  bronze: 1.4,
  silver: 1.6,
  gold: 2.0,
  platinum: 2.0,
  diamond: 1.0,
};

export function getHourOfDay(timeIso: string) {
  return new Date(timeIso).getHours();
}

export function estimateDemandRatio(pickup: RoutePoint) {
  const zoneBias = Math.abs(pickup.lat) + Math.abs(pickup.lng);
  const base = 1 + (zoneBias % 0.8) * 0.3;
  return Number(Math.min(Math.max(base, 0.8), 2.1).toFixed(2));
}

export function estimateFlightDensity(timeIso: string) {
  const hour = getHourOfDay(timeIso);
  const isAirportWindow = hour >= 6 && hour <= 10 || hour >= 16 && hour <= 21;

  if (!isAirportWindow) return 0.85;
  return 1.22;
}

export function estimateWeather(timeIso: string) {
  const hour = getHourOfDay(timeIso);
  const isHeavyRainWindow = hour >= 15 && hour <= 19;
  return isHeavyRainWindow ? 1.15 : 1;
}

export function estimateEventFactor(timeIso: string) {
  const date = new Date(timeIso);
  const month = date.getMonth();
  const day = date.getDate();

  if (month === 8 && day >= 10 && day <= 18) return 1.12;
  if (month === 10 && day >= 1 && day <= 8) return 1.1;
  return 1;
}

export function estimateDistanceFactor(pickup: RoutePoint, dropoff: RoutePoint) {
  const distanceKm = Math.hypot(pickup.lat - dropoff.lat, pickup.lng - dropoff.lng) * 111.32;
  return distanceKm > 55 ? 1.12 : 1;
}

export function getOffPeakDiscount(timeIso: string) {
  const hour = getHourOfDay(timeIso);
  return hour >= 15 && hour <= 17 ? 0.1 : 0;
}

export function getGroupDiscount(passengerCount = 1) {
  if (passengerCount >= 6) return 0.2;
  if (passengerCount >= 4) return 0.15;
  return 0;
}

export function getAirportFixedPriceFactor(pickup: RoutePoint, dropoff: RoutePoint) {
  if (pickup.type === 'airport' || dropoff.type === 'airport') {
    return 0;
  }

  return 0;
}

export function formatMoney(value: number) {
  return Math.round(value);
}
