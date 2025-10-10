import React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/Button";
import { Card, CardContent } from "~/components/ui/Card";

const newsCards = [
  {
    id: "1",
    image: "/images/news.jpg",
    title: "TSD NEW YEAR'S PROGRAM",
    description:
      "Tames NGO Joyfully Celebrated The Ethiopian New Year Together With Community Members...",
  },
  {
    id: "2",
    image: "/images/hero.jpg",
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
  },
  {
    id: "3",
    image: "/images/hero.jpg",
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
  },
  {
    id: "4",
    image: "/images/hero.jpg",
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
  },
];

export const NewsAndEventsSection = () => {
  return (
    <div className="flex flex-col w-full items-start gap-[72px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]">
      <div className="inline-flex items-end gap-[804px] w-full">
        <h2 className="mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px] whitespace-nowrap">
          NEWS AND EVENTS
        </h2>
        <a
          className="font-robot font-bold text-[#a19e9d] text-xl tracking-[0] leading-[20.2px] whitespace-nowrap hover:text-[#128341] transition-colors"
          href="https://www.figma.com/proto/MkhksQbAlOq8XFYc7pjyWU/TAMRA-Website-UI?page-id=480%3A745&node-id=590-773&viewport=387%2C-2833%2C0.13&t=7vd0yZSzpPwwKF5z-1&scaling=min-zoom&content-scaling=fixed"
          rel="noopener noreferrer"
          target="_blank"
        >
          See More
        </a>
      </div>

      <div className="w-full">
        <div className="inline-flex items-center gap-[52px]">
          {newsCards.map((news, index) => (
            <Card
              key={index}
              className="w-[360px] h-[421px] overflow-hidden cursor-pointer hover:scale-[1.05] transition-transform bg-transparent border-none rounded-[33px]"
            >
              <div className="relative w-full h-full">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <h3 className="font-bold text-base text-[#ff9700]">
                    {news.title}
                  </h3>
                  <p className="text-sm text-white mt-1">{news.description}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="relative w-full h-[429.74px] rounded-[46px] overflow-hidden bg-gradient-to-br from-green-100 to-green-200">
        <img
          src="/images/cta.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute top-[104px] left-1/2 -translate-x-1/2 w-[1005px] flex flex-col gap-[35.8px] z-10">
          <h2 className="w-full font-h2 font-[number:var(--h2-font-weight)] text-[#4eb778] text-[length:var(--h2-font-size)] text-center tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
            You can contribute to provide a place for children with special
            needs!
          </h2>
          <div className="flex gap-[89.1px] justify-center">
            <Button className="h-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#ff9700] rounded-[21px] backdrop-blur-2xl backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(40px)_brightness(100%)] hover:bg-[#e68900] transition-colors">
              <span className="[font-family:'Roboto',Helvetica] font-medium text-white text-base text-right tracking-[0] leading-[normal] whitespace-nowrap">
                Join as a volunteer
              </span>
            </Button>
            <Button className="h-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white rounded-[21px] backdrop-blur-2xl backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(40px)_brightness(100%)] hover:bg-gray-100 transition-colors">
              <span className="[font-family:'Roboto',Helvetica] font-medium text-[#128341] text-base text-right tracking-[0] leading-[normal] whitespace-nowrap">
                Donate
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAndEventsSection;
