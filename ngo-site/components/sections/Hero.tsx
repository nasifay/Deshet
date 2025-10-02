import Image from "next/image";
import Section from "~/components/ui/Section";
import Container from "~/components/ui/Container";
import Button from "~/components/ui/Button";

export default function Hero() {
  return (
    <Section padding="lg">
      <Container>
        <div className="relative rounded-xl overflow-hidden">
          {/* Background image */}
          <div className="relative w-full h-[320px] md:h-[520px]">
            <Image
              src="/images/hero.jpg"
              alt="Serving Ethiopian Youth"
              fill
              priority
              className="object-cover"
            />

            {/* Three overlays with animated entrance */}
            <div className="pointer-events-none absolute inset-0 flex">
              <div className="w-1/3 h-full bg-primary/50 mix-blend-multiply animate-hero-panel [animation-delay:100ms]" />
              <div className="w-1/3 h-full bg-[#FF9700]/50 mix-blend-multiply animate-hero-panel [animation-delay:250ms]" />
              <div className="w-1/3 h-full bg-primary/50 mix-blend-multiply animate-hero-panel [animation-delay:400ms]" />
            </div>

            {/* Text content */}
            <div className="absolute inset-0 px-6 md:px-10 flex items-center">
              <div className="max-w-2xl text-white animate-hero-text">
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight uppercase tracking-tight">
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