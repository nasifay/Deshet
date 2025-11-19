'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLocale } from '~/lib/i18n/hooks';
import { type Locale, localeNames, localeFlags } from '~/lib/i18n/config';

export default function LanguageSwitcher() {
  const { locale, setLocale, isLoading } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const languages: Locale[] = ['en', 'am'];

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale !== locale && !isLoading) {
      setLocale(newLocale);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
        aria-label="Change language"
        disabled={isLoading}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeFlags[locale]}</span>
        <span className="hidden md:inline">{localeNames[locale]}</span>
        {isLoading && (
          <span className="ml-1 text-xs text-gray-500">...</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl rounded-xl border border-gray-100 py-2 z-50 animate-fadeIn">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-200 ${
                locale === lang
                  ? 'text-primary-green font-semibold bg-primary-50'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-green'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{localeFlags[lang]}</span>
                <span>{localeNames[lang]}</span>
              </div>
              {locale === lang && (
                <Check className="w-4 h-4 text-primary-green" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

