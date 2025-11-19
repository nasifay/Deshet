"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/Card";
import { AchievementsSkeleton } from "./landing-page-skeleton";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

interface AchievementData {
  recognitionsCount?: string;
  recognitionsLabel?: string | { en: string; am: string };
  serviceYears?: string;
  serviceYearsLabel?: string | { en: string; am: string };
  patientsServed?: string;
  patientsServedLabel?: string | { en: string; am: string };
  expertPractitioners?: string;
  expertPractitionersLabel?: string | { en: string; am: string };
}

export default function AchievementsSection() {
  const { t, locale } = useTranslation();
  const [achievements, setAchievements] = useState<AchievementData>({});
  const [headerTitle, setHeaderTitle] = useState("");
  const [headerSubtitle, setHeaderSubtitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState(
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  );
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
            setHeaderTitle(
              getBilingualText(
                section.data.headerTitle,
                locale,
                "SINCE 2010"
              )
            );
            setHeaderSubtitle(
              getBilingualText(
                section.data.headerSubtitle,
                locale,
                "Delivering Premium Ethiopian Traditional Medicine with Herbal Healing, Spiritual Therapy, and Cultural Healing Services"
              )
            );
            setFeaturedImage(
              section.data.featuredImage ||
                "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            );
            
            // Update achievements from section data if available
            if (section.data.achievements) {
              setAchievements(section.data.achievements);
            }
          } else {
            // Default Deshet content
            setHeaderTitle("SINCE 2010");
            setHeaderSubtitle(
              locale === "am"
                ? "የኢትዮጵያ ባህላዊ ሕክምናን በአመዳድብ ሕክምና፣ መንፈሳዊ ሕክምና እና ባህላዊ ሕክምና አገልግሎቶች እንሰጣለን"
                : "Delivering Premium Ethiopian Traditional Medicine with Herbal Healing, Spiritual Therapy, and Cultural Healing Services"
            );
          }
        } else {
          // Default Deshet content
          setHeaderTitle("SINCE 2010");
          setHeaderSubtitle(
            locale === "am"
              ? "የኢትዮጵያ ባህላዊ ሕክምናን በአመዳድብ ሕክምና፣ መንፈሳዊ ሕክምና እና ባህላዊ ሕክምና አገልግሎቶች እንሰጣለን"
              : "Delivering Premium Ethiopian Traditional Medicine with Herbal Healing, Spiritual Therapy, and Cultural Healing Services"
          );
        }
      } catch (error) {
        console.error("Error fetching achievements data:", error);
        setHeaderTitle("SINCE 2010");
        setHeaderSubtitle(
          locale === "am"
            ? "የኢትዮጵያ ባህላዊ ሕክምናን በአመዳድብ ሕክምና፣ መንፈሳዊ ሕክምና እና ባህላዊ ሕክምና አገልግሎቶች እንሰጣለን"
            : "Delivering Premium Ethiopian Traditional Medicine with Herbal Healing, Spiritual Therapy, and Cultural Healing Services"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) {
    return <AchievementsSkeleton />;
  }

  return (
    <div className="w-full bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-20 wxga:px-50 xl:px-60 2xl:px-80">
      {/* Reduced vertical and horizontal padding on mobile for compact layout */}
      <div className="mx-auto">
        {/* Header Section */}
        <div className="mb-4 md:mb-16">
          <h2
            className={`font-roboto text-primary-green text-4xl sm:text-5xl md:text-6xl wxga:text-7xl font-black uppercase mb-4 sm:mb-6 tracking-tight ${
              locale === "am" ? "font-amharic" : ""
            }`}
          >
            {headerTitle || "SINCE 2010"}
          </h2>
          {/* Scaled heading size down for mobile readability, assuming original md:text-4xl was a typo and adjusted progressively */}
          <p
            className={`font-roboto font-light text-[#444] text-xs sm:text-sm md:text-lg lg:text-2xl leading-4 sm:leading-5 md:leading-7 lg:leading-[1.2] mb-2 md:mb-8 max-w-4xl text-justify ${
              locale === "am" ? "font-amharic" : ""
            }`}
          >
            {headerSubtitle ||
              (locale === "am"
                ? "የኢትዮጵያ ባህላዊ ሕክምናን በአመዳድብ ሕክምና፣ መንፈሳዊ ሕክምና እና ባህላዊ ሕክምና አገልግሎቶች እንሰጣለን"
                : "Delivering Premium Ethiopian Traditional Medicine with Herbal Healing, Spiritual Therapy, and Cultural Healing Services")}
          </p>
          {/* Scaled subtitle text and leading for better readability and balance on smaller screens */}
        </div>

        {/* Top Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-12  mb-2 sm:mb-4 md:mb-8">
          {/* Optimized gaps and margins for mobile and tablet to prevent excessive spacing */}
          {/* Green Card */}

          <div className="group p-0 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl flex flex-col justify-center w-auto md:w-full lg:w-[518px] h-auto md:h-[200px] lg:h-[255px] opacity-100 gap-2 sm:gap-[10px] py-4 px-4 sm:px-6 md:px-12 lg:px-[38px] md:py-8 lg:py-[90px] transition-all bg-primary-green">
            {/* Moved fixed widths, heights, paddings, and roundings to lg: to avoid overflow on tablet; set auto/full for smaller screens */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-white mb-1 sm:mb-2 origin-top-left group-hover:scale-120 transition-all duration-300">
              {achievements?.patientsServed || "5000+"}
            </div>
            {/* Scaled font sizes progressively for readability across devices */}
            <div
              className={`text-base sm:text-lg md:text-xl text-white ${
                locale === "am" ? "font-amharic" : ""
              }`}
            >
              {getBilingualText(
                achievements?.patientsServedLabel,
                locale,
                locale === "am" ? "ታካሚዎች" : "Patients Served"
              )}
            </div>
            {/* Scaled description text for better mobile readability */}
          </div>

          {/* Second Card */}
          <div className="bg-primary-green group p-0 rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-4xl flex flex-col justify-center w-auto md:w-full lg:w-[518px] h-auto md:h-[200px] lg:h-[255px] opacity-100 gap-2 sm:gap-[10px] py-4 px-4 sm:px-6 md:px-12 lg:px-[38px] md:py-8 lg:py-[90px] transition-all">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-white mb-1 sm:mb-2 origin-top-left group-hover:scale-120 transition-all duration-300">
              <span className="text-[#F09632]">
                {achievements?.serviceYears || "15+"}
              </span>{" "}
              <span className="text-white">
                {locale === "am" ? "ዓመታት" : "YEARS"}
              </span>
            </div>
            <div
              className={`text-base sm:text-lg md:text-xl text-white ${
                locale === "am" ? "font-amharic" : ""
              }`}
            >
              {getBilingualText(
                achievements?.serviceYearsLabel,
                locale,
                locale === "am" ? "የሕክምና ልምድ" : "Of Excellence"
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Adjusted to 2 columns on sm/md (tablet) for better balance and to avoid crowding, preserving 3 on desktop */}
          {/* Expert Practitioners Card */}
          <div className="bg-primary-green rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-auto md:h-48 lg:h-64 flex flex-col justify-center group">
            {/* Made height responsive (auto on mobile, smaller on tablet); reduced padding on smaller screens */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-white mb-1 sm:mb-2 group-hover:mb-4 origin-top-left group-hover:scale-120 transition-all duration-300">
              <span className="text-primary-orange">
                {achievements?.expertPractitioners || "50+"}
              </span>
            </div>
            <div
              className={`text-base sm:text-lg md:text-xl text-white ${
                locale === "am" ? "font-amharic" : ""
              }`}
            >
              {getBilingualText(
                achievements?.expertPractitionersLabel,
                locale,
                locale === "am" ? "ባለሙያ ሐኪሞች" : "Expert Practitioners"
              )}
            </div>
          </div>

          {/* Image Card */}
          <Card className="rounded-xl sm:rounded-2xl overflow-hidden h-auto md:h-48 lg:h-64 group border-none">
            <Image
              className="w-full h-auto md:h-full object-cover scale-110 group-hover:scale-100"
              alt="Traditional medicine practice"
              src={featuredImage}
              width={400}
              height={256}
            />
            {/* Ensured image is responsive with h-auto on mobile, object-cover for proper scaling */}
          </Card>

          {/* Recognitions Card */}
          <Card className="bg-[#FADCB4] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 h-auto md:h-48 lg:h-64 flex flex-col justify-center group border-none">
            <CardContent className="p-0 border-none">
              <div
                className={`text-base sm:text-lg md:text-xl text-[#646464] ${
                  locale === "am" ? "font-amharic" : ""
                }`}
              >
                {getBilingualText(
                  achievements?.recognitionsLabel,
                  locale,
                  locale === "am"
                    ? "እውቅናዎች እና ሽልማቶች"
                    : "Recognitions & Awards"
                )}
                {achievements?.recognitionsCount && (
                  <>
                    {" "}
                    <span className="font-bold text-[#F09632] group-hover:scale-110">
                      {achievements.recognitionsCount}
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
