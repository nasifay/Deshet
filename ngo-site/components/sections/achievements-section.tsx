import React from "react";
import { Card, CardContent } from "~/components/ui/Card";

const achievementCards = [
  {
    bg: "bg-[#128341]",
    number: "120+",
    numberColor: "text-white",
    label: "Recognitions & Awards",
    labelColor: "text-white",
  },
  {
    bg: "bg-[#4f4f4f]",
    number: "11+",
    numberHighlight: " YEARS",
    numberColor: "text-[#ff9700]",
    numberHighlightColor: "text-[#4eb778]",
    label: 'Youth Radio "zemene Hallio"',
    labelColor: "text-white",
  },
];

export default function AchievementsSection() {
  return (
    <Card className="flex flex-col w-[1891px] items-center justify-center gap-[72px] px-[148px] py-[72px] bg-white rounded-[46px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)] border-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
      <CardContent className="p-0 flex flex-col items-center gap-[72px] w-full max-w-[1595px]">
        <div className="flex items-center gap-[167px] w-full">
          <div className="inline-flex flex-col items-start gap-7">
            <h2 className="mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px]">
              SINCE 1998
            </h2>
            <p className="w-[658px] [font-family:'Roboto',Helvetica] font-light text-transparent text-2xl text-justify tracking-[0] leading-[27.4px]">
              <span className="text-[#4f4f4f]">
                Empowering Young People Through Holistic Development In{" "}
              </span>
              <span className="text-[#ff9700]">Health</span>
              <span className="text-[#4f4f4f]">, </span>
              <span className="text-[#ff9700]">Education</span>
              <span className="text-[#4f4f4f]">, </span>
              <span className="text-[#ff9700]">Livelihoods</span>
              <span className="text-[#4f4f4f]">, And </span>
              <span className="text-[#ff9700]">Civic Engagement</span>
              <span className="text-[#4f4f4f]">.</span>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-[134px] w-full max-w-[1169px]">
          {achievementCards.map((card, index) => (
            <Card
              key={index}
              className={`flex flex-col w-[518px] h-[255px] items-start justify-center gap-2.5 px-[38px] py-[90px] ${card.bg} rounded-[33px] shadow-[0px_4px_26.5px_#0000000d] border-0`}
            >
              <CardContent className="p-0 flex flex-col w-[456px] items-start gap-3">
                <div
                  className={`mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-5xl tracking-[0] leading-[48.5px] whitespace-nowrap`}
                >
                  {card.numberHighlight ? (
                    <>
                      <span className={card.numberColor}>{card.number}</span>
                      <span className={card.numberHighlightColor}>
                        {card.numberHighlight}
                      </span>
                    </>
                  ) : (
                    <span className={card.numberColor}>{card.number}</span>
                  )}
                </div>
                <div
                  className={`[font-family:'Roboto',Helvetica] font-normal ${card.labelColor} text-2xl tracking-[0] leading-[24.2px] whitespace-nowrap`}
                >
                  {card.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="inline-flex items-start gap-[67px]">
          <Card className="flex flex-col w-[345px] h-[267px] items-center justify-center gap-2.5 px-8 py-[107px] bg-white rounded-[33px] shadow-[0px_4px_26.5px_#0000000d] border-0">
            <CardContent className="p-0 inline-flex justify-center gap-[7px] flex-col items-start">
              <div className="mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-transparent text-5xl tracking-[0] leading-[48.5px] whitespace-nowrap">
                <span className="text-[#ff9700]">27</span>
                <span className="text-[#128341]"> YEARS</span>
              </div>
              <a
                className="[font-family:'Roboto',Helvetica] font-normal text-[#4f4f4f] text-2xl tracking-[0] leading-[24.2px] underline whitespace-nowrap hover:text-[#128341] transition-colors"
                href="https://www.figma.com/proto/MkhksQbAlOq8XFYc7pjyWU/TAMRA-Website-UI?page-id=480%3A745&node-id=590-773&viewport=387%2C-2833%2C0.13&t=7vd0yZSzpPwwKF5z-1&scaling=min-zoom&content-scaling=fixed"
                rel="noopener noreferrer"
                target="_blank"
              >
                Of Service
              </a>
            </CardContent>
          </Card>

          <img
            className="w-[398px] h-80 rounded-[33px] object-cover"
            alt="Service"
            src="https://c.animaapp.com/mgdrgf40cGS3Zf/img/rectangle-14.png"
          />

          <Card className="w-[345px] h-[267px] items-center justify-center px-[61px] py-[137px] bg-[#ffdeb3] rounded-[33px] shadow-[0px_4px_26.5px_#0000000d] border-0 flex gap-2.5">
            <CardContent className="p-0 [font-family:'Roboto',Helvetica] font-normal text-transparent text-2xl tracking-[0] leading-[24.2px]">
              <span className="text-[#4f4f4f]">Active In </span>
              <span className="text-[#128341]">4</span>
              <span className="text-[#4f4f4f]">
                {" "}
                Regions & Addis Ababa
              </span>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}