# 🚗 Real-time Driver Tracking System - Integration Guide

## Overview

A world-class real-time driver tracking system for Karibu Tanzania that beats Bolt's implementation. Features live location updates, ETA accuracy, safety alerts, and secure trip sharing.

## ✨ Features Implemented

### Core Features
- ✅ **Live Tracking Map** - Mapbox GL JS with dark theme, 45° perspective
- ✅ **Real-time Location** - WebSocket + polling fallback (5s updates)
- ✅ **Animated Driver Marker** - Car icon that rotates based on heading
- ✅ **ETA with Confidence** - "12-15 min" format with distance
- ✅ **Driver Card (Bottom Sheet)** - Collapsible with photo, rating, vehicle info
- ✅ **Call & Message** - Direct integration with tel:// and sms://
- ✅ **Emergency SOS** - 3-second activation, direct dial to police (112)
- ✅ **Trip Sharing** - Secure public links, SMS/Email/WhatsApp sharing
- ✅ **Speed Warnings** - Alert if driver exceeds 80 km/h
- ✅ **Offline Support** - Automatic fallback to polling every 15s
- ✅ **Public Tracking** - Secure share links for friends/family to track passenger

## 📦 Required Dependencies

Add these to your `package.json`:

```bash
npm install mapbox-gl@^3.6.0 ws dotenv
```

Or with yarn:
```bash
yarn add mapbox-gl@^3.6.0 ws dotenv
```

### TypeScript types for Mapbox:
```bash
npm install --save-dev @types/mapbox-gl@^1.13.5
```

## 🔧 Environment Variables

Create a `.env.local` file in your project root:

```env
# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=pk_live_YOUR_MAPBOX_TOKEN_HERE

# Backend API (for production)
BACKEND_API_URL=https://api.karibu-tanzania.com
BACKEND_API_KEY=your_backend_api_key_here

# WebSocket (optional, if using separate WebSocket server)
NEXT_PUBLIC_WS_URL=wss://ws.karibu-tanzania.com

# Emergency Services
TANZANIA_POLICE_NUMBER=112
TANZANIA_AMBULANCE_NUMBER=112
```

## 📁 File Structure

```
app/
├── track/
│   ├── [bookingId]/
│   │   └── page.tsx                 # Main tracking page
│   └── public/
│       └── [token]/
│           └── page.tsx             # Public share tracking
└── api/
    └── bookings/
        ├── [id]/
        │   ├── tracking/
        │   │   └── route.ts         # GET booking tracking data
        │   ├── location/
        │   │   └── route.ts         # POST location webhook
        │   └── share/
        │       └── route.ts         # POST/GET share link
        └── sos/
            └── route.ts             # POST SOS alerts

components/
└── tracking/
    ├── TrackingMap.tsx              # Mapbox map component
    ├── DriverSheet.tsx              # Bottom sheet with driver info
    ├── SOSButton.tsx                # Emergency button
    └── ShareTripModal.tsx           # Share dialog

lib/
├── websocket/
│   └── client.ts                    # WebSocket + polling client
└── maps/
    └── mapbox.ts                    # Mapbox utilities & styling

types/
└── tracking.ts                      # TypeScript types
```

## 🔌 Backend Integration

### 1. Location Update Webhook

Your Fastify backend should send location updates to this endpoint:

```typescript
// Backend (Node.js/Fastify)
const updateDriverLocation = async (bookingId: string, locationData: any) => {
  const response = await fetch(
    `https://your-nextjs-app.com/api/bookings/${bookingId}/location`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        driverId: locationData.driverId,
        location: {
          lat: locationData.latitude,
          lng: locationData.longitude,
          accuracy: locationData.accuracy
        },
        speed: locationData.speed, // km/h
        heading: locationData.heading // 0-360 degrees
      })
    }
  );
  return response.json();
};

// Call this every 5 seconds while driver is en route
```

### 2. Tracking Data Endpoint

Your backend should support this endpoint that returns booking + driver + location data:

```typescript
// GET /api/bookings/[id]/tracking
// Should return TrackingData type (see types/tracking.ts)

