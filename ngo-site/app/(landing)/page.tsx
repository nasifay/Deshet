import React from "react";
import HeroSection from "~/components/sections/hero-section";
import AboutSection from "~/components/sections/about-section";
import ProgramAreasSection from "~/components/sections/program-areas-section";
import StatisticsSection from "~/components/sections/statistics-section";
import AchievementsSection from "~/components/sections/achievements-section";
import NewsEventsSection from "~/components/sections/news-events-section";

export default function Home() {
  return (
    <div className="flex z-[2] w-full relative mt-[154px] flex-col items-center gap-[72px]">
      <HeroSection />
      <AboutSection />
      <StatisticsSection />
      <ProgramAreasSection />
      <AchievementsSection />
      <NewsEventsSection />
    </div>
  );
}
