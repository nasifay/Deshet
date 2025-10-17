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
import { TeamMemberSection } from "~/components/sections/who-we-are/TeamMembersSection";

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
    position: string;
    photo: string;
    bio?: string;
    email?: string;
    phone?: string;
    order?: number;
    type?: "leadership" | "team_member";
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
  const [leadershipMembers, setLeadershipMembers] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
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

      // Fetch leadership members separately
      const leadershipResponse = await fetch(
        "/api/public/leadership?type=leadership"
      );
      const leadershipData = await leadershipResponse.json();

      // Fetch team members separately
      const teamResponse = await fetch(
        "/api/public/leadership?type=team_member"
      );
      const teamData = await teamResponse.json();

      if (pageData.success) {
        setPageData(pageData.data);
      }

      if (settingsData.success) {
        setSiteSettings(settingsData.data);
      }

      if (leadershipData.success) {
        setLeadershipMembers(leadershipData.data);
      }

      if (teamData.success) {
        setTeamMembers(teamData.data);
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

  const heroData = getSectionData("AboutUsHeader") as
    | {
        title?: string;
        subtitle?: string;
      }
    | undefined;

  const groupPhotoData = getSectionData("GroupPhotoSection") as
    | {
        imageSrc?: string;
        altText?: string;
      }
    | undefined;

  const aboutTSDData = getSectionData("AboutTSDSection") as
    | {
        description?: string;
        backImageSrc?: string;
        frontImageSrc?: string;
      }
    | undefined;

  const visionMissionData = getSectionData("VisionMissionSection") as
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
    leadershipMembers.length > 0
      ? leadershipMembers
      : leadershipTeam.filter((m: any) => m.type !== "team_member");

  const finalTeamMembers = teamMembers.length > 0 ? teamMembers : [];

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
        mainImage={groupPhotoData?.imageSrc}
        contentImage={aboutTSDData?.frontImageSrc}
        content={aboutTSDData?.description}
      />

      <VisionMission
        visionText={visionMissionData?.visionText}
        missionText={visionMissionData?.missionText}
        visionImage={visionMissionData?.visionImage}
        missionImage={visionMissionData?.missionImage}
      />

      <CoreValuesSection coreValues={finalCoreValues} />

      {finalTeamMembers.length > 0 && (
        <TeamMemberSection teamMember={finalTeamMembers} />
      )}

      {finalLeadership.length > 0 && (
        <LeadershipSection leadershipTeam={finalLeadership} />
      )}

      <TargetGroupSection
        targetGroups={finalTargetGroups}
        headerImage="https://c.animaapp.com/mgclt9blEcJSeI/img/young-millennials-african-friends-walking-city-happy-black-peopl.png"
      />

      <OperationRegionsSection operationRegions={finalOperationRegions} />
    </main>
  );
}
