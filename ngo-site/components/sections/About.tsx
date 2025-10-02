import Image from "next/image";
import Section from "~/components/ui/Section";
import Button from "~/components/ui/Button";

export default function AboutSection() {
  return (
    <Section padding="none">
      <div className="mx-auto w-full max-w-[1595px] px-4 md:px-6">
        <div className="bg-white rounded-[46px] border border-border shadow-sm px-5 py-10 md:px-12 md:py-14 lg:px-[65px] lg:py-[88px]">
          <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-[minmax(0,632px)_minmax(0,649px)] items-center gap-10 lg:gap-[119px]">
            {/* Left content */}
            <div className="w-full lg:w-[632px] space-y-6 lg:space-y-[63px]">
              {/* Exact Figma heading: Roboto Black, 72px, LH 82px, uppercase */}
              <h2 className="text-primary font-black uppercase text-[36px] leading-[40px] sm:text-[48px] sm:leading-[54px] md:text-[60px] md:leading-[68px] lg:text-[72px] lg:leading-[82px] tracking-[0]">
                About Us
              </h2>

              {/* Exact Figma body: Roboto Regular 18px, LH 28px (scales down on mobile) */}
              <div className="text-gray-700 text-[15px] leading-[24px] sm:text-[16px] sm:leading-[26px] md:text-[17px] md:leading-[27px] lg:text-[18px] lg:leading-[28px]">
                <p>
                  Tamra for social development organization (tsd) is an Ethiopian NGO legally registered since 1998. Founded as
                  an anti-aids club in shashemene, it now operates across Oromia, Sidama, South & Central Ethiopia, and Addis
                  Ababa. TSD works in youth empowerment, peacebuilding, srh & gender equality, and climate justice & livelihoods.
                </p>
                <p className="mt-3">
                  With <span className="text-accent font-semibold">25+ years</span> of impact, we drive change through grassroots engagement, advocacy, and community-driven solutions.
                </p>
              </div>

              <div>
                <Button intent="primary" rounded="full" size="lg">Read More</Button>
              </div>
            </div>

            {/* Right image (exact Figma size: 649x538, r=46px) */}
            <div className="w-full lg:w-[649px]">
              <div className="relative w-full h-[260px] sm:h-[340px] md:h-[440px] lg:h-[538px] rounded-[46px] overflow-hidden">
                <Image src="/images/about.jpg" alt="About us" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}