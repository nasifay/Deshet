import React from "react";

interface Logo {
  src: string;
  alt: string;
  width: string;
  height: string;
}

interface SupportersSectionProps {
  title: string;
  logos: Logo[];
}

export default function SupportersSection({ title, logos }: SupportersSectionProps) {
  return (
    <div
      className="relative"
      style={{
        width: '1887px',
        height: '168px',
        gap: '70px',
        transform: 'rotate(0deg)',
        opacity: 1
      }}
    >
      <div className="flex flex-col gap-[72px]">
        <div className="flex gap-6 items-center px-[72px]">
          <div className="w-[162px] [font-family:'Roboto',Helvetica] font-medium text-[#128341] text-base tracking-[2.00px] leading-[normal] whitespace-nowrap">
            {title}
          </div>
          <img
            className="flex-1 h-px object-cover"
            alt="Line"
            src="https://c.animaapp.com/mgdrgf40cGS3Zf/img/line.svg"
          />
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[40px]">
            {/* Top row: right to left */}
            <div className="relative w-full h-auto overflow-hidden">
              <div
                className="flex items-center gap-[127px] sm:gap-[64px] lg:gap-[127px] animate-marquee"
                style={{ "--duration": "30s" } as React.CSSProperties}
              >
                {[...logos, ...logos].map((logo, index) => (
                  <img
                    key={`top-${index}`}
                    className={`${logo.width} ${logo.height} ${logo.width === "w-[264px]" ? "object-cover" : ""}`}
                    alt={logo.alt}
                    src={logo.src}
                  />
                ))}
              </div>
            </div>
            {/* Bottom row: left to right */}
            <div className="relative w-full h-auto overflow-hidden">
              <div
                className="flex items-center gap-[127px] sm:gap-[64px] lg:gap-[127px] animate-marquee"
                style={{
                  animationDirection: 'reverse',
                  "--duration": "30s"
                } as React.CSSProperties}
              >
                {[...logos, ...logos].map((logo, index) => (
                  <img
                    key={`bottom-${index}`}
                    className={`${logo.width} ${logo.height} ${logo.width === "w-[264px]" ? "object-cover" : ""}`}
                    alt={logo.alt}
                    src={logo.src}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}