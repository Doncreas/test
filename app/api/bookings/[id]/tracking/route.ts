import { NextRequest, NextResponse } from 'next/server';
import { TrackingData } from '@/types/tracking';

/**
 * GET /api/bookings/[id]/tracking
 * Fetch real-time tracking data for a booking
 * Includes: booking details, driver info, current location, ETA
 */
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id: bookingId } = context.params;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual backend API call
    // This is a mock response - integrate with your Fastify backend
    const mockTrackingData: TrackingData = {
      booking: {
        id: bookingId,
        status: 'en_route',
        pickup: {
          address: 'Julius Nyerere International Airport, DAR',
          lat: -6.8721,
          lng: 39.2083
        },
        dropoff: {
          address: 'Serena Hotel, Masaki, Dar es Salaam',
          lat: -6.7924,
          lng: 39.2306
        },
        fare: 35000,
        currency: 'TZS',
        createdAt: new Date().toISOString(),
        startedAt: new Date(Date.now() - 5 * 60000).toISOString()
      },
      driver: {
        id: 'driver-001',
        name: 'Juma Hassan',
        photo: 'https://api.example.com/photos/juma.jpg',
        phone: '+255754123456',
        email: 'juma@example.com',
        rating: 4.8,
        reviewCount: 248,
        vehicle: {
          id: 'vehicle-001',
          type: 'sedan',
          color: 'Silver',
          plate: 'T 123 ABC',
          model: 'Toyota Camry 2020',
          year: 2020,
          capacity: 4
        },
        licensePlate: 'T 123 ABC',
        yearsExperience: 5
      },
      location: {
        lat: -6.8450,
        lng: 39.2150,
        heading: 45,
        speed: 52,
        updatedAt: new Date().toISOString(),
        accuracy: 8
      },
      eta: {
        minutes: 12,
        confidence: '10-14 min',
        distance: '8.2 km',
        distanceMeters: 8200,
        estimatedArrivalTime: new Date(Date.now() + 12 * 60000).toISOString()
      },
      route: [
        { lat: -6.8721, lng: 39.2083, timestamp: new Date().toISOString() },
        { lat: -6.8650, lng: 39.2120, timestamp: new Date().toISOString() },
        { lat: -6.8450, lng: 39.2150, timestamp: new Date().toISOString() },
        { lat: -6.8200, lng: 39.2250, timestamp: new Date().toISOString() }
      ]
    };

    // In production, fetch from backend:
    // const backendUrl = process.env.BACKEND_API_URL;
    // const response = await fetch(`${backendUrl}/bookings/${bookingId}/tracking`, {
    //   headers: {
    //     'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`
    //   }
    // });

    return NextResponse.json(mockTrackingData, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    console.error('[Tracking API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracking data' },
      { status: 500 }
    );
  }
}
