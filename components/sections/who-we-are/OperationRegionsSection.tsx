"use client";

import React from "react";

export interface OperationRegion {
  name: string;
  position: { x: string; y: string };
}

interface OperationRegionsSectionProps {
  operationRegions: OperationRegion[];
  mapImageSrc: string;
  mapLayerSrc: string;
}

export function OperationRegionsSection({ operationRegions, mapImageSrc, mapLayerSrc }: OperationRegionsSectionProps) {
  return (
    <section className="relative w-full flex justify-center mb-[87px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:2000ms]">
      <div className="inline-flex flex-col items-center gap-[41px]">
        <h2 className="w-full max-w-[1343px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-[70px] tracking-[0] leading-[70.7px]">
          CURRENT OPERATION REGIONS
        </h2>

        <div className="flex flex-col w-full items-center justify-center">
          <div className="w-full h-[849px] bg-white rounded-[46px] overflow-hidden relative">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                className="absolute w-[115.39%] h-[115.36%]"
                alt="Ethiopia map layer"
                src={mapLayerSrc}
              />
              <div className="inline-flex items-center gap-[232px] relative z-10">
                <div className="inline-flex flex-col items-start gap-[37px]">
                  {operationRegions.map((region, index) => (
                    <h3
                      key={index}
                      data-region-index={index}
                      className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#4f4f4f] text-4xl tracking-[0] leading-[36.4px] whitespace-nowrap transition-colors duration-300 hover:text-[#FF9700] cursor-pointer"
                      onMouseEnter={() => {
                        // Highlight corresponding pin on map
                        const mapPin = document.getElementById(`map-pin-${index}`);
                        if (mapPin) {
                          mapPin.classList.add('pin-highlight');
                        }
                      }}
                      onMouseLeave={() => {
                        // Remove highlight from map pin
                        const mapPin = document.getElementById(`map-pin-${index}`);
                        if (mapPin) {
                          mapPin.classList.remove('pin-highlight');
                        }
                      }}
                    >
                      {region.name}
                    </h3>
                  ))}
                </div>
                
                {/* Map with Interactive Pins */}
                <div className="relative w-[695px] h-[539px]">
                  <img
                    className="w-full h-full transition-all duration-300"
                    alt="Ethiopia regions map"
                    src={mapImageSrc}
                  />
                  
                  {/* Interactive Pins on Map */}
                  {operationRegions.map((region, index) => (
                    <div
                      key={index}
                      id={`map-pin-${index}`}
                      className="absolute cursor-pointer transition-all duration-300 hover:scale-125 hover:translate-y-[-4px]"
                      style={{
                        left: region.position.x,
                        top: region.position.y,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onMouseEnter={() => {
                        // Highlight corresponding text
                        const textElement = document.querySelector(`[data-region-index="${index}"]`);
                        if (textElement) {
                          textElement.classList.add('text-highlight');
                        }
                      }}
                      onMouseLeave={() => {
                        // Remove highlight from text
                        const textElement = document.querySelector(`[data-region-index="${index}"]`);
                        if (textElement) {
                          textElement.classList.remove('text-highlight');
                        }
                      }}
                    >
                      <svg
                        className="w-8 h-8 text-[#FF9700] transition-all duration-300 drop-shadow-lg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
