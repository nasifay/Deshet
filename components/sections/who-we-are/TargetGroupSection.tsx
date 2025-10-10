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

export function TargetGroupSection({ targetGroups, headerImage }: TargetGroupSectionProps) {
  return (
    <section 
      className="relative w-full flex justify-center 
        mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-[87px]
        translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1800ms]
        px-4 xs:px-5 sm:px-6 md:px-8"
      aria-labelledby="target-group-heading"
    >
      {/* Main Card - Responsive border radius and shadows */}
      <Card className="w-full max-w-[1595px] bg-white 
        rounded-2xl sm:rounded-3xl lg:rounded-[46px]
        shadow-[0px_2px_15px_rgba(0,0,0,0.05)] sm:shadow-[0px_4px_26.5px_#0000000d] 
        border-0">
        
        {/* Content Container - Responsive padding and gaps */}
        <CardContent className="flex flex-col items-center justify-center 
          gap-8 xs:gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-[65px]
          p-5 xs:p-6 sm:p-8 md:p-10 lg:p-12 xl:p-[45px]">
          
          {/* Heading - Fluid typography with clamp() */}
          <h2 
            id="target-group-heading"
            className="w-full max-w-[1343px] 
              [text-shadow:0px_2px_2px_rgba(0,0,0,0.15)] sm:[text-shadow:0px_4px_4px_#00000040]
              [font-family:'Roboto',Helvetica] font-black text-[#128341] 
              tracking-[0] 
              text-center sm:text-left"
            style={{
              // Fluid typography: scales from 32px at 320px to 70px at 1440px
              fontSize: 'clamp(2rem, 1.1429rem + 4.2857vw, 4.375rem)',
              lineHeight: '1.01'
            }}
          >
            TARGET GROUP
          </h2>

          {/* Header Image Container - Responsive aspect ratio */}
          <div className="flex flex-col w-full max-w-[1369px] items-start 
            gap-2 sm:gap-2.5 
            p-1 sm:p-2 md:p-2.5">
            <img
              className="w-full 
                h-auto
                aspect-[16/9] xs:aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1] lg:aspect-[1369/413]
                object-cover 
                rounded-lg sm:rounded-xl md:rounded-2xl"
              alt="Young millennials representing target group"
              src={headerImage}
              loading="lazy"
            />
          </div>

          {/* Target Groups Grid - Responsive columns with CSS Grid */}
          <div className="w-full max-w-[1350px]">
            {/* 
              Responsive Grid Layout:
              - Mobile (320-639px): 1 column
              - Tablet (640-1023px): 1 column with larger spacing
              - Desktop (1024px+): 2 columns
            */}
            <div 
              className="grid 
                grid-cols-1 
                lg:grid-cols-2 
                gap-8 xs:gap-10 sm:gap-12 md:gap-14 lg:gap-20 xl:gap-28 2xl:gap-[169px]
                w-full"
            >
              {/* Left Column - First 3 items */}
              <div className="flex flex-col items-start 
                gap-6 xs:gap-7 sm:gap-8 md:gap-10 lg:gap-12">
                {targetGroups.slice(0, 3).map((group, index) => (
                  <div 
                    key={index} 
                    className="flex items-start 
                      gap-3 xs:gap-4 sm:gap-5 
                      w-full"
                  >
                    {/* Icon - Responsive sizing with max constraints */}
                    <div className="flex-shrink-0 
                      w-12 h-12 
                      xs:w-14 xs:h-14 
                      sm:w-16 sm:h-16 
                      md:w-20 md:h-20 
                      lg:w-24 lg:h-24
                      flex items-center justify-center">
                      <img
                        className="max-w-full max-h-full object-contain"
                        alt={`${group.title} icon`}
                      src={group.icon}
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Text Content - Fluid typography */}
                    <div className="flex-1 min-w-0">
                      <p 
                        className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] 
                          tracking-[0] 
                          break-words"
                        style={{
                          // Fluid typography: scales from 18px at 320px to 36px at 1440px
                          fontSize: 'clamp(1.125rem, 0.6964rem + 2.1429vw, 2.25rem)',
                          lineHeight: '1.6'
                        }}
                      >
                        {group.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Right Column - Remaining items */}
              <div className="flex flex-col items-start 
                gap-6 xs:gap-7 sm:gap-8 md:gap-10 lg:gap-12">
                {targetGroups.slice(3).map((group, index) => (
                  <div 
                    key={index} 
                    className="flex items-start 
                      gap-3 xs:gap-4 sm:gap-5 
                      w-full"
                  >
                    {/* Icon - Responsive sizing with max constraints */}
                    <div className="flex-shrink-0 
                      w-12 h-12 
                      xs:w-14 xs:h-14 
                      sm:w-16 sm:h-16 
                      md:w-20 md:h-20 
                      lg:w-24 lg:h-24
                      flex items-center justify-center">
                      <img
                        className="max-w-full max-h-full object-contain"
                        alt={`${group.title} icon`}
                      src={group.icon}
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Text Content - Fluid typography */}
                    <div className="flex-1 min-w-0">
                      <p 
                        className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] 
                          tracking-[0] 
                          break-words"
                        style={{
                          // Fluid typography: scales from 18px at 320px to 36px at 1440px
                          fontSize: 'clamp(1.125rem, 0.6964rem + 2.1429vw, 2.25rem)',
                          lineHeight: '1.6'
                        }}
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
