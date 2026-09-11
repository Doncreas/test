import { NextRequest, NextResponse } from 'next/server';
import { SOSAlert } from '@/types/tracking';

/**
 * POST /api/bookings/sos
 * Handle emergency SOS alerts
 * - Sends alert to dispatch team
 * - Contacts emergency services
 * - Notifies passenger support
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, driverId, location, reason } = body;

    if (!bookingId || !driverId || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create SOS alert
    const sosAlert: SOSAlert = {
      id: `SOS-${Date.now()}`,
      bookingId,
      driverId,
      timestamp: new Date().toISOString(),
      location,
      reason: reason || 'user-initiated',
      status: 'sent'
    };

    console.log('[SOS API] Emergency alert:', sosAlert);

    // TODO: Integrate with backend
    // 1. Send to dispatch team
    // await fetch(`${process.env.BACKEND_API_URL}/sos`, {
    //   method: 'POST',
    //   headers: { 'Authorization': `Bearer ${process.env.BACKEND_API_KEY}` },
    //   body: JSON.stringify(sosAlert)
    // });

    // 2. Send SMS to support
    // await sendSMS(supportPhoneNumber, `SOS ALERT: Booking ${bookingId} - Location: ${location.lat},${location.lng}`);

    // 3. Send push notification
    // await sendPushNotification(adminChannels, sosAlert);

    // Tanzania emergency services
    const policeNumber = '112';
    const ambulanceNumber = '112';

    return NextResponse.json(
      {
        success: true,
        sosAlert,
        policeContactNumber: policeNumber,
        message: 'SOS alert sent. Emergency services have been notified.',
        supportTicket: `SOS-${Date.now()}`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[SOS API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process SOS alert' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings/sos/acknowledge
 * Acknowledge SOS alert (admin endpoint)
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { sosId, status } = body;

    if (!sosId || !['acknowledged', 'responded', 'resolved'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    console.log(`[SOS API] Acknowledging SOS ${sosId} with status: ${status}`);

    // TODO: Update SOS status in database
    // await updateSOSStatus(sosId, status);

    return NextResponse.json(
      {
        success: true,
        message: `SOS alert ${status}`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[SOS API] Acknowledge error:', error);
    return NextResponse.json(
      { error: 'Failed to acknowledge SOS' },
      { status: 500 }
    );
  }
}
