/**
 * Translation Index
 * Exports all translations
 */

import { en } from './en';
import { am } from './am';
import { type Locale } from '../config';

export const translations = {
  en,
  am,
} as const;

export type TranslationKey = keyof typeof en;

/**
 * Get nested translation value by key path
 * Example: getTranslation(translations.en, 'nav.home') => 'Home'
 */
export function getNestedTranslation(
  obj: Record<string, any>,
  path: string
): string {
  const keys = path.split('.');
  let value: any = obj;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return path; // Return key path if not found
    }
  }

  return typeof value === 'string' ? value : path;
}

/**
 * Flatten translations for easier access
 */
export function flattenTranslations(locale: Locale): Record<string, string> {
  const translation = translations[locale];
  const flattened: Record<string, string> = {};

  function flatten(obj: any, prefix = '') {
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'object' && value !== null) {
        flatten(value, newKey);
      } else {
        flattened[newKey] = String(value);
      }
    }
  }

  flatten(translation);
  return flattened;
}

