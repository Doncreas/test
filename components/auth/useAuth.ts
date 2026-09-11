'use client';

import { signOut, useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session, status, update } = useSession();

  async function logout() {
    await signOut({ redirectTo: '/' });
  }

  return {
    user: session?.user ?? null,
    status,
    isAuthenticated: status === 'authenticated',
    update,
    logout,
  };
}
