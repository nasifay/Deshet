import React from "react";
import { Card, CardContent } from "~/components/ui/Card";

export const MainContentSection = () => {
  const newsItems = [
    {
      id: 1,
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-18-1.png",
      title: "Tsd New Year's Program",
      description:
        "Tamra For Social Development (tsd) Has Kicked Off A Week-long Youth Leadership Training In Hawassa.",
      animationDelay: "0ms",
    },
    {
      id: 2,
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-18-2.png",
      title: "Tsd New Year's Program",
      description:
        "Tamra For Social Development (tsd) Has Kicked Off A Week-long Youth Leadership Training In Hawassa.",
      animationDelay: "200ms",
    },
    {
      id: 3,
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-18-3.png",
      title: "Tsd New Year's Program",
      description:
        "Tamra For Social Development (tsd) Has Kicked Off A Week-long Youth Leadership Training In Hawassa.",
      animationDelay: "400ms",
    },
    {
      id: 4,
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-18-4.png",
      title: "Tsd New Year's Program",
      description:
        "Tamra For Social Development (tsd) Has Kicked Off A Week-long Youth Leadership Training In Hawassa.",
      animationDelay: "600ms",
    },
    {
      id: 5,
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-18-5.png",
      title: "Tsd New Year's Program",
      description:
        "Tamra For Social Development (tsd) Has Kicked Off A Week-long Youth Leadership Training In Hawassa.",
      animationDelay: "800ms",
    },
    {
      id: 6,
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-18-6.png",
      title: "Tsd New Year's Program",
      description:
        "Tamra For Social Development (tsd) Has Kicked Off A Week-long Youth Leadership Training In Hawassa.",
      animationDelay: "1000ms",
    },
    {
      id: 7,
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-18-7.png",
      title: "Tsd New Year's Program",
      description:
        "Tamra For Social Development (tsd) Has Kicked Off A Week-long Youth Leadership Training In Hawassa.",
      animationDelay: "1200ms",
    },
    {
      id: 8,
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-18-8.png",
      title: "Tsd New Year's Program",
      description:
        "Tamra For Social Development (tsd) Has Kicked Off A Week-long Youth Leadership Training In Hawassa.",
      animationDelay: "1400ms",
    },
  ];

  return (
    <section className="flex flex-col w-full max-w-[1590px] mx-auto items-start gap-11 relative px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[46px] w-full">
        {newsItems.slice(0, 4).map((item) => (
          <Card
            key={item.id}
            className="w-full translate-y-[-1rem] animate-fade-in opacity-0 transition-transform hover:scale-105 duration-300 border-0"
            style={
              {
                "--animation-delay": item.animationDelay,
              } as React.CSSProperties
            }
          >
            <CardContent className="flex flex-col items-start gap-5 p-0">
              <img
                className="w-full h-[283px] rounded-2xl object-cover"
                alt="News event"
                src={item.image}
              />

              <div className="px-6 pb-6 flex flex-col gap-5">
                <h3 className="[font-family:'Roboto',Helvetica] font-medium text-black text-xl tracking-[0] leading-[20.2px]">
                  {item.title}
                </h3>

                <div className="w-full font-normal [font-family:'Roboto',Helvetica] text-base tracking-[0.80px] leading-[20.2px]">
                  <span className="font-light text-black tracking-[0.13px]">
                    {item.description}
                    <br />
                  </span>
                  <button className="text-[#4eb778] tracking-[0.13px] hover:underline transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[46px] w-full">
        {newsItems.slice(4, 8).map((item) => (
          <Card
            key={item.id}
            className="w-full translate-y-[-1rem] animate-fade-in opacity-0 transition-transform hover:scale-105 duration-300 border-0"
            style={
              {
                "--animation-delay": item.animationDelay,
              } as React.CSSProperties
            }
          >
            <CardContent className="flex flex-col items-start gap-5 p-0">
              <img
                className="w-full h-[283px] rounded-2xl object-cover"
                alt="News event"
                src={item.image}
              />

              <div className="px-6 pb-6 flex flex-col gap-5">
                <h3 className="[font-family:'Roboto',Helvetica] font-medium text-black text-xl tracking-[0] leading-[20.2px]">
                  {item.title}
                </h3>

                <div className="w-full font-normal [font-family:'Roboto',Helvetica] text-base tracking-[0.80px] leading-[20.2px]">
                  <span className="font-light text-black tracking-[0.13px]">
                    {item.description}
                    <br />
                  </span>
                  <button className="text-[#4eb778] tracking-[0.13px] hover:underline transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
