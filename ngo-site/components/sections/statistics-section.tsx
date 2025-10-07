"use client";

import React from "react";

export default function StatisticsSection() {
  const stats = [
    { number: "58", label: "Staffs" },
    {
      number: "5",
      label: (
        <>
          Offices in <span className="text-[#4EB778] font-normal">4</span>{" "}
          Regions
        </>
      ),
    },
    { number: "250+", label: "Volunteers" },
    { number: "15", label: "Protocols" },
  ];

  return (
    <section className="w-full bg-white py-10 md:py-12">
      <div className=" mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6 md:gap-x-10 lg:gap-x-16 text-center place-content-center place-items-center">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-center font-roboto text-2xl md:text-3xl 2xl:text-4xl"
            >
              <span className="font-semibold  text-primary-orange leading-tight">
                {item.number}
              </span>
              <p className="font-light  text-[#1a1a1a] mt-[2px] text-nowrap">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
