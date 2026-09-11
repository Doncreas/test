import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export const middleware = auth((request) => {
  console.log('[middleware]', request.nextUrl.pathname, request.auth);

  if (!request.auth) {
    const loginUrl = new URL('/login', request.nextUrl.origin);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/wallet/:path*',
    '/rewards/:path*',
    '/safety/:path*',
    '/driver/:path*',
    '/corporate/:path*',
  ],
};