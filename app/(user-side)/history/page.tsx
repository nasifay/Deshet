/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function History() {
  return (
    <div
      className="bg-white w-full relative flex flex-col pb-12 pb:mb-20 pb:mb-40"
      data-model-id="932:11162"
    >
      <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-20 lg:gap-24 px-6 md:px-16 lg:px-24 xl:px-36">
        <h1 className="font-roboto font-black text-2xl md:text-4xl lg:text-[90px] leading-[101%] tracking-[0] uppercase text-primary-green">
          HISTORY
        </h1>
        <p className="w-full   font-roboto font-normal text-lg md:text-xl lg:text-[32px] leading-[101%] text-center text-[#ff9700]">
          Tracing our journey of growth, impact, and commitment to communities
          across Ethiopia.
        </p>
        <img
          className="w-full h-auto"
          alt="Conference room with attendees"
          src="https://c.animaapp.com/mgcmuny5RiWnl8/img/rectangle-921.svg"
        />
        <div className="space-y-4 text-gray-800 font-roboto font-normal text-sm md:text-xl lg:text-2xl leading-[126%] tracking-[0.8px] text-justify">
          <p>
            Since its establishment, Tamra Social Development has been committed
            to empowering communities and driving sustainable change across
            Ethiopia. What began as a small initiative has grown into a trusted
            organization working in diverse thematic areas, building
            partnerships, and touching countless lives.
          </p>
          <p>
            Our history reflects not only the milestones we have achieved but
            also the resilience, collaboration, and vision that continue to
            guide us toward a more inclusive and equitable future.
          </p>
        </div>
      </section>

      <div className=" mt-6 sm:mt-14 lg:mt-24 inline-flex flex-col items-center justify-center gap-[50px] w-full px-2  md:px-6 lg:px-20 mb-8 md:mb-20">
        <h2 className="font-roboto font-black text-2xl md:text-4xl lg:text-[90px] leading-[101%] tracking-[0] uppercase text-primary-green">
          MILESTONES
        </h2>

        <div className="w-full h-[40vh] md:h-auto overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
          <img
            src="/milestones.png"
            alt="Milestones"
            className="h-full min-w-[200vw] md:min-w-0 md:h-auto w-auto md:w-full object-contain object-left"
          />
        </div>
      </div>

      <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-20 lg:gap-24 px-6 md:px-16 lg:px-24 xl:px-36 mb-6 md:mb-20">
        <div className="flex flex-col items-start justify-center gap-4 md:gap-7 w-full md:px-6">
          <h2 className="font-roboto font-black text-lg md:text-4xl lg:text-6xl leading-[101%] tracking-[0] text-center uppercase text-primary-green">
            2025 – TODAY
          </h2>

          <p className="w-full  font-roboto font-medium text-sm md:text-lg lg:text-xl xl:text-3xl leading-[101%] tracking-[0] capitalize text-black">
            Continuing To Create Inclusive, People-centered, And Accountable
            Programs Aligned With Tamra&apos;s Mission And Vision.
          </p>
        </div>
      </section>

      <blockquote className="w-full px-6 md:px-20 lg:px-36 text-center font-roboto font-light italic text-sm md:text-3xl lg:text-4xl- leading-[126%] tracking-[0.8px] capitalize">
        <span className="italic text-black tracking-[0.38px]">
          &quot; From Our Beginnings To Today,{" "}
        </span>
        <span className="italic text-[#128341] tracking-[0.38px]">
          Tamra Social Development
        </span>
        <span className="italic text-black tracking-[0.38px]">
          Stands Firm In Its Mission, Carrying Forward The Vision Of An
          Inclusive, Just, And Empowered Society. &quot;
        </span>
      </blockquote>
    </div>
  );
}
