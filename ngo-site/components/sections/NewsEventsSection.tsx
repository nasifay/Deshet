import React from "react";
import { Button } from "~/components/ui/Button";
import { Card, CardContent } from "~/components/ui/Card";

export const NewsEventsSection = () => {
  const eventsData = [
    {
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-17.png",
      description:
        "Tamra For Social Development (tsd) Has Kicked Off A Week-long Youth Leadership Training In Hawassa.",
    },
    {
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-18.png",
      description:
        "Tamra For Social Development (tsd) Has Kicked Off A Week-long Youth Leadership Training In Hawassa.",
    },
  ];

  const recentNewsData = [
    {
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-15.png",
      title: "Tsd New Year's Program",
    },
    {
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-15-1.png",
      title: "Tsd New Year's Program",
    },
    {
      image: "https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-15-2.png",
      title: "Tsd New Year's Program",
    },
  ];

  return (
    <section className="w-full flex justify-center py-[88px] px-[65px] translate-y-[-1rem] animate-fade-in opacity-0">
      <Card className="w-full max-w-[1595px] bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0">
        <CardContent className="p-[65px]">
          <div className="flex flex-col lg:flex-row gap-[61px] items-start">
            {/* Events Section */}
            <div className="flex flex-col items-center gap-5 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] flex-1">
              <div className="flex flex-col items-start gap-2.5 w-full">
                <h2 className="[font-family:'Roboto',Helvetica] font-medium text-black text-[32px] tracking-[0] leading-[32.3px] whitespace-nowrap">
                  Events
                </h2>

                <div className="flex flex-col gap-2.5 w-full">
                  {eventsData.map((event, index) => (
                    <Card
                      key={index}
                      className="border-0 shadow-none bg-transparent p-0"
                    >
                      <CardContent className="p-0 flex flex-col gap-2.5">
                        <img
                          className="w-[248px] h-[138px] rounded-xl object-cover"
                          alt="Event"
                          src={event.image}
                        />
                        <div className="w-[248px] [font-family:'Roboto',Helvetica] font-normal text-sm text-justify tracking-[0.80px] leading-[17.6px]">
                          <span className="font-light text-black tracking-[0.11px]">
                            {event.description}
                            <br />
                          </span>
                          <Button
                            variant="link"
                            className="text-[#4eb778] tracking-[0.11px] p-0 h-auto font-normal text-sm"
                          >
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Article Section */}
            <div className="flex flex-col w-[656px] h-[539px] gap-[13px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
              <Card className="border-0 shadow-none bg-transparent p-0 rounded-[24px] h-full">
                <CardContent className="p-0 pb-[35px] h-full flex flex-col">
                  <img
                    className="w-full h-[305px] rounded-2xl object-cover"
                    alt="Featured article"
                    src="https://c.animaapp.com/mg8i4bgw8CQdb4/img/rectangle-16.png"
                  />
                  <div className="flex flex-col gap-[13px] px-2.5 py-0 pt-[13px]">
                    <h2 className="w-full [font-family:'Roboto',Helvetica] font-medium text-black text-[32px] tracking-[0] leading-[32.3px]">
                      Tsd Launches New Youth Leadership Training In Hawassa
                    </h2>
                    <div className="[font-family:'Roboto',Helvetica] font-medium text-black text-base tracking-[0] leading-[16.2px]">
                      August 25, 2025
                    </div>
                    <p className="font-light text-black text-justify [font-family:'Roboto',Helvetica] text-base tracking-[0.80px] leading-[20.2px]">
                      Tamra For Social Development (tsd) Has Kicked Off A
                      Week-long Youth Leadership Training In Hawassa. Over 80
                      Young People, Including Women And Youth With Disabilities,
                      Are Participating In The Program Designed To Strengthen
                      Civic Engagement And Leadership Skills.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent News Section */}
            <div className="flex flex-col gap-[26px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] flex-1">
              <h2 className="[font-family:'Roboto',Helvetica] font-medium text-black text-[32px] tracking-[0] leading-[32.3px] whitespace-nowrap">
                Recent News
              </h2>

              <div className="flex flex-col gap-0">
                {recentNewsData.map((news, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-none bg-transparent p-0"
                  >
                    <CardContent className="flex items-start gap-2.5 px-0 py-2.5 border-b border-[#a19e9d]">
                      <img
                        className="w-[113px] h-[97px] rounded-lg object-cover flex-shrink-0"
                        alt="News"
                        src={news.image}
                      />
                      <div className="w-[140px] [font-family:'Roboto',Helvetica] font-medium text-black text-base tracking-[0] leading-[16.2px]">
                        {news.title}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
