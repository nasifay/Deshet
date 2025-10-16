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

  const [supporters, setSupporters] = useState<
    Array<{ name: string; logo: string }>
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all data in parallel
      const [
        landingResponse,
        settingsResponse,
        newsResponse,
        supportersResponse,
      ] = await Promise.all([
        fetch("/api/public/landing"),
        fetch("/api/public/settings"),
        fetch("/api/public/news?limit=4&featured=true"),
        fetch("/api/public/supporters"),
      ]);

      const [landingResult, settingsResult, newsResult, supportersResult] =
        await Promise.all([
          landingResponse.json(),
          settingsResponse.json(),
          newsResponse.json(),
          supportersResponse.json(),
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

      if (supportersResult.success) {
        setSupporters(supportersResult.data);
        console.log("✅ Loaded supporters:", supportersResult.data.length);
      } else {
        console.error("❌ Failed to load supporters:", supportersResult.error);
        // Fallback to default supporters if API fails
        setSupporters([
          {
            name: "Norwegian Church Aid",
            logo: "/suporters/norweign-church.png",
          },
          { name: "Ipas", logo: "/suporters/ipas.png" },
          { name: "USAID", logo: "/suporters/usaid.png" },
          { name: "PEPFAR", logo: "/suporters/pepfar.png" },
        ]);
      }
    } catch (error) {
      console.error("Error fetching landing page data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extract section data from landingData
  const getSectionData = (type: string) => {
    return landingData?.sections?.find((section) => section.type === type)
      ?.data;
  };

  const heroData = getSectionData("HeroSection") as
    | {
        title?: string;
        subtitle?: string;
        leftImages?: string[];
        middleImages?: string[];
        rightImages?: string[];
        ctaText?: string;
        ctaLink?: string;
      }
    | undefined;

  const aboutData = getSectionData("AboutSection") as
    | {
        title?: string;
        description?: string;
        content?: string;
        images?: string[];
        ctaText?: string;
        ctaLink?: string;
      }
    | undefined;

  const programsData = getSectionData("ProgramAreasSection") as
    | {
        programs?: Array<{
          title: string;
          image: string;
          description?: string;
        }>;
      }
    | undefined;

  const statisticsData = getSectionData("StatisticsSection") as
    | {
        stats?: Array<{
          number: string;
          label: string;
        }>;
      }
    | undefined;

  const achievementsData = getSectionData("AchievementsSection") as
    | {
        title?: string;
        headerTitle?: string;
        headerSubtitle?: string;
        featuredImage?: string;
      }
    | undefined;

  const volunteerData = getSectionData("VolunteerBanner") as
    | {
        title?: string;
        description?: string;
        subtitle?: string;
        backgroundImage?: string;
        ctaText?: string;
        volunteerButtonText?: string;
        donateButtonText?: string;
        ctaLink?: string;
      }
    | undefined;

  return (
    <div className="flex  w-full relative flex-col mx-auto items-center gap-y-2 md:gap-y-14 lg:gap-y-20">
      {/* Hero Section - Dynamic, fetches data from CMS */}
      <HeroSection
        title={heroData?.title}
        subtitle={heroData?.subtitle}
        leftImages={heroData?.leftImages}
        middleImages={heroData?.middleImages}
        rightImages={heroData?.rightImages}
        ctaText={heroData?.ctaText}
        ctaLink={heroData?.ctaLink}
      />

      {/* Data-dependent sections - show skeleton while loading */}
      {loading ? (
        <LandingPageSkeleton />
      ) : (
        <>
          <AboutSection
            title={aboutData?.title}
            content={aboutData?.description || aboutData?.content}
            images={aboutData?.images}
            ctaText={aboutData?.ctaText}
            ctaLink={aboutData?.ctaLink}
          />
          <StatisticsSection
            stats={statisticsData?.stats || siteSettings?.stats}
          />
          <ProgramAreasSection programs={programsData?.programs} />
          <SupportersSection supporters={supporters} />
          <AchievementsSection
            achievements={siteSettings?.achievements}
            headerTitle={achievementsData?.headerTitle}
            headerSubtitle={achievementsData?.headerSubtitle}
            featuredImage={achievementsData?.featuredImage}
          />
          <NewsEventsSection news={news} />
          <VolunteerBanner
            title={volunteerData?.title}
            subtitle={volunteerData?.description || volunteerData?.subtitle}
            backgroundImage={volunteerData?.backgroundImage}
            volunteerButtonText={
              volunteerData?.ctaText || volunteerData?.volunteerButtonText
            }
            donateButtonText={volunteerData?.donateButtonText}
          />
        </>
      )}
    </div>
  );
}
