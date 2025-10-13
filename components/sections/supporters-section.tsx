"use client";
import React from "react";
import Image from "next/image";

interface SupportersSectionProps {
  supporters?: Array<{ name: string; logo: string }>;
}

export default function SupportersSection({
  supporters = [
    { name: "Norwegian Church Aid", logo: "/suporters/norweign-church.png" },
    { name: "Ipas", logo: "/suporters/ipas.png" },
    {
      name: "Sonke Gender Justice",
      logo: "/suporters/sonke-gender-justice.png",
    },
    { name: "Children Rights", logo: "/suporters/children-rights.png" },
    { name: "PEPFAR", logo: "/suporters/pepfar.png" },
    { name: "Youth Network", logo: "/suporters/youth-network.png" },
    { name: "GAC", logo: "/suporters/gac.png" },
    { name: "Build Up", logo: "/suporters/build-up.png" },
    { name: "USAID", logo: "/suporters/usaid.png" },
    { name: "Zeleman", logo: "/suporters/zeleman.png" },
    { name: "Supporter", logo: "/suporters/supporter-logo.png" },
    {
      name: "Search for Common Ground",
      logo: "/suporters/search-for-common-ground.png",
    },
    { name: "Supporter 2", logo: "/suporters/supporter-logo-2.png" },
  ],
}: SupportersSectionProps) {
  // Split supporters into two rows for marquee effect
  const midpoint = Math.ceil(supporters.length / 2);
  const supportersRow1 = supporters.slice(0, midpoint);
  const supportersRow2 = supporters.slice(midpoint);
  return (
    <section className="bg-white py-12 md:py-16 relative w-full overflow-hidden">
      <div className="mx-auto px-4">
        {/* Title */}
        <div className="flex items-center justify-center gap-2 mx-6 md:mx-20">
          <span className="font-roboto font-medium text-[16px] leading-[100%] tracking-[2px] text-nowrap text-[#00a878] uppercase">
            OUR SUPPORTERS
          </span>
          <div className="h-[1px] w-full bg-primary-orange" />
        </div>

        {/* Logo Rows */}
        <div className="mt-6 flex flex-col gap-6">
          {/* Row 1 - Marquee */}
          <div className="marquee-container">
            <div className="marquee-content-1">
              {[...supportersRow1, ...supportersRow1].map((supporter, i) => (
                <div
                  key={`row1-${i}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center w-[120px] md:w-[140px] lg:w-[160px] h-[60px] relative"
                >
                  <Image
                    src={supporter.logo}
                    alt={supporter.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Marquee */}
          <div className="marquee-container">
            <div className="marquee-content-2">
              {[...supportersRow2, ...supportersRow2].map((supporter, i) => (
                <div
                  key={`row2-${i}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center w-[100px] wxga:[120px] xl:w-[160px] h-[40px] lg:h-[60px] relative"
                >
                  <Image
                    src={supporter.logo}
                    alt={supporter.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
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
