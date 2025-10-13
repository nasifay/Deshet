"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { cn } from "~/lib/utils";

interface NewsItem {
  _id?: string;
  slug?: string;
  featuredImage?: string;
  title: string;
  excerpt?: string;
}

interface NewsEventsSectionProps {
  news?: NewsItem[];
  title?: string;
}

export default function NewsAndEvents({
  news = [
    {
      featuredImage: "/news-and-events/1.png",
      title: "TSD Launches New Youth Leadership Training in Hawassa",
      excerpt:
        "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    },
    {
      featuredImage: "/news-and-events/2.png",
      title: "TSD Launches New Youth Leadership Training in Hawassa",
      excerpt:
        "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    },
    {
      featuredImage: "/news-and-events/3.png",
      title: "TSD Launches New Youth Leadership Training in Hawassa",
      excerpt:
        "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    },
    {
      featuredImage: "/news-and-events/4.png",
      title: "TSD Launches New Youth Leadership Training in Hawassa",
      excerpt:
        "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    },
  ],
  title = "NEWS AND EVENTS",
}: NewsEventsSectionProps) {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20 lg:px-20 xl:28 2xl:px-36 font-['Roboto']">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="justify-self-center self-center text-center text-4xl md:text-5xl font-extrabold text-[#268246] tracking-tight">
            {title}
          </h2>
          <Link
            href="/news"
            className=" hidden sm:block text-gray-500 hover:text-[#268246] text-sm font-medium transition-colors duration-200"
          >
            See More
          </Link>
        </div>

        {/* News Grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6",
            news.length >= 4
              ? "md:grid-cols-3 lg:grid-colos-4"
              : news.length >= 3
              ? "md:grid-cols-3 lg:grid-cols-3"
              : news.length >= 2
              ? "md:grid-cols-2 lg:grid-cols-2"
              : "md:grid-cols-1 lg:grid-cols-1"
          )}
        >
          {news.map((item, index) => (
            <Link
              key={item._id || index}
              href={`/news/${item.slug || "#"}`}
              className="relative group overflow-hidden rounded-2xl bg-black block"
            >
              <div className="relative w-auto h-60 md:h-96 ">
                <Image
                  src={item.featuredImage || "/news-and-events/1.png"}
                  alt={item.title}
                  fill
                  className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-2xl" />
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-[13px] md:text-sm font-semibold text-[#FFB400] leading-snug mb-1 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[12px] md:text-sm text-white/85 leading-snug line-clamp-3">
                  {item.excerpt || ""}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center mt-4">
          <Link href="/news">
            <Button
              variant="outline"
              className="bg-transparent text-black block sm:hidden  hover:text-[#268246] text-sm font-medium transition-colors duration-200"
            >
              See More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
