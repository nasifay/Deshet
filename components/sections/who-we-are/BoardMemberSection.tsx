"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MemberCard } from "./MemberCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface BoardMember {
  name: string;
  position: string;
  photo: string;
  bio?: string;
  email?: string;
  phone?: string;
  order?: number;
  type?: "board_member" | "leadership" | "team_member";
}

interface BoardMemberSectionProps {
  boardMembers: BoardMember[];
}

export function BoardMemberSection({ boardMembers }: BoardMemberSectionProps) {
  if (!boardMembers || boardMembers.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full flex flex-col items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 xl:gap-[87px] mb-8 sm:mb-12 md:mb-16 lg:mb-[87px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms] overflow-hidden">
      {/* Scaled heading with fluid typography */}
      <h2 className="w-full primary-title text-primary-green mx-auto px-6 sm:px-8 md:px-16 2xl:px-20">
        BOARD MEMBERS
      </h2>

      {/* Swiper Container */}
      <div className="relative w-full max-w-7xl mx-auto py-6 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 ">
        <div className="pb-6 sm:pb-8 overflow-visible">
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
              nextEl: ".board-member-swiper-button-next",
              prevEl: ".board-member-swiper-button-prev",
            }}
            pagination={{
              clickable: true,
              el: ".board-member-swiper-pagination",
              bulletClass: "swiper-pagination-bullet",
              bulletActiveClass: "swiper-pagination-bullet-active",
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="w-full h-[400px] sm:h-[400px] md:h-[450px] lg:h-[500px]"
          >
            {boardMembers.map((member, index) => (
              <SwiperSlide key={index} className="h-auto">
                <MemberCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Glassmorphism style */}
          <button className="board-member-swiper-button-prev hidden sm:flex absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/18 items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronLeft
              className="w-6 h-6 text-white drop-shadow-lg"
              strokeWidth={3}
            />
          </button>
          <button className="board-member-swiper-button-next hidden sm:flex absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/18 items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed">
            <ChevronRight
              className="w-6 h-6 text-white drop-shadow-lg"
              strokeWidth={3}
            />
          </button>

          {/* Custom Pagination - Hidden on tablet and desktop */}
          <div className="board-member-swiper-pagination flex justify-center mt-6 space-x-2 sm:hidden"></div>
        </div>
      </div>
    </section>
  );
}
