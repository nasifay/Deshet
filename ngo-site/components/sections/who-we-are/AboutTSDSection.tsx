import React from "react";

interface AboutTSDSectionProps {
  description: string;
  backImageSrc: string;
  frontImageSrc: string;
}

/**
 * AboutTSDSection Component
 * 
 * Displays descriptive text about TSD with decorative images.
 * 
 * Responsive Strategy:
 * - Mobile: Single-column layout with text stacked above images
 * - Tablet: Two-column layout begins at md (768px)
 * - Desktop: Text on left, images on right with overlapping effect
 * - Fluid typography scales from 16px to 24px
 * - Container adapts from edge-to-edge to max-width with proper padding
 * - Images stack vertically on mobile, overlap decoratively on desktop
 */
export function AboutTSDSection({ description, backImageSrc, frontImageSrc }: AboutTSDSectionProps) {
  return (
    <section 
      className="
        relative w-full 
        flex justify-center
        translate-y-[-1rem] 
        animate-fade-in 
        opacity-0 
        [--animation-delay:1000ms]
        
        /* Responsive bottom margin */
        mb-8
        sm:mb-12
        md:mb-16
        lg:mb-20
        xl:mb-[87px]
      "
    >
      <div 
        className="
          relative 
          w-full
          bg-[#128341]
          dark:bg-[#0f6b34]
          overflow-hidden
          
          /* Container max-width for ultra-wide screens */
          max-w-[1891px]
          
          /* Responsive padding */
          px-4 py-8
          sm:px-6 sm:py-12
          md:px-8 md:py-16
          lg:px-12 lg:py-20
          xl:px-16 xl:py-24
          2xl:px-[148px] 2xl:py-[130px]
        "
      >
        {/* Pattern Background */}
        <div 
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'url("/images/backgroun pattern.png")',
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto',
          }}
          role="presentation"
          aria-hidden="true"
        />
        
        {/* Content Grid: Single column (mobile) → Two columns (desktop) */}
        <div 
          className="
            relative z-10
            grid
            grid-cols-1
            lg:grid-cols-[1fr_auto]
            gap-8
            sm:gap-10
            md:gap-12
            lg:gap-16
            xl:gap-20
            2xl:gap-[245px]
            items-center
          "
        >
        {/* Text Content */}
          <div className="w-full">
            <p 
              className="
                font-normal 
                text-white
                dark:text-gray-50
                leading-[1.45]
                tracking-wide
                text-justify
                
                /* Prevent orphans and improve readability */
                hyphens-auto
                break-words
              "
              style={{
                // Fluid typography: 16px (mobile) → 18px (tablet) → 24px (desktop)
                fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.5rem)',
                letterSpacing: '0.02em',
              }}
            >
            {description}
          </p>
        </div>

          {/* Images Container - Stacked on mobile, overlapping on desktop */}
          <div 
            className="
              relative
              w-full
              flex
              justify-center
              lg:justify-end
              
              /* Height adjusts based on screen size */
              min-h-[280px]
              sm:min-h-[320px]
              md:min-h-[360px]
              lg:min-h-[377px]
            "
          >
            {/* Images Wrapper - Creates overlapping effect */}
            <div className="relative w-full max-w-[400px] lg:max-w-none lg:w-[420px] xl:w-[460px] 2xl:w-[500px]">
              
              {/* Back Image - Positioned behind */}
              <img
                className="
                  absolute
                  rounded-lg
                  sm:rounded-xl
                  lg:rounded-[26px]
                  object-cover
                  shadow-lg
                  
                  /* Responsive sizing */
                  w-[70%]
                  sm:w-[65%]
                  md:w-[280px]
                  lg:w-[300px]
                  xl:w-[340px]
                  2xl:w-[354px]
                  
                  /* Maintain aspect ratio */
                  aspect-[354/377]
                  
                  /* Position: Top-left on mobile, adjusted on desktop */
                  top-0
                  left-0
                  sm:left-[5%]
                  lg:left-[15%]
                  xl:left-[18%]
                  2xl:left-[22%]
                  
                  /* Slight rotation for visual interest */
                  -rotate-2
                  lg:-rotate-3
                "
            style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.36)',
            }}
                alt="TSD Team Meeting"
            src={backImageSrc}
                loading="lazy"
              />
              
              {/* Front Image - Positioned in front */}
              <img
                className="
                  absolute
                  rounded-lg
                  sm:rounded-xl
                  lg:rounded-[26px]
                  object-cover
                  shadow-2xl
                  
                  /* Responsive sizing */
                  w-[70%]
                  sm:w-[65%]
                  md:w-[280px]
                  lg:w-[300px]
                  xl:w-[340px]
                  2xl:w-[354px]
                  
                  /* Maintain aspect ratio */
                  aspect-[354/377]
                  
                  /* Position: Bottom-right overlap on mobile, adjusted on desktop */
                  top-[60px]
                  sm:top-[80px]
                  md:top-[60px]
                  lg:top-[59px]
                  
                  right-0
                  sm:right-[5%]
                  lg:right-0
                  
                  /* Slight rotation opposite to back image */
                  rotate-1
                  lg:rotate-0
                "
                alt="TSD Team Collaboration"
            src={frontImageSrc}
                loading="lazy"
          />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
