"use client";
import { Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollStack from "~/components/ui/ScrollStack";
import { useState, useEffect, useRef } from "react";
import { ProgramAreasSkeleton } from "./landing-page-skeleton";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

export default function ProgramAreasSection() {
  const { locale } = useTranslation();
  const [programs, setPrograms] = useState<
    Array<{ title: string | { en: string; am: string }; image: string; link?: string }>
  >([
    {
      title: {
        en: "Traditional Medical <br /> Consultation",
        am: "ባህላዊ የሕክምና <br /> ምክክር",
      },
      image: "/overview/1.png",
      link: "/programs",
    },
    {
      title: {
        en: "Herbal Medicine <br /> Preparation",
        am: "የአመዳድብ ሕክምና <br /> ዝግጅት",
      },
      image: "/overview/2.png",
      link: "/programs",
    },
    {
      title: {
        en: "Detox & Cleansing <br /> Therapy",
        am: "የመጥለፍት እና ማጽዳት <br /> ሕክምና",
      },
      image: "/overview/3.png",
      link: "/programs",
    },
    {
      title: {
        en: "Traditional Diagnostic <br /> Techniques",
        am: "ባህላዊ የመለኪያ <br /> ቴክኒኮች",
      },
      image: "/overview/4.png",
      link: "/programs",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
          if (section?.data?.programs && section.data.programs.length > 0) {
            // Normalize programs to ensure bilingual format
            const normalizedPrograms = section.data.programs.map((p: any) => ({
              ...p,
              title: typeof p.title === "string" 
                ? { en: p.title, am: p.title } 
                : p.title || { en: "", am: "" },
            }));
            setPrograms(normalizedPrograms);
          }
          // If no data in CMS, keep default programs
        }
      } catch (error) {
        console.error("Error fetching programs data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Only render if we have programs or are still loading
  if (loading) {
    return <ProgramAreasSkeleton />;
  }

  // Don't render if no programs exist
  if (!programs || programs.length === 0) {
    return null;
  }

  // Transform programs into ScrollStack items
  const stackItems = programs.map((program, index) => {
    // Get bilingual title text
    const titleText = getBilingualText(
      program.title,
      locale,
      typeof program.title === "string" ? program.title : program.title.en || ""
    );
    
    // Clean title for alt text (remove HTML tags)
    const cleanTitle = titleText.replace(/<br \/>/g, " ").replace(/<br\/>/g, " ");
    
    return {
      id: `program-${index}`,
      content: (
        <div className="relative w-full h-auto sm:h-[70vh] md:h-[80vh] px-6 md:px-16 lg:px-20 xl:px-28 2xl:px-36">
          <div className="relative w-full h-[400px] sm:h-full overflow-hidden rounded-2xl shadow-2xl group">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={program.image}
                alt={cleanTitle}
                fill
                className="object-cover sm:object-cover transition-transform duration-700 group-hover:scale-105"
                priority={index === 0}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative h-[400px] sm:h-full flex flex-col justify-end p-6 md:p-12 lg:p-16">
              {/* Title */}
              <h2
                className={`text-lg sm:text-xl md:text-4xl lg:text-5xl 2xl:text-7xl font-black leading-tight uppercase tracking-tight text-white mb-6 md:mb-8 drop-shadow-lg ${
                  locale === "am" ? "font-amharic" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: titleText,
                }}
              />

            {/* Action Button */}
            {program.link && (
              <Link
                href={program.link}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary-orange hover:bg-[#db7f0c] active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl self-start"
                aria-label={`Learn more about ${cleanTitle}`}
              >
                <Leaf
                  size={20}
                  strokeWidth={3}
                  className="text-black/85"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="w-full py-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Section Header */}

      {/* Scroll Stack */}
      <ScrollStack items={stackItems} className="" opacityAnimation={false} />
    </div>
  );
}
