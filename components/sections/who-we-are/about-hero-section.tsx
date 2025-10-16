import React from "react";

// It's a good practice to use an SVG component for icons.

interface AboutHeroSectionProps {
  title?: string;
  subtitle?: string;
  mainImage?: string;
  contentImage?: string;
  content?: string;
}

export function AboutHeroSection({
  title = "ABOUT US",
  subtitle = "Working hand in hand with communities for a brighter future.",
  mainImage = "https://i.imgur.com/u0bHpvy.png",
  contentImage = "https://i.imgur.com/7D7ERa6.png",
  content = "Tarra-For Social Development Organization (TSD) Is An Ethiopian Civil Society Organization Founded in 1998 by Ten Visionary Youths As An Anti-AIDS Club At Shashemene High School. It Was Re-Registered As A Local CSO By The Authority For Civil Society Organizations (ACSO) On June 7, 2019, With Registration No. 0184. TSD Focuses On Youth Empowerment, Peacebuilding, Sexual And Reproductive Health, Gender Development, And Climate Justice. Operating Across Addis Ababa, Oromia, Sidama, South Ethiopia, And Central Ethiopia Regions, It Coordinates Efforts Through Regional Offices In Shashemene And Wolayita Sodo, As Well As Project Coordination Offices In Towns Like Hawassa.",
}: AboutHeroSectionProps) {
  // A subtle leaf pattern that matches the reference image background
  const leafPattern = `url("/pattern-1.png")`;

  return (
    <section className="w-full mx-auto ">
      <div className="bg-white pt-16 pb-8 px-6 sm:px-8 md:px-16 2xl:px-20">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="primary-title text-primary-green">{title}</h1>
          <div className="mt-6 md:mt-12 inline-block">
            <div className="bg-white shadow-sm rounded-full py-3 px-8 ">
              <p className="subtitle text-primary-orange">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image Section */}
      <div className="bg-white pb-12 px-6 sm:px-8 md:px-16 2xl:px-20">
        <div className="relative">
          <img
            className="w-full h-auto rounded-3xl shadow-lg"
            alt="TSD team group photo"
            src={mainImage}
          />
        </div>
      </div>

      {/* Bottom Descriptive Section */}
      <div
        className="relative w-full bg-[#1B5E20] py-20 lg:py-28"
        style={{ backgroundImage: leafPattern }}
      >
        <div className="relative z-10 w-full   flex flex-col lg:flex-row items-center gap-12 lg:gap-16 px-6 sm:px-8 md:px-16 2xl:px-20">
          {/* Left: Text Block */}
          <div className="w-full lg:w-3/5">
            <p className="description text-white ">{content}</p>
          </div>

          {/* Right: Image Block */}
          <div className=" w-full lg:w-2/5 flex justify-center lg:justify-end ">
            <div className="w-full lg:max-w-md h-auto md:aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={contentImage}
                alt="Team meeting in a conference room"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
