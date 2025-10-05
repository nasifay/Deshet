import React from "react";
import { NewsEventsSection } from "~/components/sections/NewsEventsSection";
import { MainContentSection } from "~/components/sections/MainContentSection";

export default function NewsAndEvents() {
  return (
    <div
      className="bg-white w-full min-h-screen relative"
      data-model-id="932:10307"
    >
      <main className="relative">
        <div className="flex items-center justify-center gap-8 px-4 py-12 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <img
            className="w-[71px] h-[73px] object-cover"
            alt="Asset"
            src="https://c.animaapp.com/mg8i4bgw8CQdb4/img/asset-2-1.png"
          />

          <h1 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[90px] tracking-[0] leading-[90.9px] whitespace-nowrap">
            NEWS AND EVENTS
          </h1>
        </div>

        <div className="flex justify-center px-4 mb-12 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <div className="flex flex-col w-full max-w-[1595px] h-[104px] items-center justify-center gap-[65px] px-0 py-[88px] bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d]">
            <div className="relative w-full max-w-[905px] mt-[-69.00px] mb-[-67.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-[#ff9700] text-[32px] text-center tracking-[0] leading-[32.3px]">
              Stay informed with our latest stories, milestones, and community
              events.
            </div>
          </div>
        </div>

        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <NewsEventsSection />
        </div>

        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
          <MainContentSection />
        </div>
      </main>

      <div className="fixed bottom-8 right-8 w-[87px] h-[87px] z-50">
        <img
          className="h-[80.25%] w-[70px] object-cover mx-auto mt-2"
          alt="Whatsapp"
          src="https://c.animaapp.com/mg8i4bgw8CQdb4/img/whatsapp-1.png"
        />
      </div>
    </div>
  );
}