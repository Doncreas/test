/**
 * Multi-stop ride data types for Karibu Tanzania
 */

export type DwellTimeOption = 'quick' | 'normal' | 'extended';

export interface DwellTimeConfig {
  option: DwellTimeOption;
  minutes: number; // 5, 15, or 45
  label: string;   // "Quick (5 min)", "Normal (15 min)", "Extended (45 min)"
}

export interface Stop {
  id: string;                    // Unique ID (uuid)
  sequence: number;              // 1-4 (order in route)
  address: string;               // Full address
  name?: string;                 // Stop nickname (e.g., "Bureau de Change")
  lat: number;
  lng: number;
  category: StopCategory;        // Type of stop
  duration: DwellTimeConfig;     // Time to spend here
  notes?: string;                // Special instructions
  arrivedAt?: string;            // ISO timestamp
  completedAt?: string;          // ISO timestamp
  status: 'pending' | 'completed' | 'skipped';
}

export type StopCategory = 
  | 'bureau-de-change'
  | 'supermarket'
  | 'pharmacy'
  | 'atm'
  | 'sim-vendor'
  | 'gas-station'
  | 'restaurant'
  | 'hotel'
  | 'shopping'
  | 'custom';

export interface SuggestedStop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category: StopCategory;
  rating?: number;              // Google rating
  reviewCount?: number;
  photoUrl?: string;
  reasoning: string;            // Why we suggest this (AI insight)
  estimatedTime?: number;       // Minutes to stop here
  distance?: {
    fromPickup: number;         // km
    toNextStop: number;         // km
  };
  operating?: {
    isOpen: boolean;
    closesAt?: string;          // "18:00" format
    opensAt?: string;           // "08:00" format
  };
  amenities?: string[];         // ["ATM", "WiFi", "Parking"]
  priority: number;             // 1-5 (higher = more relevant)
}

export interface MultiStopItinerary {
  bookingId?: string;
  pickup: {
    address?: string;
    lat: number;
    lng: number;
    name?: string;
  };
  stops: Stop[];                 // 0-4 stops
  dropoff: {
    address?: string;
    lat: number;
    lng: number;
    name?: string;
  };
  totalDistance: number;         // km
  totalDuration: number;         // minutes (travel + dwell time)
  travelDuration: number;        // minutes (travel only, no dwell)
  dwellDuration: number;         // minutes (sum of all dwell times)
  routeEstimateId?: string;      // For caching/pricing
}

export interface FareBreakdown {
  baseFare: number;              // Fixed airport pickup fee
  distanceFare: number;          // Per km rate
  timeFare: number;              // Per minute waiting/travel
  stopFee: number;               // Fee per stop
  totalStopFee: number;          // stopFee * number of stops
  loyaltyDiscount?: number;      // Loyalty point redemption
  promoDiscount?: number;        // Promo code discount
  tax?: number;                  // Government tax (if applicable)
  total: number;                 // Final price in TZS
  currency: 'TZS';
  perStopBreakdown?: Array<{
    stopName: string;
    estimatedFare: number;       // Fare until this stop
  }>;
}

export interface RouteGeometry {
  type: 'LineString';
  coordinates: Array<[number, number]>; // [lng, lat]
}

export interface ItineraryEstimate {
  itinerary: MultiStopItinerary;
  fare: FareBreakdown;
  eta: {
    pickup: string;              // ISO timestamp
    firstStop?: string;          // ISO timestamp
    lastStop?: string;           // ISO timestamp
    dropoff: string;             // ISO timestamp
    totalMinutes: number;
  };
  routeGeometry?: RouteGeometry;
}

export interface StopSearchResult {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  category?: StopCategory;
  placeId?: string;              // Google Places ID
  rating?: number;
  reviewCount?: number;
  photoUrl?: string;
  isOpen?: boolean;
  distance?: number;             // meters from search center
  source: 'mapbox' | 'google' | 'caribu-database';
}

export interface UserProfile {
  id: string;
  name: string;
  nationality?: string;          // e.g., "USA", "India", "UK"
  languages?: string[];          // e.g., ["en", "sw", "fr"]
  interests?: string[];          // e.g., ["shopping", "food", "culture"]
  travelFrequency?: 'first-time' | 'occasional' | 'frequent';
  budget?: 'economy' | 'standard' | 'premium';
  lastStops?: StopCategory[];    // History for personalization
}

export interface SuggestStopsRequest {
  pickup: {
    lat: number;
    lng: number;
    name: string;
  };
  dropoff: {
    lat: number;
    lng: number;
    name: string;
  };
  userProfile: UserProfile;
}

export interface SuggestStopsResponse {
  suggestions: SuggestedStop[];
  reasoning: string;             // Why these stops fit this user/route
  maxStops: number;              // Usually 4
  estimatedTimePerStop: Record<StopCategory, number>; // Average time per type
}

export interface StopManagerState {
  stops: Stop[];
  isDragging: boolean;
  activeStopId?: string;
  editingStopId?: string;
  searchResults: StopSearchResult[];
  suggestedStops: SuggestedStop[];
  isLoadingSuggestions: boolean;
  isSearching: boolean;
  error?: string;
}
