/**
 * Server-side i18n utilities
 */

import { headers } from 'next/headers';
import { type Locale, defaultLocale, isValidLocale, LANGUAGE_COOKIE_NAME } from './config';
import { cookies } from 'next/headers';

/**
 * Get locale from request (server-side)
 * Checks cookie first, then headers
 */
export async function getLocale(): Promise<Locale> {
  // Try to get from cookie
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LANGUAGE_COOKIE_NAME)?.value;
  
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // Try to get from headers
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  
  if (acceptLanguage) {
    // Simple check for Amharic/Amharic-speaking regions
    if (acceptLanguage.includes('am') || acceptLanguage.includes('et')) {
      return 'am';
    }
  }

  return defaultLocale;
}

/**
 * Get locale from headers (synchronous, for use in middleware)
 */
export function getLocaleFromRequestHeaders(headers: Headers): Locale {
  const acceptLanguage = headers.get('accept-language');
  
  if (acceptLanguage) {
    if (acceptLanguage.includes('am') || acceptLanguage.includes('et')) {
      return 'am';
    }
  }

  return defaultLocale;
}

