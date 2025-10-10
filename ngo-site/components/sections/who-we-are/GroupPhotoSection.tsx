import React from "react";

interface GroupPhotoSectionProps {
  imageSrc: string;
  altText: string;
}

export function GroupPhotoSection({ imageSrc, altText }: GroupPhotoSectionProps) {
  return (
    <section className="relative w-full flex justify-center mb-[87px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
      <div className="w-[1595px] h-[744px] rounded-[46px] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          alt={altText}
          src={imageSrc}
        />
      </div>
    </section>
  );
}
