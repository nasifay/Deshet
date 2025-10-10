/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Card, CardContent } from "~/components/ui/Card";

const galleryData = [
  {
    title: "CLM",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-7.svg",
  },
  {
    title: "CRPVF",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-6.svg",
  },
  {
    title: "CSPW",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-2.svg",
  },
  {
    title: "Events & Campaigns",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-1.svg",
    gap: "gap-[15px]",
  },
  {
    title: "Exhibition",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-9.svg",
  },
  {
    title: "GESI",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-4.svg",
  },
  {
    title: "CRPVF",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-3.svg",
  },
  {
    title: "Promoting SRHR for Women in Industrial Settings",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-8.svg",
  },
  {
    title: "General Assembly meeting",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-5.svg",
  },
  {
    title: "Training Young Women",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120.svg",
  },
];

const recognitionImages = [
  {
    src: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-19.png",
    className: "w-full sm:w-[314px] ml-[-6.00px] relative h-auto sm:h-80",
  },
  {
    src: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-20.png",
    className: "w-full sm:w-[314px] relative h-auto sm:h-80",
  },
  {
    src: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-21.png",
    className:
      "w-full sm:w-[703px] mr-[-6.00px] rounded-[31px] object-cover relative h-auto sm:h-80",
  },
];

export default function Gallery() {
  return (
    <main className="relative">
      <section className="relative w-full flex flex-col items-center pt-12 sm:pt-[104px] pb-0">
        {" "}
        {/* Reduced padding-top for mobile */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <img
            className="w-12 sm:w-[71px] h-12 sm:h-[73px] object-cover"
            alt="Asset"
            src="https://c.animaapp.com/mgda0b0iChwFy2/img/asset-2-1.png"
          />

          <h1 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-black text-[#128341] text-5xl sm:text-[90px] tracking-[0] leading-tight sm:leading-[90.9px] whitespace-nowrap mb-6">
            {" "}
            {/* Scaled down title font for mobile, adjusted leading */}
            GALLERY
          </h1>
        </div>
      </section>

      <section className="relative w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
        <section className="flex flex-col w-full max-w-[1595px] mx-auto items-start gap-6 sm:gap-10 relative px-4">
          <Card className="w-full bg-white rounded-3xl sm:rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
            {" "}
            {/* Slightly reduced rounding for mobile */}
            <CardContent className="flex flex-col items-center justify-center gap-8 sm:gap-[65px] px-0 py-2 md:py-12 lg:py-20">
              {" "}
              {/* Reduced gap and padding for mobile */}
              <p className="max-w-full sm:max-w-[805px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-[#ff9700] text-xl sm:text-[32px] text-center tracking-[0] leading-tight sm:leading-[32.3px]">
                {" "}
                {/* Full width, smaller text, tighter leading for mobile */}A
                visual journey of our people, projects, and the change we
                create.
              </p>
            </CardContent>
          </Card>

          {galleryData.map((gallery, index) => (
            <article
              key={`gallery-${index}`}
              className="flex flex-col items-center gap-8 sm:gap-[55px] relative w-full translate-y-[-1rem] animate-fade-in opacity-0"
              style={
                {
                  "--animation-delay": `${(index + 1) * 100}ms`,
                } as React.CSSProperties
              }
            >
              <Card className="w-full rounded-3xl sm:rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] bg-white relative overflow-hidden">
                {/* Pattern overlay - same as contact us page */}
                <div className="absolute inset-0 bg-[url(https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png)] bg-cover bg-center opacity-5" />

                <CardContent
                  className="flex flex-col items-start justify-center gap-8 sm:gap-[65px] px-6 sm:px-[65px] py-12 sm:py-[88px] relative"
                  style={{ zIndex: 2 }}
                >
                  <div
                    className={`inline-flex flex-col items-start justify-center ${
                      gallery.gap || "gap-6 sm:gap-[54px]"
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 sm:gap-[15px]">
                      <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-bold text-[#128341] text-3xl sm:text-5xl text-center tracking-[0] leading-tight sm:leading-[48.5px] ">
                        {gallery.title}
                      </h2>
                    </div>

                    <img
                      className="w-full max-w-[1456px] h-auto"
                      alt={`${gallery.title} gallery`}
                      src={gallery.imageSrc}
                    />
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}

          <article
            className="flex flex-col items-center gap-8 sm:gap-[55px] relative w-full translate-y-[-1rem] animate-fade-in opacity-0"
            style={
              {
                "--animation-delay": `${(galleryData.length + 1) * 100}ms`,
              } as React.CSSProperties
            }
          >
            <Card className="w-full bg-white rounded-3xl sm:rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] relative overflow-hidden">
              {/* Pattern overlay - same as contact us page */}
              <div className="absolute inset-0 bg-[url(https://c.animaapp.com/mgcmausvNL2kHo/img/tamra-pattern-3.png)] bg-cover bg-center opacity-5" />

              <CardContent
                className="flex flex-col items-start justify-center gap-8 sm:gap-[65px] px-6 sm:px-[65px] py-12 sm:py-[88px] relative"
                style={{ zIndex: 2 }}
              >
                <div className="inline-flex flex-col items-start justify-center gap-2 sm:gap-[15px]">
                  <div className="inline-flex items-center gap-2 sm:gap-[15px]">
                    <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-bold text-[#128341] text-3xl sm:text-5xl text-center tracking-[0] leading-tight sm:leading-[48.5px] whitespace-nowrap">
                      Recognition
                    </h2>
                  </div>

                  <div className="flex flex-col w-full max-w-[1445px] items-start gap-6 sm:gap-[55px]">
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-[63px] w-full">
                      {recognitionImages.map((image, index) => (
                        <img
                          key={`recognition-${index}`}
                          className={image.className}
                          alt={`Recognition ${index + 1}`}
                          src={image.src}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>
        </section>
      </section>
    </main>
  );
}
