"use client";

import React from "react";
import { Card, CardContent } from "~/components/ui/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface TeamMember {
  name: string;
  position: string;
  photo: string;
  bio?: string;
  email?: string;
  phone?: string;
  order?: number;
  type?: "leadership" | "team_member";
}

interface TeamMemberSectionProps {
  teamMember: TeamMember[];
}

export function TeamMemberSection({ teamMember }: TeamMemberSectionProps) {
  return (
    <section className="relative w-full flex flex-col items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 xl:gap-[87px] mb-8 sm:mb-12 md:mb-16 lg:mb-[87px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms] overflow-hidden">
      {/* Scaled heading with fluid typography */}
      <h2 className="w-full primary-title text-primary-green mx-auto px-6 sm:px-8 md:px-16 2xl:px-20">
        Team Members
      </h2>

      {/* Swiper Container */}
      <div className="relative w-full max-w-7xl mx-auto py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-12 sm:px-14 md:px-16">
        <div className="pb-8 overflow-visible">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            navigation={{
              nextEl: ".team-swiper-button-next",
              prevEl: ".team-swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".team-swiper-pagination",
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="w-full"
          >
            {teamMember.map((member, index) => (
              <SwiperSlide key={index}>
                <Card className="w-full h-[200px] sm:h-[280px] md:h-[340px] lg:h-[400px] bg-[#b1efca] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[32px] border-0 transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:z-50 cursor-pointer overflow-visible">
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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="team-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-primary-green hover:bg-primary-green/90 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeft
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              strokeWidth={3}
            />
          </button>
          <button className="team-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-primary-green hover:bg-primary-green/90 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronRight
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              strokeWidth={3}
            />
          </button>

          {/* Custom Pagination */}
          <div className="team-swiper-pagination flex justify-center mt-6 space-x-2"></div>
        </div>
      </div>
    </section>
  );
}
