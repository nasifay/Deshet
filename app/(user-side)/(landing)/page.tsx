"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "~/components/sections/hero-section";
import AboutSection from "~/components/sections/about-section";
import ProgramAreasSection from "~/components/sections/program-areas-section";
import StatisticsSection from "~/components/sections/statistics-section";
import AchievementsSection from "~/components/sections/achievements-section";
import NewsEventsSection from "~/components/sections/news-events-section";
import SupportersSection from "~/components/sections/supporters-section";
import VolunteerBanner from "~/components/sections/volunteerBanner";
import LandingPageSkeleton from "~/components/sections/landing-page-skeleton";

interface PageSection {
  type: string;
  data: Record<string, unknown>;
  order: number;
}

interface PageData {
  sections?: PageSection[];
  [key: string]: unknown;
}

interface SiteSettings {
  stats?: {
    staffCount: string;
    officesCount: string;
    regionsCount: string;
    volunteersCount: string;
    protocolsCount: string;
  };
  achievements?: {
    recognitionsCount: string;
    radioYears: string;
    serviceYears: string;
    activeRegions: string;
  };
  supporters?: Array<{
    name: string;
    logo: string;
  }>;
  [key: string]: unknown;
}

interface NewsItem {
  _id: string;
  slug: string;
  featuredImage?: string;
  title: string;
  excerpt?: string;
}

export default function Home() {
  const [landingData, setLandingData] = useState<PageData | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all data in parallel
      const [landingResponse, settingsResponse, newsResponse] =
        await Promise.all([
          fetch("/api/public/landing"),
          fetch("/api/public/settings"),
          fetch("/api/public/news?limit=4&featured=true"),
        ]);

      const [landingResult, settingsResult, newsResult] = await Promise.all([
        landingResponse.json(),
        settingsResponse.json(),
        newsResponse.json(),
      ]);

      if (landingResult.success) {
        setLandingData(landingResult.data);
      }

      if (settingsResult.success) {
        setSiteSettings(settingsResult.data);
      }

      if (newsResult.success) {
        setNews(newsResult.data);
      }
    } catch (error) {
      console.error("Error fetching landing page data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LandingPageSkeleton />;
  }

  // Extract section data from landingData
  const getSectionData = (type: string) => {
    return landingData?.sections?.find((section) => section.type === type)
      ?.data;
  };

  const heroData = getSectionData("hero") as
    | {
        title?: string;
        subtitle?: string;
        backgroundImage?: string;
        ctaText?: string;
        ctaLink?: string;
      }
    | undefined;

  const aboutData = getSectionData("about") as
    | {
        title?: string;
        content?: string;
        images?: string[];
        ctaText?: string;
        ctaLink?: string;
      }
    | undefined;

  const programsData = getSectionData("programs") as
    | {
        programs?: Array<{ title: string; image: string }>;
      }
    | undefined;

  const achievementsData = getSectionData("achievements") as
    | {
        headerTitle?: string;
        headerSubtitle?: string;
        featuredImage?: string;
      }
    | undefined;

  const volunteerData = getSectionData("volunteer-cta") as
    | {
        title?: string;
        subtitle?: string;
        backgroundImage?: string;
        volunteerButtonText?: string;
        donateButtonText?: string;
      }
    | undefined;

  return (
    <div className="flex  w-full relative flex-col mx-auto items-center">
      <HeroSection
        title={heroData?.title}
        subtitle={heroData?.subtitle}
        backgroundImage={heroData?.backgroundImage}
        ctaText={heroData?.ctaText}
        ctaLink={heroData?.ctaLink}
      />
      <AboutSection
        title={aboutData?.title}
        content={aboutData?.content}
        images={aboutData?.images}
        ctaText={aboutData?.ctaText}
        ctaLink={aboutData?.ctaLink}
      />
      <StatisticsSection stats={siteSettings?.stats} />
      <ProgramAreasSection programs={programsData?.programs} />
      <SupportersSection supporters={siteSettings?.supporters} />
      <AchievementsSection
        achievements={siteSettings?.achievements}
        headerTitle={achievementsData?.headerTitle}
        headerSubtitle={achievementsData?.headerSubtitle}
        featuredImage={achievementsData?.featuredImage}
      />
      <NewsEventsSection news={news} />
      <VolunteerBanner
        title={volunteerData?.title}
        subtitle={volunteerData?.subtitle}
        backgroundImage={volunteerData?.backgroundImage}
        volunteerButtonText={volunteerData?.volunteerButtonText}
        donateButtonText={volunteerData?.donateButtonText}
      />
    </div>
  );
}
