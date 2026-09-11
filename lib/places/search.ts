/**
 * Place search utilities for multi-stop bookings
 * Integrates Mapbox + Google Places API with Tanzania focus
 */

import { StopSearchResult, StopCategory } from '@/types/stop';

interface MapboxGeocodingResult {
  id: string;
  text: string;
  place_name: string;
  geometry: {
    coordinates: [number, number];
  };
  properties?: Record<string, any>;
  place_type?: string[];
}

/**
 * Search for places using Mapbox Geocoding API
 * Primary search engine with focus on Tanzania
 */
export async function searchPlacesMapbox(
  query: string,
  center?: { lat: number; lng: number },
  limit = 5
): Promise<StopSearchResult[]> {
  try {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      throw new Error('Mapbox token not configured');
    }

    const params = new URLSearchParams({
      access_token: token,
      limit: String(limit),
      country: 'TZ' // Tanzania only
    });

    if (center) {
      params.append('proximity', `${center.lng},${center.lat}`);
    }

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.status}`);
    }

    const data = await response.json();

    return (data.features || []).map((feature: MapboxGeocodingResult) => ({
      id: feature.id,
      name: feature.text,
      address: feature.place_name,
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0],
      category: inferCategoryFromMapbox(feature),
      source: 'mapbox' as const,
      placeId: feature.properties?.short_code || undefined
    }));
  } catch (err) {
    console.error('[Mapbox Search] Error:', err);
    return [];
  }
}

/**
 * Search for places using Google Places API (fallback)
 * Used when Mapbox results are insufficient
 */
export async function searchPlacesGoogle(
  query: string,
  center?: { lat: number; lng: number },
  types?: string[],
  limit = 5
): Promise<StopSearchResult[]> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.warn('[Google Places] API key not configured');
      return [];
    }

    const params = new URLSearchParams({
      input: query,
      key: apiKey,
      components: 'country:tz', // Tanzania only
      language: 'en'
    });

    if (center) {
      params.append('location', `${center.lat},${center.lng}`);
      params.append('radius', '50000'); // 50km radius
    }

    if (types && types.length > 0) {
      params.append('type', types[0]);
    }

    // Step 1: Autocomplete predictions
    const predictionsUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`;
    const predictionsRes = await fetch(predictionsUrl);
    
    if (!predictionsRes.ok) {
      throw new Error(`Google Places API error: ${predictionsRes.status}`);
    }

    const predictionsData = await predictionsRes.json();

    if (predictionsData.status !== 'OK') {
      console.warn('[Google Places] Status:', predictionsData.status);
      return [];
    }

    // Step 2: Get details for each prediction
    const results: StopSearchResult[] = [];

    for (const prediction of predictionsData.predictions.slice(0, limit)) {
      try {
        const detailsUrl =
          `https://maps.googleapis.com/maps/api/place/details/json?` +
          `place_id=${prediction.place_id}&` +
          `fields=name,formatted_address,geometry,rating,user_ratings_total,photos,opening_hours&` +
          `key=${apiKey}`;

        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();

        if (detailsData.result) {
          const result = detailsData.result;
          results.push({
            id: prediction.place_id,
            name: result.name,
            address: result.formatted_address,
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            category: inferCategoryFromGoogle(result),
            source: 'google' as const,
            placeId: prediction.place_id,
            rating: result.rating,
            reviewCount: result.user_ratings_total,
            photoUrl: result.photos?.[0]?.photo_reference,
            isOpen: result.opening_hours?.open_now
          });
        }
      } catch (err) {
        console.error('[Google Places] Detail fetch failed:', err);
        continue;
      }
    }

    return results;
  } catch (err) {
    console.error('[Google Places Search] Error:', err);
    return [];
  }
}

/**
 * Combined search: Try Mapbox first, Google as fallback
 */
