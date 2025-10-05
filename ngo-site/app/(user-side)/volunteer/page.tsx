import React from "react";
import Button from "~/components/ui/Button";
import { VolunteerCallToActionSection } from "~/components/sections/VolunteerCallToActionSection";

export default function VolunteerPage() {
  return (
    <div className="bg-white w-full min-h-screen relative">
      <main className="relative">
        <section className="relative w-full flex flex-col items-center pt-[104px] pb-0">
          <div className="flex items-center justify-center gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <img
              className="w-[71px] h-[73px] object-cover"
              alt="Asset"
              src="https://c.animaapp.com/mgdc97zk62g2qg/img/asset-2-1.png"
            />

            <h1 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[90px] tracking-[0] leading-[90.9px] whitespace-nowrap">
              VOLUNTEER
            </h1>
          </div>
        </section>

        <section className="relative w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <VolunteerCallToActionSection />
        </section>
      </main>

      <div className="fixed bottom-8 right-8 w-[89px] h-[87px] z-50">
        <img
          className="w-[70px] h-[70px] object-cover"
          alt="Whatsapp"
          src="https://c.animaapp.com/mgdc97zk62g2qg/img/whatsapp-1.png"
        />
      </div>
    </div>
  );
}