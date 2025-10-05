import Link from "next/link";
import React from "react";
import Button from "~/components/ui/Button";
import { Card, CardContent } from "~/components/ui/Card";

const newsArticles = [
  {
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    backgroundImage: "",
  },
  {
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    backgroundImage: "",
  },
  {
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    backgroundImage: "",
  },
  {
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    backgroundImage: "",
  },
];

export default function NewsEventsSection() {
  return (
    <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:3200ms] flex flex-col w-full max-w-[1596px] items-start gap-[72px] relative flex-[0_0_auto]">
      <div className="inline-flex items-end gap-[804px] relative flex-[0_0_auto]">
        <h2 className="relative w-fit mt-[-1.00px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px] whitespace-nowrap">
          NEWS AND EVENTS
        </h2>

        <a
          className="relative w-fit [font-family:'Roboto',Helvetica] font-normal text-transparent text-xl tracking-[0] leading-[20.2px] whitespace-nowrap"
          href="https://www.figma.com/proto/MkhksQbAlOq8XFYc7pjyWU/TAMRA-Website-UI?page-id=480%3A745&node-id=590-773&viewport=387%2C-2833%2C0.13&t=7vd0yZSzpPwwKF5z-1&scaling=min-zoom&content-scaling=fixed"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="font-bold text-[#a19e9d]">See More</span>
        </a>
      </div>

      <div className="w-full relative h-[421px]">
        <div className="left-[calc(50.00%_-_798px)] inline-flex items-center gap-[52px] relative">
          {newsArticles.map((article, index) => (
            <Card
              key={index}
              className={`translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:${3400 + index * 200}ms] flex w-[360px] items-end justify-center gap-2.5 pt-[9px] pb-[29px] px-[3px] relative h-[421px] border-0 bg-transparent`}
            >
              <div className="absolute top-0 left-0 w-[360px] h-[421px]">
                {article.backgroundImage && (
                  <img
                    className="absolute top-0 left-0 w-[359px] h-[421px] object-cover"
                    alt="Unsplash cveoh jjmee"
                    src={article.backgroundImage}
                  />
                )}

                <div className="absolute top-0 left-0 w-[360px] h-[421px] bg-black rounded-[33px] opacity-50" />
              </div>

              <CardContent className="p-0 flex flex-col w-[315px] items-start gap-[72px] relative z-10">
                <div className="flex flex-col items-start gap-[5px] relative self-stretch w-full flex-[0_0_auto]">
                  <h3 className="relative self-stretch mt-[-1.00px] [font-family:'Roboto',Helvetica] font-bold text-[#ff9700] text-base tracking-[0] leading-6">
                    {article.title}
                  </h3>

                  <p className="relative self-stretch [font-family:'Roboto',Helvetica] font-normal text-white text-sm tracking-[0] leading-[22.4px]">
                    {article.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:4200ms] relative w-full h-[429.74px] bg-[100%_100%]">
        <div className="relative top-[104px] left-[295px] w-[1005px] h-[217px] flex flex-col gap-[35.8px]">
          <h2 className="self-end mr-[2.0px] w-[1003.11px] h-[129.82px] mt-0 font-h2 font-[number:var(--h2-font-weight)] text-[#4eb778] text-[length:var(--h2-font-size)] text-center tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] [font-style:var(--h2-font-style)]">
            You can contribute to provide a place for children with special
            needs!
          </h2>

          <div className="ml-[285.4px] w-[404.09px] h-[51px] flex gap-[89.1px]">
            <Link href="/volunteer">
              <Button className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:4400ms] h-auto inline-flex w-[200px] items-center justify-center gap-2.5 px-8 py-4 bg-[#ff9700] hover:bg-[#e6870a] rounded-[21px] backdrop-blur-2xl backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(40px)_brightness(100%)]">
                <span className="[font-family:'Roboto',Helvetica] font-medium text-white text-base text-right tracking-[0] leading-[normal] whitespace-nowrap">
                  Join as a volunteer
                </span>
              </Button>
            </Link>

            <Button className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:4600ms] h-auto inline-flex w-[115px] items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-gray-50 rounded-[21px] backdrop-blur-2xl backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(40px)_brightness(100%)]">
              <span className="[font-family:'Roboto',Helvetica] font-medium text-[#128341] text-base text-right tracking-[0] leading-[normal] whitespace-nowrap">
                Donate
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}