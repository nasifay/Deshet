"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";
import { MedicalPartnersSkeleton } from "./landing-page-skeleton";

interface Partner {
  name: string;
  logo: string;
  link?: string;
}

interface Certification {
  name: string;
  logo: string;
  link?: string;
}

interface PartnersCertificationsData {
  title?: string | { en: string; am: string };
  partners?: Partner[];
  certifications?: Certification[];
}

export default function PartnersCertificationsSection() {
  const { t, locale } = useTranslation();
  const [data, setData] = useState<PartnersCertificationsData>({
    title: {
      en: "Our Medical Partners & Recognition",
      am: "የእኛ የሕክምና አጋሮች እና እውቅና",
    },
    partners: [],
    certifications: [],
  });
  const [loading, setLoading] = useState(true);

  // Default placeholder partners (medical/traditional medicine related)
  const defaultPartners: Partner[] = [
    {
      name: "Ethiopian Ministry of Health",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      name: "Traditional Medicine Association",
      logo: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      name: "Herbal Medicine Research Center",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      name: "Indigenous Healing Network",
      logo: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  // Default placeholder certifications
  const defaultCertifications: Certification[] = [
    {
      name: "Traditional Medicine Certification",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      name: "Herbal Medicine License",
      logo: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      name: "Medical Center Accreditation",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  // Fetch data from landing page API first, then fallback to individual APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to get data from landing page CMS
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
            setData({
              title: section.data.title || {
                en: "Our Medical Partners & Recognition",
                am: "የእኛ የሕክምና አጋሮች እና እውቅና",
              },
              partners: section.data.partners || [],
              certifications: section.data.certifications || [],
            });
            setLoading(false);
            return;
          }
        }

        // Fallback: Fetch from individual APIs
        const [partnersResponse, certificationsResponse] = await Promise.all([
          fetch("/api/public/supporters"),
          fetch("/api/public/keyfunders"),
        ]);

        const [partnersResult, certificationsResult] = await Promise.all([
          partnersResponse.json(),
          certificationsResponse.json(),
        ]);

        const partners: Partner[] =
          partnersResult.success && partnersResult.data?.length > 0
            ? partnersResult.data.map((p: any) => ({
                name: p.name,
                logo: p.logo,
                link: p.link,
              }))
            : defaultPartners;

        const certifications: Certification[] =
          certificationsResult.success && certificationsResult.data?.length > 0
            ? certificationsResult.data.map((c: any) => ({
                name: c.name,
                logo: c.logo,
                link: c.link,
              }))
            : defaultCertifications;

        setData({
          title: {
            en: "Our Medical Partners & Recognition",
            am: "የእኛ የሕክምና አጋሮች እና እውቅና",
          },
          partners,
          certifications,
        });
      } catch (error) {
        console.error("Error fetching partners/certifications data:", error);
        // Use defaults on error
        setData({
          title: {
            en: "Our Medical Partners & Recognition",
            am: "የእኛ የሕክምና አጋሮች እና እውቅና",
          },
          partners: defaultPartners,
          certifications: defaultCertifications,
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
    "Our Medical Partners & Recognition"
  );

  const allItems = [
    ...(data.partners || []),
    ...(data.certifications || []),
  ];

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
                    key={`row1-${i}`}
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
                    key={`row2-${i}`}
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

