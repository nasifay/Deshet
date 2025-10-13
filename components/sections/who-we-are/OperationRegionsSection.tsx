/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

export interface OperationRegion {
  name: string;
  description?: string;
  position: { x: string; y: string };
}

interface OperationRegionsSectionProps {
  operationRegions?: OperationRegion[];
}

export function OperationRegionsSection({
  operationRegions = [
    {
      name: "ADDIS ABABA",
      position: { x: "43.8%", y: "49.4%" },
    },
    {
      name: "SIDAMA REGION",
      position: { x: "43.8%", y: "68.2%" },
    },
    {
      name: "OROMIA REGION",
      position: { x: "39.5%", y: "56.3%" },
    },
    {
      name: "SOUTH ETHIOPIA REGION",
      position: { x: "30.3%", y: "74.3%" },
    },
    {
      name: "CENTRAL ETHIOPIA REGION",
      position: { x: "31.9%", y: "63.0%" },
    },
  ],
}: OperationRegionsSectionProps) {
  const mapImageSrc = "/images/Objects.png";

  return (
    <section className="relative w-full flex justify-center mb-8 sm:mb-12 md:mb-16 lg:mb-[87px] bg-white">
      {/* World map background for entire section */}
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-10"
        alt="World map background"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1200px-World_map_-_low_resolution.svg.png"
      />

      <div className="relative flex flex-col items-center gap-6 sm:gap-8 w-full px-4 sm:px-6 md:px-8 max-w-6xl">
        {/* Title - matching reference design */}
        <h2 className="font-sans font-bold uppercase text-primary-green text-2xl sm:text-3xl md:text-4xl lg:text-6xl tracking-wide text-center">
          CURRENT OPERATION REGIONS
        </h2>

        {/* Main content area */}
        <div className="w-full bg-transparent p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Numbered list on the left */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full lg:w-auto lg:min-w-[320px]">
              {operationRegions.map((region, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 min-h-[48px]" // Ensure tap target >= 48px
                  onMouseEnter={() => {
                    const mapPin = document.getElementById(`map-pin-${index}`);
                    if (mapPin) {
                      mapPin.classList.add("pin-highlight");
                    }
                  }}
                  onMouseLeave={() => {
                    const mapPin = document.getElementById(`map-pin-${index}`);
                    if (mapPin) {
                      mapPin.classList.remove("pin-highlight");
                    }
                  }}
                >
                  <span className="font-sans font-normal text-primary-green text-base sm:text-lg md:text-xl lg:text-xl">
                    {index + 1}.
                  </span>
                  <span
                    data-region-index={index}
                    className="font-sans font-normal text-primary-green text-base sm:text-lg md:text-xl lg:text-xl cursor-pointer hover:text-primary-orange transition-colors duration-300"
                  >
                    {region.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Map on the right - responsive height adjustments */}
            <div className="relative w-full lg:w-[500px] h-[320px] sm:h-[360px] md:h-[400px] lg:h-[450px]">
              {/* Ethiopia map container */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Green map background using mask (for modern browsers) */}
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: "#118342",
                    maskImage: `url(${mapImageSrc})`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskImage: `url(${mapImageSrc})`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                ></div>
                {/* White separator lines */}
                <img
                  className="absolute inset-0 w-full h-full object-contain"
                  alt="Ethiopia borders"
                  src={mapImageSrc}
                />
              </div>

              {/* Orange teardrop markers */}
              {operationRegions.map((region, index) => (
                <div
                  key={index}
                  id={`map-pin-${index}`}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: region.position.x,
                    top: region.position.y,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => {
                    const textElement = document.querySelector(
                      `[data-region-index="${index}"]`
                    );
                    if (textElement) {
                      textElement.classList.add("text-highlight");
                    }
                  }}
                  onMouseLeave={() => {
                    const textElement = document.querySelector(
                      `[data-region-index="${index}"]`
                    );
                    if (textElement) {
                      textElement.classList.remove("text-highlight");
                    }
                  }}
                >
                  {/* Orange teardrop marker with consistent sizing */}
                  <div className="relative">
                    <svg
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary-orange transition-all duration-300 drop-shadow-lg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
