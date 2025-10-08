/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

interface Thumbnail {
  id: number;
  src: string;
}

interface Program {
  title: string;
  categoryId: string;
  description: string;
  image: string;
  thumbnails: Thumbnail[];
}

export default function ProgramsListSection() {
  const [activeTab, setActiveTab] = useState("youth-empowerment");

  const programCategories = [
    {
      id: "youth-empowerment",
      label: "Youth Empowerment &\nPeacebuilding",
    },
    {
      id: "srh-gender",
      label: "SRH & Gender\nDevelopment",
    },
    {
      id: "climate-justice",
      label: "Climate Justice &\nLivelihoods",
    },
  ];

  const handleTabClick = (id: string) => setActiveTab(id);

  const programsList: Program[] = [
    {
      title: "Youth Challenge Initiative (yci)",
      categoryId: "youth-empowerment",
      description:
        "The project focuses on increasing Sexual and Reproductive Health (SRH) awareness among youth, improving their health-seeking behavior, and enhancing access to youth-friendly SRH services. It also aims to build the entrepreneurship skills of young people and implement a sustainable business model for producing and distributing reusable sanitary pads.",
      image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-1.png",
      thumbnails: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        },
      ],
    },
    {
      title: "Peace (norad)",
      categoryId: "youth-empowerment",
      description:
        "The project aims to raise awareness among communities, particularly women and youth, on peacebuilding, conflict prevention, and social cohesion. It seeks to promote dialogue, tolerance, and mutual respect among diverse groups, while strengthening community resilience to prevent violence and discrimination. The project also strives to foster institutional commitment among public stakeholders and community leaders to support peacebuilding initiatives through advocacy, capacity building, and inclusive policy dialogue.",
      image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904.png",
      thumbnails: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop&crop=center",
        },
      ],
    },
    {
      title:
        "Enhance resilience against online and offline violence in the society of Ethiopia. (ERASE)",
      categoryId: "youth-empowerment",
      description:
        "The project aims to foster trust and empathy through open dialogue and mutual understanding while establishing community monitoring and volunteer networks to detect and respond to conflicts early using technology. It engages local leaders, youth, women, and persons with disabilities (PWDs) in mediating disputes and promoting peace, and mobilizes communities to advocate for peace and inclusive policies.",
      image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-2.png",
      thumbnails: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center",
        },
      ],
    },
    {
      title: "Children’s Rights and Violence Prevention Find (CRPVF)",
      categoryId: "youth-empowerment",
      description:
        "The project aims to strengthen parenting skills and spousal relationships to create a supportive family environment in Woreda 2, Kirkos Sub-City. It seeks to empower families through effective saving practices that reduce stress and socio-economic challenges affecting children’s well-being, while also promoting safe and supportive school environments that enhance access to education and overall well-being for children and youth.",
      image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-3.png",
      thumbnails: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        },
      ],
    },
    {
      title: "YDP (tsd)",
      categoryId: "srh-gender",
      description:
        "(2023–2024, Mastercard Foundation via YNSD) – 22,000+ youth trained in workplace skills.",
      image: "https://c.animaapp.com/mgdags98aKA6oC/img/rectangle-904-3.png",
      thumbnails: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop&crop=center",
        },
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop&crop=center",
        },
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center mt-8 mb-10 ">
      {/* Outer container for rounded white bar */}
      <ProgramTabs
        programCategories={programCategories}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      <div className="mt-8 px-6 md:px-20 xl:px-24 2xl:px-40">
        {programsList.map((program) => (
          <ProgramItem key={program.title} program={program} />
        ))}
      </div>
    </div>
  );
}

const ProgramItem: React.FC<{ program: Program }> = ({ program }) => {
  return (
    <section
      className="relative flex flex-col items-center justify-center w-full  overflow-hidden py-10 md:py-16 px-4 md:px-8 lg:px-16"
      role="region"
      aria-labelledby={`${program.categoryId}-title`}
    >
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center text-center w-full ">
        {/* Title */}
        <h2
          id={`${program.categoryId}-title`}
          className="font-roboto font-black text-primary-green text-lg md:text-2xl lg:text-5xl xl:text-6xl  leading-[101%] tracking-[0] uppercase w-full mb-4"
        >
          <span className="">{program.title.split("(")[0].trim()} </span>
          <span className="text-primary-orange">
            ({program.title.split("(")[1]?.replace(")", "")})
          </span>
        </h2>

        {/* Description */}
        <p className="font-roboto font-light text-sm md:text-base lg:text-lg xl:text-[24px] leading-[1.26] tracking-[0.8px] text-start text-justify capitalize text-[#333333] mb-16">
          {program.description}
        </p>

        {/* Main Image */}
        <div className="relative w-full  h-auto overflow-hidden rounded-[32px] shadow-sm mb-10">
          <img
            src={program.image}
            alt={`${program.title} main image`}
            className="object-contain w-full h-auto"
          />
        </div>

        {/* Thumbnails Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full">
          {program.thumbnails.map((thumb) => (
            <div
              key={thumb.id}
              className="relative aspect-[285/314] rounded-[20px] overflow-hidden shadow-sm"
            >
              <img
                src={
                  thumb.src ||
                  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop&crop=center"
                }
                alt={`Thumbnail ${thumb.id}`}
                className="object-cover transition-transform duration-300 w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProgramTabs = ({
  programCategories,
  handleTabClick,
  activeTab,
}: {
  programCategories: {
    id: string;
    label: string;
  }[];
  handleTabClick: (id: string) => void;
  activeTab: string;
}) => {
  return (
    <div className="w-full bg-white  shadow-[0_2px_10px_rgba(0,0,0,0.08)] overflow-hidden rounded-4xl border border-[#F5F5F5]">
      <div className="flex divide-x divide-[#E0E0E0] ">
        <div className="flex-1 text-center py-4 md:py-5 px-2 md:px-4 font-sans text-[14px] font-normal leading-[1.2] whitespace-pre-line"></div>
        {programCategories.map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabClick(item.id)}
            className={`flex-1 text-center py-4 md:py-5 px-2 md:px-4 transition-colors duration-200 whitespace-pre-line font-sans text-sm md:text-xl 2xl:text-2xl font-normal leading-[1.2] ${
              activeTab === item.id ? "text-[#F7931E]" : "text-[#4A4A4A]"
            }`}
          >
            {item.label}
          </button>
        ))}
        <div className="flex-1 text-center py-4 md:py-5 px-2 md:px-4 font-sans text-[14px] font-normal leading-[1.2] whitespace-pre-line"></div>
      </div>
    </div>
  );
};
