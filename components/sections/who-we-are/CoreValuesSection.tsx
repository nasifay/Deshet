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
    <section className="relative w-full flex justify-center mb-[87px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1400ms]">
      <Card className="w-full max-w-[1595px] bg-white rounded-[20px] md:rounded-[35px] lg:rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0">
        <CardContent className="flex flex-col items-center justify-center gap-6 md:gap-12 lg:gap-[82px] px-4 sm:px-6 md:px-12 lg:px-[85px] py-6 md:py-12 lg:py-[88px]">
          <h2 className="w-full max-w-[1369px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-4xl sm:text-5xl md:text-[56px] lg:text-[70px] tracking-[0] leading-tight md:leading-[56px] lg:leading-[70.7px]">
            CORE VALUES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-4 w-full max-w-[1376px]">
            {coreValues.map((value, index) => {
              const bgUrl = index === 0 ? "https://c.animaapp.com/mgclt9blEcJSeI/img/union.svg" : index === 4 ? "https://c.animaapp.com/mgclt9blEcJSeI/img/union-2.svg" : "https://c.animaapp.com/mgclt9blEcJSeI/img/union-1.svg";
              const roundedClass = index === 0 ? "sm:rounded-l-[23px]" : index === 4 ? "sm:rounded-r-[23px] lg:rounded-r-[23px]" : "";
              return (
                <div key={index} className={`flex flex-col items-center justify-between p-3 md:p-5 lg:p-4 bg-cover bg-center rounded-[15px] sm:rounded-none ${roundedClass} min-h-[350px] md:min-h-[500px] lg:min-h-[696px] cursor-pointer transition-all duration-300 hover:border-4 hover:border-[#FF9700] hover:border-opacity-50`} style={{ backgroundImage: `url(${bgUrl})` }}>
                  <div className="flex flex-col items-center justify-center flex-1">
                    <h3 className="[font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] text-lg sm:text-xl md:text-[22px] lg:text-[28px] text-center tracking-[0] leading-tight whitespace-pre-line mb-2 md:mb-3">
                      {value.title}
                    </h3>
                    <img
                      className={`${value.iconWidth} ${value.iconHeight} object-cover`}
                      alt={value.title}
                      src={value.icon}
                    />
                    <div className="flex flex-col items-center gap-3 md:gap-8 lg:gap-[54px] w-full px-2">
                      <p className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] text-sm sm:text-base md:text-[17px] lg:text-xl text-center tracking-[0] leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center pb-4">
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
