"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollStack from "~/components/ui/ScrollStack";
import { useState, useEffect } from "react";
import { ProgramAreasSkeleton } from "./landing-page-skeleton";

export default function ProgramAreasSection() {
  const [programs, setPrograms] = useState<
    Array<{ title: string; image: string; link?: string }>
  >([
    {
      title: "Youth <br /> Empowerment & <br /> Peacebuilding",
      image: "/overview/1.png",
      link: "/programs",
    },
    {
      title: "Sexual <br /> & Reproductive Health & <br /> Gender Equality",
      image: "/overview/2.png",
      link: "/programs",
    },
    {
      title: "Climate Justice & <br /> Livelihoods",
      image: "/overview/3.png",
      link: "/programs",
    },
    {
      title: "Children's Rights <br /> Protection",
      image: "/overview/4.png",
      link: "/programs",
    },
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public/landing");
        const result = await response.json();

        if (result.success) {
          const section = result.data?.sections?.find(
            (s: any) => s.type === "ProgramAreasSection"
          );
          if (section?.data?.programs) {
            setPrograms(section.data.programs);
          }
        }
      } catch (error) {
        console.error("Error fetching programs data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ProgramAreasSkeleton />;
  }

  // Transform programs into ScrollStack items
  const stackItems = programs.map((program, index) => ({
    id: `program-${index}`,
    content: (
      <div className="relative w-full h-[70vh] md:h-[80vh] px-6 md:px-16 lg:px-20 xl:px-28 2xl:px-36">
        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl group">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={program.image}
              alt={program.title.replace(/<br \/>/g, " ")}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={index === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </div>

          {/* Content Container */}
          <div className="relative h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
            {/* Title */}
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black leading-tight uppercase tracking-tight text-white mb-6 md:mb-8 drop-shadow-lg"
              dangerouslySetInnerHTML={{
                __html: program.title,
              }}
            />

            {/* Action Button */}
            {program.link && (
              <Link
                href={program.link}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary-orange hover:bg-[#db7f0c] active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl self-start"
                aria-label={`Learn more about ${program.title.replace(
                  /<br \/>/g,
                  " "
                )}`}
              >
                <ArrowUpRight
                  size={20}
                  strokeWidth={3}
                  className="text-black/85"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="w-full py-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Section Header */}

      {/* Scroll Stack */}
      <ScrollStack
        items={stackItems}
        className="min-h-[400vh]"
        opacityAnimation={false}
      />
    </div>
  );
}
