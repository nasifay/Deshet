"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "~/lib/i18n/hooks";

export default function ProgramsHero() {
  const { t } = useTranslation();
  
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Title */}
      <div className="w-full text-center pt-6 sm:pt-8 md:pt-12 lg:pt-14 pb-4 sm:pb-6 md:pb-8">
        {/* Reduced base padding for mobile to optimize vertical space, added sm: for gradual increase */}
        <h1 className="font-roboto font-black text-primary-green text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[101%] tracking-[0] uppercase">
          {t("pages.programs.title")}
        </h1>
        {/* Increased base text size to text-3xl for better mobile readability, added sm:text-4xl for small devices */}
      </div>

      {/* Image Section */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
        {/* Adjusted base height to 40vh for mobile to prevent excessive height, added sm: and md: for balanced scaling, preserved lg: and xl: */}
        {/* Background Image */}
        <Image
          src="/programs/hero.png"
          alt={t("pages.programs.heroImageAlt")}
          fill
          className="object-cover"
          priority
        />

        {/* Overlay Text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent py-4 sm:py-6 md:py-8 lg:py-10 px-4 sm:px-6 md:px-12 lg:px-20 z-10">
          {/* Optimized padding for mobile with smaller base values, added sm: for slight increase on small screens */}
          <p className="font-roboto font-extrabold text-base sm:text-lg md:text-2xl xl:text-3xl 2xl:text-4xl leading-5 sm:leading-6 md:leading-[126%] tracking-[0.8px] text-justify capitalize text-white mx-auto max-w-[90%] sm:max-w-prose md:max-w-3xl lg:max-w-4xl">
            {t("pages.programs.heroDescription")}
          </p>
          {/* Increased base text size to text-base and leading-5 for better mobile readability, added sm: variants; replaced px-40 with responsive max-w to prevent overflow on smaller screens while centering text */}
        </div>
      </div>
    </section>
  );
}
