"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NewsEventsSection } from "~/components/sections/NewsEventsSection";
import { MainContentSection } from "~/components/sections/MainContentSection";
import NewsPageSkeleton from "~/components/sections/news-page-skeleton";

interface PageData {
  title?: string;
  subtitle?: string;
  headerIcon?: string;
}

export default function NewsAndEvents() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await fetch("/api/public/pages/news");
      const data = await response.json();

      if (data.success) {
        setPageData(data.data);
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <NewsPageSkeleton />;
  }

  return (
    <div
      className="bg-white w-full min-h-screen relative"
      data-model-id="932:10307"
    >
      <main className="relative">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-8 px-4 py-12 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Image
            className="w-[71px] h-[73px] object-cover"
            alt="News icon"
            src={
              pageData?.headerIcon ||
              "https://c.animaapp.com/mg8i4bgw8CQdb4/img/asset-2-1.png"
            }
            width={71}
            height={73}
          />

          <h1 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-4xl md:text-6xl lg:text-[90px] tracking-[0] leading-tight lg:leading-[90.9px] whitespace-nowrap">
            {pageData?.title || "NEWS AND EVENTS"}
          </h1>
        </div>

        {/* Subtitle Section */}
        <div className="flex justify-center px-4 mb-12 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <div className="flex flex-col w-full max-w-[1595px] h-auto md:h-[104px] items-center justify-center gap-[65px] px-4 py-8 md:px-0 md:py-[88px] bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d]">
            <div className="relative w-full max-w-[905px] md:mt-[-69.00px] md:mb-[-67.00px] [font-family:'Roboto',Helvetica] font-normal text-[#ff9700] text-xl md:text-2xl lg:text-[32px] text-center tracking-[0] leading-relaxed md:leading-[32.3px]">
              {pageData?.subtitle ||
                "Stay informed with our latest stories, milestones, and community events."}
            </div>
          </div>
        </div>

        {/* News Events Section with Events, Featured Article, and Recent News */}
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <NewsEventsSection />
        </div>

        {/* Main Content Section with Grid of News Items */}
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
          <MainContentSection />
        </div>
      </main>
    </div>
  );
}
