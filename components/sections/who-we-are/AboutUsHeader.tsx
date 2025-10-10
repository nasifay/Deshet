import React from "react";

/**
 * AboutUsHeader Component
 * 
 * Responsive header section for the "About Us" page.
 * 
 * Responsive Strategy:
 * - Mobile-first approach with fluid typography
 * - Decorative asset hidden on mobile (< 640px), shown on larger screens
 * - Fluid padding scales from mobile (2rem) to desktop (6.5rem)
 * - Typography scales smoothly using clamp() across all breakpoints
 * - Asset positioning uses percentage-based values for fluid scaling
 */
export function AboutUsHeader() {
  return (
    <section 
      className="relative w-full overflow-hidden"
      // Fluid padding: mobile (32px) → tablet (64px) → desktop (104px)
      style={{
        paddingTop: 'clamp(2rem, 4vw + 1rem, 6.5rem)',
        paddingBottom: 'clamp(2rem, 4vw + 1rem, 6.5rem)',
      }}
    >
      {/* Decorative Asset - Hidden on mobile, visible from sm+ */}
      <img
        className="
          hidden sm:block
          absolute 
          top-[12%] left-[8%]
          w-[clamp(40px,5vw,71px)] 
          h-auto
          object-contain
          translate-y-[-1rem] 
          animate-fade-in 
          opacity-0 
          [--animation-delay:200ms]
          pointer-events-none
          select-none
          
          /* Responsive positioning adjustments */
          sm:top-[15%] sm:left-[5%]
          md:top-[18%] md:left-[8%]
          lg:top-[20%] lg:left-[12%]
          xl:top-[22%] xl:left-[14%]
          2xl:top-[24%] 2xl:left-[15%]
        "
        alt=""
        role="presentation"
        src="https://c.animaapp.com/mgclt9blEcJSeI/img/asset-2-1.png"
        loading="lazy"
      />

      {/* Main Heading with Fluid Typography */}
      <h1 
        className="
          text-center 
          font-black 
          text-[#128341]
          dark:text-[#1aa34e]
          tracking-tight
          leading-[1.01]
          uppercase
          translate-y-[-1rem] 
          animate-fade-in 
          opacity-0 
          [--animation-delay:400ms]
          
          /* Responsive padding to prevent edge cutoff */
          px-4
          sm:px-6
          md:px-8
          lg:px-12
          xl:px-16
        "
        style={{
          // Fluid typography: 32px (mobile) → 48px (tablet) → 72px (desktop) → 90px (ultra-wide)
          fontSize: 'clamp(2rem, 4vw + 1rem, 5.625rem)',
          // Prevent text from touching decorative asset on smaller screens
          marginTop: 'clamp(0rem, 2vw, 1.5rem)',
        }}
      >
        ABOUT US
      </h1>

      {/* Optional: Screen reader announcement for better a11y */}
      <span className="sr-only">
        About Tamra Sustainable Development Team - Learn about our mission, vision, and the people behind our organization
      </span>
    </section>
  );
}
