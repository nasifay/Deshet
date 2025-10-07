import Link from "next/link";
import Image from "next/image";
import React from "react";
import Button from "~/components/ui/Button";
import { Card, CardContent } from "~/components/ui/Card";

const newsArticles = [
  {
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    backgroundImage: "/images/news.jpg",
  },
  {
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    backgroundImage: "/images/news.jpg",
  },
  {
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    backgroundImage: "/images/news.jpg",
  },
  {
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
    backgroundImage: "/images/news.jpg",
  },
];

export default function NewsEventsSection() {
  return (
    <section className="w-full bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-6xl font-black text-[#268246] uppercase">
            NEWS AND EVENTS
          </h2>
          <a
            className="text-lg text-gray-500 hover:text-[#268246] transition-colors"
            href="/news"
          >
            See More
          </a>
        </div>

        {/* News Cards */}
        <div className="grid grid-cols-4 gap-6 mb-16">
          {newsArticles.map((article, index) => (
            <Card
              key={index}
              className="relative h-96 rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0">
                <Image
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  alt="News event"
                  src={article.backgroundImage}
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
              </div>

              <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-lg font-bold text-[#F09632] mb-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-sm text-white leading-relaxed">
                  {article.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="relative h-96 rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              className="w-full h-full object-cover"
              alt="Group of people"
              src="/images/cta.jpg"
              width={1200}
              height={400}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <h2 className="text-4xl font-bold text-white mb-8 max-w-4xl leading-tight">
              You can contribute to provide a place for children with special
              needs!
            </h2>

            <div className="flex gap-6">
              <Link href="/volunteer">
                <Button className="bg-[#F09632] hover:bg-[#e6870a] text-white px-8 py-4 rounded-2xl font-medium transition-colors">
                  Join as a volunteer
                </Button>
              </Link>

              <Button className="bg-white hover:bg-gray-50 text-[#268246] px-8 py-4 rounded-2xl font-medium transition-colors">
                Donate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
