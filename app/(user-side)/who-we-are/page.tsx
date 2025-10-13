"use client";

import React, { useEffect, useState } from "react";
import { AboutUsHeader } from "~/components/sections/who-we-are/AboutUsHeader";
import { TaglineSection } from "~/components/sections/who-we-are/TaglineSection";
import { GroupPhotoSection } from "~/components/sections/who-we-are/GroupPhotoSection";
import { AboutTSDSection } from "~/components/sections/who-we-are/AboutTSDSection";
import { VisionMissionSection } from "~/components/sections/who-we-are/VisionMissionSection";
import { CoreValuesSection } from "~/components/sections/who-we-are/CoreValuesSection";
import { LeadershipSection } from "~/components/sections/who-we-are/LeadershipSection";
import { TargetGroupSection } from "~/components/sections/who-we-are/TargetGroupSection";
import { OperationRegionsSection } from "~/components/sections/who-we-are/OperationRegionsSection";
import { WhatsAppButton } from "~/components/sections/who-we-are/WhatsAppButton";

export default function AboutUs() {
  const [pageData, setPageData] = useState<any>(null);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      // Fetch page data with sections
      const pageResponse = await fetch('/api/public/pages/who-we-are');
      const pageData = await pageResponse.json();

      // Fetch site settings (for core values, leadership, etc.)
      const settingsResponse = await fetch('/api/public/settings');
      const settingsData = await settingsResponse.json();

      if (pageData.success) {
        setPageData(pageData.data);
      }

      if (settingsData.success) {
        setSiteSettings(settingsData.data);
      }
    } catch (error) {
      console.error('Error fetching page data:', error);
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

  // If page data not found, show fallback
  if (!pageData || !pageData.sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Page not found</p>
      </div>
    );
  }

  // Render sections dynamically based on database
  const renderSection = (section: any, index: number) => {
    const { type, data } = section;

    switch (type) {
      case 'AboutUsHeader':
        return <AboutUsHeader key={index} />;

      case 'TaglineSection':
        return <TaglineSection key={index} tagline={data.tagline || 'Working hand in hand with communities for a brighter future.'} />;

      case 'GroupPhotoSection':
        return <GroupPhotoSection key={index} imageSrc={data.imageSrc || ''} altText={data.altText || ''} />;

      case 'AboutTSDSection':
        return <AboutTSDSection key={index} description={data.description || ''} backImageSrc={data.backImageSrc || ''} frontImageSrc={data.frontImageSrc || ''} />;

      case 'VisionMissionSection':
        return <VisionMissionSection key={index} visionImage={data.visionImage || ''} visionText={data.visionText || ''} missionImage={data.missionImage || ''} missionText={data.missionText || ''} />;

      case 'CoreValuesSection':
        return <CoreValuesSection key={index} coreValues={siteSettings?.coreValues || []} />;

      case 'LeadershipSection':
        return <LeadershipSection key={index} leadershipTeam={siteSettings?.leadership || []} />;

      case 'TargetGroupSection':
        return <TargetGroupSection key={index} targetGroups={siteSettings?.targetGroups || []} headerImage={data.headerImage || ''} />;

      case 'OperationRegionsSection':
        return <OperationRegionsSection key={index} operationRegions={siteSettings?.operationRegions || []} mapImageSrc={data.mapImageSrc || '/images/Objects.png'} mapLayerSrc={data.mapLayerSrc || ''} />;

      default:
        return null;
    }
  };

  return (
    <main className="relative">
      {/* Render sections dynamically from database */}
      {pageData.sections
        .sort((a: any, b: any) => a.order - b.order)
        .map((section: any, index: number) => renderSection(section, index))}

      <WhatsAppButton phoneNumber="" />
    </main>
  );
}