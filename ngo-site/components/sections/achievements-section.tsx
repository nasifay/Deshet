import React from "react";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/Card";

export default function AchievementsSection() {
  return (
    <div className="w-full bg-white py-16 px-6 md:px-20 wxga:px-50 xl:60 2xl:px-80">
      <div className=" mx-auto">
        {/* Header Section */}
        <div className="mb-4 md:mb-16">
          <h2 className="font-roboto text-primary-green text-5xl md:text-4xl wxga:text-7xl font-black uppercase mb-6 tracking-tight">
            {" "}
            SINCE 1998
          </h2>
          <p className="font-robot font-light text-[#444] text-sm md:text-lg lg:text-2xl leading-[20px] mb-2  md:mb-8 max-w-4xl text-justify">
            {" "}
            Empowering Young People Through Holistic Development In{" "}
            <span className="text-[#F09632]">Health</span>,{" "}
            <span className="text-[#F09632]">Education</span>,{" "}
            <span className="text-[#F09632]">Livelihoods</span>, And{" "}
            <span className="text-[#F09632]">Civic Engagement</span>.
          </p>
        </div>

        {/* Top Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 wxga:gap-24 mb-2 md:mb-8">
          {/* Green Card */}

          <div className="group p-0 rounded-2xl  md:rounded-4xl flex flex-col justify-center  w-auto md:w-[518px] md:h-[255px]  opacity-100 gap-[10px]  py-4 px-6 md:px-[38px] md:py-[90px] transition-all bg-primary-green">
            <div className="text-6xl font-black text-white mb-2 origin-top-left group-hover:scale-120 transition-all duration-300">
              120+
            </div>
            <div className="text-xl text-white">Recognitions & Awards</div>
          </div>

          {/* Dark Gray Card */}
          <div className="bg-primary-green group p-0   rounded-2xl  md:rounded-4xl flex flex-col justify-center w-auto   wxga:w-[518px] md:h-[255px]  opacity-100 gap-[10px] py-4 px-6 md:px-[38px] md:py-[90px] transition-all">
            <div className="text-6xl font-black text-white mb-2 origin-top-left group-hover:scale-120 transition-all duration-300">
              <span className="text-[#F09632]">11+</span>{" "}
              <span className="text-[#268246]">YEARS</span>
            </div>
            <div className="text-xl text-white">
              Youth Radio &ldquo;Zemene Hallio&rdquo;
            </div>
          </div>
        </div>

        {/* Bottom Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* White Card */}
          <div className="bg-white rounded-2xl p-8 h-64 flex flex-col justify-center border border-gray-100 group">
            <div className="text-6xl font-black text-white mb-2 group-hover:mb-4 origin-top-left group-hover:scale-120 transition-all duration-300">
              <span className="text-[#F09632]">28</span>{" "}
              <span className="text-[#268246]">YEARS</span>
            </div>
            <div className="text-xl text-[#646464]">Of Service</div>
          </div>

          {/* Image Card */}
          <Card className="rounded-2xl overflow-hidden h-64 group">
            <Image
              className="w-full h-full object-cover scale-110 group-hover:scale-100"
              alt="Youth engagement activity"
              src="/images/about/1.png"
              width={400}
              height={256}
            />
          </Card>

          {/* Light Orange Card */}
          <Card className="bg-[#FADCB4] rounded-2xl p-8 h-64 flex flex-col justify-center group">
            <CardContent className="p-0">
              <div className="text-xl text-[#646464]">
                Active In{" "}
                <span className="font-bold text-[#F09632] group-hover:scale-110">
                  4
                </span>{" "}
                Regions & Addis Ababa
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
