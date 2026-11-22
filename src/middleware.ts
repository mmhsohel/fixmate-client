import { NextRequest, NextResponse } from 'next/server';

/**
 * Cheap edge check: no BetterAuth session cookie → /sign-in (with return path).
 * The cookie is only a hint; real validation happens server-side (/api/token) and role checks in the dashboard shell.
 */
const hasSessionCookie = (req: NextRequest) =>
  req.cookies.getAll().some((c) => c.name.endsWith('better-auth.session_token'));

export function middleware(req: NextRequest) {
  if (!hasSessionCookie(req)) {
    const url = new URL('/sign-in', req.url);
    url.searchParams.set('redirect', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*', '/payment/:path*'] };
