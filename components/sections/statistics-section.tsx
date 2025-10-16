"use client";

import React from "react";

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

export default function StatisticsSection({ stats }: StatsSectionProps) {
  // Handle dynamic stats array from landing page CMS
  if (Array.isArray(stats)) {
    return (
      <section className="w-full bg-white py-10 md:py-12">
        <div className=" mx-auto px-6 md:px-16 lg:px-20 xl:28 2xl:px-36">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:gap-x-10 lg:gap-x-16  place-content-start md:place-content-center place-items-start md:place-items-center">
            {stats.map((item, index) => (
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
      label: "Staffs",
    },
    {
      number: legacyStats?.officesCount || "5",
      label: (
        <>
          Offices in{" "}
          <span className="text-[#4EB778] font-normal">
            {legacyStats?.regionsCount || "4"}
          </span>{" "}
          Regions
        </>
      ),
    },
    {
      number: legacyStats?.volunteersCount || "250+",
      label: "Volunteers",
    },
    {
      number: legacyStats?.protocolsCount || "15",
      label: "Protocols",
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
