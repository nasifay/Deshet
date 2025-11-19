"use client";

import React, { useEffect, useState } from "react";
import { AboutHeroSection } from "~/components/sections/who-we-are/about-hero-section";
import VisionMission from "~/components/sections/who-we-are/VisionMissionSection";
import { OurStorySection } from "~/components/sections/who-we-are/OurStorySection";
import { OurPhilosophySection } from "~/components/sections/who-we-are/OurPhilosophySection";
import { HealingApproachSection } from "~/components/sections/who-we-are/HealingApproachSection";
import { PractitionerSection } from "~/components/sections/who-we-are/PractitionerSection";
import { CommitmentSection } from "~/components/sections/who-we-are/CommitmentSection";
import { CallToActionSection } from "~/components/sections/who-we-are/CallToActionSection";
import { CoreValuesSection } from "~/components/sections/who-we-are/CoreValuesSection";
import { BoardMemberSection } from "~/components/sections/who-we-are/BoardMemberSection";
import { LeadershipSection } from "~/components/sections/who-we-are/LeadershipSection";
import { TargetGroupSection } from "~/components/sections/who-we-are/TargetGroupSection";
import { OperationRegionsSection } from "~/components/sections/who-we-are/OperationRegionsSection";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

interface PageSection {
  type: string;
  data: Record<string, unknown>;
  order: number;
}

interface PageData {
  sections?: PageSection[];
  [key: string]: unknown;
}


