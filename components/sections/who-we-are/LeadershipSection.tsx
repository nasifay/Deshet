"use client";

import React from "react";
import { Card, CardContent } from "~/components/ui/Card";

export interface LeadershipMember {
  name: string;
  title: string;
  image: string;
}

interface LeadershipSectionProps {
  leadershipTeam: LeadershipMember[];
}

export function LeadershipSection({ leadershipTeam }: LeadershipSectionProps) {
  return (
    <section className="relative w-full flex flex-col items-center gap-8 xs:gap-10 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-[87px] mb-12 xs:mb-14 sm:mb-16 md:mb-20 lg:mb-[87px] px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms]">
      {/* Responsive heading with fluid typography - preserves design aesthetic */}
      <h2 
        className="w-full max-w-[1349px] text-center [text-shadow:0px_2px_2px_#00000040] sm:[text-shadow:0px_3px_3px_#00000040] lg:[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] tracking-[0] leading-[1.01]"
        style={{ fontSize: 'clamp(1.75rem, 4vw + 1rem, 4.375rem)' }}
      >
        OUR LEADERSHIP
      </h2>

      {/* Responsive carousel container - adapts height based on card size */}
      <div className="relative w-full h-auto min-h-[500px] xs:min-h-[550px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] xl:h-[746px] overflow-hidden py-8 sm:py-10 md:py-12 lg:py-[50px]">
        <div className="flex items-start gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-[39px] animate-scroll-seamless [--duration:40s] hover:[animation-play-state:paused] will-change-transform">
          {/* First set of cards - responsive dimensions */}
          {leadershipTeam.map((member, index) => (
            <Card
              key={`first-${index}`}
              className="w-[280px] xs:w-[300px] sm:w-[320px] md:w-[350px] lg:w-[380px] xl:w-[424.02px] h-[450px] xs:h-[480px] sm:h-[520px] md:h-[560px] lg:h-[600px] xl:h-[646px] bg-[#b1efca] rounded-3xl sm:rounded-[36px] lg:rounded-[46px] flex-shrink-0 border-0 transition-all duration-500 ease-out hover:scale-105 sm:hover:scale-110 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] sm:hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:z-50 cursor-pointer"
            >
              <CardContent className="p-0 relative h-full">
                {/* Responsive image - maintains aspect ratio */}
                <img
                  className="w-full h-[68%] sm:h-[70%] lg:h-[76.6%] object-cover rounded-t-3xl sm:rounded-t-[36px] lg:rounded-t-[46px]"
                  alt={member.name}
                  src={member.image}
                />
                {/* Text container - positioned in the green background area below image */}
                <div className="absolute bottom-0 left-0 right-0 h-[32%] sm:h-[30%] lg:h-[23.4%] flex flex-col justify-center items-start px-4 sm:px-5 lg:px-6">
                  {/* Fluid typography for member name */}
                  <h3 
                    className="[text-shadow:0px_2px_2px_#00000040] sm:[text-shadow:0px_3px_3px_#00000040] lg:[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] tracking-[0] leading-[1.01] whitespace-pre-line w-full"
                    style={{ fontSize: 'clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)' }}
                  >
                    {member.name}
                  </h3>
                  {/* Fluid typography for member title */}
                  <p 
                    className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] tracking-[0] leading-[1.06] w-full mt-1 sm:mt-1.5 lg:mt-2"
                    style={{ fontSize: 'clamp(0.875rem, 1vw + 0.25rem, 1.25rem)' }}
                  >
                    {member.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          {/* Duplicate set for seamless loop - responsive dimensions */}
          {leadershipTeam.map((member, index) => (
            <Card
              key={`second-${index}`}
              className="w-[280px] xs:w-[300px] sm:w-[320px] md:w-[350px] lg:w-[380px] xl:w-[424.02px] h-[450px] xs:h-[480px] sm:h-[520px] md:h-[560px] lg:h-[600px] xl:h-[646px] bg-[#b1efca] rounded-3xl sm:rounded-[36px] lg:rounded-[46px] flex-shrink-0 border-0 transition-all duration-500 ease-out hover:scale-105 sm:hover:scale-110 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] sm:hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:z-50 cursor-pointer"
            >
              <CardContent className="p-0 relative h-full">
                {/* Responsive image - maintains aspect ratio */}
                <img
                  className="w-full h-[68%] sm:h-[70%] lg:h-[76.6%] object-cover rounded-t-3xl sm:rounded-t-[36px] lg:rounded-t-[46px]"
                  alt={member.name}
                  src={member.image}
                />
                {/* Text container - positioned in the green background area below image */}
                <div className="absolute bottom-0 left-0 right-0 h-[32%] sm:h-[30%] lg:h-[23.4%] flex flex-col justify-center items-start px-4 sm:px-5 lg:px-6">
                  {/* Fluid typography for member name */}
                  <h3 
                    className="[text-shadow:0px_2px_2px_#00000040] sm:[text-shadow:0px_3px_3px_#00000040] lg:[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] tracking-[0] leading-[1.01] whitespace-pre-line w-full"
                    style={{ fontSize: 'clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)' }}
                  >
                    {member.name}
                  </h3>
                  {/* Fluid typography for member title */}
                  <p 
                    className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] tracking-[0] leading-[1.06] w-full mt-1 sm:mt-1.5 lg:mt-2"
                    style={{ fontSize: 'clamp(0.875rem, 1vw + 0.25rem, 1.25rem)' }}
                  >
                    {member.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
