import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    code: 'KARIBU-JOSEPH',
    link: 'https://karibu.tz/signup?ref=KARIBU-JOSEPH',
    rewards: {
      tier1: 200,
      tier5: 1500,
      tier20: 'Platinum invite'
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const referrerId = body?.referrerId;
    const refereePhone = body?.refereePhone;

    if (!referrerId || !refereePhone) {
      return NextResponse.json({ error: 'Missing referral fields' }, { status: 400 });
    }

    const referralCode = `KARIBU-${String(referrerId).slice(0, 6).toUpperCase()}`;

    return NextResponse.json({
      ok: true,
      referralCode,
      referrerPoints: 200,
      refereePoints: 200,
      status: 'pending'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid referral payload' }, { status: 400 });
  }
}