export default function AboutUs() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useTranslation();

  useEffect(() => {
    fetchPageData();
  }, [locale]);

  const fetchPageData = async () => {
    try {
      // Fetch page data with sections
      const pageResponse = await fetch("/api/public/pages/who-we-are");
      const pageData = await pageResponse.json();

      if (pageData.success) {
        setPageData(pageData.data);
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
        title?: string | { en: string; am: string };
        subtitle?: string | { en: string; am: string };
      }
    | undefined;

  const groupPhotoData = getSectionData("GroupPhotoSection") as
    | {
        imageSrc?: string;
        altText?: string | { en: string; am: string };
      }
    | undefined;

  const aboutTSDData = getSectionData("AboutTSDSection") as
    | {
        description?: string | { en: string; am: string };
        backImageSrc?: string;
        frontImageSrc?: string;
      }
    | undefined;

  // Render section based on type
  const renderSection = (section: PageSection) => {
    const { type, data } = section;

    switch (type) {
      case "AboutUsHeader":
        return (
          <AboutHeroSection
            title={
              data.title
                ? getBilingualText(
                    data.title as string | { en: string; am: string },
                    locale,
                    locale === "am" ? "ስለእኛ" : "ABOUT US"
                  )
                : undefined
            }
            subtitle={
              data.subtitle
                ? getBilingualText(
                    data.subtitle as string | { en: string; am: string },
                    locale,
                    ""
                  )
                : undefined
            }
            mainImage={groupPhotoData?.imageSrc || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"}
            contentImage={aboutTSDData?.frontImageSrc || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"}
            content={
              aboutTSDData?.description
                ? getBilingualText(
                    aboutTSDData.description as
                      | string
                      | { en: string; am: string },
                    locale,
                    ""
                  )
                : undefined
            }
          />
        );

      case "VisionMissionSection":
        return (
          <VisionMission
            visionText={
              data.visionText
                ? getBilingualText(
                    data.visionText as string | { en: string; am: string },
                    locale,
                    ""
                  )
                : undefined
            }
            missionText={
              data.missionText
                ? getBilingualText(
                    data.missionText as string | { en: string; am: string },
                    locale,
                    ""
                  )
                : undefined
            }
            visionImage={(data.visionImage as string | undefined) || "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"}
            missionImage={(data.missionImage as string | undefined) || "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"}
          />
        );


      case "OurStorySection":
        return (
          <OurStorySection
            title={data.title as string | { en: string; am: string } | undefined}
            content={
              data.content as string | { en: string; am: string } | undefined
            }
            image={data.image as string | undefined}
          />
        );

      case "OurPhilosophySection":
        return (
          <OurPhilosophySection
            title={data.title as string | { en: string; am: string } | undefined}
            principles={data.principles as any}
          />
        );

      case "HealingApproachSection":
        return (
          <HealingApproachSection
            title={data.title as string | { en: string; am: string } | undefined}
            content={
              data.content as string | { en: string; am: string } | undefined
            }
            image={data.image as string | undefined}
          />
        );

      case "PractitionerSection":
        return (
          <PractitionerSection
            title={data.title as string | { en: string; am: string } | undefined}
            name={data.name as string | { en: string; am: string } | undefined}
            position={
              data.position as string | { en: string; am: string } | undefined
            }
            bio={data.bio as string | { en: string; am: string } | undefined}
            image={data.image as string | undefined}
            mission={
              data.mission as string | { en: string; am: string } | undefined
            }
          />
        );

      case "CommitmentSection":
        return (
          <CommitmentSection
            title={data.title as string | { en: string; am: string } | undefined}
            commitments={data.commitments as any}
          />
        );

      case "CallToActionSection":
        return (
          <CallToActionSection
            title={data.title as string | { en: string; am: string } | undefined}
            description={
              data.description as
                | string
                | { en: string; am: string }
                | undefined
            }
            primaryButton={data.primaryButton as any}
            secondaryButton={data.secondaryButton as any}
          />
        );

      case "CoreValuesSection":
        return <CoreValuesSection coreValues={(data.coreValues as any) || []} />;

      case "BoardMemberSection":
        const boardMembers = (data.boardMembers as any) || [];
        return boardMembers.length > 0 ? (
          <BoardMemberSection boardMembers={boardMembers} />
        ) : null;

      case "LeadershipSection":
        const leadership = (data.leadershipTeam as any) || [];
        return leadership.length > 0 ? (
          <LeadershipSection leadershipTeam={leadership} />
        ) : null;

      case "TeamMemberSection":
        // TeamMemberSection component not found, returning null
        return null;

      case "TargetGroupSection":
        return (
          <TargetGroupSection
            targetGroups={(data.targetGroups as any) || []}
            headerImage="https://c.animaapp.com/mgclt9blEcJSeI/img/young-millennials-african-friends-walking-city-happy-black-peopl.png"
          />
        );

      case "OperationRegionsSection":
        return (
          <OperationRegionsSection operationRegions={(data.operationRegions as any) || []} />
        );

      default:
        return null;
    }
  };

  // Sort sections by order
  const sortedSections = pageData?.sections
    ? [...pageData.sections].sort((a, b) => a.order - b.order)
    : [];

  return (
    <main className="relative bg-white space-y-4 lg:space-y-8 overflow-x-hidden">
      {sortedSections.length > 0 ? (
        sortedSections.map((section, index) => (
          <div key={index}>{renderSection(section)}</div>
        ))
      ) : (
        // Fallback to default sections if no page data
        <AboutHeroSection
          title={
            heroData?.title
              ? getBilingualText(
                  heroData.title as string | { en: string; am: string },
                  locale,
                  locale === "am" ? "ስለእኛ" : "ABOUT US"
                )
              : undefined
          }
          subtitle={
            heroData?.subtitle
              ? getBilingualText(
                  heroData.subtitle as string | { en: string; am: string },
                  locale,
                  ""
                )
              : undefined
          }
          mainImage={groupPhotoData?.imageSrc}
          contentImage={aboutTSDData?.frontImageSrc}
          content={
            aboutTSDData?.description
              ? getBilingualText(
                  aboutTSDData.description as
                    | string
                    | { en: string; am: string },
                  locale,
                  ""
                )
              : undefined
          }
        />
      )}
    </main>
  );
}
