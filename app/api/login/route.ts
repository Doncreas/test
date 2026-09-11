import { NextResponse } from 'next/server';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    await signIn('credentials', {
      email,
      password,
      redirect: false,
      redirectTo: '/dashboard',
    });

    return NextResponse.json({ ok: true, redirectTo: '/dashboard' });
  } catch (error) {
    if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      return NextResponse.json({ ok: false, error: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
