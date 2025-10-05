import { ArrowUpCircleIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "~/components/ui/Card";
import ScrollStack from "~/components/ui/ScrollStack";
import SupportersSection from "./SupportersSection";

const programAreas = [
  {
    title: "YOUTH EMPOWERMENT & PEACEBUILDING",
    bgImage: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/frame-28.png",
  },
  {
    title: "SEXUAL & REPRODUCTIVE HEALTH & GENDER EQUALITY",
    bgImage: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/frame-29.png",
  },
  {
    title: "CLIMATE JUSTICE & LIVELIHOODS",
    bgImage: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/frame-30.png",
  },
  {
    title: "CHILDREN'S RIGHTS PROTECTION",
    bgImage: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/frame-31.png",
  },
];

const supporterLogos = [
  {
    src: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/id08rmwfjo-1753988135293-2.png",
    alt: "Supporter",
    width: "w-[53px]",
    height: "h-[49px]",
  },
  {
    src: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/gac-logo-1.png",
    alt: "GAC Logo",
    width: "w-[134px]",
    height: "h-[49px]",
  },
  {
    src: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/buildup-logo-1024x191-2.png",
    alt: "BuildUp Logo",
    width: "w-[264px]",
    height: "h-[49px]",
  },
  {
    src: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/584823e0cef1014c0b5e49c4-2.png",
    alt: "Partner",
    width: "w-[165px]",
    height: "h-[49px]",
  },
  {
    src: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/zeleman-logo-2.png",
    alt: "Zeleman Logo",
    width: "w-[226px]",
    height: "h-[49px]",
  },
  {
    src: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/ideojznfbb-1753991896369-1.png",
    alt: "Supporter",
    width: "w-[60px]",
    height: "h-[49px]",
  },
  {
    src: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/search-logo-1.png",
    alt: "Search Logo",
    width: "w-56",
    height: "h-12",
  },
  {
    src: "https://c.animaapp.com/mgdrgf40cGS3Zf/img/idoxrk7v4r-1753990881673-1.png",
    alt: "Partner",
    width: "w-[59px]",
    height: "h-12",
  },
];

export default function ProgramAreasSection() {
  return (
    <div className="inline-flex flex-col items-center gap-[72px] w-full px-[148px] pt-[154px] pb-[100px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
      <ScrollStack
        items={programAreas.map((area, index) => ({
          id: index,
          content: (
            <Card
              className="flex flex-col w-[1595px] h-[854px] items-start justify-end gap-[23px] px-[65px] py-[88px] rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] bg-cover bg-center bg-no-repeat hover:scale-[1.02] transition-transform cursor-pointer border-0"
              style={{ backgroundImage: `url(${area.bgImage})` }}
            >
              <CardContent className="p-0 flex flex-col items-start justify-center gap-[23px] w-full h-full">
                <h3 className="relative w-[863px] h-[303px] opacity-100 [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-white text-[80px] tracking-[0] leading-[81%] uppercase">
                  {area.title}
                </h3>
                <ArrowUpCircleIcon className="relative w-[67.63px] h-[67.63px] fill-[#4EB778]" style={{ transform: 'rotate(40.11deg)' }} />
              </CardContent>
            </Card>
          )
        }))}
      />

      <SupportersSection title="OUR SUPPORTERS" logos={supporterLogos} />
    </div>
  );
}