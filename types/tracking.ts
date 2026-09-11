/**
 * Real-time driver tracking types for Karibu Tanzania
 */

export interface DriverLocation {
  lat: number;
  lng: number;
  heading: number; // 0-360 degrees
  speed: number; // km/h
  updatedAt: string; // ISO timestamp
  accuracy?: number; // meters
}

export interface VehicleInfo {
  id: string;
  type: 'sedan' | 'suv' | 'van' | 'minibus';
  color: string;
  plate: string;
  model: string;
  year?: number;
  capacity: number;
}

export interface DriverInfo {
  id: string;
  name: string;
  photo?: string;
  phone: string;
  email?: string;
  rating: number; // 0-5
  reviewCount: number;
  vehicle: VehicleInfo;
  licensePlate: string;
  yearsExperience?: number;
}

export interface TrackingPoint {
  lat: number;
  lng: number;
  timestamp: string;
}

export interface ETAInfo {
  minutes: number;
  confidence: string; // e.g., "12-15 min"
  distance: string; // e.g., "8.2 km"
  distanceMeters: number;
  estimatedArrivalTime: string; // ISO timestamp
}

export interface Booking {
  id: string;
  status: 'confirmed' | 'driver_assigned' | 'en_route' | 'arrived' | 'completed' | 'cancelled';
  pickup: {
    address: string;
    lat: number;
    lng: number;
  };
  dropoff: {
    address: string;
    lat: number;
    lng: number;
  };
  fare: number; // TZS
  currency: 'TZS' | 'USD' | 'EUR';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface TrackingData {
  booking: Booking;
  driver: DriverInfo;
  location: DriverLocation;
  eta: ETAInfo;
  route?: TrackingPoint[]; // Polyline route from driver to pickup
}

export interface LocationUpdate {
  bookingId: string;
  driverId: string;
  location: DriverLocation;
  speed: number;
  heading: number;
}

export interface WebSocketMessage {
  type: 'location-update' | 'driver-arrived' | 'trip-completed' | 'error' | 'ping' | 'pong';
  data?: any;
  timestamp: string;
}

export interface ShareTripLinkData {
  token: string;
  bookingId: string;
  expiresAt: string;
  createdAt: string;
}

export interface SOSAlert {
  id: string;
  bookingId: string;
  driverId: string;
  timestamp: string;
  location: DriverLocation;
  reason: 'user-initiated' | 'speed-violation' | 'route-deviation';
  status: 'sent' | 'acknowledged' | 'responded';
}
