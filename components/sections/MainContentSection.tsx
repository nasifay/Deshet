"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/Card";

interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  category: string;
}

export const MainContentSection = () => {
  const [newsItems, setNewsItems] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/public/news?limit=8&sort=-publishedAt');
        const data = await response.json();
        if (data.success) {
          setNewsItems(data.data);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const animationDelays = ["0ms", "200ms", "400ms", "600ms", "800ms", "1000ms", "1200ms", "1400ms"];

  if (loading) {
    return (
      <section className="flex flex-col w-full max-w-[1590px] mx-auto items-start gap-11 relative px-4">
        <div className="flex items-center justify-center w-full py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4eb778]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full max-w-[1590px] mx-auto items-start gap-11 relative px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[46px] w-full">
        {newsItems.slice(0, 4).map((item, index) => (
          <Card
            key={item._id}
            className="w-full translate-y-[-1rem] animate-fade-in opacity-0 transition-transform hover:scale-105 duration-300 border-0"
            style={
              {
                "--animation-delay": animationDelays[index],
              } as React.CSSProperties
            }
          >
            <Link href={`/news/${item.slug}`}>
              <CardContent className="flex flex-col items-start gap-5 p-0">
                <img
                  className="w-full h-[283px] rounded-2xl object-cover"
                  alt="News event"
                  src={item.featuredImage || "/images/news.jpg"}
                />

                <div className="px-6 pb-6 flex flex-col gap-5">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-[#4eb778] rounded mb-2">
                      {item.category}
                    </span>
                    <h3 className="[font-family:'Roboto',Helvetica] font-medium text-black text-xl tracking-[0] leading-[20.2px]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-full font-normal [font-family:'Roboto',Helvetica] text-base tracking-[0.80px] leading-[20.2px]">
                    <span className="font-light text-black tracking-[0.13px]">
                      {item.excerpt}
                      <br />
                    </span>
                    <span className="text-[#4eb778] tracking-[0.13px] hover:underline transition-colors cursor-pointer">
                      Read More
                    </span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[46px] w-full">
        {newsItems.slice(4, 8).map((item, index) => (
          <Card
            key={item._id}
            className="w-full translate-y-[-1rem] animate-fade-in opacity-0 transition-transform hover:scale-105 duration-300 border-0"
            style={
              {
                "--animation-delay": animationDelays[index + 4],
              } as React.CSSProperties
            }
          >
            <Link href={`/news/${item.slug}`}>
              <CardContent className="flex flex-col items-start gap-5 p-0">
                <img
                  className="w-full h-[283px] rounded-2xl object-cover"
                  alt="News event"
                  src={item.featuredImage || "/images/news.jpg"}
                />

                <div className="px-6 pb-6 flex flex-col gap-5">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-[#4eb778] rounded mb-2">
                      {item.category}
                    </span>
                    <h3 className="[font-family:'Roboto',Helvetica] font-medium text-black text-xl tracking-[0] leading-[20.2px]">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-full font-normal [font-family:'Roboto',Helvetica] text-base tracking-[0.80px] leading-[20.2px]">
                    <span className="font-light text-black tracking-[0.13px]">
                      {item.excerpt}
                      <br />
                    </span>
                    <span className="text-[#4eb778] tracking-[0.13px] hover:underline transition-colors cursor-pointer">
                      Read More
                    </span>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {newsItems.length === 0 && !loading && (
        <div className="text-center w-full py-10">
          <p className="text-gray-500">No news posts available yet.</p>
        </div>
      )}
    </section>
  );
};
