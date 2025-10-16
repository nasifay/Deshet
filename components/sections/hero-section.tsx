"use client";
import { motion } from "framer-motion";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  leftImages?: string[];
  middleImages?: string[];
  rightImages?: string[];
  ctaText?: string;
  ctaLink?: string;
}

const Hero = ({
  title = "SERVING",
  subtitle = "ETHIOPIAN YOUTH",
  leftImages = [],
  middleImages = [],
  rightImages = [],
  ctaText = "Contact Us",
  ctaLink = "/contact-us",
}: HeroSectionProps) => {
  // State to track the current index for each section's image
  const [leftIndex, setLeftIndex] = useState(0);
  const [middleIndex, setMiddleIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);

  // --- TRANSITION LOGIC with DIFFERENT INTERVALS ---
  useEffect(() => {
    // Only set up intervals if arrays have images
    if (
      leftImages.length === 0 &&
      middleImages.length === 0 &&
      rightImages.length === 0
    ) {
      return;
    }

    // 1. Left Section: Slowest transition (5 seconds)
    const leftInterval =
      leftImages.length > 0
        ? setInterval(() => {
            setLeftIndex((prevIndex) => (prevIndex + 1) % leftImages.length);
          }, 5000)
        : null;

    // 2. Middle Section: Standard transition (4 seconds)
    const middleInterval =
      middleImages.length > 0
        ? setInterval(() => {
            setMiddleIndex(
              (prevIndex) => (prevIndex + 1) % middleImages.length
            );
          }, 4000)
        : null;

    // 3. Right Section: Medium transition (4.5 seconds)
    const rightInterval =
      rightImages.length > 0
        ? setInterval(() => {
            setRightIndex((prevIndex) => (prevIndex + 1) % rightImages.length);
          }, 4500)
        : null;

    // Cleanup: Clear all intervals when the component unmounts
    return () => {
      if (leftInterval) clearInterval(leftInterval);
      if (middleInterval) clearInterval(middleInterval);
      if (rightInterval) clearInterval(rightInterval);
    };
  }, [leftImages.length, middleImages.length, rightImages.length]);

  // Mapping of section layout to image array and current index
  const sectionData = [
    { layout: "left", images: leftImages, currentIndex: leftIndex },
    { layout: "middle", images: middleImages, currentIndex: middleIndex },
    { layout: "right", images: rightImages, currentIndex: rightIndex },
  ];

  return (
    <section className="relative w-full h-[40vh] md:h-[50vh] lg:h-[88vh] overflow-hidden">
      {/* Three-column image/background layout */}
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

      <div className="absolute inset-0 flex items-center p-8 md:p-16 lg:p-24">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white primary-title  uppercase drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]"
          >
            {title} <br />
            <span className=" text-nowrap block">{subtitle}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="mt-10"
          >
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center px-6 py-2 md:px-12 md:py-4 rounded-full bg-[#128341] hover:bg-[#0e6a32] transition-all duration-300 font-roboto font-medium text-sm md:text-lg text-white shadow-[0_6px_20px_-5px_rgba(18,131,65,0.4)] hover:shadow-[0_10px_25px_-5px_rgba(18,131,65,0.6)] backdrop-blur-sm"
            >
              {ctaText}
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
