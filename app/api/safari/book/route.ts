import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentUser } from '@/lib/auth/session';
import { calculateSafariPrice, type SafariPackageId } from '@/lib/safari/pricing';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

interface SafariBookingBody {
  packageId?: string;
  startDate?: string;
  travelers?: number;
  pickup?: string;
  notes?: string;
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = (await request.json()) as SafariBookingBody;
    const packageId = body.packageId;
    const startDate = body.startDate;
    const travelers = Number(body.travelers);

    if (!packageId || !startDate || !Number.isInteger(travelers)) {
      return NextResponse.json(
        { error: 'packageId, startDate, and an integer travelers count are required.' },
        { status: 400 },
      );
    }

    const parsedStartDate = new Date(startDate);
    if (Number.isNaN(parsedStartDate.getTime()) || parsedStartDate < new Date()) {
      return NextResponse.json({ error: 'Start date must be a valid future date.' }, { status: 400 });
    }

    const quote = calculateSafariPrice({
      packageId: packageId as SafariPackageId,
      startDate: parsedStartDate,
      travelers,
    });

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        pickup: body.pickup || 'Arusha Safari Office',
        dropoff: `${quote.package.name} Safari`,
        status: 'pending',
        vehicleType: 'safari-4x4',
        priceTzs: quote.totalPrice,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        booking,
        quote,
        safari: {
          packageId: quote.package.id,
          startDate: parsedStartDate.toISOString(),
          travelers,
          notes: body.notes || null,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to create Safari booking.' },
      { status: 400 },
    );
  }
}
