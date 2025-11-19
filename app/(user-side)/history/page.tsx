"use client";

import React, { useEffect, useState } from "react";
import { HistoryPageSkeleton } from "~/components/sections/history-page-skeleton";
import { useTranslation } from "~/lib/i18n/hooks";

interface HistoryData {
  title: string;
  subtitle: string;
  heroImages: string[];
  introductionParagraphs: string[];
  milestonesImage?: string;
  timelineSections: Array<{
    title: string;
    description: string;
    order: number;
  }>;
  closingQuote?: string;
}

export default function History() {
  const { t } = useTranslation();
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const fetchHistoryData = async () => {
    try {
      const response = await fetch("/api/public/history");
      const data = await response.json();

      if (data.success) {
        setHistoryData(data.data);
      }
    } catch (error) {
      console.error("Error fetching history data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <HistoryPageSkeleton />;
  }

  if (!historyData) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-gray-600">{t("pages.history.noContent")}</p>
      </div>
    );
  }

  return (
    <div className="bg-white w-full relative flex flex-col pb-12 md:pb-20 lg:pb-40">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-20 lg:gap-24 px-6 md:px-16 lg:px-24 xl:px-36">
        <h1 className="primary-title text-primary-green">
          {historyData.title}
        </h1>
        <p className="w-full font-roboto font-normal text-lg md:text-xl lg:text-[32px] leading-[101%] text-center text-[#ff9700]">
          {historyData.subtitle}
        </p>

        {/* Hero Images */}
        {historyData.heroImages.length > 0 && (
          <div className="w-full">
            {historyData.heroImages.length === 1 ? (
              <img
                className="w-full h-auto rounded-lg"
                alt="History hero"
                src={historyData.heroImages[0]}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {historyData.heroImages.map((image, index) => (
                  <img
                    key={index}
                    className="w-full h-auto rounded-lg"
                    alt={`History hero ${index + 1}`}
                    src={image}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Introduction Paragraphs */}
        {historyData.introductionParagraphs.length > 0 && (
          <div className="space-y-4 text-gray-800 font-roboto font-normal text-sm md:text-xl lg:text-2xl leading-[126%] tracking-[0.8px] text-justify">
            {historyData.introductionParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </section>

      {/* Milestones Section */}
      {historyData.milestonesImage && (
        <div className="mt-6 sm:mt-14 lg:mt-24 inline-flex flex-col items-center justify-center gap-[50px] w-full px-2 md:px-6 lg:px-20 mb-8 md:mb-20">
          <h2 className="font-roboto font-black text-2xl md:text-4xl lg:text-[90px] leading-[101%] tracking-[0] uppercase text-primary-green">
            {t("pages.history.milestones")}
          </h2>

          <div className="w-full h-[40vh] md:h-auto overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <img
              src={historyData.milestonesImage}
              alt="Milestones"
              className="h-full min-w-[200vw] md:min-w-0 md:h-auto w-auto md:w-full object-contain object-left"
            />
          </div>
        </div>
      )}

      {/* Timeline Sections */}
      {historyData.timelineSections.length > 0 && (
        <div className="space-y-6 sm:space-y-8 md:space-y-20 lg:space-y-24 px-6 md:px-16 lg:px-24 xl:px-36 mb-6 md:mb-20">
          {historyData.timelineSections
            .sort((a, b) => a.order - b.order)
            .map((section, index) => (
              <section
                key={index}
                className="flex flex-col items-start justify-center gap-4 md:gap-7 w-full md:px-6"
              >
                <h2 className="font-roboto font-black text-lg md:text-4xl lg:text-6xl leading-[101%] tracking-[0] uppercase text-primary-green">
                  {section.title}
                </h2>

                <p className="w-full font-roboto font-medium text-sm md:text-lg lg:text-xl xl:text-3xl leading-[101%] tracking-[0] capitalize text-black">
                  {section.description}
                </p>
              </section>
            ))}
        </div>
      )}

      {/* Closing Quote */}
      {historyData.closingQuote && (
        <blockquote className="w-full px-6 md:px-20 lg:px-36 text-center font-roboto font-light italic text-sm md:text-3xl lg:text-4xl leading-[126%] tracking-[0.8px]">
          <span className="italic text-black tracking-[0.38px]">
            &quot; {historyData.closingQuote} &quot;
          </span>
        </blockquote>
      )}
    </div>
  );
}
