"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/Button";
import { Card, CardContent } from "~/components/ui/Card";

interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
}

export const NewsEventsSection = () => {
  const [eventsData, setEventsData] = useState<NewsPost[]>([]);
  const [recentNewsData, setRecentNewsData] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch events (category = "Events")
        const eventsResponse = await fetch(
          "/api/public/news?category=Events&limit=2&sort=-publishedAt"
        );
        const eventsData = await eventsResponse.json();

        // Fetch recent news (all categories, limit 3)
        const recentResponse = await fetch(
          "/api/public/news?limit=3&sort=-publishedAt"
        );
        const recentData = await recentResponse.json();

        if (eventsData.success) {
          setEventsData(eventsData.data);
        }

        if (recentData.success) {
          setRecentNewsData(recentData.data);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="w-full flex justify-center py-8 px-4 sm:py-12 sm:px-8 md:py-16 md:px-12 lg:py-[88px] lg:px-[65px] translate-y-[-1rem] animate-fade-in opacity-0">
        <Card className="w-full max-w-full md:max-w-[1595px] bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0">
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-[65px]">
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#128341]"></div>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="w-full flex justify-center py-8 px-4 sm:py-12 sm:px-8 md:py-16 md:px-12 lg:py-[88px] lg:px-[65px] translate-y-[-1rem] animate-fade-in opacity-0">
      <Card className="w-full max-w-full md:max-w-[1595px] bg-white rounded-[20px] sm:rounded-[30px] lg:rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] border-0">
        <CardContent className="p-4 sm:p-6 md:p-8 lg:p-[65px]">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-[61px] items-start">
            {/* Events Section */}
            <div className="flex flex-col items-center gap-5 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] flex-1">
              <div className="flex flex-col items-start gap-2.5 w-full">
                <h2 className="[font-family:'Roboto',Helvetica] font-medium text-black text-xl sm:text-2xl lg:text-[32px] tracking-[0] leading-[32.3px] whitespace-nowrap">
                  Events
                </h2>

                <div className="flex flex-col gap-2.5 w-full">
                  {eventsData.map((event, index) => (
                    <Link key={event._id} href={`/news/${event.slug}`}>
                      <Card className="border-0 shadow-none bg-transparent p-0 hover:bg-gray-50 transition-colors cursor-pointer">
                        <CardContent className="p-0 flex flex-col gap-2.5">
                          <img
                            className="w-full max-w-[200px] sm:max-w-[248px] h-auto aspect-[248/138] rounded-xl object-cover"
                            alt="Event"
                            src={event.featuredImage || "/images/news.jpg"}
                          />
                          <div className="w-full [font-family:'Roboto',Helvetica] font-normal text-sm text-justify tracking-[0.80px] leading-[17.6px]">
                            <span className="font-light text-black tracking-[0.11px]">
                              {event.excerpt}
                              <br />
                            </span>
                            <span className="text-[#4eb778] tracking-[0.11px] hover:underline transition-colors cursor-pointer">
                              Read More
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  {eventsData.length === 0 && (
                    <p className="text-gray-500 text-sm">
                      No events available yet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Article Section */}
            <div className="flex flex-col w-full lg:w-[656px] h-auto lg:h-[539px] gap-[13px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
              {recentNewsData.length > 0 && (
                <Link href={`/news/${recentNewsData[0].slug}`}>
                  <Card className="border-0 shadow-none bg-transparent p-0 rounded-[24px] h-full hover:bg-gray-50 transition-colors cursor-pointer">
                    <CardContent className="p-0 pb-[35px] h-full flex flex-col">
                      <img
                        className="w-full h-[200px] sm:h-[250px] lg:h-[305px] rounded-2xl object-cover"
                        alt="Featured article"
                        src={
                          recentNewsData[0].featuredImage || "/images/news.jpg"
                        }
                      />
                      <div className="flex flex-col gap-[13px] px-2.5 py-0 pt-[13px]">
                        <h2 className="w-full [font-family:'Roboto',Helvetica] font-medium text-black text-xl sm:text-2xl lg:text-[32px] tracking-[0] leading-[32.3px]">
                          {recentNewsData[0].title}
                        </h2>
                        <div className="[font-family:'Roboto',Helvetica] font-medium text-black text-sm sm:text-base tracking-[0] leading-[16.2px]">
                          Featured Article
                        </div>
                        <p className="font-light text-black text-justify [font-family:'Roboto',Helvetica] text-sm sm:text-base tracking-[0.80px] leading-[20.2px]">
                          {recentNewsData[0].excerpt}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>

            {/* Recent News Section */}
            <div className="flex flex-col gap-[26px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] flex-1">
              <h2 className="[font-family:'Roboto',Helvetica] font-medium text-black text-xl sm:text-2xl lg:text-[32px] tracking-[0] leading-[32.3px] whitespace-nowrap">
                Recent News
              </h2>

              <div className="flex flex-col gap-0">
                {recentNewsData.map((news, index) => (
                  <Link key={news._id} href={`/news/${news.slug}`}>
                    <Card className="border-0 shadow-none bg-transparent p-0 hover:bg-gray-50 transition-colors cursor-pointer">
                      <CardContent className="flex items-start gap-2.5 px-0 py-2.5 border-b border-[#a19e9d]">
                        <img
                          className="w-[80px] h-[70px] sm:w-[100px] sm:h-[85px] lg:w-[113px] lg:h-[97px] rounded-lg object-cover flex-shrink-0"
                          alt="News"
                          src={news.featuredImage || "/images/news.jpg"}
                        />
                        <div className="w-full sm:w-[120px] lg:w-[140px] [font-family:'Roboto',Helvetica] font-medium text-black text-sm sm:text-base tracking-[0] leading-[16.2px]">
                          {news.title}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                {recentNewsData.length === 0 && (
                  <p className="text-gray-500 text-sm">
                    No recent news available yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
