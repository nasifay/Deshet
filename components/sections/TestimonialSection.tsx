"use client";

import { useEffect, useState } from "react";
import { FaQuoteLeft, FaUser } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { useTranslation } from "~/lib/i18n/hooks";
import { getBilingualText } from "~/lib/i18n/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  _id: string;
  quote: string | { en: string; am: string };
  name: string;
  title: string | { en: string; am: string };
  organization?: string | { en: string; am: string };
  image?: string;
  featured: boolean;
  order: number;
}

interface TestimonialCardProps {
  quote: string | { en: string; am: string };
  name: string;
  title: string | { en: string; am: string };
  organization?: string | { en: string; am: string };
  image?: string;
  isCenter?: boolean;
}

const TestimonialCard = ({
  quote,
  name,
  title,
  organization,
  image,
  isCenter = false,
}: TestimonialCardProps) => {
  const { locale } = useTranslation();
  
  const quoteText = getBilingualText(
    quote as string | { en: string; am: string } | undefined,
    locale,
    ""
  );
  const titleText = getBilingualText(
    title as string | { en: string; am: string } | undefined,
    locale,
    ""
  );
  const organizationText = organization
    ? getBilingualText(
        organization as string | { en: string; am: string } | undefined,
        locale,
        ""
      )
    : "";

  return (
    <div
      className={`relative flex flex-col items-center text-center rounded-xl transition-all duration-300 h-full ${
        isCenter
          ? "bg-primary-green text-white md:scale-105 pt-12 pb-20 px-8 shadow-lg z-10"
          : "bg-white text-gray-800 py-10 pb-20 px-8 shadow-[0_4px_25px_rgba(0,0,0,0.08)]"
      }`}
    >
      <FaQuoteLeft
        className={`text-3xl md:text-4xl mb-4 ${
          isCenter 
            ? "text-white opacity-100" 
            : "text-primary-green opacity-90"
        }`}
      />

      <p
        className={`text-sm md:text-[14px] leading-relaxed font-medium ${
          isCenter ? "text-gray-100" : "text-gray-600"
        } ${locale === "am" ? "font-amharic" : ""}`}
      >
        {quoteText}
      </p>

      {/* Avatar */}
      <div className="absolute -bottom-8 translate-y-1/2 flex flex-col items-center z-20">
        <div
          className={`flex items-center justify-center rounded-full overflow-hidden ${
            isCenter
              ? "bg-white w-20 h-20 border-1 border-primary-green"
              : "bg-primary-green size-[75px]"
          }`}
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUser
              className={`${
                isCenter ? "text-primary-green text-3xl" : "text-white text-2xl"
              }`}
            />
          )}
        </div>
        <h3
          className={`mt-4 font-semibold text-[14px] ${
            isCenter ? "text-gray-800" : "text-gray-800"
          }`}
        >
          {name}
        </h3>
        <p
          className={`text-xs ${isCenter ? "text-gray-600" : "text-gray-500"} ${
            locale === "am" ? "font-amharic" : ""
          }`}
        >
          {titleText}
          {organizationText && ` / ${organizationText}`}
        </p>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const { t, locale } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [sectionTitle, setSectionTitle] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, [locale]);

  const fetchTestimonials = async () => {
    try {
      // Try to get section title from landing page CMS
      const landingResponse = await fetch("/api/public/landing");
      const landingResult = await landingResponse.json();

      if (landingResult.success) {
        const section = landingResult.data?.sections?.find(
          (s: any) => s.type === "TestimonialsSection"
        );
        if (section?.data?.title) {
          setSectionTitle(
            getBilingualText(
              section.data.title,
              locale,
              locale === "am" ? "የደንበኞች አስተያየቶች" : "TESTIMONIALS"
            )
          );
        }
      }

      const response = await fetch("/api/public/testimonials?featured=true");
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        setTestimonials(data.data);
      } else {
        // Fallback to Deshet Medical Center testimonials if none in database
        setTestimonials([
          {
            _id: "1",
            quote: {
              en: "Deshet Medical Center has been a blessing for my family. The traditional medicine treatments have helped us in ways modern medicine couldn't. The practitioners are knowledgeable and truly care about their patients.",
              am: "ደሸት የሕክምና ማዕከል ለቤተሰቤ በረከት ነው። የባህላዊ ሕክምና ሕክምናዎች ዘመናዊ ሕክምና ያልቻለውን በሁኔታዎች ረድተናል። ሐኪሞቹ የተማሩ እና ስለ ታካሚዎቻቸው በእውነት ይጨነቃሉ።",
            },
            name: "Alemayehu Bekele",
            title: {
              en: "Patient",
              am: "ታካሚ",
            },
            organization: {
              en: "Addis Ababa",
              am: "አዲስ አበባ",
            },
            featured: true,
            order: 0,
          },
          {
            _id: "2",
            quote: {
              en: "I have been coming to Deshet for over 5 years. The herbal remedies and spiritual healing services have transformed my health. The center combines traditional wisdom with modern care, which is exactly what we need.",
              am: "ከ5 ዓመታት በላይ ወደ ደሸት እየመጣሁ ነው። የአመዳድብ መድሃኒቶች እና የመንፈሳዊ ሕክምና አገልግሎቶች ጤናዬን ለወጡ። ማዕከሉ ባህላዊ ጥበብን ከዘመናዊ እንክብካቤ ጋር ያጣምራል።",
            },
            name: "Mulugeta Tadesse",
            title: {
              en: "Regular Patient",
              am: "የተለመደ ታካሚ",
            },
            organization: {
              en: "Traditional Medicine Advocate",
              am: "የባህላዊ ሕክምና ደጋፊ",
            },
            featured: true,
            order: 1,
          },
          {
            _id: "3",
            quote: {
              en: "The expertise and care at Deshet Medical Center is unmatched. They have helped me with chronic conditions using traditional Ethiopian medicine. I highly recommend their services to anyone seeking authentic traditional healing.",
              am: "በደሸት የሕክምና ማዕከል ያለው ሙያ እና እንክብካቤ ማነጻጸር የለውም። የኢትዮጵያ ባህላዊ ሕክምናን በመጠቀም ከረዥም ጊዜ የቆዩ ሁኔታዎች ረድተዋል። እውነተኛ ባህላዊ ሕክምና ለሚፈልጉ ሁሉ አገልግሎታቸውን በጣም እመክራለሁ።",
            },
            name: "Tigist Hailu",
            title: {
              en: "Satisfied Patient",
              am: "የተደሰተ ታካሚ",
            },
            organization: {
              en: "Health & Wellness Enthusiast",
              am: "የጤና እና ደህንነት ተከታታይ",
            },
            featured: true,
            order: 2,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Use fallback Deshet testimonials on error
      setTestimonials([
        {
          _id: "1",
          quote: {
            en: "Deshet Medical Center has been a blessing for my family. The traditional medicine treatments have helped us in ways modern medicine couldn't.",
            am: "ደሸት የሕክምና ማዕከል ለቤተሰቤ በረከት ነው። የባህላዊ ሕክምና ሕክምናዎች ዘመናዊ ሕክምና ያልቻለውን በሁኔታዎች ረድተናል።",
          },
          name: "Alemayehu Bekele",
          title: {
            en: "Patient",
            am: "ታካሚ",
          },
          featured: true,
          order: 0,
        },
        {
          _id: "2",
          quote: {
            en: "I have been coming to Deshet for over 5 years. The herbal remedies and spiritual healing services have transformed my health.",
            am: "ከ5 ዓመታት በላይ ወደ ደሸት እየመጣሁ ነው። የአመዳድብ መድሃኒቶች እና የመንፈሳዊ ሕክምና አገልግሎቶች ጤናዬን ለወጡ።",
          },
          name: "Mulugeta Tadesse",
          title: {
            en: "Regular Patient",
            am: "የተለመደ ታካሚ",
          },
          featured: true,
          order: 1,
        },
        {
          _id: "3",
          quote: {
            en: "The expertise and care at Deshet Medical Center is unmatched. They have helped me with chronic conditions using traditional Ethiopian medicine.",
            am: "በደሸት የሕክምና ማዕከል ያለው ሙያ እና እንክብካቤ ማነጻጸር የለውም። የኢትዮጵያ ባህላዊ ሕክምናን በመጠቀም ከረዥም ጊዜ የቆዩ ሁኔታዎች ረድተዋል።",
          },
          name: "Tigist Hailu",
          title: {
            en: "Satisfied Patient",
            am: "የተደሰተ ታካሚ",
          },
          featured: true,
          order: 2,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-white overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className={`text-center text-3xl md:text-4xl font-extrabold text-primary-green uppercase tracking-wider mb-16 ${
            locale === "am" ? "font-amharic" : ""
          }`}
        >
          {sectionTitle ||
            getBilingualText(
              undefined,
              locale,
              locale === "am" ? "የደንበኞች አስተያየቶች" : "TESTIMONIALS"
            )}
        </h1>

        <div className="mt-8 pb-20 -mx-4 sm:mx-0">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className="testimonials-swiper pb-20 px-4 sm:px-0"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial._id} className="pb-16">
                <TestimonialCard
                  quote={testimonial.quote}
                  name={testimonial.name}
                  title={testimonial.title}
                  organization={testimonial.organization}
                  image={testimonial.image}
                  isCenter={index === 1}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
