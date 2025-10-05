import React from "react";
import { MissionSection } from "~/components/sections/MissionSection";

export default function AboutUs() {
  return (
    <main className="relative">
      <section className="relative w-full py-[104px]">
        <img
          className="absolute top-[104px] left-[205px] w-[71px] h-[73px] object-cover translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]"
          alt="Asset"
          src="https://c.animaapp.com/mgclt9blEcJSeI/img/asset-2-1.png"
        />

        <h1 className="text-center [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[90px] tracking-[0] leading-[90.9px] whitespace-nowrap translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          ABOUT US
        </h1>
      </section>

      <MissionSection />

      <aside className="fixed top-[1212px] right-[30px] w-[87px] h-[87px] z-40">
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
          <img
            className="absolute h-[80.25%] top-[9.88%] left-[calc(50.00%_-_35px)] w-[70px] object-cover hover:scale-110 transition-transform"
            alt="Whatsapp"
            src="https://c.animaapp.com/mgclt9blEcJSeI/img/whatsapp-1.png"
          />
        </a>
      </aside>
    </main>
  );
}