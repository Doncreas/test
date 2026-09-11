import { NextRequest, NextResponse } from 'next/server';
import {
  calculateSafariPrice,
  getSafariPackage,
  SAFARI_PACKAGES,
  type SafariPackageId,
} from '@/lib/safari/pricing';

function isPackageId(value: string): value is SafariPackageId {
  return Boolean(getSafariPackage(value));
}

export async function GET(request: NextRequest) {
  const packageId = request.nextUrl.searchParams.get('packageId');
  const startDate = request.nextUrl.searchParams.get('startDate') || new Date().toISOString();
  const travelers = Number(request.nextUrl.searchParams.get('travelers') || 1);

  if (!packageId) {
    return NextResponse.json({ packages: SAFARI_PACKAGES });
  }

  if (!isPackageId(packageId)) {
    return NextResponse.json({ error: 'Unknown Safari package.' }, { status: 404 });
  }

  try {
    const quote = calculateSafariPrice({
      packageId,
      startDate,
      travelers,
    });

    return NextResponse.json(quote, {
      headers: { 'Cache-Control': 'private, max-age=60' },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to calculate Safari price.' },
      { status: 400 },
    );
  }
}
