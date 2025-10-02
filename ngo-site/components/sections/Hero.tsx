import Image from "next/image";
import Section from "~/components/ui/Section";
import Container from "~/components/ui/Container";
import Button from "~/components/ui/Button";
import type { CSSProperties } from "react";

export default function Hero() {
  const overlayVars = {
    "--mid-left": "clamp(80px, 28vw, 545px)",
    "--mid-width": "clamp(140px, 34vw, 541px)",
  } as Record<string, string> as CSSProperties;

  return (
    <Section padding="lg">
      <Container>
        <div className="relative rounded-xl overflow-hidden">
          {/* Background image */}
          <div className="relative w-full h-[360px] md:h-[520px]">
            <Image
              src="/images/hero.jpg"
              alt="Serving Ethiopian Youth"
              fill
              priority
              className="object-cover"
            />

            {/* Three overlays positioned to match Figma */}
            <div className="absolute inset-0" style={overlayVars}>
              {/* Left green overlay */}
              <div className="absolute inset-y-0 left-0 bg-[rgba(30,142,62,0.5)] animate-hero-left" style={{ right: `calc(100% - var(--mid-left))` }} aria-hidden />

              {/* Middle orange overlay */}
              <div
                className="absolute inset-y-0 bg-[rgba(255,151,0,0.5)] animate-hero-mid"
                style={{ left: "var(--mid-left)", width: "var(--mid-width)" }}
                aria-hidden
              />

              {/* Right green overlay */}
              <div
                className="absolute inset-y-0 right-0 bg-[rgba(30,142,62,0.5)] animate-hero-right" 
                style={{ left: `calc(var(--mid-left) + var(--mid-width))` }}
                aria-hidden
              />
            </div>

            {/* Text content */}
            <div className="absolute inset-0 px-6 md:px-10 flex items-center">
              <div className="max-w-4xl text-white animate-hero-text">
                <h1 className="font-black uppercase leading-[1.01] tracking-[0] text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] xl:text-[100px]">
                  Serving Ethiopian Youth
                </h1>
                <div className="mt-5">
                  <Button intent="primary" rounded="full" size="lg">
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}