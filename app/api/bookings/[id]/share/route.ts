import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { ShareTripLinkData } from '@/types/tracking';

/**
 * POST /api/bookings/[id]/share
 * Generate a secure public link for sharing live trip tracking
 */
export async function POST(
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

    // Generate a cryptographically secure token
    const token = crypto.randomBytes(24).toString('hex');

    // Token expires in 24 hours or when trip is completed
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const shareLinkData: ShareTripLinkData = {
      token,
      bookingId,
      expiresAt,
      createdAt: new Date().toISOString()
    };

    console.log('[Share API] Generated share link:', {
      bookingId,
      token: token.substring(0, 8) + '...',
      expiresAt
    });

    // TODO: Store in database
    // await db.shareTripLinks.create({
    //   token,
    //   bookingId,
    //   expiresAt: new Date(expiresAt),
    //   createdAt: new Date()
    // });

    // Generate public URL
    const protocol = req.headers.get('x-forwarded-proto') || 'https';
    const host = req.headers.get('host') || 'localhost:3000';
    const shareUrl = `${protocol}://${host}/track/public/${token}`;

    return NextResponse.json(
      {
        success: true,
        shareUrl,
        token,
        expiresAt,
        message: 'Share link generated successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Share API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate share link' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/bookings/share/[token]
 * Retrieve tracking data for a public share link
 */
export async function GET(
  req: NextRequest,
  context: { params: { token: string } }
) {
  try {
    const { token } = context.params;

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    console.log('[Share API] Validating share token:', token.substring(0, 8) + '...');

    // TODO: Validate token in database
    // const shareLink = await db.shareTripLinks.findOne({
    //   token,
    //   expiresAt: { $gt: new Date() }
    // });

    // if (!shareLink) {
    //   return NextResponse.json(
    //     { error: 'Share link expired or invalid' },
    //     { status: 404 }
    //   );
    // }

    // Fetch tracking data
    // const tracking = await fetch(`/api/bookings/${shareLink.bookingId}/tracking`);

    // Mock response
    return NextResponse.json(
      {
        success: true,
        message: 'Valid share link',
        bookingId: 'booking-123'
      },
      {
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      }
    );
  } catch (error) {
    console.error('[Share API] Validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate share link' },
      { status: 500 }
    );
  }
}
