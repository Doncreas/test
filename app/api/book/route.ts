import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const { airport, flight, pickup, dropoff, passengers, vehicleType = 'sedan' } = body || {};

    if (!airport || !flight || !pickup || !dropoff) {
      return NextResponse.json({ error: 'Missing booking fields' }, { status: 400 });
    }

    const priceTzs = 35000;
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        pickup,
        dropoff,
        status: 'confirmed',
        vehicleType,
        priceTzs,
      },
    });

    return NextResponse.json({
      ok: true,
      booking: {
        ...booking,
        airport,
        flight,
        passengers: passengers || 1,
        price: `${priceTzs.toLocaleString()} TZS`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
