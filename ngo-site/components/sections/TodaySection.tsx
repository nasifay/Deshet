import React from "react";
import { Card, CardContent } from "../../components/ui/Card";

const milestones = [
  {
    year: "2000S",
    label: "FOUNDATION",
    topClass: "top-[279px]",
    leftClass: "left-8",
    lineTopClass: "top-[123px]",
    lineLeftClass: "-left-2",
    lineImage: "https://c.animaapp.com/mgcmuny5RiWnl8/img/line-5.svg",
  },
  {
    year: "2010",
    label: "FIRST COMMUNITY PROGRAMS",
    topClass: "top-[317px]",
    leftClass: "left-[302px]",
    lineTopClass: "top-[123px]",
    lineLeftClass: "left-[245px]",
    lineImage: "https://c.animaapp.com/mgcmuny5RiWnl8/img/line-1.svg",
  },
  {
    year: "2015",
    label: "EXPANDING THEMATIC AREAS",
    topClass: "top-[279px]",
    leftClass: "left-[548px]",
    lineTopClass: "top-[123px]",
    lineLeftClass: "left-[737px]",
    lineImage: "https://c.animaapp.com/mgcmuny5RiWnl8/img/line-1.svg",
  },
  {
    year: "2018",
    label: "RECOGNITION & PARTNERSHIPS",
    topClass: "top-[317px]",
    leftClass: "left-[777px]",
    lineTopClass: "top-[124px]",
    lineLeftClass: "left-[983px]",
    lineImage: "https://c.animaapp.com/mgcmuny5RiWnl8/img/line-1.svg",
  },
  {
    year: "2020",
    label: "GROWTH & REGIONAL PRESENCE",
    topClass: "top-[279px]",
    leftClass: "left-[1037px]",
    lineTopClass: "top-[119px]",
    lineLeftClass: "left-[491px]",
    lineImage: "https://c.animaapp.com/mgcmuny5RiWnl8/img/line-1.svg",
  },
  {
    year: "2023",
    label: "DIGITAL TRANSFORMATION",
    topClass: "top-[317px]",
    leftClass: "left-[1287px]",
    lineTopClass: "top-[123px]",
    lineLeftClass: "left-[1228px]",
    lineImage: "https://c.animaapp.com/mgcmuny5RiWnl8/img/line-6.svg",
  },
];

export function TodaySection() {
  return (
    <section className="flex flex-col w-full max-w-[1595px] mx-auto items-center gap-[177px] px-4 translate-y-[-1rem] animate-fade-in opacity-0">
      <div className="inline-flex flex-col items-start gap-[60px] w-full">
        <Card className="w-full bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0">
          <CardContent className="flex flex-col items-center justify-center gap-[65px] px-0 py-[88px]">
            <p className="w-full max-w-[993px] px-4 [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-[#ff9700] text-[32px] text-center tracking-[0] leading-[32.3px]">
              Tracing our journey of growth, impact, and commitment to
              communities across Ethiopia.
            </p>
          </CardContent>
        </Card>

        <Card className="w-full bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0 overflow-hidden">
          <CardContent className="p-0">
            <img
              className="w-full h-auto"
              alt="Conference room with attendees"
              src="https://c.animaapp.com/mgcmuny5RiWnl8/img/rectangle-921.svg"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex w-full max-w-[1351px] items-center">
        <p className="w-full [font-family:'Roboto',Helvetica] font-light text-black text-2xl text-justify tracking-[0.80px] leading-[30.2px]">
          Since Its Establishment, Tamra Social Development Has Been Committed
          To Empowering Communities And Driving Sustainable Change Across
          Ethiopia. What Began As A Small Initiative Has Grown Into A Trusted
          Organization Working In Diverse Thematic Areas, Building Partnerships,
          And Touching Countless Lives.
          <br />
          <br />
          our History Reflects Not Only The Milestones We Have Achieved But Also
          The Resilience, Collaboration, And Vision That Continue To Guide Us
          Toward A More Inclusive And Equitable Future.
        </p>
      </div>

      <div className="inline-flex flex-col items-center gap-[50px] w-full">
        <h2 className="w-full max-w-[1351px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px]">
          MILESTONES
        </h2>

        <div className="relative w-full max-w-[1476px] h-[521.02px] overflow-x-auto">
          <div className="min-w-[1476px] relative h-full">
            <img
              className="absolute top-[-5px] left-[-5px] w-[1486px] h-[531px]"
              alt="Timeline graphic"
              src="https://c.animaapp.com/mgcmuny5RiWnl8/img/group-1000002147.png"
            />

          {milestones.map((milestone, index) => (
            <React.Fragment key={index}>
              {index === 5 && (
                <img
                  className={`absolute ${milestone.lineTopClass} ${milestone.lineLeftClass} w-4 h-[282px]`}
                  alt="Timeline line"
                  src="https://c.animaapp.com/mgcmuny5RiWnl8/img/line-7.svg"
                />
              )}
              {index < 5 && (
                <img
                  className={`absolute ${milestone.lineTopClass} ${milestone.lineLeftClass} w-[3px] ${index === 4 ? "h-[275px]" : index === 0 ? "h-[282px]" : index === 1 ? "h-[276px]" : "h-[275px]"}`}
                  alt="Timeline line"
                  src={milestone.lineImage}
                />
              )}
              <div
                className={`inline-flex flex-col items-start gap-[15px] absolute ${milestone.topClass} ${milestone.leftClass}`}
              >
                <div
                  className={`relative ${index === 0 ? "w-[194px]" : index === 3 ? "w-[184px]" : index === 1 ? "w-[152px]" : "w-[150px]"} mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-transparent text-[64px] tracking-[0] leading-[64px]`}
                >
                  <span className="text-[#ff9700] leading-[74.2px]">
                    {milestone.year}
                    <br />
                  </span>
                  <span className="text-[#4f4f4f] text-2xl leading-[27.8px]">
                    {milestone.label}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
          </div>
        </div>
      </div>

      <Card className="w-full max-w-[1595px] bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0 overflow-hidden">
        <CardContent className="flex flex-col items-center gap-[30px] p-0 pb-[88px]">
          <div className="h-[410px] bg-[url(https://c.animaapp.com/mgcmuny5RiWnl8/img/chatgpt-image-sep-15--2025--10-09-17-am-1.png)] bg-[100%_100%] w-full" />

          <div className="flex flex-col items-start justify-center gap-7 w-full px-[65px]">
            <h2 className="w-full [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px]">
              2025 – TODAY
            </h2>

            <div className="flex flex-col items-start justify-center gap-[22px] w-full">
              <p className="w-full max-w-[1408px] [font-family:'Roboto',Helvetica] font-medium text-black text-[32px] tracking-[0] leading-[32.3px]">
                Continuing To Create Inclusive, People-centered, And Accountable
                Programs Aligned With Tamra's Mission And Vision.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <blockquote className="w-full max-w-[1351px] [font-family:'Roboto',Helvetica] font-light text-transparent text-5xl text-center tracking-[0.80px] leading-[60.5px]">
        <span className="italic text-black tracking-[0.38px]">
          " From Our Beginnings To Today,{" "}
        </span>
        <span className="italic text-[#128341] tracking-[0.38px]">
          Tamra Social Development
        </span>
        <span className="italic text-black tracking-[0.38px]">
          Stands Firm In Its Mission, Carrying Forward The Vision Of An
          Inclusive, Just, And Empowered Society. "
        </span>
      </blockquote>
    </section>
  );
}