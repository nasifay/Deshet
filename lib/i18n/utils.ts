/**
 * Utility functions for handling bilingual content
 */

import type { Locale } from './config';

/**
 * Extract text from bilingual objects
 * Handles both string values (backward compatibility) and bilingual objects
 */
export function getBilingualText(
  value: string | { en: string; am: string } | undefined,
  locale: Locale,
  fallback: string = ""
): string {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "object" && "en" in value && "am" in value) {
    return value[locale] || value.en || fallback;
  }
  return fallback;
}

/**
 * Add locale to path
 */
export function addLocaleToPath(path: string, locale: Locale): string {
  // If path already starts with locale, return as is
  if (path.startsWith(`/${locale}/`) || path === `/${locale}`) {
    return path;
  }
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}

/**
 * Get locale from path
 */
export function getLocaleFromPath(path: string): Locale | null {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'am')) {
    return segments[0] as Locale;
  }
  return null;
}