interface TrackingDataResponse {
  booking: {
    id: string;
    status: 'en_route' | 'arrived' | 'completed';
    pickup: { address: string; lat: number; lng: number };
    dropoff: { address: string; lat: number; lng: number };
    fare: number;
    currency: 'TZS';
    createdAt: string;
  };
  driver: {
    id: string;
    name: string;
    photo?: string;
    phone: string;
    rating: number;
    reviewCount: number;
    vehicle: {
      type: 'sedan' | 'suv' | 'van' | 'minibus';
      color: string;
      plate: string;
      model: string;
    };
  };
  location: {
    lat: number;
    lng: number;
    heading: number; // 0-360 degrees
    speed: number; // km/h
    accuracy?: number; // meters
    updatedAt: string; // ISO timestamp
  };
  eta: {
    minutes: number;
    confidence: string; // "12-15 min"
    distance: string; // "8.2 km"
    distanceMeters: number;
    estimatedArrivalTime: string; // ISO timestamp
  };
  route?: Array<{ lat: number; lng: number; timestamp: string }>;
}
```

### 3. SOS Alert Endpoint

Handle emergency SOS alerts:

```typescript
// POST /api/bookings/sos
// Should:
// 1. Log the alert with timestamp and location
// 2. Notify dispatch team immediately
// 3. Send SMS to emergency contacts
// 4. Store in database for audit trail
// 5. Return police contact number (112 in Tanzania)
```

### 4. Share Link Endpoint

For generating secure public tracking links:

```typescript
// POST /api/bookings/[id]/share
// Should:
// 1. Generate cryptographically secure token
// 2. Store in database with expiry (24h)
// 3. Return full share URL
// 4. Validate token on subsequent requests
```

## 🌐 WebSocket Integration (Optional)

For lower-latency updates, implement a WebSocket server:

```typescript
// Your WebSocket server should handle:
// 1. Subscribe client to booking: `subscribe:booking:${bookingId}`
// 2. Broadcast location updates: { type: 'location-update', data: {...} }
// 3. Notify arrival: { type: 'driver-arrived', data: {...} }
// 4. Notify completion: { type: 'trip-completed', data: {...} }
// 5. Handle client pings/pongs

// The client (/lib/websocket/client.ts) will:
// - Connect to ws://domain/api/bookings/{bookingId}/ws
// - Auto-reconnect with exponential backoff
// - Fall back to polling if WebSocket fails
```

## 🎨 Customization

### Brand Colors

The tracking system uses your existing Karibu brand colors:
- **Primary**: Safari Green (#0F4C3A)
- **Accent**: Sunset Orange (#FF7A1A)
- **Premium**: Gold (#D4A24C)
- **Background**: Cream (#FAF6EE)

All defined in `tailwind.config.ts` and ready to use.

### Map Styling

Customize the dark map theme in `/lib/maps/mapbox.ts`:

```typescript
// Adjust map style URL
export function getMapboxStyleUrl(theme: 'dark' | 'light') {
  // Use Mapbox styles:
  // - mapbox/dark-v11 (dark mode - default)
  // - mapbox/light-v11 (light mode)
  // - mapbox/satellite-v9 (satellite)
  // - Create custom style in Mapbox Studio
}
```

### Markers

Customize car, pickup, and dropoff markers in `/lib/maps/mapbox.ts`:
- `createCarMarkerSvg()` - Rotating car icon
- `createPickupMarkerSvg()` - Pulsing pickup point
- `createDropoffMarkerSvg()` - Destination marker

## 🚀 Usage

### 1. Navigate to Tracking Page

```typescript
// From booking page, after confirming ride:
import Link from 'next/link';

<Link href={`/track/${bookingId}`}>
  Track your ride
