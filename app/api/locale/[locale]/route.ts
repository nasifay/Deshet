import { NextRequest, NextResponse } from 'next/server';
import { isValidLocale } from '~/lib/i18n/config';

/**
 * Route Handler for setting locale cookie
 * Handles /api/locale/[locale] routes by setting cookie and redirecting
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;

  // Validate locale
  if (!isValidLocale(locale)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Create response with redirect
  const response = NextResponse.redirect(new URL('/', request.url));

  // Set locale cookie
  response.cookies.set('deshet_lang', locale, {
    path: '/',
    maxAge: 31536000, // 1 year
    sameSite: 'lax',
  });

  return response;
}


