"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NewsEventsSection } from "~/components/sections/NewsEventsSection";
import { MainContentSection } from "~/components/sections/MainContentSection";
import NewsPageSkeleton from "~/components/sections/news-page-skeleton";
import { useTranslation } from "~/lib/i18n/hooks";

interface PageData {
  title?: string;
  subtitle?: string;
  headerIcon?: string;
}

export default function BlogPage() {
  const { t } = useTranslation();
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPageData();
  }, []);

  const fetchPageData = async () => {
    try {
      const response = await fetch("/api/public/pages/blog");
      const data = await response.json();

      if (data.success && data.data) {
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
        <div className="md:mt-8 md:mb-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-4  translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Image
            className="w-12 h-12 sm:w-16 md:w-[71px] md:h-[73px] object-cover"
            alt={t("pages.blog.iconAlt")}
            src={
              pageData?.headerIcon ||
              "https://c.animaapp.com/mg8i4bgw8CQdb4/img/asset-2-1.png"
            }
            width={71}
            height={73}
          />

          <h1 className="primary-title text-center text-primary-green">
            {pageData?.title || t("pages.blog.title")}
          </h1>
        </div>

        {/* Subtitle Section */}
        <div className="flex justify-center px-4 mb-12 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <div className="flex flex-col w-full max-w-[1595px] h-auto md:h-[104px] items-center justify-center gap-[65px] px-4 py-8 md:px-0 md:py-8 bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d]">
            <div className="relative w-full max-w-[905px] md:mt-[-69.00px] md:mb-[-67.00px] [font-family:'Roboto',Helvetica] font-normal text-[#ff9700] text-xl md:text-2xl lg:text-[32px] text-center tracking-[0] leading-relaxed md:leading-[32.3px]">
              {pageData?.subtitle || t("pages.blog.subtitle")}
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
