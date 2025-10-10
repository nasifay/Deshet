/* eslint-disable @next/next/no-img-element */
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
    <section className="relative w-full flex flex-col items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 xl:gap-[87px] mb-8 sm:mb-12 md:mb-16 lg:mb-[87px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms] overflow-hidden">
      {/* Scaled heading with fluid typography */}
      <h2 className="w-full max-w-[1349px] text-center [text-shadow:0px_2px_2px_#00000040] sm:[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] tracking-[0] leading-[1.01] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[70px]">
        OUR LEADERSHIP
      </h2>

      {/* Adjusted container height responsively */}
      <div className="relative w-full max-w-full h-auto min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[700px] xl:h-[746px] overflow-hidden py-4 sm:py-6 md:py-8 lg:py-10 xl:py-[50px]">
        <div className="flex items-start gap-3 sm:gap-4 md:gap-6 lg:gap-[39px] animate-scroll-seamless [--duration:40s] hover:[animation-play-state:paused] will-change-transform">
          {/* Responsive card sizes */}
          {leadershipTeam.map((member, index) => (
            <Card
              key={`first-${index}`}
              className="w-[200px] sm:w-[280px] md:w-[340px] lg:w-[424.02px] h-[320px] sm:h-[450px] md:h-[550px] lg:h-[646px] bg-[#b1efca] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[46px] flex-shrink-0 border-0 transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:z-50 cursor-pointer"
            >
              <CardContent className="p-0 relative h-full">
                <img
                  className="w-full h-[70%] sm:h-[75%] lg:h-[76.6%] object-cover rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl lg:rounded-t-[46px]"
                  alt={member.name}
                  src={member.image}
                />
                <div className="absolute bottom-0 left-0 right-0 h-[30%] sm:h-[25%] lg:h-[23.4%] flex flex-col justify-center items-start px-3 sm:px-4 md:px-5 lg:px-6">
                  <h3 className="[text-shadow:0px_2px_2px_#00000040] sm:[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] tracking-[0] leading-[1.01] whitespace-pre-line w-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px]">
                    {member.name}
                  </h3>
                  <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] tracking-[0] leading-[1.06] w-full mt-0.5 sm:mt-1 md:mt-1.5 lg:mt-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px]">
                    {member.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          {/* Duplicate for loop */}
          {leadershipTeam.map((member, index) => (
            <Card
              key={`second-${index}`}
              className="w-[200px] sm:w-[280px] md:w-[340px] lg:w-[424.02px] h-[320px] sm:h-[450px] md:h-[550px] lg:h-[646px] bg-[#b1efca] rounded-xl sm:rounded-2xl md:rounded-3xl lg:rounded-[46px] flex-shrink-0 border-0 transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:z-50 cursor-pointer"
            >
              <CardContent className="p-0 relative h-full">
                <img
                  className="w-full h-[70%] sm:h-[75%] lg:h-[76.6%] object-cover rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl lg:rounded-t-[46px]"
                  alt={member.name}
                  src={member.image}
                />
                <div className="absolute bottom-0 left-0 right-0 h-[30%] sm:h-[25%] lg:h-[23.4%] flex flex-col justify-center items-start px-3 sm:px-4 md:px-5 lg:px-6">
                  <h3 className="[text-shadow:0px_2px_2px_#00000040] sm:[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] tracking-[0] leading-[1.01] whitespace-pre-line w-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px]">
                    {member.name}
                  </h3>
                  <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] tracking-[0] leading-[1.06] w-full mt-0.5 sm:mt-1 md:mt-1.5 lg:mt-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-[20px]">
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
