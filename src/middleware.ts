import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protected routes that require authentication
  const protectedRoutes = ['/cart'];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      // If no session, redirect to home page
      if (!session) {
        const url = new URL('/', request.url);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Session check error:', error);
      const url = new URL('/', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
