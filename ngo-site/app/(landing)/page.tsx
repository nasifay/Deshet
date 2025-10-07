import React from "react";
import HeroSection from "~/components/sections/hero-section";
import AboutSection from "~/components/sections/about-section";
import ProgramAreasSection from "~/components/sections/program-areas-section";
import StatisticsSection from "~/components/sections/statistics-section";
import AchievementsSection from "~/components/sections/achievements-section";
import NewsEventsSection from "~/components/sections/news-events-section";
import SupportersSection from "~/components/sections/supporters-section";

export default function Home() {
  return (
    <div className="flex  w-full relative flex-col mx-auto items-center">
      <HeroSection />
      <AboutSection />
      <StatisticsSection />
      <ProgramAreasSection />
      <SupportersSection />
      <AchievementsSection />
      <NewsEventsSection />
    </div>
  );
}
