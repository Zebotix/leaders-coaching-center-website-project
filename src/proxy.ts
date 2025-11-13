import { NextRequest, NextResponse } from 'next/server';
import { getCookieCache } from 'better-auth/cookies';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ✅ Public routes - no authentication required
  const publicRoutes = [
    '/api/auth',
    '/api/courses',
    '/api/contact',
    '/_next',
    '/static',
    '/images',
    '/favicon.ico',
    '/login',
    '/signup',
    '/',
  ];

  // ✅ Check if current route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname.startsWith(route) || pathname === route
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const sessionCookie = await getCookieCache(request);

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/profile/:path*',
    // ✅ Only protect specific routes, everything else is public by default
  ],
};
