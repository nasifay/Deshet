/**
 * React Hooks for Internationalization
 * Client-side translation hooks
 */

'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { type Locale, defaultLocale, isValidLocale, LANGUAGE_COOKIE_NAME } from './config';
import { addLocaleToPath, getLocaleFromPath } from './utils';

// Translation context type
type TranslationContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  isLoading: boolean;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

/**
 * Translation Provider Component
 */
export function TranslationProvider({
  children,
  initialLocale,
  translations,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
  translations: Record<Locale, Record<string, string>>;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Load translations
  const [translationMap, setTranslationMap] = useState<Record<string, string>>(
    translations[locale] || {}
  );

  // Update translations when locale changes
  useEffect(() => {
    setTranslationMap(translations[locale] || {});
  }, [locale, translations]);

  // Translation function
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let translation = translationMap[key] || key;

      // Replace parameters in translation
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          translation = translation.replace(
            new RegExp(`{{\\s*${paramKey}\\s*}}`, 'g'),
            String(paramValue)
          );
        });
      }

      return translation;
    },
    [translationMap]
  );

  // Set locale and update page with new language
  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;

      setIsLoading(true);
      setLocaleState(newLocale);

      // Save to cookie
      document.cookie = `deshet_lang=${newLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;

      // Refresh the router to apply the new language
      // This ensures all server-side components get the new locale from the cookie
      router.refresh();
      
      // Small delay to allow refresh
      setTimeout(() => setIsLoading(false), 300);
    },
    [locale, router]
  );

  // Initialize locale from cookie on mount
  useEffect(() => {
    const cookieLocale = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${LANGUAGE_COOKIE_NAME}=`))
      ?.split('=')[1];

    if (cookieLocale && isValidLocale(cookieLocale) && cookieLocale !== locale) {
      setLocale(cookieLocale);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t, isLoading }}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * useTranslation Hook
 */
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
}

/**
 * useLocale Hook - Just get/set locale without translations
 */
export function useLocale() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useLocale must be used within TranslationProvider');
  }
  return {
    locale: context.locale,
    setLocale: context.setLocale,
    isLoading: context.isLoading,
  };
}

