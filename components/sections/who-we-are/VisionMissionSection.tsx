import React from "react";
import Container from "../../ui/Container";

interface VisionMissionProps {
  visionImage: string;
  visionText: string;
  missionImage: string;
  missionText: string;
}

export function VisionMissionSection({ visionImage, visionText, missionImage, missionText }: VisionMissionProps) {
  return (
    <section className="relative w-full py-8 md:py-16 lg:py-24 xl:py-32 bg-white animate-fade-in opacity-0 [--animation-delay:1200ms]">
      <Container>
        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16 xl:gap-20">
          {/* Vision Section - Mobile: compact side-by-side; md+: stacked then side-by-side as original */}
          <div className="flex flex-row md:flex-col lg:flex-row items-center md:items-start gap-4 md:gap-8 lg:gap-12 xl:gap-16">
            {/* Vision Image - 1/3 on mobile, full on md, 1/3 on lg, 1/4 on xl */}
            <div className="relative w-1/3 md:w-full lg:w-1/3 xl:w-1/4 aspect-square rounded-xl md:rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Vision Image"
                src={visionImage}
              />
            </div>

            {/* Vision Text Content - Left-aligned, compact on mobile, larger on md+ */}
            <div className="flex flex-col gap-2 md:gap-6 lg:gap-8 flex-1 text-left md:text-center lg:text-left">
              {/* Vision Title - Responsive font via CSS */}
              <h2 className="font-black text-accent uppercase leading-tight tracking-wide">
                VISION
              </h2>

              {/* Vision Description - Responsive font via CSS */}
              <p className="text-muted-foreground leading-relaxed md:text-justify lg:text-left capitalize">
                {visionText}
              </p>
            </div>
          </div>

          {/* Mission Section - Reversed on mobile, image left on md+ */}
          <div className="flex flex-row-reverse md:flex-row items-center md:items-start gap-4 md:gap-8 lg:gap-12 xl:gap-16">
            {/* Mission Image */}
            <div className="relative w-1/3 md:w-full lg:w-1/3 xl:w-1/4 aspect-square rounded-xl md:rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Mission Image"
                src={missionImage}
              />
            </div>

            {/* Mission Text Content */}
            <div className="flex flex-col gap-2 md:gap-6 lg:gap-8 flex-1 text-left md:text-center lg:text-left">
              {/* Mission Title */}
              <h2 className="font-black text-accent uppercase leading-tight tracking-wide">
                MISSION
              </h2>

              {/* Mission Description */}
              <p className="text-muted-foreground leading-relaxed md:text-justify lg:text-left capitalize">
                {missionText}
              </p>
            </div>
          </div>
        </div>
      </Container>

      <style jsx>{`
        /* Font sizes: compact on mobile, larger on md+ */
        h2 {
          font-size: clamp(1.5rem, 6vw, 2.5rem);
        }
        p {
          font-size: clamp(0.875rem, 3vw, 1.5rem);
        }
        @media (min-width: 768px) {
          h2 {
            font-size: clamp(2.5rem, 8vw, 4.5rem);
          }
          p {
            font-size: clamp(1.25rem, 4vw, 2.5rem);
          }
        }

        /* Additional responsive adjustments for custom breakpoints */
        @media (min-width: 834px) {
          .gap-12 { gap: 3rem; }
        }
        @media (min-width: 1366px) {
          .gap-16 { gap: 4rem; }
        }
        @media (min-width: 1440px) {
          .gap-20 { gap: 5rem; }
        }
      `}</style>
    </section>
  );
}
