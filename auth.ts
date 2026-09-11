import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { DefaultSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import authConfig from './auth.config';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: {
    strategy: 'jwt',
    maxAge: 1800,
    updateAge: 0,
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = typeof credentials?.email === 'string' ? credentials.email.trim().toLowerCase() : '';
        const password = typeof credentials?.password === 'string' ? credentials.password : '';

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      console.log('[auth jwt expiry]', {
        exp: token.exp,
        expiresAt: token.exp ? new Date(token.exp * 1000).toISOString() : null,
        now: new Date().toISOString(),
        hasUser: Boolean(user),
      });

      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id && token.role) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
});

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'rider' | 'driver' | 'corporate_admin' | 'admin';
    } & DefaultSession['user'];
  }

  interface User {
    role: 'rider' | 'driver' | 'corporate_admin' | 'admin';
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id?: string;
    role?: 'rider' | 'driver' | 'corporate_admin' | 'admin';
  }
}