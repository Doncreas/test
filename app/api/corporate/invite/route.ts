import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.email || !body?.companyId) {
      return NextResponse.json(
        { error: 'Email and companyId are required.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      invitationId: `corp_inv_${Date.now()}`,
      role: body.role ?? 'employee',
      status: 'sent',
      companyId: body.companyId,
      email: body.email,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process invite.' },
      { status: 500 }
    );
  }
}
