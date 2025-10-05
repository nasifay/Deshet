"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Button from "~/components/ui/Button";

export default function AboutSection() {
  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sample images - replace with your actual image paths
  const images = [
    "/images/about.jpg",
    "/images/empowerment.jpg", 
    "/images/hero.jpg",
    "/images/mission-1.jpg",
    "/images/mission-2.jpg"
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50); // Small delay to ensure smooth transition
      }, 500); // Half of transition duration for smoother fade
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);


  return (
    <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] flex flex-col items-center justify-center gap-2.5 px-[148px] py-[154px] relative w-full max-w-[1595px] mx-auto bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d]">
      <div className="inline-flex items-center gap-[72px] relative flex-[0_0_auto]">
        <div className="inline-flex flex-col items-start gap-[63px] relative flex-[0_0_auto]">
          <h2 className="relative self-stretch mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[90px] tracking-[0] leading-[90.9px]">
            ABOUT US
          </h2>

          <div className="relative w-[632px] [font-family:'Roboto',Helvetica] font-light text-transparent text-2xl text-justify leading-6">
            <span className="text-[#4f4f4f] tracking-[0] leading-[30px]">
              Tamra
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              {" "}
              for Social Development Organization (TSD) is an{" "}
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[30px]">
              Ethiopian
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              &nbsp;
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[30px]">
              NGO
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              {" "}
              legally registered{" "}
            </span>

            <span className="text-[#ff9700] tracking-[0] leading-[0.1px]">
              since 1998
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              .{" "}
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[30px]">
              Founded
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              {" "}
              as an{" "}
            </span>

            <span className="text-[#ff9700] tracking-[0] leading-[0.1px]">
              Anti-AIDS club
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              &nbsp;
            </span>

            <span className="text-[#ff9700] tracking-[0] leading-[0.1px]">
              in Shashemene
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              , it now operates across{" "}
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[30px]">
              Oromia, Sidama, South & Central Ethiopia
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              , and{" "}
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[30px]">
              Addis Ababa
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              .{" "}
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[30px]">
              TSD
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              {" "}
              works in youth empowerment, peacebuilding, SRH
            </span>

            <span className="text-[#ff9700] tracking-[0] leading-[0.1px]">
              &nbsp;
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              &
            </span>

            <span className="text-[#ff9700] tracking-[0] leading-[0.1px]">
              &nbsp;
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              gender equality, and climate justice & livelihoods.{" "}
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[30px]">
              With
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              &nbsp;
            </span>

            <span className="text-[#ff9700] tracking-[0] leading-[0.1px]">
              25+ years
            </span>

            <span className="text-[#4f4f4f] tracking-[0] leading-[0.1px]">
              {" "}
              of impact, we drive change through grassroots engagement,
              advocacy, and community-driven solutions.
            </span>
          </div>

          <Link href="/who-we-are">
            <Button className="h-auto w-[196px] bg-[#128341] hover:bg-[#0f6b35] rounded-[21px] shadow-[0px_4px_14.5px_#0000000d] px-[78px] py-5">
              <span className="[font-family:'Roboto',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[normal] whitespace-nowrap">
                Read More
              </span>
            </Button>
          </Link>
        </div>

        {/* Image Carousel Section */}
        <div className="w-[649px] h-[538px] relative overflow-hidden rounded-[46px]">
          {/* Main Image Container */}
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${
                  index === currentImageIndex 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-105'
                }`}
                style={{
                  backgroundImage: `url(${image})`,
                  transition: 'opacity 1s ease-in-out, transform 1s ease-in-out'
                }}
              />
            ))}
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 h-full rounded-[46px] bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.1)_48%,rgba(0,0,0,0.3)_100%)]" />
          </div>

        </div>
      </div>
    </section>
  );
}
