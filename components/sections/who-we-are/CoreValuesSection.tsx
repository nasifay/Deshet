/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent } from "~/components/ui/Card";

export interface CoreValue {
  title: string;
  description: string;
  icon: string;
  iconWidth: string;
  iconHeight: string;
  separator: string;
  gap: string;
}

interface CoreValuesSectionProps {
  coreValues: CoreValue[];
}

export function CoreValuesSection({ coreValues }: CoreValuesSectionProps) {
  return (
    <section className="relative w-full flex justify-center mb-12 sm:mb-16 md:mb-20 lg:mb-[87px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1400ms]">
      {/* Adjusted margin-bottom for mobile/tablet */}
      <Card className="w-full max-w-[1595px] bg-white rounded-2xl sm:rounded-3xl md:rounded-[40px] lg:rounded-[46px] shadow-[0px_2px_13px_#0000000d] sm:shadow-[0px_4px_26.5px_#0000000d] border-0">
        <CardContent className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-[82px] px-4 sm:px-6 md:px-8 lg:px-[85px] py-6 sm:py-8 md:py-10 lg:py-[88px]">
          {/* Scaled heading for mobile/tablet */}
          <h2 className="w-full max-w-[1369px] [text-shadow:0px_2px_2px_#00000040] sm:[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-3xl sm:text-4xl md:text-5xl lg:text-[70px] tracking-[0] leading-tight">
            CORE VALUES
          </h2>

          {/* Adjusted grid to stack on mobile, 2 cols on tablet, 3 on md, 5 on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-4 w-full max-w-[1376px]">
            {coreValues.map((value, index) => {
              const bgUrl =
                index === 0
                  ? "https://c.animaapp.com/mgclt9blEcJSeI/img/union.svg"
                  : index === 4
                  ? "https://c.animaapp.com/mgclt9blEcJSeI/img/union-2.svg"
                  : "https://c.animaapp.com/mgclt9blEcJSeI/img/union-1.svg";
              const roundedClass =
                index === 0
                  ? "sm:rounded-l-[23px]"
                  : index === 4
                  ? "sm:rounded-r-[23px] lg:rounded-r-[23px]"
                  : "";
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 lg:p-4 bg-cover bg-center rounded-2xl sm:rounded-none ${roundedClass} min-h-[300px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[696px] cursor-pointer transition-all duration-300 hover:border-4 hover:border-[#FF9700] hover:border-opacity-50`}
                  style={{ backgroundImage: `url(${bgUrl})` }}
                >
                  <div className="flex flex-col items-center justify-center flex-1">
                    {/* Scaled text sizes */}
                    <h3 className="[font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] text-base sm:text-lg md:text-xl lg:text-[28px] text-center tracking-[0] leading-tight whitespace-pre-line mb-2 sm:mb-3 md:mb-4">
                      {value.title}
                    </h3>
                    <img
                      className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:${value.iconWidth} lg:${value.iconHeight} object-cover`}
                      alt={value.title}
                      src={value.icon}
                    />
                    <div className="flex flex-col items-center gap-2 sm:gap-4 md:gap-6 lg:gap-[54px] w-full px-2">
                      <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] text-xs sm:text-sm md:text-base lg:text-xl text-center tracking-[0] leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center pb-2 sm:pb-3 md:pb-4">
                    <img
                      alt="Separator"
                      src={value.separator}
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
