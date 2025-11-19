"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "~/lib/i18n/hooks";

interface Certification {
  _id: string;
  name: string;
  logo: string;
  order: number;
  isActive: boolean;
  link?: string;
  description?: string;
  type: string;
}

export default function CertificationsSection() {
  const { t } = useTranslation();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const response = await fetch("/api/public/keyfunders");
      const data = await response.json();

      if (data.success) {
        setCertifications(data.data);
      } else {
        console.error("Failed to fetch certifications:", data.error);
      }
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative w-full py-10 sm:py-16 md:py-20 lg:py-20 bg-[#F5EBD7] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col items-center">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-300 rounded mb-8 sm:mb-12 md:mb-16 lg:mb-16"></div>
            <div className="flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-14 lg:space-y-14">
              <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-10 md:gap-x-12 lg:gap-x-16 gap-y-6 sm:gap-y-8 md:gap-y-10 lg:gap-y-10">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] bg-gray-300 rounded"
                  ></div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-10 md:gap-x-12 lg:gap-x-16 gap-y-6 sm:gap-y-8 md:gap-y-10 lg:gap-y-10">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] bg-gray-300 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null; // Don't render the section if no certifications
  }
  return (
    <section className="relative w-full py-10 sm:py-16 md:py-20 lg:py-20 bg-secondary-orange overflow-hidden">
      {/* Reduced section padding for mobile to optimize vertical space */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col items-center">
        {/* Added smaller base padding for mobile, with sm: for slight increase */}
        {/* Title */}
        <h2 className="text-[#1A7D36] text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-extrabold uppercase tracking-wide text-center mb-8 sm:mb-12 md:mb-16 lg:mb-16">
          {t("home.partners.title")}
        </h2>
        {/* Scaled down base text size for better mobile readability, added sm: to restore original base */}

        {/* Certifications Grid */}
        <div className="flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-14 lg:space-y-14">
          {/* Reduced space between rows on mobile and tablet for compact layout */}
          {/* Top row - first 3 certifications */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-10 md:gap-x-12 lg:gap-x-16 gap-y-6 sm:gap-y-8 md:gap-y-10 lg:gap-y-10">
            {/* Optimized gaps for smaller screens to prevent excessive spacing when wrapped */}
            {certifications.slice(0, 3).map((certification) => (
              <div
                key={certification._id}
                className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] relative"
              >
                {/* Made logo containers smaller on mobile and tablet for better fit and balance, preserving desktop size */}
                <Image
                  src={certification.logo}
                  alt={certification.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Bottom row - remaining certifications */}
          {certifications.length > 3 && (
            <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-10 md:gap-x-12 lg:gap-x-16 gap-y-6 sm:gap-y-8 md:gap-y-10 lg:gap-y-10">
              {certifications.slice(3).map((certification) => (
                <div
                  key={certification._id}
                  className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] relative"
                >
                  <Image
                    src={certification.logo}
                    alt={certification.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}







