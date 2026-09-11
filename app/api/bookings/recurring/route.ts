import { NextResponse } from 'next/server';
import { generateNextOccurrences } from '@/lib/scheduling/cron';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cadence = 'weekly', dayOfWeek, timeOfDay, pickup, dropoff } = body || {};

    if (!pickup || !dropoff || !timeOfDay) {
      return NextResponse.json({ error: 'Missing recurring ride booking fields' }, { status: 400 });
    }

    const nextOccurrences = generateNextOccurrences({
      startDate: new Date().toISOString(),
      cadence,
      count: 12
    });

    return NextResponse.json({
      ok: true,
      recurring: {
        id: crypto.randomUUID(),
        cadence,
        dayOfWeek: dayOfWeek ?? 1,
        timeOfDay,
        pickup,
        dropoff,
        active: true,
        nextOccurrences,
        discountPercent: 0.15,
        cancellationMode: 'skip-or-cancel-series'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid recurring booking request' }, { status: 400 });
  }
}
