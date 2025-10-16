"use client";

import React from "react";
import { Card, CardContent } from "~/components/ui/Card";

export interface LeadershipMember {
  name: string;
  position: string;
  photo: string;
  bio?: string;
  email?: string;
  phone?: string;
  order?: number;
}

interface LeadershipSectionProps {
  leadershipTeam: LeadershipMember[];
}

export function LeadershipSection({ leadershipTeam }: LeadershipSectionProps) {
  return (
    <section className="relative w-full flex flex-col items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 xl:gap-[87px] mb-8 sm:mb-12 md:mb-16 lg:mb-[87px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms] overflow-hidden">
      {/* Scaled heading with fluid typography */}
      <h2 className="w-full  primary-title text-primary-green mx-auto  px-6 sm:px-8 md:px-16 2xl:px-20">
        OUR LEADERSHIP
      </h2>

      {/* Adjusted container height responsively */}
      <div className="relative w-full max-w-full h-auto min-h-[220px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[420px] xl:h-[460px] overflow-hidden py-4 sm:py-6 md:py-8 lg:py-10 xl:py-[40px]">
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 lg:gap-6 animate-scroll-seamless [--duration:40s] hover:[animation-play-state:paused] will-change-transform">
          {/* Responsive card sizes */}
          {leadershipTeam.map((member, index) => (
            <Card
              key={`first-${index}`}
              className="w-[130px] sm:w-[170px] md:w-[210px] lg:w-[260px] h-[200px] sm:h-[280px] md:h-[340px] lg:h-[400px] bg-[#b1efca] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[32px] flex-shrink-0 border-0 transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:z-50 cursor-pointer"
            >
              <CardContent className="p-0 relative h-full">
                {member.photo ? (
                  <img
                    className="w-full h-[70%] sm:h-[75%] lg:h-[76.6%] object-cover rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl lg:rounded-t-[32px]"
                    alt={member.name}
                    src={member.photo}
                    onError={(e) => {
                      console.error("Image failed to load:", member.photo);
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-[70%] sm:h-[75%] lg:h-[76.6%] bg-gray-300 dark:bg-gray-600 rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl lg:rounded-t-[32px] flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-500 dark:text-gray-400">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-[30%] sm:h-[25%] lg:h-[23.4%] flex flex-col justify-center items-start px-2 sm:px-3 md:px-4 lg:px-5">
                  <h3 className="[text-shadow:0px_2px_2px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] tracking-[0] leading-[1.01] whitespace-pre-line w-full text-xs sm:text-sm md:text-base lg:text-lg">
                    {member.name}
                  </h3>
                  <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] tracking-[0] leading-[1.06] w-full mt-0.5 sm:mt-1 text-[10px] sm:text-xs md:text-sm lg:text-base">
                    {member.position}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
          {/* Duplicate for loop */}
          {leadershipTeam.map((member, index) => (
            <Card
              key={`second-${index}`}
              className="w-[130px] sm:w-[170px] md:w-[210px] lg:w-[260px] h-[200px] sm:h-[280px] md:h-[340px] lg:h-[400px] bg-[#b1efca] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[32px] flex-shrink-0 border-0 transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:z-50 cursor-pointer"
            >
              <CardContent className="p-0 relative h-full">
                {member.photo ? (
                  <img
                    className="w-full h-[70%] sm:h-[75%] lg:h-[76.6%] object-cover rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl lg:rounded-t-[32px]"
                    alt={member.name}
                    src={member.photo}
                    onError={(e) => {
                      console.error("Image failed to load:", member.photo);
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-[70%] sm:h-[75%] lg:h-[76.6%] bg-gray-300 dark:bg-gray-600 rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl lg:rounded-t-[32px] flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-500 dark:text-gray-400">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-[30%] sm:h-[25%] lg:h-[23.4%] flex flex-col justify-center items-start px-2 sm:px-3 md:px-4 lg:px-5">
                  <h3 className="[text-shadow:0px_2px_2px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] tracking-[0] leading-[1.01] whitespace-pre-line w-full text-sm sm:text-base md:text-lg lg:text-xl">
                    {member.name}
                  </h3>
                  <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] tracking-[0] leading-[1.06] w-full mt-0.5 sm:mt-1 text-[10px] sm:text-xs md:text-sm lg:text-base">
                    {member.position}
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
