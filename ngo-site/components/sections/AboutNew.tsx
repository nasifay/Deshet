import Image from "next/image";
import Section from "~/components/ui/Section";
import SectionCard from "~/components/ui/SectionCard";
import Button from "~/components/ui/Button";

export default function AboutNew() {
  return (
    <Section padding="none">
      <SectionCard className="px-5 py-10 md:px-12 md:py-14">
        <div className="mx-auto w-full max-w-[1400px] grid lg:grid-cols-[632px_649px] items-center gap-10 lg:gap-[119px]">
          {/* Left content */}
          <div className="w-full lg:w-[632px] space-y-6 lg:space-y-[63px]">
            {/* Title block */}
            <h2 className="text-primary font-black uppercase text-[40px] leading-[46px] md:text-[56px] md:leading-[64px] lg:text-[72px] lg:leading-[82px]">
              About Us
            </h2>

            {/* Body copy per spec */}
            <div className="text-gray-700 text-justify lowercase" style={{ fontWeight: 300, fontSize: 24, lineHeight: "125%", letterSpacing: 0.5 }}>
              <p>
                Tamra for Social Development Organization (TSD) is an Ethiopian NGO legally registered since 1998. Founded as an Anti-AIDS club in Shashemene, it now operates across Oromia, Sidama, South & Central Ethiopia, and Addis Ababa. TSD works in youth empowerment, peacebuilding, SRH & gender equality, and climate justice & livelihoods. With 25+ years of impact, we drive change through grassroots engagement, advocacy, and community-driven solutions.
              </p>
            </div>

            <div>
              <Button
                intent="primary"
                rounded="full"
                className="w-[196px] h-[56px] rounded-[21px] px-[40px]"
                href="/who-we-are"
              >
                <span className="block w-[116px] h-[28px] text-[24px] leading-[1] font-normal text-center">Read More</span>
              </Button>
            </div>
          </div>

          {/* Right image */}
          <div className="w-full lg:w-[649px]">
            <div className="relative w-full h-[300px] sm:h-[380px] md:h-[460px] lg:h-[538px] rounded-[46px] overflow-hidden">
              <Image src="/images/about.jpg" alt="About us" fill className="object-cover" />
            </div>
          </div>
        </div>
      </SectionCard>
    </Section>
  );
}