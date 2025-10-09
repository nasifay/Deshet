"use client";
import React from "react";
import Image from "next/image";

export default function NewsDetailsPage() {
  return (
    <div className="relative w-full bg-white min-h-screen overflow-hidden">
      <main className="relative flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 py-16 sm:py-20">
        {/* Title */}
        <h1 className="text-[26px] sm:text-[36px] md:text-[44px] font-black text-[#24A046] text-center uppercase tracking-[0.5px] mb-10 sm:mb-14">
          TSD NEW YEAR’S PROGRAM
        </h1>

        {/* Card Container */}
        <div className="w-full max-w-[900px] bg-white rounded-[24px] shadow-[0_4px_26px_rgba(0,0,0,0.05)] overflow-hidden border border-[#F2F2F2]">
          {/* Image */}
          <div className="w-full">
            <Image
              src="https://c.animaapp.com/mgcmausvNL2kHo/img/tsd-new-year.png"
              alt="TSD New Year’s Program"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Text Content */}
          <div className="px-6 sm:px-10 py-6 sm:py-8">
            <p className="text-[#333333] text-[15px] sm:text-[16px] leading-[1.8] font-normal mb-6">
              Tamra NGO joyfully celebrated the Ethiopian New Year together with
              community members, partners, and staff. The event highlighted our
              shared achievements over the past year and reaffirmed our
              commitment to empowering communities through education, health,
              and social development programs. As we step into the new year, we
              renew our vision of building a brighter future for all. The
              celebration was filled with cultural music, traditional dishes,
              and words of encouragement from beneficiaries whose lives have
              been transformed through our initiatives. It was also a moment of
              gratitude, as we thanked our supporters and stakeholders for
              standing with us. Looking forward, Tamra NGO aims to expand its
              impact, reaching more vulnerable communities and creating
              sustainable solutions for lasting change.
            </p>

            <p className="text-[#333333] text-[15px] sm:text-[16px] leading-[1.8] font-normal">
              Tamra NGO joyfully celebrated the Ethiopian New Year together with
              community members, partners, and staff. The event highlighted our
              shared achievements over the past year and reaffirmed our
              commitment to empowering communities through education, health,
              and social development programs. As we step into the new year, we
              renew our vision of building a brighter future for all. The
              celebration was filled with cultural music, traditional dishes,
              and words of encouragement from beneficiaries whose lives have
              been transformed through our initiatives. It was also a moment of
              gratitude, as we thanked our supporters and stakeholders for
              standing with us. Looking forward, Tamra NGO aims to expand its
              impact, reaching more vulnerable communities and creating
              sustainable solutions for lasting change.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
