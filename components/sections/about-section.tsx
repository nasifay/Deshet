"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AboutSkeleton } from "./landing-page-skeleton";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

interface AboutSectionProps {
  title?: string;
  content?: string;
  images?: string[];
  ctaText?: string;
  ctaLink?: string;
}

export default function AboutSection() {
  const { t, locale } = useTranslation();
  
  // State for data
  const [aboutData, setAboutData] = useState<AboutSectionProps>({
    title: "",
    content: "",
    images: [
      "/images/about/1.png",
      "/images/about/2.png",
      "/images/about/3.png",
      "/images/about/4.png",
    ],
    ctaText: "",
    ctaLink: "/who-we-are",
  });
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public/landing");
        const result = await response.json();

        if (result.success) {
          const section = result.data?.sections?.find(
            (s: any) => s.type === "AboutSection"
          );
          if (section?.data) {
            setAboutData((prev) => ({
              title: getBilingualText(section.data.title, locale, t("home.about.title")),
              content: getBilingualText(
                section.data.description || section.data.content,
                locale,
                t("home.about.description")
              ),
              images: section.data.images || prev.images,
              ctaText: getBilingualText(section.data.ctaText, locale, t("common.readMore")),
              ctaLink: section.data.ctaLink || "/who-we-are",
            }));
          } else {
            // Set default values from translations if no API data
            setAboutData((prev) => ({
              title: t("home.about.title"),
              content: t("home.about.description"),
              images: prev.images,
              ctaText: t("common.readMore"),
              ctaLink: "/who-we-are",
            }));
          }
        } else {
          // Set default values from translations if API call fails
          setAboutData((prev) => ({
            title: t("home.about.title"),
            content: t("home.about.description"),
            images: prev.images,
            ctaText: t("common.readMore"),
            ctaLink: "/who-we-are",
          }));
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
        // Set default values from translations on error
        setAboutData((prev) => ({
          title: t("home.about.title"),
          content: t("home.about.description"),
          images: prev.images,
          ctaText: t("common.readMore"),
          ctaLink: "/who-we-are",
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale, t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % aboutData.images!.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [aboutData.images]);

  if (loading) {
    return <AboutSkeleton />;
  }

  return (
    <section className="relative w-full bg-white bg-nature-texture py-20 px-6 md:px-12 lg:px-24 font-['Roboto']">
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 xl:gap-[118px]">
        {/* Left Column */}
        <div className="w-full lg:flex-1 lg:max-w-[50%]">
          <h2 className="primary-title text-primary-green uppercase mb-6 ">
            {aboutData.title || t("home.about.title")}
          </h2>

          <div
            className="description   mb-8 max-w-[620px] text-justify tracking-normal leading-4 md:leading-7"
            dangerouslySetInnerHTML={{ __html: aboutData.content || t("home.about.description") }}
          />

          <Link
            href={aboutData.ctaLink || "/who-we-are"}
            className="inline-block bg-primary-green text-white text-sm md:text-lg lg:text-2xl font-medium px-10 2xl:px-14 py-2 2xl:py-4 rounded-full  transition-all duration-300"
          >
            {aboutData.ctaText || t("common.readMore")}
          </Link>
        </div>

        {/* Right Column — Fade Carousel */}
        <div className="flex justify-center relative w-full lg:flex-1 lg:max-w-[50%]">
          <div className="relative w-full wxga:w-[520px] h-[330px] md:h-[380px] lg:h-[400px] rounded-2xl overflow-hidden shadow-sm">
            {aboutData.images!.map((src, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  i === currentIndex ? "opacity-[1]" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={`About image ${i + 1}`}
                  fill
                  className="object-cover rounded-2xl"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
