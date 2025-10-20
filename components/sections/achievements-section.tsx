"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/Card";
import { AchievementsSkeleton } from "./landing-page-skeleton";

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState<{
    recognitionsCount?: string;
    radioYears?: string;
    serviceYears?: string;
    activeRegions?: string;
  }>();
  const [headerTitle, setHeaderTitle] = useState("SINCE 1998");
  const [headerSubtitle, setHeaderSubtitle] = useState(
    'Empowering Young People Through Holistic Development In <span class="text-[#F09632]">Health</span>, <span class="text-[#F09632]">Education</span>, <span class="text-[#F09632]">Livelihoods</span>, And <span class="text-[#F09632]">Civic Engagement</span>.'
  );
  const [featuredImage, setFeaturedImage] = useState("/images/about/1.png");
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

        // Get achievements from settings
        if (settingsResult.success && settingsResult.data?.achievements) {
          setAchievements(settingsResult.data.achievements);
        }

        // Get section-specific data from landing
        if (landingResult.success) {
          const section = landingResult.data?.sections?.find(
            (s: any) => s.type === "AchievementsSection"
          );
          if (section?.data) {
            setHeaderTitle(section.data.headerTitle || headerTitle);
            setHeaderSubtitle(section.data.headerSubtitle || headerSubtitle);
            setFeaturedImage(section.data.featuredImage || featuredImage);
          }
        }
      } catch (error) {
        console.error("Error fetching achievements data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <AchievementsSkeleton />;
  }

  return (
    <div className="w-full bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-20 wxga:px-50 xl:px-60 2xl:px-80">
      {/* Reduced vertical and horizontal padding on mobile for compact layout */}
      <div className="mx-auto">
        {/* Header Section */}
        <div className="mb-4 md:mb-16">
          <h2 className="font-roboto text-primary-green text-4xl sm:text-5xl md:text-6xl wxga:text-7xl font-black uppercase mb-4 sm:mb-6 tracking-tight">
            {headerTitle}
          </h2>
          {/* Scaled heading size down for mobile readability, assuming original md:text-4xl was a typo and adjusted progressively */}
          <p
            className="font-roboto font-light text-[#444] text-xs sm:text-sm md:text-lg lg:text-2xl leading-4 sm:leading-5 md:leading-7 lg:leading-[1.2] mb-2 md:mb-8 max-w-4xl text-justify"
            dangerouslySetInnerHTML={{ __html: headerSubtitle }}
          />
          {/* Scaled subtitle text and leading for better readability and balance on smaller screens */}
        </div>

        {/* Top Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-12  mb-2 sm:mb-4 md:mb-8">
          {/* Optimized gaps and margins for mobile and tablet to prevent excessive spacing */}
          {/* Green Card */}

          <div className="group p-0 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl flex flex-col justify-center w-auto md:w-full lg:w-[518px] h-auto md:h-[200px] lg:h-[255px] opacity-100 gap-2 sm:gap-[10px] py-4 px-4 sm:px-6 md:px-12 lg:px-[38px] md:py-8 lg:py-[90px] transition-all bg-primary-green">
            {/* Moved fixed widths, heights, paddings, and roundings to lg: to avoid overflow on tablet; set auto/full for smaller screens */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-white mb-1 sm:mb-2 origin-top-left group-hover:scale-120 transition-all duration-300">
              {achievements?.recognitionsCount || "120+"}
            </div>
            {/* Scaled font sizes progressively for readability across devices */}
            <div className="text-base sm:text-lg md:text-xl text-white">
              Recognitions & Awards
            </div>
            {/* Scaled description text for better mobile readability */}
          </div>

          {/* Dark Gray Card */}
          <div className="bg-primary-green group p-0 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl flex flex-col justify-center w-auto md:w-full lg:w-[518px] h-auto md:h-[200px] lg:h-[255px] opacity-100 gap-2 sm:gap-[10px] py-4 px-4 sm:px-6 md:px-12 lg:px-[38px] md:py-8 lg:py-[90px] transition-all">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-white mb-1 sm:mb-2 origin-top-left group-hover:scale-120 transition-all duration-300">
              <span className="text-[#F09632]">
                {achievements?.radioYears || "11+"}
              </span>{" "}
              <span className="text-white">YEARS</span>
            </div>
            <div className="text-base sm:text-lg md:text-xl text-white">
              Youth Radio &ldquo;Zemene Hallio&rdquo;
            </div>
          </div>
        </div>

        {/* Bottom Row Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Adjusted to 2 columns on sm/md (tablet) for better balance and to avoid crowding, preserving 3 on desktop */}
          {/* White Card */}
          <div className="bg-primary-green rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-auto md:h-48 lg:h-64 flex flex-col justify-center group">
            {/* Made height responsive (auto on mobile, smaller on tablet); reduced padding on smaller screens */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-white mb-1 sm:mb-2 group-hover:mb-4 origin-top-left group-hover:scale-120 transition-all duration-300">
              <span className="text-primary-orange">
                {achievements?.serviceYears || "28"}
              </span>{" "}
              <span className="text-white">YEARS</span>
            </div>
            <div className="text-base sm:text-lg md:text-xl text-white">
              Of Service
            </div>
          </div>

          {/* Image Card */}
          <Card className="rounded-xl sm:rounded-2xl overflow-hidden h-auto md:h-48 lg:h-64 group border-none">
            <Image
              className="w-full h-auto md:h-full object-cover scale-110 group-hover:scale-100"
              alt="Youth engagement activity"
              src={featuredImage}
              width={400}
              height={256}
            />
            {/* Ensured image is responsive with h-auto on mobile, object-cover for proper scaling */}
          </Card>

          {/* Light Orange Card */}
          <Card className="bg-[#FADCB4] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-auto md:h-48 lg:h-64 flex flex-col justify-center group border-none">
            <CardContent className="p-0 border-none">
              <div className="text-base sm:text-lg md:text-xl text-[#646464]">
                Active In{" "}
                <span className="font-bold text-[#F09632] group-hover:scale-110">
                  {achievements?.activeRegions || "4"}
                </span>{" "}
                Regions & Addis Ababa
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
