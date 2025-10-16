"use client";

import HeroSection from "~/components/sections/hero-section";
import AboutSection from "~/components/sections/about-section";
import ProgramAreasSection from "~/components/sections/program-areas-section";
import StatisticsSection from "~/components/sections/statistics-section";
import AchievementsSection from "~/components/sections/achievements-section";
import NewsEventsSection from "~/components/sections/news-events-section";
import SupportersSection from "~/components/sections/supporters-section";
import VolunteerBanner from "~/components/sections/volunteerBanner";

/**
 * Landing page component
 * Each section component fetches its own data independently
 * This improves separation of concerns and component independence
 */
export default function Home() {
  return (
    <div className="flex  w-full relative flex-col mx-auto items-center gap-y-2 md:gap-y-8 lg:gap-y-12">
      <HeroSection />
      <AboutSection />
      <StatisticsSection />
      <ProgramAreasSection />
      <SupportersSection />
      <AchievementsSection />
      <NewsEventsSection />
      <VolunteerBanner />
    </div>
  );
}
