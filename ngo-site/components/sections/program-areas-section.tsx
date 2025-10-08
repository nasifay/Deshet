"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const programsList: { title: string; image: string }[] = [
  {
    title: "Youth <br /> Empowerment & <br /> Peacebuilding",
    image: "/overview/1.png",
  },
  {
    title: "Sexual <br /> & Reproductive Health & <br /> Gender Equality",
    image: "/overview/2.png",
  },
  {
    title: "Climate Justice & <br /> Livelihoods",
    image: "/overview/3.png",
  },
  {
    title: "Children’s Rights <br /> Protection",
    image: "/overview/4.png",
  },
];

export default function ProgramAreasSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % programsList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full  rounded-2xl overflow-hidden group px-6 md:px-16 lg:px-20 xl:28 2xl:px-36">
      {/* Image Container */}
      <div className="relative w-full h-auto aspect-[1595/854] overflow-hidden rounded-2xl">
        {programsList.map((program, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-contain w-full h-auto aspect-[1595/854] rounded-2xl"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Text Content - Left Aligned */}
        <div className="absolute bottom-20 -translate-y-1/3 left-0 flex items-center z-10">
          <div className="ml-8 md:ml-12 lg:ml-16 text-white mt-20">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black leading-tight uppercase tracking-tight transition-opacity duration-1000"
              dangerouslySetInnerHTML={{
                __html: programsList[currentIndex].title,
              }}
            />
          </div>
        </div>

        {/* Orange Circle Icon - Bottom Left */}
        <button
          aria-label="Learn more"
          className={
            "absolute bottom-8 left-8 md:bottom-18 md:left-18 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary-orange hover:bg-[#db7f0c] active:scale-95 transition-all duration-300 shadow-[0_3px_10px_rgba(0,0,0,0.25)]"
          }
        >
          <ArrowUpRight
            size={20}
            strokeWidth={3}
            className="text-black/85 opacity-85"
          />
        </button>
      </div>
    </div>
  );
}
