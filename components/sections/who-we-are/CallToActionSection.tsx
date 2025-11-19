"use client";

import Link from "next/link";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

interface CallToActionSectionProps {
  title?: string | { en: string; am: string };
  description?: string | { en: string; am: string };
  primaryButton?: {
    text?: string | { en: string; am: string };
    link?: string;
  };
  secondaryButton?: {
    text?: string | { en: string; am: string };
    link?: string;
  };
}

export function CallToActionSection({
  title,
  description,
  primaryButton,
  secondaryButton,
}: CallToActionSectionProps) {
  const { locale } = useTranslation();

  const titleText = getBilingualText(
    title,
    locale,
    locale === "am" ? "እውነተኛ የኢትዮጵያ ፈውስን ያግኙ" : "Experience Authentic Ethiopian Healing"
  );

  const descText = getBilingualText(
    description,
    locale,
    ""
  );

  const primaryText = getBilingualText(
    primaryButton?.text,
    locale,
    locale === "am" ? "አገልግሎቶችን ይመልከቱ" : "View Services"
  );

  const secondaryText = getBilingualText(
    secondaryButton?.text,
    locale,
    locale === "am" ? "ቀጠሮ ይያዙ" : "Book an Appointment"
  );

  return (
    <section className="relative w-full bg-primary-green py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`primary-title text-white mb-6 ${
            locale === "am" ? "font-amharic" : ""
          }`}
        >
          {titleText}
        </h2>
        {descText && (
          <p
            className={`subtitle text-white/90 mb-8 sm:mb-10 md:mb-12 ${
              locale === "am" ? "font-amharic" : ""
            }`}
          >
            {descText}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          {primaryButton?.link && (
            <Link
              href={primaryButton.link}
              className="inline-flex items-center justify-center px-6 py-2 md:px-12 md:py-4 rounded-full bg-white text-primary-green hover:bg-gray-100 transition-all duration-300 font-roboto font-medium text-sm md:text-lg shadow-[0_6px_20px_-5px_rgba(255,255,255,0.4)] hover:shadow-[0_10px_25px_-5px_rgba(255,255,255,0.6)]"
            >
              {primaryText}
            </Link>
          )}
          {secondaryButton?.link && (
            <Link
              href={secondaryButton.link}
              className="inline-flex items-center justify-center px-6 py-2 md:px-12 md:py-4 rounded-full bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all duration-300 font-roboto font-medium text-sm md:text-lg"
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

