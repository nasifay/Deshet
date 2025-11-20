"use client";

import React, { useState, useEffect } from "react";
import { StatisticsSkeleton } from "./landing-page-skeleton";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

interface StatItem {
  number: string;
  label: string;
}

interface StatsSectionProps {
  // Support both dynamic stats array and legacy site settings format
  stats?:
    | StatItem[]
    | {
        staffCount?: string;
        officesCount?: string;
        regionsCount?: string;
        volunteersCount?: string;
        protocolsCount?: string;
      };
}

export default function StatisticsSection() {
  const { t, locale } = useTranslation();
  const [stats, setStats] = useState<StatsSectionProps["stats"]>();
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [landingResponse, settingsResponse] = await Promise.all([
          fetch("/api/public/landing"),
          fetch("/api/public/settings"),
        ]);

        const [landingResult, settingsResult] = await Promise.all([
          landingResponse.json(),
          settingsResponse.json(),
        ]);

        // Try to get stats from landing page first
        if (landingResult.success) {
          const section = landingResult.data?.sections?.find(
            (s: any) => s.type === "StatisticsSection"
          );
          
          // Check visibility - if explicitly set to false, don't render
          if (section?.data?.isVisible === false) {
            setIsVisible(false);
            setLoading(false);
            return;
          }
          
          if (section?.data?.stats) {
            setStats(section.data.stats);
            setIsVisible(section.data.isVisible !== false);
          } else if (settingsResult.success && settingsResult.data?.stats) {
            // Fallback to site settings
            setStats(settingsResult.data.stats);
            setIsVisible(true);
          }
        } else if (settingsResult.success && settingsResult.data?.stats) {
          // Fallback to site settings
          setStats(settingsResult.data.stats);
          setIsVisible(true);
        }
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) {
    return <StatisticsSkeleton />;
  }

  // Don't render if visibility is explicitly set to false
  if (isVisible === false) {
    return null;
  }

  // Handle dynamic stats array from landing page CMS
  if (Array.isArray(stats)) {
    return (
      <section className="w-full bg-white py-10 md:py-12">
        <div className=" mx-auto px-6 md:px-16 lg:px-20 xl:28 2xl:px-36">
          <div className="grid grid-cols-2  lg:grid-cols-4 gap-y-8 gap-x-6 md:gap-x-10 lg:gap-x-16  place-content-start  place-items-start ">
            {stats.map((item, index) => {
              // Handle bilingual labels
              const label = getBilingualText(
                item.label as string | { en: string; am: string } | undefined,
                locale,
                ""
              );
              return (
                <div
                  key={index}
                  className="flex flex-col items-start justify-center font-roboto text-2xl md:text-3xl 2xl:text-4xl"
                >
                  <span className="font-semibold  text-primary-orange leading-tight">
                    {item.number}
                  </span>
                  <p className="font-light  text-[#1a1a1a] mt-[2px] md:text-nowrap">
                    {label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Fallback to legacy site settings format
  const legacyStats = stats as {
    staffCount?: string;
    officesCount?: string;
    regionsCount?: string;
    volunteersCount?: string;
    protocolsCount?: string;
  };

  const statsData = [
    {
      number: legacyStats?.staffCount || "58",
      label: t("home.statistics.staffs"),
    },
    {
      number: legacyStats?.officesCount || "5",
      label: (
        <>
          {t("home.statistics.officesIn")}{" "}
          <span className="text-[#4EB778] font-normal">
            {legacyStats?.regionsCount || "4"}
          </span>{" "}
          {t("home.statistics.regions")}
        </>
      ),
    },
    {
      number: legacyStats?.volunteersCount || "250+",
      label: t("home.statistics.volunteers"),
    },
    {
      number: legacyStats?.protocolsCount || "15",
      label: t("home.statistics.protocols"),
    },
  ];

  return (
    <section className="w-full bg-white py-10 md:py-12">
      <div className=" mx-auto px-6 md:px-16 lg:px-20 xl:28 2xl:px-36">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:gap-x-10 lg:gap-x-16  place-content-start md:place-content-center place-items-start md:place-items-center">
          {statsData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center font-roboto text-2xl md:text-3xl 2xl:text-4xl"
            >
              <span className="font-semibold  text-primary-orange leading-tight">
                {item.number}
              </span>
              <p className="font-light  text-[#1a1a1a] mt-[2px] md:text-nowrap">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
