import React from "react";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/Card";

export default function AchievementsSection() {
  return (
    <div className="w-full bg-white py-16 px-36">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="uppercase font-roboto font-black text-[70px] leading-[1.01] tracking-[0px] uppercase text-[#268246] mb-6">
            SINCE 1998
          </h2>
          <p className="font-roboto font-light text-[24px] leading-[114%] tracking-[0px] text-justify capitalize text-[#646464] max-w-4xl">
            Empowering Young People Through Holistic Development In{" "}
            <span className="text-[#F09632]">Health</span>,{" "}
            <span className="text-[#F09632]">Education</span>,{" "}
            <span className="text-[#F09632]">Livelihoods</span>, And{" "}
            <span className="text-[#F09632]">Civic Engagement</span>.
          </p>
        </div>

        {/* Top Row Cards */}
        <div className="grid grid-cols-2 gap-24 mb-8">
          {/* Green Card */}

          <div className="group p-0  bg-[#268246] rounded-[33px] flex flex-col justify-center   w-[518px] h-[255px]  opacity-100 gap-[10px]  px-[38px] py-[90px] transition-all bg-[#206a39]">
            <div className="text-6xl font-black text-white mb-2 origin-top-left group-hover:scale-120 transition-all duration-300">
              120+
            </div>
            <div className="text-xl text-white">Recognitions & Awards</div>
          </div>

          {/* Dark Gray Card */}
          <div className=" bg-[#464646] group p-0  bg-[#268246] rounded-[33px] flex flex-col justify-center   w-[518px] h-[255px]  opacity-100 gap-[10px]  px-[38px] py-[90px] transition-all">
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
        <div className="grid grid-cols-3 gap-8">
          {/* White Card */}
          <div className="bg-white rounded-2xl p-8 h-64 flex flex-col justify-center border border-gray-100 group">
            <div className="text-6xl font-black text-white mb-2 group-hover:mb-4 origin-top-left group-hover:scale-120 transition-all duration-300">
              <span className="text-[#F09632]">28</span>{" "}
              <span className="text-[#268246]">YEARS</span>
            </div>
            <div className="text-xl text-[#646464]">Of Service</div>
          </div>

          {/* Image Card */}
          <Card className="rounded-2xl overflow-hidden h-64">
            <Image
              className="w-full h-full object-cover"
              alt="Youth engagement activity"
              src="/images/about/1.png"
              width={400}
              height={256}
            />
          </Card>

          {/* Light Orange Card */}
          <Card className="bg-[#FADCB4] rounded-2xl p-8 h-64 flex flex-col justify-center">
            <CardContent className="p-0">
              <div className="text-xl text-[#646464]">
                Active In <span className="font-bold text-[#F09632]">4</span>{" "}
                Regions & Addis Ababa
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
