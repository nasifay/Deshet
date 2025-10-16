"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { VolunteerBannerSkeleton } from "./landing-page-skeleton";

interface VolunteerBannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  volunteerButtonText?: string;
  donateButtonText?: string;
}

export default function VolunteerBanner() {
  const [volunteerData, setVolunteerData] = useState<VolunteerBannerProps>({
    title: "You can contribute to provide a place for",
    subtitle: "children with special needs!",
    backgroundImage: "/images/cta.jpg",
    volunteerButtonText: "Join as a volunteer",
    donateButtonText: "Donate",
  });
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public/landing");
        const result = await response.json();

        if (result.success) {
          const section = result.data?.sections?.find(
            (s: any) => s.type === "VolunteerBanner"
          );
          if (section?.data) {
            setVolunteerData({
              title: section.data.title || volunteerData.title,
              subtitle:
                section.data.description ||
                section.data.subtitle ||
                volunteerData.subtitle,
              backgroundImage:
                section.data.backgroundImage || volunteerData.backgroundImage,
              volunteerButtonText:
                section.data.ctaText ||
                section.data.volunteerButtonText ||
                volunteerData.volunteerButtonText,
              donateButtonText:
                section.data.donateButtonText || volunteerData.donateButtonText,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching volunteer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <VolunteerBannerSkeleton />;
  }

  return (
    <section className="w-full my-20 flex justify-center items-center py-0 px-6 md:px-16 lg:px-20 xl:28 2xl:px-36 font-roboto">
      <div className="relative w-full  h-64 md:h-[429px] rounded-2xl overflow-hidden aspect-[1595/429]">
        <Image
          src={volunteerData.backgroundImage!}
          alt="Group of volunteers"
          fill
          className="object-cover rounded-2xl"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 rounded-2xl" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug max-w-2xl">
            <span className="text-primary-green">{volunteerData.title} </span>
            <span className="text-primary-green">{volunteerData.subtitle}</span>
          </h2>

          {/* Buttons */}
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/volunteer"
              className="cursor-pointer bg-primary-orange text-white text-sm md:text-base font-medium py-2.5 px-6 rounded-full hover:bg-[#ffb733] transition-all duration-300"
              aria-label="Join as a volunteer"
            >
              {volunteerData.volunteerButtonText}
            </Link>
            <Link
              href="/donate"
              className="cursor-pointer bg-white text-[#20A44D] text-sm md:text-base font-medium py-2.5 px-6 rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-300"
              aria-label="Donate"
            >
              {volunteerData.donateButtonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
