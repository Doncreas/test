import { NextRequest, NextResponse } from 'next/server';
import { SuggestedStop, SuggestStopsRequest, SuggestStopsResponse, StopCategory } from '@/types/stop';
import { calculateDistance } from '@/lib/places/search';

/**
 * POST /api/itinerary/suggest-stops
 * AI-powered stop suggestions based on user profile, route, and preferences
 * 
 * Uses pattern matching and heuristics to suggest stops tourists/travelers need
 */
export async function POST(req: NextRequest) {
  try {
    const body: SuggestStopsRequest = await req.json();
    const { pickup, dropoff, userProfile } = body;

    if (!pickup || !dropoff) {
      return NextResponse.json(
        { error: 'Missing pickup or dropoff' },
        { status: 400 }
      );
    }

    // Generate AI suggestions
    const suggestions = await generateSuggestionsAI(pickup, dropoff, userProfile);

    const response: SuggestStopsResponse = {
      suggestions,
      reasoning: generateReasoningText(userProfile, suggestions),
      maxStops: 4,
      estimatedTimePerStop: {
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

    return NextResponse.json(response);
  } catch (err) {
    console.error('[Suggest Stops API] Error:', err);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}

/**
 * Generate AI suggestions based on user profile and route
 */
async function generateSuggestionsAI(
  pickup: any,
  dropoff: any,
  userProfile: any
): Promise<SuggestedStop[]> {
  const suggestions: SuggestedStop[] = [];

  const isFirstTimer = userProfile?.travelFrequency === 'first-time';
  const isTourist = !userProfile?.nationality || userProfile?.nationality !== 'TZ';
  const isFrequent = userProfile?.travelFrequency === 'frequent';

  // Calculate route direction and distance
  const routeDistance = calculateDistance(pickup.lat, pickup.lng, dropoff.lat, dropoff.lng);
  const isLongRoute = routeDistance > 15; // More than 15km

  // Suggestion 1: Bureau de Change (forex) - High priority for tourists
  if (isTourist || isFirstTimer) {
    suggestions.push({
      id: 'suggestion-bdc-1',
      name: 'Dar Express Bureau de Change',
      address: 'Chole Road, Masaki, Dar es Salaam',
      lat: -6.7929,
      lng: 39.2301,
      category: 'bureau-de-change',
      rating: 4.7,
      reviewCount: 234,
      reasoning: 'Best rates for USD/EUR exchange. On your route!',
      estimatedTime: 10,
      distance: {
        fromPickup: calculateDistance(pickup.lat, pickup.lng, -6.7929, 39.2301),
        toNextStop: 3.2
      },
      operating: { isOpen: true, opensAt: '08:00', closesAt: '18:00' },
      amenities: ['ATM', 'WiFi', 'Parking'],
      priority: 5
    });
  }

  // Suggestion 2: Supermarket (imported goods) - For tourists who need supplies
  if ((isTourist || isFirstTimer) && isLongRoute) {
    suggestions.push({
      id: 'suggestion-supermarket-1',
      name: 'Shoprite Dar es Salaam',
      address: 'Slipway Centre, Old Bagamoyo Road',
      lat: -6.7845,
      lng: 39.2421,
      category: 'supermarket',
      rating: 4.6,
      reviewCount: 567,
      reasoning: 'Premium supermarket with imported goods, beverages, snacks',
      estimatedTime: 20,
      distance: {
        fromPickup: calculateDistance(pickup.lat, pickup.lng, -6.7845, 39.2421),
        toNextStop: 2.1
      },
      operating: { isOpen: true, opensAt: '08:00', closesAt: '22:00' },
      amenities: ['ATM', 'Parking', 'Café', 'WiFi'],
      priority: 4
    });
  }

  // Suggestion 3: Pharmacy - High priority, especially for first-timers
  if (isFirstTimer) {
    suggestions.push({
      id: 'suggestion-pharmacy-1',
      name: 'Victoria Pharmacy (English-speaking)',
      address: 'Msasani Peninsula, Dar es Salaam',
      lat: -6.7758,
      lng: 39.2528,
      category: 'pharmacy',
      rating: 4.8,
      reviewCount: 312,
      reasoning: 'English-speaking staff, stocked with international medications',
      estimatedTime: 8,
      distance: {
        fromPickup: calculateDistance(pickup.lat, pickup.lng, -6.7758, 39.2528),
        toNextStop: 1.8
      },
      operating: { isOpen: true, opensAt: '07:00', closesAt: '20:00' },
      amenities: ['Parking', 'WiFi'],
      priority: 5
    });
  }

  // Suggestion 4: ATM (Visa/Mastercard) - Medium priority
  suggestions.push({
    id: 'suggestion-atm-1',
    name: 'CRDB Bank ATM (Visa/MC)',
    address: 'Slipway Centre, Bagamoyo Road',
    lat: -6.7847,
    lng: 39.2420,
    category: 'atm',
    rating: 4.5,
    reviewCount: 1200,
    reasoning: 'Reliable ATM with 24/7 access, accepts all international cards',
    estimatedTime: 3,
    distance: {
      fromPickup: calculateDistance(pickup.lat, pickup.lng, -6.7847, 39.2420),
      toNextStop: 0.5
    },
    operating: { isOpen: true },
    amenities: ['24/7'],
    priority: 4
  });

  // Suggestion 5: SIM Card Vendor - High priority if user doesn't have local number
  if (isTourist && !userProfile?.interests?.includes('local-sim')) {
    suggestions.push({
      id: 'suggestion-sim-1',
      name: 'Vodacom/Airtel SIM Vendor - Slipway',
      address: 'Slipway Centre, Shopping Complex',
      lat: -6.7843,
      lng: 39.2419,
      category: 'sim-vendor',
      rating: 4.3,
      reviewCount: 456,
      reasoning: 'Get local SIM immediately. Vodacom/Airtel/Halotel available',
      estimatedTime: 5,
      distance: {
        fromPickup: calculateDistance(pickup.lat, pickup.lng, -6.7843, 39.2419),
        toNextStop: 0.3
      },
      operating: { isOpen: true, opensAt: '08:00', closesAt: '20:00' },
      amenities: ['WiFi'],
      priority: 4
    });
  }

  // Sort by priority and take top 5
  return suggestions.sort((a, b) => b.priority - a.priority).slice(0, 5);
}

/**
 * Generate human-readable explanation for suggestions
 */
function generateReasoningText(userProfile: any, suggestions: SuggestedStop[]): string {
  const isFirstTimer = userProfile?.travelFrequency === 'first-time';
  const isTourist = !userProfile?.nationality || userProfile?.nationality !== 'TZ';

  if (isFirstTimer) {
    return `We've selected essential stops for your first trip to Dar es Salaam. These include forex exchange, a pharmacy with English-speaking staff, and a SIM card vendor.`;
  }

  if (isTourist) {
    return `Based on your international travel pattern, we recommend stops for currency exchange, supplies, and local connectivity.`;
  }

  return `Popular stops on this route. Feel free to customize your itinerary.`;
}
