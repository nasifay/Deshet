"use client";
import { ArrowUpRight, Leaf, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollStack from "~/components/ui/ScrollStack";
import { useState, useEffect, useRef } from "react";
import { ProgramAreasSkeleton } from "./landing-page-skeleton";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

interface Service {
  title: string | { en: string; am: string };
  image: string;
  link?: string;
}

export default function ServicesSection() {
  const { t, locale } = useTranslation();
  const [services, setServices] = useState<Service[]>([
    {
      title: {
        en: "Traditional Consultation",
        am: "ባህላዊ ምክክር",
      },
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      link: "/programs",
    },
    {
      title: {
        en: "Herbal Medicine",
        am: "የአመዳድብ ሕክምና",
      },
      image: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      link: "/programs",
    },
    {
      title: {
        en: "Detox Therapy",
        am: "የሰውነት ማጽዳት ሕክምና",
      },
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      link: "/programs",
    },
    {
      title: {
        en: "Diagnostic Techniques",
        am: "የመመርመር ዘዴዎች",
      },
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
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
            (s: any) => s.type === "ServicesSection" || s.type === "ProgramAreasSection"
          );
          if (section?.data?.services || section?.data?.programs) {
            // Use data from API if available
            setServices(section.data.services || section.data.programs);
          }
        }
      } catch (error) {
        console.error("Error fetching services data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  if (loading) {
    return <ProgramAreasSkeleton />;
  }

  // Transform services into ScrollStack items
  const stackItems = services.map((service, index) => {
    // Extract bilingual title based on current locale
    const titleText = getBilingualText(
      service.title as string | { en: string; am: string } | undefined,
      locale,
      typeof service.title === 'string' ? service.title : "Service"
    );
    
    // Get image - use placeholder if not provided or if it's an old NGO image
    const imageUrl = service.image || 
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3";
    
    return {
      id: `service-${index}`,
      content: (
        <div className="relative w-full h-auto sm:h-[70vh] md:h-[80vh] px-6 md:px-16 lg:px-20 xl:px-28 2xl:px-36">
          <div className="relative w-full h-[400px] sm:h-full overflow-hidden rounded-2xl shadow-2xl group">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={imageUrl}
                alt={titleText}
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
                  locale === 'am' ? 'font-amharic' : ''
                }`}
              >
                {titleText}
              </h2>

              {/* Action Button */}
              {service.link && (
                <Link
                  href={service.link}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary-green hover:bg-[#0e6a32] active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl self-start"
                  aria-label={`Learn more about ${titleText}`}
                >
                  <ArrowUpRight
                    size={20}
                    strokeWidth={3}
                    className="text-white"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="w-full py-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Scroll Stack */}
      <ScrollStack items={stackItems} className="" opacityAnimation={false} />
    </div>
  );
}

