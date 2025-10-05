import React from "react";
import { ImageGallerySection } from "~/components/sections/ImageGallerySection";

export default function Gallery() {
  return (
    <main className="relative">
      <section className="relative w-full flex flex-col items-center pt-[104px] pb-0">
        <div className="flex items-center justify-center gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <img
            className="w-[71px] h-[73px] object-cover"
            alt="Asset"
            src="https://c.animaapp.com/mgda0b0iChwFy2/img/asset-2-1.png"
          />

          <h1 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[90px] tracking-[0] leading-[90.9px] whitespace-nowrap">
            GALLERY
          </h1>
        </div>
      </section>

      <section className="relative w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        <ImageGallerySection />
      </section>

      <aside className="fixed bottom-8 right-8 z-40">
        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-[87px] h-[87px] transition-transform hover:scale-110"
        >
          <img
            className="w-[70px] h-[70px] object-cover mx-auto my-auto"
            alt="WhatsApp"
            src="https://c.animaapp.com/mgda0b0iChwFy2/img/whatsapp-1.png"
          />
        </a>
      </aside>
    </main>
  );
}