import React from "react";

interface TaglineSectionProps {
  tagline: string;
}

export function TaglineSection({ tagline }: TaglineSectionProps) {
  return (
    <section className="relative w-full flex justify-center mb-[65px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
      <div className="w-[1595px] h-[88px] bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000D] flex items-center justify-center py-[88px]">
        <p className="max-w-[993px] [font-family:'Roboto',Helvetica] font-normal text-[#FF9700] text-[32px] leading-[101%] tracking-[0] text-center">
          {tagline}
        </p>
      </div>
    </section>
  );
}
