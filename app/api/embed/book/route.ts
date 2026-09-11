import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import { trackEvent } from '@/lib/analytics/mixpanel';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

interface EmbedBookingBody {
  pickup?: string;
  dropoff?: string;
  date?: string;
  passengers?: number;
  vehicleType?: string;
  source?: string;
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function OPTIONS() {
  return json(null, 204);
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return json({ error: 'Authentication required before booking.' }, 401);
    }

    const body = (await request.json()) as EmbedBookingBody;
    const pickup = body.pickup?.trim();
    const dropoff = body.dropoff?.trim();
    const passengers = Number(body.passengers || 1);

    if (!pickup || !dropoff || !body.date || !Number.isInteger(passengers) || passengers < 1 || passengers > 12) {
      return json({ error: 'pickup, dropoff, date, and a passenger count from 1 to 12 are required.' }, 400);
    }

    const date = new Date(body.date);
    if (Number.isNaN(date.getTime())) {
      return json({ error: 'date must be a valid date.' }, 400);
    }

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        pickup,
        dropoff,
        status: 'pending',
        vehicleType: body.vehicleType?.trim() || 'sedan',
        priceTzs: 0,
      },
    });

    await trackEvent({
      event: 'Embedded Booking Requested',
      distinctId: user.id,
      properties: {
        bookingId: booking.id,
        source: body.source || 'embed',
        passengers,
        vehicleType: body.vehicleType?.trim() || 'sedan',
      },
    }).catch((error) => console.error('[Embed booking analytics] Error:', error));

    return json({
      ok: true,
      booking: {
        ...booking,
        date: date.toISOString(),
        passengers,
        source: body.source || 'embed',
      },
    }, 201);
  } catch (error) {
    console.error('[Embed booking API] Error:', error);
    return json({ error: 'Unable to create embedded booking.' }, 500);
  }
}
