'use client';
import { authClient } from '@/lib/auth-client';

export type AppUser = {
  id: string; name: string; email: string; image?: string | null;
  role: 'customer' | 'technician' | 'admin'; phone?: string; area?: string; bio?: string;
};

export function useUser() {
  const { data, isPending, refetch } = (authClient as any).useSession() as { data: { user?: any } | null; isPending: boolean; refetch: () => Promise<void> };
  const user = data?.user ? ({ ...data.user, role: (data.user as any).role || 'customer' } as unknown as AppUser) : null;
  return { user, loading: isPending, refetch };
}
