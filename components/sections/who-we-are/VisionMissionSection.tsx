"use client";
import Image from "next/image";

interface VisionMissionProps {
  visionText?: string;
  missionText?: string;
  visionImage?: string;
  missionImage?: string;
}

export default function VisionMission({
  visionText = '"TSD Envisioned A Developed Ethiopia With Empowered Youth And Women".',
  missionText = "TSD Strives To Realize The Human Right Of Youth And Women Through Evidence-Based Advocacy And Empowerment Works.",
  visionImage = "/images/Mask group.png",
  missionImage = "/images/Mask group (1).png",
}: VisionMissionProps) {
  return (
    <section className="relative w-full mx-auto py-12 md:py-16 px-4 sm:px-6 md:max-w-3xl overflow-hidden flex justify-center items-center">
      {/* Reduced vertical padding on mobile for compact layout */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-1 15L25 41L25 41L-1 67L-1 15z M75 -1L101 25L101 25L75 51L75 -1z' fill='%23000' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl  w-full flex flex-col gap-4 md:gap-6 text-white font-sans">
        {/* Added responsive gap between vision and mission sections for mobile spacing */}
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
          {/* Stacked layout vertically on mobile, row on tablet/desktop; reduced gap on mobile */}
          <div className="flex-shrink-0 w-full md:w-[200px] h-auto border-2 border-gray-200 ">
            {/* Made image container full-width on mobile for better scaling */}
            <Image
              src={visionImage}
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
            <p className="text-black description">
              {/* Scaled paragraph text size for mobile readability */}
              {visionText}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
          {/* Same responsive adjustments as above for mission section */}
          <div className="flex-shrink-0 w-full md:w-[200px] h-auto border-2 border-gray-200">
            <Image
              src={missionImage}
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
            <p className="text-black description">{missionText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
