import { NextResponse } from 'next/server';
import { containsProfanity, sanitizeReviewText } from '@/lib/reviews/profanity';

export async function GET() {
  return NextResponse.json({
    ok: true,
    reviews: [],
    meta: {
      verifiedOnly: true,
      twoWay: true,
      blindReveal: true
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, raterId, rateeId, rating, text, tags, photos } = body || {};

    if (!bookingId || !raterId || !rateeId || !rating) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
    }

    if (Number(rating) < 1 || Number(rating) > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    const cleanText = sanitizeReviewText(typeof text === 'string' ? text : '');
    if (cleanText && containsProfanity(cleanText)) {
      return NextResponse.json({ error: 'Review contains disallowed content' }, { status: 400 });
    }

    const review = {
      id: crypto.randomUUID(),
      bookingId,
      raterId,
      rateeId,
      rating: Number(rating),
      text: cleanText,
      tags: Array.isArray(tags) ? tags.slice(0, 6) : [],
      photos: Array.isArray(photos) ? photos.slice(0, 3) : [],
      createdAt: new Date().toISOString(),
      verified: true,
      twoWay: true,
      hiddenUntilMutual: false
    };

    return NextResponse.json({ ok: true, review });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid review payload' }, { status: 400 });
  }
}
