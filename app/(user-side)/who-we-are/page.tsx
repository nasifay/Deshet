"use client";

import React, { useEffect, useState } from "react";
import { AboutHeroSection } from "~/components/sections/who-we-are/about-hero-section";
import VisionMission from "~/components/sections/who-we-are/VisionMissionSection";
import { CoreValuesSection } from "~/components/sections/who-we-are/CoreValuesSection";
import { LeadershipSection } from "~/components/sections/who-we-are/LeadershipSection";
import { TargetGroupSection } from "~/components/sections/who-we-are/TargetGroupSection";
import { OperationRegionsSection } from "~/components/sections/who-we-are/OperationRegionsSection";
import {
  coreValues,
  leadershipTeam,
  targetGroups,
} from "~/lib/data/who-we-are-data";

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
  coreValues?: Array<{
    title: string;
    description: string;
    icon: string;
    iconWidth: string;
    iconHeight: string;
    separator: string;
    gap: string;
  }>;
  leadership?: Array<{
    name: string;
    title: string;
    image: string;
  }>;
  targetGroups?: Array<{
    icon: string;
    title: string;
    iconWidth: string;
    iconHeight: string;
  }>;
  operationRegions?: Array<{
    name: string;
    description?: string;
    position: { x: string; y: string };
  }>;
  [key: string]: unknown;
}

export default function AboutUs() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      // Fetch page data with sections
      const pageResponse = await fetch("/api/public/pages/who-we-are");
      const pageData = await pageResponse.json();

      // Fetch site settings (for core values, leadership, etc.)
      const settingsResponse = await fetch("/api/public/settings");
      const settingsData = await settingsResponse.json();

      if (pageData.success) {
        setPageData(pageData.data);
      }

      if (settingsData.success) {
        setSiteSettings(settingsData.data);
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  // Extract section data from pageData
  const getSectionData = (type: string) => {
    return pageData?.sections?.find((section) => section.type === type)?.data;
  };

  const heroData = getSectionData("hero") as
    | {
        title?: string;
        subtitle?: string;
        image?: string;
        content?: string;
      }
    | undefined;

  const visionMissionData = getSectionData("vision-mission") as
    | {
        visionText?: string;
        missionText?: string;
        visionImage?: string;
        missionImage?: string;
      }
    | undefined;

  // Use backend data if available, otherwise fallback to hardcoded data
  const finalCoreValues =
    siteSettings?.coreValues && siteSettings.coreValues.length > 0
      ? siteSettings.coreValues
      : coreValues;

  const finalLeadership =
    siteSettings?.leadership && siteSettings.leadership.length > 0
      ? siteSettings.leadership
      : leadershipTeam;

  const finalTargetGroups =
    siteSettings?.targetGroups && siteSettings.targetGroups.length > 0
      ? siteSettings.targetGroups
      : targetGroups;

  const finalOperationRegions =
    siteSettings?.operationRegions && siteSettings.operationRegions.length > 0
      ? siteSettings.operationRegions
      : undefined; // Will use component's default

  return (
    <main className="relative bg-white space-y-4 lg:space-y-8 overflow-x-hidden">
      <AboutHeroSection
        title={heroData?.title}
        subtitle={heroData?.subtitle}
        image={heroData?.image}
        content={heroData?.content}
      />

      <VisionMission
        visionText={visionMissionData?.visionText}
        missionText={visionMissionData?.missionText}
        visionImage={visionMissionData?.visionImage}
        missionImage={visionMissionData?.missionImage}
      />

      <CoreValuesSection coreValues={finalCoreValues} />

      <LeadershipSection leadershipTeam={finalLeadership} />

      <TargetGroupSection
        targetGroups={finalTargetGroups}
        headerImage="https://c.animaapp.com/mgclt9blEcJSeI/img/young-millennials-african-friends-walking-city-happy-black-peopl.png"
      />

      <OperationRegionsSection operationRegions={finalOperationRegions} />
    </main>
  );
}
