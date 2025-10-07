"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Button from "~/components/ui/Button";

export default function AboutSection() {
  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/images/about/1.png",
    "/images/about/2.png",
    "/images/about/3.png",
    "/images/about/4.png",
    "/images/about/5.png",
  ];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <section className="relative w-full bg-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex items-center gap-16">
          <div className="flex-1 max-w-2xl">
            <h2 className="font-roboto font-black  text-7xl leading-[1.01] tracking-[0px] uppercase text-primary-green mb-12">
              ABOUT US
            </h2>

            <div className="font-roboto font-light text-2xl text-justify text-black leading-relaxed mb-12">
              Tamra for Social Development Organization (TSD) is an Ethiopian
              NGO legally registered{" "}
              <span className="text-[#ff9700] font-medium">since 1998</span>
              <span>. Founded as an </span>
              <span className="text-[#ff9700] font-medium">
                Anti-AIDS club in Shashemene
              </span>
              , it now operates across Oromia, Sidama, South & Central Ethiopia,
              and Addis Ababa. TSD works in youth empowerment, peacebuilding,
              SRH & gender equality, and climate justice & livelihoods. With{" "}
              <span className="text-[#ff9700] font-medium">25+ years</span>
              of impact, we drive change through grassroots engagement,
              advocacy, and community-driven solutions.
            </div>

            <Link
              href="/who-we-are"
              className="bg-primary-green text-white px-16 py-5 rounded-3xl font-roboto font-normal text-[24px] transition-colors duration-200"
            >
              Read More
            </Link>
          </div>

          {/* Right Column - Image Carousel */}
          <div className="flex-1 max-w-lg">
            <div className="relative w-full h-[500px] overflow-hidden">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
                    index === currentImageIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`TSD Community Impact ${index + 1}`}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover aspect-[649/538] rounded-3xl"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
