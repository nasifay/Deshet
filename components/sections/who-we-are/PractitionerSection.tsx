"use client";

import Image from "next/image";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";
import { Card, CardContent } from "~/components/ui/Card";

interface PractitionerSectionProps {
  title?: string | { en: string; am: string };
  name?: string | { en: string; am: string };
  position?: string | { en: string; am: string };
  bio?: string | { en: string; am: string };
  image?: string;
  mission?: string | { en: string; am: string };
}

export function PractitionerSection({
  title,
  name,
  position,
  bio,
  image,
  mission,
}: PractitionerSectionProps) {
  const { locale } = useTranslation();

  const titleText = getBilingualText(
    title,
    locale,
    locale === "am" ? "ሀኪሙን ይውቁ" : "Meet the Practitioner"
  );

  const nameText = getBilingualText(name, locale, "");
  const positionText = getBilingualText(position, locale, "");
  const bioText = getBilingualText(bio, locale, "");
  const missionText = getBilingualText(mission, locale, "");

  return (
    <section className="relative w-full flex justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16">
      <Card className="w-full bg-white rounded-2xl sm:rounded-3xl md:rounded-[40px] lg:rounded-[46px] shadow-[0px_2px_13px_#0000000d] sm:shadow-[0px_4px_26.5px_#0000000d] border-0">
        <CardContent className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12">
          <h2
            className={`w-full primary-title text-primary-green text-center ${
              locale === "am" ? "font-amharic" : ""
            }`}
          >
            {titleText}
          </h2>
          <div className="w-full bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="lg:col-span-1 flex justify-center lg:justify-start">
                {image && (
                  <div className="relative w-full max-w-xs aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={image}
                      alt={nameText}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
              </div>
              <div className="lg:col-span-2">
                <h3
                  className={`[font-family:'Roboto',Helvetica] font-black text-primary-green text-xl sm:text-2xl md:text-3xl mb-2 ${
                    locale === "am" ? "font-amharic" : ""
                  }`}
                >
                  {nameText}
                </h3>
                <p
                  className={`[font-family:'Roboto',Helvetica] font-medium text-gray-600 text-base sm:text-lg mb-4 sm:mb-6 ${
                    locale === "am" ? "font-amharic" : ""
                  }`}
                >
                  {positionText}
                </p>
                {bio && (
                  <div
                    className={`[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line mb-6 ${
                      locale === "am" ? "font-amharic" : ""
                    }`}
                  >
                    {bioText}
                  </div>
                )}
                {mission && (
                  <div className="bg-primary-green/10 border-l-4 border-primary-green p-4 sm:p-6 rounded-r-lg">
                    <p
                      className={`[font-family:'Roboto',Helvetica] font-medium text-primary-green italic text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line ${
                        locale === "am" ? "font-amharic" : ""
                      }`}
                    >
                      "{missionText}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

