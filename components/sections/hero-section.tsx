"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  landscapeImage?: string;
  leftImages?: string[];
  middleImages?: string[];
  rightImages?: string[];
  ctaText?: string;
  ctaLink?: string;
}

const Hero = () => {
  // State for data
  const [heroData, setHeroData] = useState<HeroSectionProps>({
    title: "SERVING",
    subtitle: "ETHIOPIAN YOUTH",
    landscapeImage: "",
    leftImages: [],
    middleImages: [],
    rightImages: [],
    ctaText: "Contact Us",
    ctaLink: "/contact-us",
  });
  const [loading, setLoading] = useState(true);
  const [showLandscape, setShowLandscape] = useState(true);

  // State to track the current index for each section's image
  const [leftIndex, setLeftIndex] = useState(0);
  const [middleIndex, setMiddleIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public/landing");
        const result = await response.json();

        if (result.success) {
          const section = result.data?.sections?.find(
            (s: any) => s.type === "HeroSection"
          );
          if (section?.data) {
            setHeroData({
              title: section.data.title || "SERVING",
              subtitle: section.data.subtitle || "ETHIOPIAN YOUTH",
              landscapeImage: section.data.landscapeImage || "",
              leftImages: section.data.leftImages || [],
              middleImages: section.data.middleImages || [],
              rightImages: section.data.rightImages || [],
              ctaText: section.data.ctaText || "Contact Us",
              ctaLink: section.data.ctaLink || "/contact-us",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- LANDSCAPE IMAGE DISPLAY LOGIC ---
  useEffect(() => {
    // If landscape image exists, show it initially for 5 seconds
    if (heroData.landscapeImage && !loading) {
      setShowLandscape(true);
      const landscapeTimer = setTimeout(() => {
        setShowLandscape(false);
      }, 5000); // Show landscape for 5 seconds initially

      return () => clearTimeout(landscapeTimer);
    } else {
      setShowLandscape(false);
    }
  }, [heroData.landscapeImage, loading]);

  // --- TRANSITION LOGIC with DIFFERENT INTERVALS ---
  useEffect(() => {
    // Only set up intervals if arrays have images and not showing landscape
    if (
      showLandscape ||
      (heroData.leftImages!.length === 0 &&
        heroData.middleImages!.length === 0 &&
        heroData.rightImages!.length === 0)
    ) {
      return;
    }

    let loopCount = 0;
    const totalImages = Math.max(
      heroData.leftImages!.length,
      heroData.middleImages!.length,
      heroData.rightImages!.length
    );

    // 1. Left Section: Slowest transition (5 seconds)
    const leftInterval =
      heroData.leftImages!.length > 0
        ? setInterval(() => {
            setLeftIndex((prevIndex) => {
              const newIndex = (prevIndex + 1) % heroData.leftImages!.length;
              if (newIndex === 0) loopCount++;

              // If we've looped through all images and landscape image exists, show it
              if (loopCount >= totalImages && heroData.landscapeImage) {
                setTimeout(() => setShowLandscape(true), 0);
                loopCount = 0;
              }

              return newIndex;
            });
          }, 5000)
        : null;

    // 2. Middle Section: Standard transition (4 seconds)
    const middleInterval =
      heroData.middleImages!.length > 0
        ? setInterval(() => {
            setMiddleIndex(
              (prevIndex) => (prevIndex + 1) % heroData.middleImages!.length
            );
          }, 4000)
        : null;

    // 3. Right Section: Medium transition (4.5 seconds)
    const rightInterval =
      heroData.rightImages!.length > 0
        ? setInterval(() => {
            setRightIndex(
              (prevIndex) => (prevIndex + 1) % heroData.rightImages!.length
            );
          }, 4500)
        : null;

    // Cleanup: Clear all intervals when the component unmounts
    return () => {
      if (leftInterval) clearInterval(leftInterval);
      if (middleInterval) clearInterval(middleInterval);
      if (rightInterval) clearInterval(rightInterval);
    };
  }, [
    heroData.leftImages,
    heroData.middleImages,
    heroData.rightImages,
    showLandscape,
    heroData.landscapeImage,
  ]);

  // Mapping of section layout to image array and current index
  const sectionData = [
    { layout: "left", images: heroData.leftImages!, currentIndex: leftIndex },
    {
      layout: "middle",
      images: heroData.middleImages!,
      currentIndex: middleIndex,
    },
    {
      layout: "right",
      images: heroData.rightImages!,
      currentIndex: rightIndex,
    },
  ];

  return (
    <section className="relative w-full h-[40vh] md:h-[50vh] lg:h-[88vh] overflow-hidden">
      {/* Conditionally render landscape image or three-column layout */}
      {showLandscape && heroData.landscapeImage ? (
        // Full-width landscape image
        <div className="relative w-full h-full">
          <Image
            src={heroData.landscapeImage}
            alt="Hero landscape image"
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="100vw"
            className="transition-opacity duration-1000 ease-in-out"
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ) : (
        // Three-column image/background layout
        <div className="flex w-full h-full">
          {sectionData.map((section, index) => {
            const currentImage = section.images[section.currentIndex];
            return (
              <div key={section.layout} className="relative w-1/3 h-full">
                {/* The Image component with the current, transitioning image */}
                {currentImage && (
                  <Image
                    src={currentImage}
                    alt={`Ethiopian youth in a dynamic setting - ${section.layout} section`}
                    fill
                    style={{ objectFit: "cover" }}
                    priority={index === 0}
                    sizes="(max-width: 768px) 33vw, 33vw"
                    className="transition-opacity duration-1000 ease-in-out" // Fade transition: 1s duration
                  />
                )}
                {/* Overlay to create the distinct color blocks. */}
                <div
                  className={`absolute inset-0
                    ${
                      section.layout === "middle"
                        ? "bg-[#f1a840] opacity-[0.7]" // Gold/Orange
                        : "bg-[#1f532a] opacity-[0.7]" // Dark Green
                    }
                  `}
                ></div>
              </div>
            );
          })}
        </div>
      )}

      {/* Content overlay - always visible */}
      <div className="absolute inset-0 flex items-center p-8 md:p-16 lg:p-24">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white primary-title  uppercase drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]"
          >
            {heroData.title} <br />
            <span className=" text-nowrap block">{heroData.subtitle}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="mt-10"
          >
            <Link
              href={heroData.ctaLink || "/contact-us"}
              className="inline-flex items-center justify-center px-6 py-2 md:px-12 md:py-4 rounded-full bg-[#128341] hover:bg-[#0e6a32] transition-all duration-300 font-roboto font-medium text-sm md:text-lg text-white shadow-[0_6px_20px_-5px_rgba(18,131,65,0.4)] hover:shadow-[0_10px_25px_-5px_rgba(18,131,65,0.6)] backdrop-blur-sm"
            >
              {heroData.ctaText}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

// interface HeroSectionProps {
//   title?: string;
//   subtitle?: string;
//   backgroundImage?: string;
//   ctaText?: string;
//   ctaLink?: string;
// }

// export default function Hero({
//   title = "SERVING",
//   subtitle = "ETHIOPIAN YOUTH",
//   backgroundImage = "/home-hero.png",
//   ctaText = "Contact Us",
//   ctaLink = "/contact-us",
// }: HeroSectionProps) {
//   return (
//     <section className="relative w-full h-auto lg:h-[90vh] flex items-center justify-start overflow-hidden bg-neutral-900">
//       {/* Background Image */}
//       <Image
//         src={backgroundImage}
//         alt="Serving Ethiopian Youth"
//         fill
//         priority
//         className="object-cover brightness-[0.8] scale-105 animate-slowZoom"
//       />

//       {/* Content */}
//       <div className="relative z-10 max-sm:py-20 px-6 md:px-16 lg:px-24 max-w-2xl text-white">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="font-roboto font-black text-lg sm:text-2xl md:text-4xl  lg:text-5xl 2xl:text-7xl leading-[1.05] tracking-tight uppercase drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]"
//         >
//           {title} <br />
//           <span className="text-[#18c76f] text-nowrap block">{subtitle}</span>
//         </motion.h1>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1.2, delay: 0.7 }}
//           className="mt-10"
//         >
//           <Link
//             href={ctaLink}
//             className="inline-flex items-center justify-center px-6 py-2 md:px-12 md:py-4 rounded-full bg-[#128341] hover:bg-[#0e6a32] transition-all duration-300 font-roboto font-medium text-sm md:text-lg text-white shadow-[0_6px_20px_-5px_rgba(18,131,65,0.4)] hover:shadow-[0_10px_25px_-5px_rgba(18,131,65,0.6)] backdrop-blur-sm"
//           >
//             {ctaText}
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
