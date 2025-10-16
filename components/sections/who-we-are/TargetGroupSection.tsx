import React from "react";
import { Card, CardContent } from "~/components/ui/Card";

export interface TargetGroup {
  icon: string;
  title: string;
  iconWidth: string;
  iconHeight: string;
}

interface TargetGroupSectionProps {
  targetGroups: TargetGroup[];
  headerImage: string;
}

export function TargetGroupSection({
  targetGroups,
  headerImage,
}: TargetGroupSectionProps) {
  return (
    <section
      className="relative w-full flex justify-center 
        mb-8 sm:mb-12 md:mb-16 lg:mb-[87px]
        translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1800ms]
        px-4 sm:px-6 md:px-8"
      aria-labelledby="target-group-heading"
    >
      {/* Adjusted margin-bottom and padding for mobile/tablet */}
      <Card
        className="w-full max-w-[1595px] bg-white 
        rounded-2xl sm:rounded-3xl lg:rounded-[46px]
        shadow-[0px_2px_13px_rgba(0,0,0,0.05)] sm:shadow-[0px_4px_26.5px_#0000000d] 
        border-0"
      >
        <CardContent
          className="flex flex-col items-center justify-center 
          gap-6 sm:gap-8 md:gap-10 lg:gap-[65px]
          p-4 sm:p-6 md:p-8 lg:p-[45px]"
        >
          {/* Scaled heading */}
          <h2
            id="target-group-heading"
            className="w-full primary-title text-primary-green    "
          >
            TARGET GROUP
          </h2>

          {/* Header Image - Responsive aspect ratio */}
          <div
            className="flex flex-col w-full max-w-[1369px] items-start 
            gap-2 sm:gap-4 md:gap-6"
          >
            <img
              className="w-full 
                h-auto
                aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] lg:aspect-[1369/413]
                object-cover 
                rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl"
              alt="Young millennials representing target group"
              src={headerImage}
              loading="lazy"
            />
          </div>

          {/* Target Groups Grid - 1 col mobile, 2 cols tablet+ */}
          <div className="w-full max-w-[1350px]">
            <div
              className="grid 
                grid-cols-1 
                sm:grid-cols-2 
                gap-6 sm:gap-8 md:gap-12 lg:gap-[169px]
                w-full"
            >
              {/* Left Column */}
              <div
                className="flex flex-col items-start 
                gap-4 sm:gap-6 md:gap-8 lg:gap-12"
              >
                {targetGroups.slice(0, 3).map((group, index) => (
                  <div
                    key={index}
                    className="flex items-start 
                      gap-3 sm:gap-4 md:gap-5 
                      w-full"
                  >
                    <div
                      className="flex-shrink-0 
                      w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                      flex items-center justify-center"
                    >
                      <img
                        className="max-w-full max-h-full object-contain"
                        alt={`${group.title} icon`}
                        src={group.icon}
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] 
                          tracking-[0] 
                          break-words text-base sm:text-lg md:text-xl lg:text-3xl
                          leading-relaxed"
                      >
                        {group.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div
                className="flex flex-col items-start 
                gap-4 sm:gap-6 md:gap-8 lg:gap-12"
              >
                {targetGroups.slice(3).map((group, index) => (
                  <div
                    key={index}
                    className="flex items-start 
                      gap-3 sm:gap-4 md:gap-5 
                      w-full"
                  >
                    <div
                      className="flex-shrink-0 
                      w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                      flex items-center justify-center"
                    >
                      <img
                        className="max-w-full max-h-full object-contain"
                        alt={`${group.title} icon`}
                        src={group.icon}
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] 
                          tracking-[0] 
                          break-words text-base sm:text-lg md:text-xl lg:text-3xl
                          leading-relaxed"
                      >
                        {group.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
