import { ArrowUpCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import Button from "~/components/ui/Button";
import { Card, CardContent } from "~/components/ui/Card";

export default function HeroSection() {
  return (
    <div className="flex z-[2] w-full relative mt-[154px] flex-col items-center gap-[72px]">
      {/* Hero Section */}
      <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms] flex flex-col w-full max-w-[1595px] h-[1060px] items-start gap-[17px] pt-[453px] pb-[389px] px-0 rounded-[46px] relative">
        <img
          className="absolute top-[-22px] left-[-26px] w-[1648px] h-[1089px]"
          alt="Frame"
          src="https://c.animaapp.com/mfy7s1sw8fTu6i/img/frame-1.svg"
        />

        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] inline-flex flex-col items-start gap-[17px] px-[49px] py-0 relative flex-[0_0_auto] mb-[-67.00px]">
          <h1 className="relative w-fit mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-white text-[100px] tracking-[0] leading-[101px]">
            SERVING
            <br />
            ETHIOPIAN YOUTH
          </h1>

          <Button className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] h-auto w-[196px] bg-[#128341] hover:bg-[#0f6b35] rounded-[25px] shadow-[0px_4px_14.5px_#00000040] px-[78px] py-5">
            <span className="[font-family:'Roboto',Helvetica] font-normal text-white text-2xl tracking-[0] leading-[normal] whitespace-nowrap">
              Read More
            </span>
          </Button>
        </div>
      </section>
    </div>
  );
}