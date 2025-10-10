"use client";
import Image from "next/image";

export default function VisionMission() {
  return (
    <section className="relative w-full py-12 md:py-16 px-4 sm:px-6 bg-[#178849] overflow-hidden flex justify-center">
      {/* Reduced vertical padding on mobile for compact layout */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-1 15L25 41L25 41L-1 67L-1 15z M75 -1L101 25L101 25L75 51L75 -1z' fill='%23000' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-[800px] w-full flex flex-col gap-4 md:gap-0 text-white font-sans">
        {/* Added responsive gap between vision and mission sections for mobile spacing */}
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
          {/* Stacked layout vertically on mobile, row on tablet/desktop; reduced gap on mobile */}
          <div className="flex-shrink-0 w-full md:w-[200px] h-auto border border-gray-200 md:border-b-0">
            {/* Made image container full-width on mobile for better scaling */}
            <Image
              src="/images/Mask group.png"
              alt="Vision Image"
              width={200}
              height={140}
              className="object-contain w-full h-auto"
            />
          </div>

          <div className="flex-1 mt-0">
            <h3 className="text-[#FF7A00] text-[24px] sm:text-[28px] md:text-[32px] font-extrabold uppercase tracking-wide leading-tight mb-2">
              {/* Scaled heading text size responsively for readability on smaller screens */}
              VISION
            </h3>
            <p className="text-white text-[16px] md:text-[18px] font-normal leading-relaxed">
              {/* Scaled paragraph text size for mobile readability */}
              “TSD Envisioned A Developed Ethiopia With Empowered Youth And
              Women”.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
          {/* Same responsive adjustments as above for mission section */}
          <div className="flex-shrink-0 w-full md:w-[200px] h-auto border border-gray-200">
            <Image
              src="/images/Mask group (1).png"
              alt="Mission Image"
              width={200}
              height={140}
              className="object-contain w-full h-auto"
            />
          </div>

          <div className="flex-1 mt-0">
            <h3 className="text-[#FF7A00] text-[24px] sm:text-[28px] md:text-[32px] font-extrabold uppercase tracking-wide leading-tight mb-2">
              MISSION
            </h3>
            <p className="text-white text-[16px] md:text-[18px] font-normal leading-relaxed">
              TSD Strives To Realize The Human Right Of Youth And Women Through
              Evidence-Based Advocacy And Empowerment Works.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
