"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

const newsCards = [
  {
    image: "/news-and-events/1.png",
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
  },
  {
    image: "/news-and-events/2.png",
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
  },
  {
    image: "/news-and-events/3.png",
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
  },
  {
    image: "/news-and-events/4.png",
    title: "TSD Launches New Youth Leadership Training in Hawassa",
    description:
      "Tamra for Social Development (TSD) has kicked off a week-long Youth Leadership Training in Hawassa...",
  },
];

export default function NewsAndEvents() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-20 lg:px-20 xl:28 2xl:px-36 font-['Roboto']">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="justify-self-center self-center text-center text-4xl md:text-5xl font-extrabold text-[#268246] tracking-tight">
            NEWS AND EVENTS
          </h2>
          <Link
            href="#"
            className=" hidden sm:block text-gray-500 hover:text-[#268246] text-sm font-medium transition-colors duration-200"
          >
            See More
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 wxga:grid-cols-4 gap-6">
          {newsCards.map((card, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl bg-black"
            >
              <div className="relative w-auto h-60 md:h-96 ">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent rounded-2xl" />
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-[13px] md:text-sm font-semibold text-[#FFB400] leading-snug mb-1 line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-[12px] md:text-sm text-white/85 leading-snug line-clamp-3">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-4">
          <Button
            variant="outline"
            className="bg-transparent text-black block sm:hidden  hover:text-[#268246] text-sm font-medium transition-colors duration-200"
          >
            See More
          </Button>
        </div>
      </div>
    </section>
  );
}
