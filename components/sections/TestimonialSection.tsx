"use client";

import { FaQuoteLeft, FaUser } from "react-icons/fa";

const TestimonialCard = ({ quote, name, title, isCenter = false }) => {
  return (
    <div
      className={`relative flex flex-col items-center text-center rounded-xl transition-all duration-300 ${
        isCenter
          ? "bg-[#1A7D36] text-white md:scale-105 py-12 px-8 shadow-lg z-10"
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
      <div className="absolute -bottom-8 translate-y-1/2 flex flex-col items-center">
        <div
          className={`flex items-center justify-center rounded-full ${
            isCenter
              ? "bg-white w-20 h-20 border-4 border-[#1A7D36]"
              : "bg-[#1A7D36] size-[75px]"
          }`}
        >
          <FaUser
            className={`${
              isCenter ? "text-[#1A7D36] text-3xl" : "text-white text-2xl"
            }`}
          />
        </div>
        <h3
          className={`mt-4 font-semibold text-[14px] ${
            isCenter ? "text-white" : "text-gray-800"
          }`}
        >
          {name}
        </h3>
        <p
          className={`text-xs ${isCenter ? "text-gray-200" : "text-gray-500"}`}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I Envision For Tamra, In The Future, A Leadership And Empowerment Hub, A Youth-Focused Resource Center In Ethiopia And Beyond.",
      name: "Kidist Belayneh",
      title: "County Program Manager/ Norwegian Church Aid",
    },
    {
      quote:
        "I Hope To See More Of Them In Various Regions Around The World. I Wish Them Success Over The Next 25 Years, Strengthening Their Institutional Efforts And Continuing The Successful Journey That Started To Enhance The Lives Of Many Young People.",
      name: "Ephrem Burhan",
      title: "Executive Director/ Tilant Youth Association",
      isCenter: true,
    },
    {
      quote:
        "I Want To Express My Gratitude To The Integrated Social Development Organization, Which Has Been A Valuable Resource For Mothers, Youth, And Our Community Since It Was Founded.",
      name: "Adane T/georgis",
      title: "Shashemene City Administration",
    },
  ];

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[#1A7D36] uppercase tracking-wider">
          TESTIMONIALS
        </h1>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-20 items-start">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
