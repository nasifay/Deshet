"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface KeyFunder {
  _id: string;
  name: string;
  logo: string;
  order: number;
  isActive: boolean;
  link?: string;
  description?: string;
  type: string;
}

export default function KeyFundersSection() {
  const [keyFunders, setKeyFunders] = useState<KeyFunder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKeyFunders();
  }, []);

  const fetchKeyFunders = async () => {
    try {
      const response = await fetch("/api/public/keyfunders");
      const data = await response.json();

      if (data.success) {
        setKeyFunders(data.data);
      } else {
        console.error("Failed to fetch key funders:", data.error);
      }
    } catch (error) {
      console.error("Error fetching key funders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative w-full py-20 bg-[#F5EBD7] overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-16 flex flex-col items-center">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-300 rounded mb-16"></div>
            <div className="flex flex-col items-center space-y-14">
              <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-[180px] h-[80px] bg-gray-300 rounded"
                  ></div>
                ))}
              </div>
              <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-[180px] h-[80px] bg-gray-300 rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (keyFunders.length === 0) {
    return null; // Don't render the section if no key funders
  }
  return (
    <section className="relative w-full py-20 bg-[#F5EBD7] overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-16 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-[#1A7D36] text-2xl md:text-3xl lg:text-[28px] font-extrabold uppercase tracking-wide text-center mb-16">
          Key Funders
        </h2>

        {/* Funders Grid */}
        <div className="flex flex-col items-center space-y-14">
          {/* Top row - first 3 key funders */}
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
            {keyFunders.slice(0, 3).map((keyFunder) => (
              <div key={keyFunder._id} className="w-[180px] h-[80px] relative">
                <Image
                  src={keyFunder.logo}
                  alt={keyFunder.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Bottom row - remaining key funders */}
          {keyFunders.length > 3 && (
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
              {keyFunders.slice(3).map((keyFunder) => (
                <div
                  key={keyFunder._id}
                  className="w-[180px] h-[80px] relative"
                >
                  <Image
                    src={keyFunder.logo}
                    alt={keyFunder.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
