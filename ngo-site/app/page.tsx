import Image from "next/image";
import Button from "~/components/ui/Button";
import Section from "~/components/ui/Section";
import Container from "~/components/ui/Container";
import Card from "~/components/ui/Card";
import LogoCloud from "~/components/ui/LogoCloud";
import NewsCard from "~/components/ui/NewsCard";
import Hero from "~/components/sections/Hero";
import AboutNew from "~/components/sections/AboutNew";
import StatsBar from "~/components/sections/StatsBar";
import ImageHeadlineCard from "~/components/sections/ImageHeadlineCard";
import MissionScroller from "~/components/sections/MissionScroller";

export default function Home() {
  return (
    <>
      <Hero />

      <AboutNew />

      <Section className="py-8">
        <StatsBar
          items={[
            { value: "58", label: "Staffs" },
            { value: "5", label: <>Offices in <span className="text-primary font-semibold">4</span> Regions</> },
            { value: "250+", label: "Volunteers" },
            { value: "15", label: "Protocols" },
          ]}
        />
      </Section>

      <Section padding="none">
        <ImageHeadlineCard
          src="/images/empowerment.jpg"
          alt="Youth empowerment"
          headline={<>
            Youth<br />Empowerment &<br />Peacebuilding
          </>}
        />
      </Section>

      <MissionScroller />

      {/* Partners */}
      <Section>
        <Container>
          <LogoCloud />
        </Container>
      </Section>

      {/* Since 1998 */}
      <Section className="bg-muted/60">
        <Container>
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Since 1998</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <p className="text-sm text-gray-500">Empowering Young People through Holistic Development in Health, Education, Livelihoods, and Civic Engagement.</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Card className="p-5 text-center">
                  <div className="text-primary text-2xl font-bold">120+</div>
                  <div className="text-sm text-gray-600">Recognitions & Awards</div>
                </Card>
                <Card className="p-5 text-center">
                  <div className="text-primary text-2xl font-bold">11+ Years</div>
                  <div className="text-sm text-gray-600">Youth Radio “Zerene Halifo”</div>
                </Card>
                <Card className="p-5 text-center col-span-2 md:col-span-1">
                  <div className="text-primary text-2xl font-bold">27 Years</div>
                  <div className="text-sm text-gray-600">Of Service</div>
                </Card>
                <Card className="p-5 text-center col-span-2 md:col-span-1">
                  <div className="text-primary text-2xl font-bold">4+ Regions</div>
                  <div className="text-sm text-gray-600">Active incl. Addis Ababa</div>
                </Card>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <Image src="/images/since.jpg" alt="Since 1998" width={800} height={600} className="w-full h-[300px] md:h-full object-cover" />
            </Card>
          </div>
        </Container>
      </Section>

      {/* News and Events */}
      <Section>
        <Container>
          <div className="flex items-end justify-between mb-4">
            <h3 className="text-2xl md:text-3xl font-bold">News and Events</h3>
            <Button variant="ghost" href="#">See More</Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <NewsCard key={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Banner */}
      <Section padding="none">
        <Container>
          <div className="relative rounded-xl overflow-hidden">
            <Image src="/images/cta.jpg" alt="Call to action" width={1600} height={600} className="w-full h-[280px] md:h-[360px] object-cover" />
            <div className="absolute inset-0 overlay-gradient" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
              <h4 className="text-2xl md:text-3xl font-bold mb-4">You can contribute to provide a place for children with special needs!</h4>
              <div className="flex gap-3 flex-col sm:flex-row">
                <Button intent="accent">Join as a Volunteer</Button>
                <Button intent="primary" variant="solid">Donate</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
