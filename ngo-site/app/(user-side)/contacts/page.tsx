import React from "react";
import { MapSection } from "~/components/sections/MapSection";

export default function ContactUs() {
  return (
    <div className="bg-white w-full relative" data-model-id="932:10711">
      <section className="relative w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
        <MapSection />
      </section>

      <div className="fixed bottom-8 right-8 w-[89px] h-[87px] z-50">
        <img
          className="w-[70px] h-[70px] object-cover"
          alt="Whatsapp"
          src="https://c.animaapp.com/mgcmausvNL2kHo/img/whatsapp-1.png"
        />
      </div>
    </div>
  );
}