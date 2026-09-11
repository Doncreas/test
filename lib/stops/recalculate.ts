/**
 * Multi-stop fare recalculation logic for Karibu Tanzania
 * Dynamically prices rides based on distance, stops, and dwell time
 */

import { Stop, FareBreakdown, MultiStopItinerary, ItineraryEstimate } from '@/types/stop';
import { calculateDistance } from '@/lib/places/search';

/**
 * Karibu Tanzania pricing structure
 */
const PRICING_CONFIG = {
  // Base fees (TZS)
  baseFare: 15000,              // Minimum charge for airport pickup
  
  // Per-unit rates
  distanceRate: 4500,            // Per km (TZS)
  timeRate: 300,                 // Per minute (TZS)
  stopFee: 8000,                 // Per additional stop (TZS)
  
  // Dwell time
  dwellTimeCharges: {
    quick: 2000,                 // 5 min @ 400 TZS/min
    normal: 4500,                // 15 min @ 300 TZS/min
    extended: 13500              // 45 min @ 300 TZS/min
  },
  
  // Premium multipliers (if applicable)
  peakHourMultiplier: 1.2,       // 20% surge 18:00-22:00
  earlyMorningMultiplier: 1.15,  // 15% surge 04:00-06:00
  
  // Discounts
  loyaltyDiscountPercentage: 0,  // Override in calculation if user has TATC points
  
  // Tax
  taxPercentage: 0,              // Tanzania VAT varies by payment method
  
  // Limits
  maxStops: 4,
  estimatedStopDwellTime: {
    'bureau-de-change': 10,
    'supermarket': 20,
    'pharmacy': 8,
    'atm': 3,
    'sim-vendor': 5,
    'gas-station': 10,
    'restaurant': 30,
    'hotel': 15,
    'shopping': 25,
    'custom': 15
  }
};

/**
 * Calculate total distance for entire itinerary using Mapbox Directions API
 */
