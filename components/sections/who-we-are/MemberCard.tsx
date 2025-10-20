"use client";

import React from "react";

// Reusable Member Card Component
export interface MemberCardProps {
  member: {
    name: string;
    position: string;
    photo: string;
    bio?: string;
    email?: string;
    phone?: string;
    order?: number;
    type?: "leadership" | "team_member";
  };
}

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const nameParts = member.name.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div className="flex w-full h-full flex-col overflow-hidden rounded-[20px] bg-[#B1EFCA] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer">
      {/* Image Section - Fixed height for consistency across all cards */}
      {member.photo ? (
        <img
          className="w-full h-[75%] object-cover rounded-[20px] overflow-hidden"
          alt={member.name}
          src={member.photo}
        />
      ) : (
        // A fallback placeholder for when no image is provided.
        <div className="flex w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] items-center justify-center bg-gray-200">
          <span className="text-4xl font-bold text-gray-500">
            {member.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}

      {/* Text/Info Section - flex-shrink-0 prevents it from shrinking */}
      <div className="flex-1 flex flex-col justify-center  p-5 flex-shrink-0">
        <h3 className="font-black uppercase text-[#4F4F4F] text-[22px] leading-tight">
          {/* Render name on two lines to precisely match the reference image */}
          {firstName} {lastName}
        </h3>
        <p className="mt-2 font-medium text-[#4F4F4F] text-[15px] leading-tight">
          {member.position},
        </p>
      </div>
    </div>
  );
};
