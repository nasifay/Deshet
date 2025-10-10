"use client";
import React from "react";
import Image from "next/image";

export default function ProgramsHero() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Title */}
      <div className="w-full text-center pt-10 pb-6 md:pt-14 md:pb-8">
        <h1 className="font-roboto font-black text-primary-green text-lg md:text-5xl lg:text-6xl xl:text-7xl  leading-[101%] tracking-[0] uppercase">
          PROGRAMS
        </h1>
      </div>

      {/* Image Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh]">
        {/* Background Image */}
        <Image
          src="/programs/hero.png"
          alt="Youth group empowerment program"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay Text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent py-6 md:py-8 lg:py-10 px-6 md:px-12 lg:px-20 z-10">
          <p className="font-roboto font-extrabold text-sm md:text-2xl   xl:text-3xl 2xl:text-4xl leading-2 md:leading-[126%] tracking-[0.8px] text-justify capitalize text-white mx-auto px-40 ">
            We equip young people with leadership, entrepreneurship, and life
            skills while promoting peacebuilding, dialogue, and mediation. Our
            programs nurture youth as proactive leaders and ambassadors of
            positive change in their communities.
          </p>
        </div>
      </div>
    </section>
  );
}
