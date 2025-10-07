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
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade-out
      setFade(true);

      // Wait for fade-out to finish, then change image
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % programsList.length);
        setFade(false);
      }, 700); // match fade duration
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-7xl rounded-2xl overflow-hidden  group">
      <div
        className={`transition-all duration-500 ease-in-out ${
          fade ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      >
        {/* Image */}
        <div className="relative w-full  h-auto aspect-[1595/854] overflow-hidden rounded-2xl">
          <Image
            src={programsList[currentIndex].image}
            alt={programsList[currentIndex].title}
            fill
            className="object-contain w-full h-auto aspect-[1595/854] rounded-2xl"
            priority
          />
        </div>

        {/* <div className="absolute inset-0 bg-black/40"></div> */}

        {/* Text Content - Left Aligned */}
        <div className="absolute bottom-20 -translate-y-1/3 left-0 flex items-center z-10">
          <div className="ml-8 md:ml-12 lg:ml-16 text-white mt-20">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black leading-tight uppercase tracking-tight"
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
