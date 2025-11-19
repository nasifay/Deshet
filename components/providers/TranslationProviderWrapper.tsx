'use client';

import { TranslationProvider } from '~/lib/i18n/hooks';
import { flattenTranslations } from '~/lib/i18n/translations';
import { type Locale } from '~/lib/i18n/config';

interface TranslationProviderWrapperProps {
  children: React.ReactNode;
  locale: Locale;
}

export function TranslationProviderWrapper({
  children,
  locale,
}: TranslationProviderWrapperProps) {
  // Flatten translations for easier access
  const enTranslations = flattenTranslations('en');
  const amTranslations = flattenTranslations('am');

  const translations = {
    en: enTranslations,
    am: amTranslations,
  };

  return (
    <TranslationProvider initialLocale={locale} translations={translations}>
      {children}
    </TranslationProvider>
  );
}

