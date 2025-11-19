import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth/jwt';
import {
  isValidLocale,
  getLocaleFromHeaders,
  LANGUAGE_COOKIE_NAME,
} from './lib/i18n/config';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle locale routes (/en, /am) - set cookie and redirect
  // This must be checked early to prevent page component from rendering
  if (pathname === '/en' || pathname === '/am') {
    const locale = pathname.slice(1); // Remove leading slash
    
    if (isValidLocale(locale)) {
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.set(LANGUAGE_COOKIE_NAME, locale, {
        path: '/',
        maxAge: 31536000, // 1 year
        sameSite: 'lax',
      });
      return response;
    }
  }

  // Protect admin routes first (before language handling)
  if (pathname.startsWith('/admin')) {
    // Allow login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check authentication
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirect to login with callback URL
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify token
    const payload = await verifyToken(token);

    if (!payload) {
      // Invalid token - redirect to login
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Token is valid, allow access
    return NextResponse.next();
  }

  // Protect admin API routes
  if (pathname.startsWith('/api/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-email', payload.email);
    requestHeaders.set('x-user-role', payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Skip language handling for API routes and static assets
  const isApiRoute = pathname.startsWith('/api');
  const isStaticAsset = pathname.startsWith('/_next') || 
                        pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js|woff|woff2|ttf|eot)$/);

  // Handle language detection for user-facing routes
  if (!isApiRoute && !isStaticAsset) {
    // Get locale from cookie or detect from headers
    const cookieLocale = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;
    let locale = cookieLocale && isValidLocale(cookieLocale) 
      ? cookieLocale 
      : getLocaleFromHeaders(request.headers);

    // Set locale cookie if not present
    const response = NextResponse.next();
    if (!cookieLocale || !isValidLocale(cookieLocale)) {
      response.cookies.set(LANGUAGE_COOKIE_NAME, locale, {
        path: '/',
        maxAge: 31536000, // 1 year
        sameSite: 'lax',
      });
    }

    // Add locale to request headers for use in pages
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', locale);
    
    // Update the response with new headers
    response.headers.set('x-locale', locale);
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};








