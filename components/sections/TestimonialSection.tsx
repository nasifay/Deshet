"use client";

import { useEffect, useState } from "react";
import { FaQuoteLeft, FaUser } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  _id: string;
  quote: string;
  name: string;
  title: string;
  organization?: string;
  image?: string;
  featured: boolean;
  order: number;
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  organization?: string;
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
  return (
    <div
      className={`relative flex flex-col items-center text-center rounded-xl transition-all duration-300 h-full ${
        isCenter
          ? "bg-primary-green text-white md:scale-105 pt-12 pb-20 px-8 shadow-lg z-10"
          : "bg-white text-gray-800 py-10 pb-20 px-8 shadow-[0_4px_25px_rgba(0,0,0,0.08)]"
      }`}
    >
      <FaQuoteLeft
        className={`text-[#FF8C00] text-3xl md:text-4xl mb-4 ${
          isCenter ? "opacity-100" : "opacity-90"
        }`}
      />

      <p
        className={`text-sm md:text-[14px] leading-relaxed font-medium ${
          isCenter ? "text-gray-100" : "text-gray-600"
        }`}
      >
        {quote}
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
          className={`text-xs ${isCenter ? "text-gray-600" : "text-gray-500"}`}
        >
          {title}
          {organization && ` / ${organization}`}
        </p>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/public/testimonials?featured=true");
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        setTestimonials(data.data);
      } else {
        // Fallback to default testimonials if none in database
        setTestimonials([
          {
            _id: "1",
            quote:
              "I Envision For Tamra, In The Future, A Leadership And Empowerment Hub, A Youth-Focused Resource Center In Ethiopia And Beyond.",
            name: "Kidist Belayneh",
            title: "County Program Manager",
            organization: "Norwegian Church Aid",
            featured: true,
            order: 0,
          },
          {
            _id: "2",
            quote:
              "I Hope To See More Of Them In Various Regions Around The World. I Wish Them Success Over The Next 25 Years, Strengthening Their Institutional Efforts And Continuing The Successful Journey That Started To Enhance The Lives Of Many Young People.",
            name: "Ephrem Burhan",
            title: "Executive Director",
            organization: "Tilant Youth Association",
            featured: true,
            order: 1,
          },
          {
            _id: "3",
            quote:
              "I Want To Express My Gratitude To The Integrated Social Development Organization, Which Has Been A Valuable Resource For Mothers, Youth, And Our Community Since It Was Founded.",
            name: "Adane T/georgis",
            title: "Shashemene City Administration",
            featured: true,
            order: 2,
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Use fallback testimonials on error
      setTestimonials([
        {
          _id: "1",
          quote:
            "I Envision For Tamra, In The Future, A Leadership And Empowerment Hub, A Youth-Focused Resource Center In Ethiopia And Beyond.",
          name: "Kidist Belayneh",
          title: "County Program Manager",
          organization: "Norwegian Church Aid",
          featured: true,
          order: 0,
        },
        {
          _id: "2",
          quote:
            "I Hope To See More Of Them In Various Regions Around The World. I Wish Them Success Over The Next 25 Years, Strengthening Their Institutional Efforts And Continuing The Successful Journey That Started To Enhance The Lives Of Many Young People.",
          name: "Ephrem Burhan",
          title: "Executive Director",
          organization: "Tilant Youth Association",
          featured: true,
          order: 1,
        },
        {
          _id: "3",
          quote:
            "I Want To Express My Gratitude To The Integrated Social Development Organization, Which Has Been A Valuable Resource For Mothers, Youth, And Our Community Since It Was Founded.",
          name: "Adane T/georgis",
          title: "Shashemene City Administration",
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
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-primary-green uppercase tracking-wider mb-16">
          TESTIMONIALS
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
