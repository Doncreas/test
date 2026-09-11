export type LangCode = 'en' | 'sw' | 'fr' | 'de' | 'zh' | 'ar' | 'hi' | 'pt';

export type VehicleType = 'sedan' | 'suv' | 'van' | 'lcruiser';

export type BookingIntent = {
  pickup: Airport | Address | Coordinates;
  dropoff: Airport | Address | Coordinates;
  time: string | 'now' | 'asap';
  passengers: number;
  luggage: number;
  vehicleType?: VehicleType;
  specialRequests?: string[];
  language: LangCode;
};

export type Airport = {
  type: 'airport';
  code: string;
  name: string;
};

export type Address = {
  type: 'address';
  address: string;
};

export type Coordinates = {
  type: 'coordinates';
  lat: number;
  lng: number;
};

export function extractBookingIntent(transcript: string): BookingIntent {
  const lower = transcript.toLowerCase();

  const pickup: Airport | Address = lower.includes('jro') || lower.includes('airport')
    ? { type: 'airport', code: 'JRO', name: 'Julius Nyerere International Airport' }
    : { type: 'address', address: 'Dar es Salaam City Centre' };

  const dropoff: Airport | Address = lower.includes('arusha')
    ? { type: 'address', address: 'Arusha City Center' }
    : { type: 'address', address: 'Dar es Salaam CBD' };

  const passengers = /\b(\d+)\s*people\b|\b(\d+)\s*passengers?\b/.exec(lower)?.[1] ? Number(/\b(\d+)\s*people\b|\b(\d+)\s*passengers?\b/.exec(lower)?.[1]) : 2;
  const luggage = /\b(\d+)\s*bags?\b|\b(\d+)\s*luggage\b/.exec(lower)?.[1] ? Number(/\b(\d+)\s*bags?\b|\b(\d+)\s*luggage\b/.exec(lower)?.[1]) : 1;

  const vehicleType: VehicleType = lower.includes('suv') ? 'suv' : lower.includes('van') ? 'van' : 'sedan';
  const language: LangCode = lower.includes('swahili') || lower.includes('kiswahili') ? 'sw' : lower.includes('francais') || lower.includes('français') ? 'fr' : lower.includes('german') ? 'de' : 'en';

  return {
    pickup,
    dropoff,
    time: lower.includes('now') || lower.includes('asap') ? 'asap' : '2026-08-14T20:00:00Z',
    passengers,
    luggage,
    vehicleType,
    specialRequests: lower.includes('airport help') ? ['help with luggage'] : [],
    language
  };
}
