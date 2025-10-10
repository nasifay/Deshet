"use client";

import Image from "next/image";

export default function VolunteerBanner() {
  return (
    <section className="w-full flex justify-center items-center py-12 px-6 md:px-16 lg:px-20 xl:28 2xl:px-36 font-roboto">
      <div className="relative w-full  h-64 md:h-[429px] rounded-2xl overflow-hidden aspect-[1595/429]">
        <Image
          src="/images/cta.jpg"
          alt="Group of volunteers"
          fill
          className="object-cover rounded-2xl"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 rounded-2xl" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-white text-2xl md:text-3xl font-bold leading-snug max-w-2xl">
            <span className="text-primary-green">
              You can contribute to provide a place for{" "}
            </span>
            <span className="text-primary-green">
              children with special needs!
            </span>
          </h2>

          {/* Buttons */}
          <div className="mt-6 flex items-center gap-4">
            <button
              className="cursor-pointer bg-primary-orange text-white text-sm md:text-base font-medium py-2.5 px-6 rounded-full hover:bg-[#ffb733] transition-all duration-300"
              aria-label="Join as a volunteer"
            >
              Join as a volunteer
            </button>
            <button
              className="cursor-pointer bg-white text-[#20A44D] text-sm md:text-base font-medium py-2.5 px-6 rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-300"
              aria-label="Donate"
            >
              Donate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
