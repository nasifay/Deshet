/* eslint-disable @next/next/no-img-element */
import React from "react";

interface AboutHeroSectionProps {
  title?: string;
  subtitle?: string;
  image?: string;
  content?: string;
}

export function AboutHeroSection({
  title = "About us",
  subtitle = "Working hand in hand with communities for a brighter future.",
  image = "https://c.animaapp.com/mgcmuny5RiWnl8/img/rectangle-921.svg",
  content = "Tamra for Social Development Organization (TSD) is an Ethiopian civil society organization founded in 1998 by ten visionary youths as an Anti-AIDS club at Shashemene High School. It was re-registered as a local CSO by the Authority for Civil Society Organizations (ACSO) on June 7, 2019, with registration No. 0184. TSD focuses on Youth Empowerment, Peacebuilding, Sexual and Reproductive health, Gender Development, and Climate justice. Operating across Addis Ababa, Oromia, Sidama, South Ethiopia, and Central Ethiopia regions, it coordinates efforts through regional offices in Shashemene and Wolayita Sodo, as well as project coordination offices in towns like Hawassa.",
}: AboutHeroSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-20 lg:gap-24 px-6 md:px-16 lg:px-24 xl:px-36">
      <h1 className="font-roboto font-black text-2xl md:text-4xl lg:text-[90px] leading-[101%] tracking-[0] uppercase text-primary-green">
        {title}
      </h1>
      <p className="w-full   font-roboto font-normal text-lg md:text-xl lg:text-[32px] leading-[101%] text-center text-primary-orange">
        {subtitle}
      </p>
      <img
        className="w-full h-auto"
        alt="Conference room with attendees"
        src={image}
      />
      <div className="space-y-4 text-gray-800 font-roboto font-normal text-sm md:text-xl lg:text-2xl leading-[126%] tracking-[0.8px] text-justify">
        <p>{content}</p>
      </div>
    </section>
  );
}