export async function calculateRouteDistance(
  pickup: { lat: number; lng: number },
  stops: Stop[],
  dropoff: { lat: number; lng: number }
): Promise<{
  totalDistance: number; // km
  totalDuration: number; // minutes
  routeGeometry?: any;
}> {
  try {
    const coordinates = [
      [pickup.lng, pickup.lat],
      ...stops.map((stop) => [stop.lng, stop.lat]),
      [dropoff.lng, dropoff.lat]
    ];

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token || coordinates.length < 2) {
      // Fallback to haversine calculation
      return calculateDistanceHaversine(pickup, stops, dropoff);
    }

    const coordsStr = coordinates.map((c) => c.join(',')).join(';');
    const url =
      `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsStr}?` +
      `steps=false&geometries=geojson&overview=full&access_token=${token}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.warn('[Directions API] Error, falling back to haversine');
      return calculateDistanceHaversine(pickup, stops, dropoff);
    }

    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      return {
        totalDistance: route.distance / 1000, // Convert meters to km
        totalDuration: Math.ceil(route.duration / 60), // Convert seconds to minutes
        routeGeometry: route.geometry
      };
    }

    return calculateDistanceHaversine(pickup, stops, dropoff);
  } catch (err) {
    console.error('[Route Calculation] Error:', err);
    return calculateDistanceHaversine(pickup, stops, dropoff);
  }
}

/**
 * Fallback: Calculate using Haversine formula
 */
function calculateDistanceHaversine(
  pickup: { lat: number; lng: number },
  stops: Stop[],
  dropoff: { lat: number; lng: number }
): {
  totalDistance: number;
  totalDuration: number;
} {
  let totalDistance = 0;
  const avgSpeedKmPerHour = 35; // Average city driving speed in Dar es Salaam

  // Pickup to first stop or dropoff
  const firstPoint = stops.length > 0 ? stops[0] : dropoff;
  totalDistance += calculateDistance(pickup.lat, pickup.lng, firstPoint.lat, firstPoint.lng);

  // Between stops
  for (let i = 0; i < stops.length - 1; i++) {
    totalDistance += calculateDistance(
      stops[i].lat,
      stops[i].lng,
      stops[i + 1].lat,
      stops[i + 1].lng
    );
  }

  // Last stop to dropoff
  if (stops.length > 0) {
    totalDistance += calculateDistance(
      stops[stops.length - 1].lat,
      stops[stops.length - 1].lng,
      dropoff.lat,
      dropoff.lng
    );
  }

  const travelMinutes = Math.ceil((totalDistance / avgSpeedKmPerHour) * 60);

  return {
    totalDistance,
    totalDuration: travelMinutes
  };
}

/**
 * Calculate total dwell time (sum of all stops)
 */
export function calculateDwellDuration(stops: Stop[]): number {
  return stops.reduce((total, stop) => total + stop.duration.minutes, 0);
}

/**
 * Calculate fare breakdown for multi-stop itinerary
 */
export async function calculateFare(
  itinerary: MultiStopItinerary,
  userLoyaltyPoints?: number
): Promise<FareBreakdown> {
  const { pickup, stops, dropoff, totalDistance, travelDuration, dwellDuration } = itinerary;

  // Base fare
  let baseFare = PRICING_CONFIG.baseFare;

  // Distance fare
  const distanceFare = totalDistance * PRICING_CONFIG.distanceRate;

  // Time fare (only for travel time + dwell time)
  const totalWaitTime = travelDuration + dwellDuration;
  const timeFare = totalWaitTime * PRICING_CONFIG.timeRate;

  // Stop fees
  const numStops = stops.length;
  const stopFee = numStops > 0 ? PRICING_CONFIG.stopFee * numStops : 0;
  const totalStopFee = stopFee;

  // Peak hour multiplier
  const now = new Date();
  const hour = now.getHours();
  let peakMultiplier = 1.0;

  if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour < 6)) {
    peakMultiplier = hour >= 18 && hour < 23 ? PRICING_CONFIG.peakHourMultiplier : 1.0;
    if (hour >= 0 && hour < 6) {
      peakMultiplier = PRICING_CONFIG.earlyMorningMultiplier;
    }
  }

  // Subtotal before discounts
  let subtotal = (baseFare + distanceFare + timeFare + totalStopFee) * peakMultiplier;

  // Loyalty discount (if redeeming points)
  let loyaltyDiscount = 0;
  if (userLoyaltyPoints && userLoyaltyPoints > 0) {
    // 100 TATC points = 1,000 TZS discount (configurable)
    loyaltyDiscount = Math.min(userLoyaltyPoints * 10, subtotal * 0.5); // Max 50% discount
  }

  // Apply discounts
  const discountedTotal = subtotal - loyaltyDiscount;

  // Tax
  const tax = Math.round(discountedTotal * (PRICING_CONFIG.taxPercentage / 100));

  // Final total
  const total = Math.round(discountedTotal + tax);

  // Per-stop breakdown
  const perStopBreakdown = stops.map((stop, index) => {
    const upToThisStop = baseFare + calculateDistance(pickup.lat, pickup.lng, stop.lat, stop.lng) * PRICING_CONFIG.distanceRate;
    return {
      stopName: stop.name || `Stop ${index + 1}`,
      estimatedFare: Math.round(upToThisStop)
    };
  });

  return {
    baseFare,
    distanceFare: Math.round(distanceFare),
    timeFare: Math.round(timeFare),
    stopFee,
    totalStopFee: Math.round(totalStopFee),
    loyaltyDiscount: Math.round(loyaltyDiscount),
    promoDiscount: 0, // Will be calculated separately if promo applied
    tax,
    total,
    currency: 'TZS',
    perStopBreakdown
  };
}

/**
 * Recalculate entire itinerary (distance, duration, fare) after stops change
 */
export async function recalculateItinerary(
  pickup: { lat: number; lng: number; name: string },
  stops: Stop[],
  dropoff: { lat: number; lng: number; name: string },
  userLoyaltyPoints?: number
): Promise<ItineraryEstimate> {
  // Validate stops
  if (stops.length > PRICING_CONFIG.maxStops) {
    throw new Error(
      `Maximum ${PRICING_CONFIG.maxStops} stops allowed`
    );
  }

  // Calculate route
  const { totalDistance, totalDuration, routeGeometry } = await calculateRouteDistance(
    pickup,
    stops,
    dropoff
  );

  // Calculate dwell duration
  const dwellDuration = calculateDwellDuration(stops);

  // Build itinerary
  const itinerary: MultiStopItinerary = {
    pickup,
    stops,
    dropoff,
    totalDistance,
    totalDuration: totalDuration + dwellDuration,
    travelDuration: totalDuration,
    dwellDuration
  };

  // Calculate fare
  const fare = await calculateFare(itinerary, userLoyaltyPoints);

  // Calculate ETAs
  const now = new Date();
  const pickupTime = new Date(now);
  let currentTime = new Date(pickupTime);

  // Average time to pickup = 10 minutes (typically at airport)
  const pickupETA = new Date(currentTime.getTime() + 10 * 60000);

  // Calculate stop and dropoff ETAs
  const estimatedTravelTimePerKm = (totalDuration / totalDistance) * 60; // seconds per km
  let currentDistance = 0;

  let firstStopETA: string | undefined;
  let lastStopETA: string | undefined;

  for (const stop of stops) {
    const distanceToStop = calculateDistance(pickup.lat, pickup.lng, stop.lat, stop.lng);
    const timeToStop = Math.ceil((distanceToStop / totalDistance) * totalDuration);
    const stopTime = new Date(pickupETA.getTime() + timeToStop * 60000);

    if (!firstStopETA) {
      firstStopETA = stopTime.toISOString();
    }
    lastStopETA = new Date(stopTime.getTime() + stop.duration.minutes * 60000).toISOString();
  }

  const dropoffDistance = totalDistance;
  const dropoffMinutes = totalDuration + dwellDuration;
  const dropoffETA = new Date(pickupETA.getTime() + dropoffMinutes * 60000);

  return {
    itinerary,
    fare,
    eta: {
      pickup: pickupETA.toISOString(),
      firstStop: firstStopETA,
      lastStop: lastStopETA,
      dropoff: dropoffETA.toISOString(),
      totalMinutes: dropoffMinutes
    },
    routeGeometry
  };
}

/**
 * Get loyalty points earned for this booking
 */
export function calculateLoyaltyPoints(
  distance: number,
  numberOfStops: number,
  fareAmount: number
): number {
  // Base: 1 point per 100 TZS spent
  const pointsFromFare = Math.floor(fareAmount / 100);

  // Bonus: 50 points per stop (encourages multi-stop bookings)
  const stopBonusPoints = numberOfStops * 50;

  // Distance bonus: 1 point per km (encourages longer trips)
  const distanceBonusPoints = Math.floor(distance);

  return pointsFromFare + stopBonusPoints + distanceBonusPoints;
}

/**
 * Estimate time impact of adding a stop
 */
export function estimateStopImpact(
  stopCategory: string,
  currentTotalMinutes: number
): number {
  const dwellTime =
    PRICING_CONFIG.estimatedStopDwellTime[
      stopCategory as keyof typeof PRICING_CONFIG.estimatedStopDwellTime
    ] || 15;

  // Average 3 minutes to reach any stop + dwell time
  return 3 + dwellTime;
}
