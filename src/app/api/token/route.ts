import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/** Exchanges a valid BetterAuth session for a short-lived JWT that the Express API verifies. */
export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ttl = 10 * 60;
  const token = await new SignJWT({ email: session.user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer('fixmate')
    .setIssuedAt()
    .setExpirationTime(`${ttl}s`)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET || 'dev-only-secret'));

  return NextResponse.json({ token, expiresAt: Date.now() + ttl * 1000 }, { headers: { 'Cache-Control': 'no-store' } });
}
