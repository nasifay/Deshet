"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/about/1.png",
    "/images/about/2.png",
    "/images/about/3.png",
    "/images/about/4.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full bg-white py-20 px-6 md:px-12 lg:px-24 font-['Roboto']">
      <div className="w-full flex flex-col wxga:flex-row items-center justify-center gap-12 wxga:gap-[118px]">
        {/* Left Column */}
        <div>
          <h2 className="font-roboto text-primary-green text-5xl md:text-4xl wxga:text-7xl font-black uppercase mb-6 tracking-tight">
            ABOUT US
          </h2>

          <p className="font-robot font-light text-[#444] text-sm md:text-lg lg:text-2xl  mb-8 max-w-[620px] text-justify tracking-normal leading-4 md:leading-7">
            Tamra for social development organization (tsd) is an Ethiopian NGO
            legally registered{" "}
            <span className="text-[#FF9700] font-medium">since 1998</span>.
            Founded as an{" "}
            <span className="text-[#FF9700] font-medium">
              anti-aids club in shashemene
            </span>
            , it now operates across Oromia, Sidama, South & Central Ethiopia,
            and Addis Ababa. TSD works in youth empowerment, peacebuilding, SRH
            & gender equality, and climate justice & livelihoods. With{" "}
            <span className="text-[#FF9700] font-medium">25+ years</span> of
            impact, we drive change through grassroots engagement, advocacy, and
            community-driven solutions.
          </p>

          <Link
            href="/who-we-are"
            className="inline-block bg-primary-green text-white text-sm md:text-lg lg:text-2xl font-medium px-10 2xl:px-14 py-2 2xl:py-4 rounded-full  transition-all duration-300"
          >
            Read More
          </Link>
        </div>

        {/* Right Column — Fade Carousel */}
        <div className="flex justify-center relative w-full wxga:w-auto">
          <div className="relative w-full wxga:w-[520px] h-[330px] md:h-[380px] lg:h-[400px] rounded-2xl overflow-hidden shadow-sm">
            {images.map((src, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  i === currentIndex ? "opacity-100" : "opacity-0"
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