export async function searchPlaces(
  query: string,
  center?: { lat: number; lng: number },
  category?: StopCategory,
  limit = 8
): Promise<StopSearchResult[]> {
  // Try Mapbox first (faster, no API key needed for basic geocoding)
  const mapboxResults = await searchPlacesMapbox(
    `${query} ${getTanzaniaSearchHint(category)}`,
    center,
    limit
  );

  if (mapboxResults.length >= limit) {
    return mapboxResults;
  }

  // Fall back to Google if Mapbox doesn't have enough results
  const googleTypes = getCategoryToGoogleType(category);
  const googleResults = await searchPlacesGoogle(query, center, googleTypes, limit - mapboxResults.length);

  // Combine and deduplicate
  const combined = [...mapboxResults, ...googleResults];
  const seen = new Set<string>();
  
  return combined
    .filter((result) => {
      const key = `${result.lat},${result.lng}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

/**
 * Get Tanzania-specific search hints for Mapbox
 */
function getTanzaniaSearchHint(category?: StopCategory): string {
  const hints: Record<StopCategory, string> = {
    'bureau-de-change': 'forex exchange Tanzania',
    'supermarket': 'supermarket Dar es Salaam',
    'pharmacy': 'pharmacy Tanzania English',
    'atm': 'ATM Visa Mastercard Tanzania',
    'sim-vendor': 'SIM card Vodacom Airtel Halotel',
    'gas-station': 'petrol station Tanzania',
    'restaurant': 'restaurant Tanzania',
    'hotel': 'hotel Tanzania',
    'shopping': 'shopping mall Tanzania',
    'custom': ''
  };

  return hints[category || 'custom'];
}

/**
 * Map Google Places types to our categories
 */
function getCategoryToGoogleType(category?: StopCategory): string[] {
  const mapping: Record<StopCategory, string[]> = {
    'bureau-de-change': ['finance', 'bank'],
    'supermarket': ['supermarket', 'grocery_or_supermarket'],
    'pharmacy': ['pharmacy', 'health'],
    'atm': ['atm', 'finance'],
    'sim-vendor': ['electronics_store', 'point_of_interest'],
    'gas-station': ['gas_station'],
    'restaurant': ['restaurant', 'cafe'],
    'hotel': ['lodging', 'hotel'],
    'shopping': ['shopping_mall', 'department_store'],
    'custom': []
  };

  return mapping[category || 'custom'];
}

/**
 * Infer stop category from Mapbox result
 */
function inferCategoryFromMapbox(feature: MapboxGeocodingResult): StopCategory {
  const text = (feature.text || '').toLowerCase();
  const placeName = (feature.place_name || '').toLowerCase();
  const combined = `${text} ${placeName}`;

  if (combined.includes('bureau') || combined.includes('exchange') || combined.includes('forex')) {
    return 'bureau-de-change';
  }
  if (combined.includes('supermarket') || combined.includes('shopping') || combined.includes('mall')) {
    return 'supermarket';
  }
  if (combined.includes('pharmacy') || combined.includes('chemist') || combined.includes('drug')) {
    return 'pharmacy';
  }
  if (combined.includes('atm') || combined.includes('bank')) {
    return 'atm';
  }
  if (
    combined.includes('sim') ||
    combined.includes('vodacom') ||
    combined.includes('airtel') ||
    combined.includes('halotel')
  ) {
    return 'sim-vendor';
  }
  if (combined.includes('gas') || combined.includes('petrol') || combined.includes('fuel')) {
    return 'gas-station';
  }
  if (combined.includes('restaurant') || combined.includes('cafe') || combined.includes('food')) {
    return 'restaurant';
  }
  if (combined.includes('hotel') || combined.includes('lodge') || combined.includes('guest')) {
    return 'hotel';
  }

  return 'custom';
}

/**
 * Infer stop category from Google Places result
 */
function inferCategoryFromGoogle(result: any): StopCategory {
  const types = result.types || [];
  const name = (result.name || '').toLowerCase();

  if (types.includes('finance') || types.includes('bank') || name.includes('bureau')) {
    return 'bureau-de-change';
  }
  if (types.includes('supermarket') || types.includes('grocery_or_supermarket')) {
    return 'supermarket';
  }
  if (types.includes('pharmacy') || name.includes('pharmacy')) {
    return 'pharmacy';
  }
  if (types.includes('atm') || types.includes('bank')) {
    return 'atm';
  }
  if (
    name.includes('sim') ||
    name.includes('vodacom') ||
    name.includes('airtel') ||
    name.includes('halotel')
  ) {
    return 'sim-vendor';
  }
  if (types.includes('gas_station')) {
    return 'gas-station';
  }
  if (types.includes('restaurant')) {
    return 'restaurant';
  }
  if (types.includes('hotel') || types.includes('lodging')) {
    return 'hotel';
  }
  if (types.includes('shopping_mall')) {
    return 'supermarket';
  }

  return 'custom';
}

/**
 * Get distance between two coordinates (haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Sort results by distance from center
 */
export function sortByDistance(
  results: StopSearchResult[],
  center?: { lat: number; lng: number }
): StopSearchResult[] {
  if (!center) return results;

  return [...results].sort((a, b) => {
    const distA = calculateDistance(center.lat, center.lng, a.lat, a.lng);
    const distB = calculateDistance(center.lat, center.lng, b.lat, b.lng);
    return distA - distB;
  });
}
