/**
 * Internationalization Configuration
 * Supports Amharic (am) and English (en) languages
 */

export type Locale = 'en' | 'am';

export const defaultLocale: Locale = 'am';
export const locales: Locale[] = ['en', 'am'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  am: 'አማርኛ',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  am: '🇪🇹',
};

// Language direction mapping
export const localeDirections: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  am: 'ltr', // Amharic is LTR despite being a Semitic language
};

// Font family mapping for each locale
export const localeFonts: Record<Locale, string> = {
  en: 'var(--font-inter), var(--font-poppins)',
  am: 'var(--font-amharic), var(--font-inter)',
};

/**
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * Get locale from request headers or default
 */
export function getLocaleFromHeaders(headers: Headers): Locale {
  const acceptLanguage = headers.get('accept-language');
  if (acceptLanguage) {
    // Simple check for Amharic/Amharic-speaking regions
    if (acceptLanguage.includes('am') || acceptLanguage.includes('et')) {
      return 'am';
    }
  }
  return defaultLocale;
}

/**
 * Cookie name for storing language preference
 */
export const LANGUAGE_COOKIE_NAME = 'deshet_lang';

