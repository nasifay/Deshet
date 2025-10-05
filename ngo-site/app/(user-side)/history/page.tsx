import React from "react";
import { HistorySection } from "~/components/sections/HistorySection";
import { MilestonesSection } from "~/components/sections/MilestonesSection";
import { TodaySection } from "~/components/sections/TodaySection";

export default function History() {
  return (
    <div
      className="bg-white w-full relative flex flex-col overflow-x-hidden"
      data-model-id="932:11162"
    >
      <section className="relative w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        <HistorySection />
      </section>

      <header className="relative w-full flex items-center justify-center py-12 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <img
          className="absolute left-[205px] w-[71px] h-[73px] object-cover"
          alt="Asset"
          src="https://c.animaapp.com/mgcmuny5RiWnl8/img/asset-2-1.png"
        />
        <h1 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[90px] tracking-[0] leading-[90.9px] whitespace-nowrap">
          HISTORY
        </h1>
      </header>

      <section className="relative w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <TodaySection />
        <div className="absolute top-8 right-[117px] w-[87px] h-[87px]">
          <img
            className="absolute h-[80.25%] top-[9.88%] left-[calc(50.00%_-_34px)] w-[70px] object-cover"
            alt="Whatsapp"
            src="https://c.animaapp.com/mgcmuny5RiWnl8/img/whatsapp-1.png"
          />
        </div>
      </section>

      <section className="relative w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        <MilestonesSection />
      </section>
    </div>
  );
}