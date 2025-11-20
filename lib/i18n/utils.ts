/**
 * Utility functions for handling bilingual content
 */

import type { Locale } from './config';

/**
 * Extract text from bilingual objects
 * Handles both string values (backward compatibility) and bilingual objects
 */
export function getBilingualText(
  value: string | { en: string; am: string } | undefined | null,
  locale: Locale,
  fallback: string = ""
): string {
  // Handle null/undefined
  if (value === null || value === undefined) return fallback;
  
  // Handle string values
  if (typeof value === "string") return value;
  
  // Handle bilingual objects
  if (typeof value === "object") {
    // Check if it's a bilingual object with en and am keys
    if ("en" in value && "am" in value) {
      const bilingualValue = value as { en: string; am: string };
      // Ensure the locale value is a string
      const localeValue = bilingualValue[locale];
      if (typeof localeValue === "string" && localeValue) {
        return localeValue;
      }
      // Fallback to English
      if (typeof bilingualValue.en === "string" && bilingualValue.en) {
        return bilingualValue.en;
      }
      // Fallback to Amharic if English is not available
      if (typeof bilingualValue.am === "string" && bilingualValue.am) {
        return bilingualValue.am;
      }
    }
    // If it's an object but not a bilingual object, return fallback
    return fallback;
  }
  
  // For any other type, convert to string or return fallback
  try {
    return String(value);
  } catch {
    return fallback;
  }
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
