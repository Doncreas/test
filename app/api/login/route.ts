import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // NOTE: This is a stub. Replace with real auth logic.
    if (email === 'demo@tanzalift.test' && password === 'password') {
      return NextResponse.json({ ok: true, user: { email, name: 'Demo User' } });
    }

    return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
