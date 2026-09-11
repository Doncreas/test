import type { NextAuthConfig } from 'next-auth';

export default {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth }) {
      console.log('[auth.config authorized]', auth?.user ? 'authenticated' : 'unauthenticated');
      return Boolean(auth?.user);
    },
  },
} satisfies NextAuthConfig;