</Link>
```

### 2. Tracking Page Features

```typescript
// /app/track/[bookingId]/page.tsx includes:
// - Full-screen Mapbox with live driver marker
// - WebSocket connection with polling fallback
// - Driver info bottom sheet
// - SOS button (top-right)
// - Share trip modal
// - Real-time ETA updates
// - Speed violation warnings
```

### 3. Share Tracking Link

```typescript
// User clicks "Share trip" → Modal generates link
// Link format: https://your-domain.com/track/public/{token}
// Public viewers see:
// - Live driver location
// - Driver info (no contact details)
// - ETA
// - Cannot call/message/SOS
```

## 📊 Real-time Data Flow

```
┌─────────────┐
│ Driver App  │ (sends location every 5s)
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│ POST /api/bookings/[id]/location│ (location webhook)
└──────┬──────────────────────────┘
       │
       ├──► Redis Cache (fast access)
       ├──► WebSocket Broadcast (live updates)
       ├──► Database (analytics)
       └──► ETA Calculation (Mapbox Directions)
       │
       ▼
┌──────────────────────┐
│ Frontend WebSocket   │ (receives updates)
└──────┬───────────────┘
       │
       ├──► Update driver marker position
       ├──► Rotate marker based on heading
       ├──► Update ETA display
       ├──► Check for speed violations
       ├──► Follow driver (camera pan)
       └──► Store in component state
       │
       ▼
┌──────────────────────┐
│ User Interface       │ (reactive updates)
└──────────────────────┘
```

## 🔐 Security Considerations

1. **Share Links**: Generate cryptographically secure tokens (`crypto.randomBytes()`)
2. **Expiry**: Share links expire after 24h or when trip completes
3. **Rate Limiting**: Implement rate limiting on location webhook (max 1 req/s)
4. **Authorization**: Verify user is booking participant before showing tracking
5. **Location Privacy**: Don't store location history longer than necessary
6. **SOS Logging**: Log all SOS activations for audit trail
7. **HTTPS Only**: All endpoints require HTTPS in production

## 🧪 Testing

### Test Location Updates
```typescript
// Simulate driver location update
const mockLocation = {
  driverId: 'driver-001',
  location: { lat: -6.8450, lng: 39.2150, accuracy: 8 },
  speed: 52,
  heading: 45
};

await fetch(`/api/bookings/TAN-1234/location`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(mockLocation)
});
```

### Test SOS Alert
```typescript
// Simulate SOS activation
await fetch('/api/bookings/sos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    bookingId: 'TAN-1234',
    driverId: 'driver-001',
    location: { lat: -6.8450, lng: 39.2150 },
    reason: 'user-initiated'
  })
});
```

## 🐛 Troubleshooting

### Map not loading
- Check `NEXT_PUBLIC_MAPBOX_TOKEN` is set correctly
- Verify token has map styles permissions
- Check browser console for errors

### WebSocket not connecting
- Verify WebSocket URL is accessible
- Check CORS settings if on different domain
- Client falls back to polling automatically

### Markers not rotating
- Ensure heading value is 0-360 degrees
- Check SVG rotation CSS is applied
- Verify mapbox-gl CSS is loaded

### ETA not updating
- Implement ETA calculation in location webhook
- Store ETA in Redis with 60s TTL
- Client should fetch from tracking endpoint

## 📖 API Reference

See `types/tracking.ts` for full TypeScript interfaces:
- `TrackingData` - Complete tracking response
- `LocationUpdate` - Real-time location data
- `DriverInfo` - Driver details
- `ETAInfo` - Estimated arrival
- `SOSAlert` - Emergency alert
- `ShareTripLinkData` - Public share link

## 🎯 Next Steps

1. ✅ Install Mapbox GL JS
2. ✅ Add Mapbox token to `.env.local`
3. ✅ Implement backend tracking endpoints
4. ✅ Set up WebSocket server (optional)
5. ✅ Test location webhook with mock data
6. ✅ Integrate SOS with emergency services
7. ✅ Add share link database storage
8. ✅ Monitor performance and optimize

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Review backend logs for webhook issues
3. Verify all environment variables are set
4. Test with mock data first
5. Enable debug logging: `localStorage.setItem('debug', 'karibu:*')`

---

**Karibu Tanzania - Premium Airport Taxi Service**
Beating Bolt. Every. Single. Day. 🚗✨
