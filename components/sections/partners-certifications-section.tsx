"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";
import { MedicalPartnersSkeleton } from "./landing-page-skeleton";

interface SupporterItem {
  _id: string;
  name: string;
  logo: string;
  link?: string;
  order: number;
  isActive: boolean;
  description?: string;
}

interface PartnersCertificationsData {
  title?: string | { en: string; am: string };
  items?: SupporterItem[];
}

export default function PartnersCertificationsSection() {
  const { t, locale } = useTranslation();
  const [data, setData] = useState<PartnersCertificationsData>({
    title: {
      en: "CERTIFICATIONS & RECOGNITIONS",
      am: "ማረጋገጫዎች እና እውቅናዎች",
    },
    items: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch supporters data from Deshet admin panel
  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, try to get data from landing page CMS
        const landingResponse = await fetch("/api/public/landing");
        const landingResult = await landingResponse.json();

        if (landingResult.success) {
          const section = landingResult.data?.sections?.find(
            (s: any) =>
              s.type === "PartnersCertificationsSection" ||
              s.type === "MedicalPartnersSection" ||
              s.type === "CertificationsSection"
          );

          if (section?.data) {
            // If CMS has data, use it
            const cmsItems = [
              ...(section.data.partners || []),
              ...(section.data.certifications || []),
            ];
            setData({
              title: section.data.title || {
                en: "CERTIFICATIONS & RECOGNITIONS",
                am: "ማረጋገጫዎች እና እውቅናዎች",
              },
              items: cmsItems.map((item: any, index: number) => ({
                _id: `cms-${index}`,
                name: item.name,
                logo: item.logo,
                link: item.link,
                order: index,
                isActive: true,
              })),
            });
            setLoading(false);
            return;
          }
        }

        // Fallback: Fetch from Deshet supporters API (from /admin/supporters)
        const supportersResponse = await fetch("/api/public/supporters");
        const supportersResult = await supportersResponse.json();

        if (supportersResult.success && supportersResult.data?.length > 0) {
          // Use supporters data from admin panel
          const supporters: SupporterItem[] = supportersResult.data
            .filter((s: SupporterItem) => s.isActive)
            .sort((a: SupporterItem, b: SupporterItem) => a.order - b.order)
            .map((s: SupporterItem) => ({
              _id: s._id,
              name: s.name,
              logo: s.logo,
              link: s.link,
              order: s.order,
              isActive: s.isActive,
              description: s.description,
            }));

          setData({
            title: {
              en: "CERTIFICATIONS & RECOGNITIONS",
              am: "ማረጋገጫዎች እና እውቅናዎች",
            },
            items: supporters,
          });
        } else {
          // No data available, show empty state
          setData({
            title: {
              en: "CERTIFICATIONS & RECOGNITIONS",
              am: "ማረጋገጫዎች እና እውቅናዎች",
            },
            items: [],
          });
        }
      } catch (error) {
        console.error("Error fetching partners/certifications data:", error);
        // On error, show empty state
        setData({
          title: {
            en: "CERTIFICATIONS & RECOGNITIONS",
            am: "ማረጋገጫዎች እና እውቅናዎች",
          },
          items: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) {
    return <MedicalPartnersSkeleton />;
  }

  const titleText = getBilingualText(
    data.title,
    locale,
    "CERTIFICATIONS & RECOGNITIONS"
  );

  const allItems = data.items || [];

  if (allItems.length === 0) {
    return null;
  }

  // Split items into two rows for marquee effect
  const midpoint = Math.ceil(allItems.length / 2);
  const row1 = allItems.slice(0, midpoint);
  const row2 = allItems.slice(midpoint);

  return (
    <section className="bg-white py-8 md:py-12 relative w-full overflow-hidden">
      <div className="mx-auto px-4 md:px-8 lg:px-16">
        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-8 md:mb-12">
          <h2
            className={`font-roboto font-medium text-[16px] md:text-[18px] leading-[100%] tracking-[2px] text-nowrap text-[#00a878] uppercase ${
              locale === "am" ? "font-amharic" : ""
            }`}
          >
            {titleText}
          </h2>
          <div className="section-divider" />
        </div>

        {/* Logo Rows */}
        <div className="mt-6 flex flex-col gap-6">
          {/* Row 1 - Marquee */}
          {row1.length > 0 && (
            <div className="marquee-container">
              <div className="marquee-content-1">
                {[...row1, ...row1].map((item, i) => (
                  <div
                    key={`row1-${item._id}-${i}`}
                    className="flex-shrink-0 mx-8 flex items-center justify-center w-[120px] md:w-[140px] lg:w-[160px] h-[60px] md:h-[70px] relative group"
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-full"
                      >
                        <Image
                          src={item.logo}
                          alt={item.name}
                          fill
                          className="object-contain transition-opacity group-hover:opacity-80"
                        />
                      </a>
                    ) : (
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Row 2 - Marquee */}
          {row2.length > 0 && (
            <div className="marquee-container">
              <div className="marquee-content-2">
                {[...row2, ...row2].map((item, i) => (
                  <div
                    key={`row2-${item._id}-${i}`}
                    className="flex-shrink-0 mx-8 flex items-center justify-center w-[100px] md:w-[120px] lg:w-[160px] h-[40px] md:h-[50px] lg:h-[60px] relative group"
                  >
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-full"
                      >
                        <Image
                          src={item.logo}
                          alt={item.name}
                          fill
                          className="object-contain transition-opacity group-hover:opacity-80"
                        />
                      </a>
                    ) : (
                      <Image
                        src={item.logo}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        /* Fading effect for a smoother entrance and exit */
        section::before,
        section::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }
        section::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        section::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }

        /* Marquee container and animation */
        .marquee-container {
          overflow: hidden;
          position: relative;
        }
        .marquee-container:hover .marquee-content-1,
        .marquee-container:hover .marquee-content-2 {
          animation-play-state: paused;
        }

        .marquee-content-1,
        .marquee-content-2 {
          display: flex;
          width: fit-content;
        }

        /* Row 1 now uses the new 'scroll-reverse' animation */
        .marquee-content-1 {
          animation: scroll-reverse 40s linear infinite;
        }

        /* Row 2 continues using the 'scroll' animation */
        .marquee-content-2 {
          animation: scroll 55s linear infinite;
        }

        /* Keyframe for Right-to-Left scroll (Row 2) */
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* NEW Keyframe for Left-to-Right scroll (Row 1) */
        @keyframes scroll-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

