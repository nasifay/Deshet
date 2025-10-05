import React from "react";
import { Card, CardContent } from "../../components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";

const programCategories = [
  { id: "youth-empowerment", label: "Youth Empowerment & Peacebuilding" },
  { id: "srh-gender", label: "SRH & Gender\nDevelopment" },
  { id: "climate-justice", label: "Climate Justice & Livelihoods" },
  { id: "child-protection", label: "Child Protection & Safe Spaces" },
  { id: "health-resilience", label: "Health &\nResilience" },
  { id: "community-services", label: "Community Services & Volunteerism" },
];

const programs = [
  {
    id: "icd",
    titleGreen: "INTEGRATED COMMUNITY DEVELOPMENT ",
    titleOrange: "(ICD)",
    description:
      "(2025–2029, Nca) – Peacebuilding, Gbv Prevention, Climate Resilience.",
    mainImage: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904.png",
    thumbnails: [
      { id: 1, src: "" },
      { id: 2, src: "" },
      { id: 3, src: "" },
      { id: 4, src: "" },
    ],
  },
  {
    id: "yci",
    titleGreen: "YOUTH CHALLENGE INITIATIVE ",
    titleOrange: "(YCI)",
    description:
      "(2017–2025, Packard Foundation Via Ynsd) – Srh Awareness, Entrepreneurship, Reusable Sanitary Pads.",
    mainImage: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-1.png",
    thumbnails: [
      { id: 1, src: "" },
      { id: 2, src: "" },
      { id: 3, src: "" },
      { id: 4, src: "" },
    ],
  },
  {
    id: "cspw",
    titleGreen: "COMMUNITY SERVICE AS A PATHWAY TO WORK ",
    titleOrange: "(CSPW)",
    description:
      "(2023–2024, Mastercard Foundation Via Ynsd) – 22,000+ Youth Trained In Workplace Skills.",
    mainImage: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-2.png",
    thumbnails: [
      { id: 1, src: "" },
      { id: 2, src: "" },
      { id: 3, src: "" },
      { id: 4, src: "" },
    ],
  },
  {
    id: "erase",
    titleGreen: "ENHANCE RESILIENCE AGAINST ONLINE & OFFLINE VIOLENCE ",
    titleOrange: "(ERASE)",
    description:
      "(2025, Elida) – Dialogue, Empathy, Early Conflict Detection, Peace Promotion.",
    mainImage: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-3.png",
    thumbnails: [
      { id: 1, src: "" },
      { id: 2, src: "" },
      { id: 3, src: "" },
      { id: 4, src: "" },
    ],
  },
];

export function FrameWrapperSubsection() {
  return (
    <section className="flex flex-col w-full items-center gap-16 py-8 px-4 md:px-8 lg:px-16">
      <div className="relative w-full max-w-[1893px] h-[400px] md:h-[600px] lg:h-[744px] translate-y-[-1rem] animate-fade-in opacity-0">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Programs hero background"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_51%,rgba(0,0,0,1)_100%)]" />

        <div className="absolute bottom-8 md:bottom-16 lg:bottom-[100px] left-4 md:left-8 lg:left-72 right-4 md:right-8 lg:right-auto max-w-[1351px] [font-family:'Roboto',Helvetica] font-extrabold text-white text-2xl md:text-3xl lg:text-[40px] text-justify tracking-[0.80px] leading-tight md:leading-[40px] lg:leading-[50.4px]">
          We Equip Young People With Leadership, Entrepreneurship, And Life
          Skills While Promoting Peacebuilding, Dialogue, And Mediation. Our
          Programs Nurture Youth As Proactive Leaders And Ambassadors Of
          Positive Change In Their Communities.
        </div>
      </div>

      <Tabs
        defaultValue="youth-empowerment"
        className="w-full max-w-[1887px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]"
      >
        <TabsList className="w-full h-auto flex-wrap md:flex-nowrap items-center justify-center gap-0 px-0 py-4 md:py-[88px] rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] bg-white">
          {programCategories.map((category, index) => (
            <React.Fragment key={category.id}>
              {index > 0 && (
                <div className="hidden md:block w-px h-[86px] bg-gray-300" />
              )}
              <TabsTrigger
                value={category.id}
                className="w-full md:w-[311px] h-auto px-4 py-4 md:py-0 [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-lg md:text-2xl text-center tracking-[0] leading-[24.2px] whitespace-pre-line data-[state=active]:text-[#ff9700] data-[state=inactive]:text-[#4f4f4f] data-[state=active]:bg-transparent data-[state=inactive]:bg-transparent hover:bg-gray-50 transition-colors"
              >
                {category.label}
              </TabsTrigger>
            </React.Fragment>
          ))}
        </TabsList>

        <TabsContent value="youth-empowerment" className="mt-16">
          <div className="flex flex-col items-center gap-16 w-full">
            {programs.map((program, programIndex) => (
              <div
                key={program.id}
                className="flex flex-col items-center gap-16 w-full translate-y-[-1rem] animate-fade-in opacity-0"
                style={
                  {
                    "--animation-delay": `${400 + programIndex * 200}ms`,
                  } as React.CSSProperties
                }
              >
                <Card className="w-full max-w-[1595px] rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] bg-white border-0">
                  <CardContent className="flex flex-col items-center justify-center gap-12 md:gap-16 px-4 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[88px]">
                    <div className="flex flex-col items-start gap-4 md:gap-[19px] w-full max-w-[1351px]">
                      <h2 className="w-full [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-4xl md:text-5xl lg:text-[70px] tracking-[0] leading-tight md:leading-[60px] lg:leading-[70.7px]">
                        <span className="text-[#128341]">
                          {program.titleGreen}
                        </span>
                        <span className="text-[#ff9700]">
                          {program.titleOrange}
                        </span>
                      </h2>

                      <p className="w-full [font-family:'Roboto',Helvetica] font-light text-black text-lg md:text-xl lg:text-2xl text-justify tracking-[0.80px] leading-relaxed md:leading-[28px] lg:leading-[30.2px]">
                        {program.description}
                      </p>
                    </div>

                    <div className="w-full max-w-[1351px] rounded-[36px] overflow-hidden">
                      <img
                        className="w-full h-auto max-h-[556px] object-cover"
                        alt={`${program.titleGreen} main image`}
                        src={program.mainImage}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex flex-wrap md:flex-nowrap w-full max-w-[1351px] items-center justify-center gap-4 md:gap-8 lg:gap-[70px]">
                  {program.thumbnails.map((thumbnail) => (
                    <img
                      key={thumbnail.id}
                      className="w-full md:w-[285px] h-auto md:h-[314px] object-cover rounded-lg"
                      alt={`${program.titleGreen} thumbnail ${thumbnail.id}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {programCategories.slice(1).map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-16">
            <div className="flex items-center justify-center min-h-[400px] text-2xl text-gray-500">
              Content for {category.label}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}