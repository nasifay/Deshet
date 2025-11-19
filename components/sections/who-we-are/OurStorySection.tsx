"use client";

import Image from "next/image";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";
import { Card, CardContent } from "~/components/ui/Card";

interface OurStorySectionProps {
  title?: string | { en: string; am: string };
  content?: string | { en: string; am: string };
  image?: string;
}

export function OurStorySection({
  title,
  content,
  image,
}: OurStorySectionProps) {
  const { locale } = useTranslation();

  const titleText = getBilingualText(
    title,
    locale,
    locale === "am" ? "ታሪካችን" : "Our Story"
  );

  const contentText = getBilingualText(
    content,
    locale,
    ""
  );

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full items-center">
            <div className="order-2 lg:order-1">
              <div
                className={`description text-gray-700 leading-relaxed whitespace-pre-line ${
                  locale === "am" ? "font-amharic" : ""
                }`}
              >
                {contentText}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              {image && (
                <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
                  <Image
                    src={image}
                    alt={titleText}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

