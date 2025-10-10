/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

const FormField = ({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) => (
  <div className="flex flex-col w-full gap-2">
    <label className="text-[16px] font-medium text-[#333333]">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full h-[48px] rounded-[8px] bg-white border border-[#E5E5E5] px-4 text-[#333333] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4EB778]"
    />
  </div>
);

const MessageField = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => (
  <div className="flex flex-col w-full gap-2">
    <label className="text-[16px] font-medium text-[#333333]">{label}</label>
    <textarea
      rows={4}
      placeholder={placeholder}
      className="w-full rounded-[8px] bg-white border border-[#E5E5E5] px-4 py-3 text-[#333333] placeholder:text-[#999999] text-[15px] focus:outline-none focus:ring-1 focus:ring-[#4EB778] resize-none"
    ></textarea>
  </div>
);

export default function VolunteerPage() {
  return (
    <div className="relative w-full bg-white overflow-hidden">
      <main className="relative z-10 flex flex-col items-center px-4 py-12 sm:py-16">
        {/* Title */}
        <h1 className="text-[32px] sm:text-[40px] md:text-[44px] font-bold text-[#2E8B57] uppercase mb-12 tracking-wide text-center">
          JOIN AS A VOLUNTEER
        </h1>

        {/* Green CTA Banner */}
        <div className="w-full max-w-[900px] bg-primary-green/90 rounded-[25px] shadow-lg flex flex-col md:flex-row items-center justify-between overflow-hidden px-8 py-10 mb-16 relative">
          {/* Green Container Background Pattern */}
          <div className="absolute inset-0 bg-[url('https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png')] bg-cover bg-center opacity-50" />

          {/* Left Image */}
          <div className="flex justify-center md:justify-start mb-6 md:mb-0 relative z-10">
            <img
              src="https://c.animaapp.com/mgdc97zk62g2qg/img/rectangle-928.svg"
              alt="Volunteering"
              className="w-[200px] h-[150px] object-cover rounded-[12px]"
            />
          </div>

          {/* Right Text */}
          <div className="text-white md:pl-8 text-center md:text-left leading-relaxed relative z-10">
            <p className="text-[24px] md:text-[28px] font-bold">
              Join A Network Of{" "}
              <span className="font-normal">People Committed To </span>
              <br />
              Equality, Empowerment, And{" "}
              <span className="text-[#FBB040] font-bold">
                Sustainable Change.
              </span>
            </p>
          </div>
        </div>

        {/* Volunteer Form */}
        <div className="w-full lg:w-[80vw] bg-white rounded-[20px]  border border-[#EAEAEA] shadow-lg relative overflow-hidden">
          {/* Form Container Background Pattern */}
          <div className="absolute  inset-0 bg-[url('https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png')] bg-cover bg-center opacity-5" />
          <form className="mx-auto flex flex-col gap-6 relative z-10 p-6 md:px-20 lg:px-28 lg:w-2/3 items-center justify-center">
            <FormField label="Name" placeholder="enter here" />
            <FormField label="Gender" placeholder="enter here" />
            <FormField label="Age" placeholder="enter here" type="number" />
            <FormField
              label="Phone Number"
              placeholder="enter here"
              type="tel"
            />
            <FormField
              label="Email Address"
              placeholder="enter here"
              type="email"
            />
            <FormField label="Address" placeholder="enter here" />
            <MessageField label="Message" placeholder="Type here" />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#4EB778] hover:bg-[#3fa76a] transition-all duration-200 text-white font-medium text-[16px] rounded-[8px] shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
