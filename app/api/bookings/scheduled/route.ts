import { NextResponse } from 'next/server';
import { buildReminderSchedule } from '@/lib/scheduling/reminders';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pickup, dropoff, scheduledFor, passengers } = body || {};

    if (!pickup || !dropoff || !scheduledFor) {
      return NextResponse.json({ error: 'Missing scheduled ride fields' }, { status: 400 });
    }

    const reminders = buildReminderSchedule(scheduledFor);

    return NextResponse.json({
      ok: true,
      booking: {
        id: crypto.randomUUID(),
        pickup,
        dropoff,
        scheduledFor,
        passengers: passengers || 1,
        status: 'pending-driver-confirmation',
        reminders,
        autoReschedule: true,
        confirmedAt: null
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid scheduled booking request' }, { status: 400 });
  }
}
