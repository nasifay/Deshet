import React from "react";
import { Card, CardContent } from "../../components/ui/Card";

const galleryData = [
  {
    title: "CLM",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-7.svg",
    hasBackground: true,
    backgroundImage: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-48.png",
  },
  {
    title: "CRPVF",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-6.svg",
    hasBackground: false,
  },
  {
    title: "CSPW",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-2.svg",
    hasBackground: false,
  },
  {
    title: "Events & Campaigns",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-1.svg",
    hasBackground: false,
    gap: "gap-[15px]",
  },
  {
    title: "Exhibition",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-9.svg",
    hasBackground: false,
  },
  {
    title: "GESI",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-4.svg",
    hasBackground: false,
  },
  {
    title: "CRPVF",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-3.svg",
    hasBackground: false,
  },
  {
    title: "Promoting SRHR for Women in Industrial Settings",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-8.svg",
    hasBackground: false,
  },
  {
    title: "General Assembly meeting",
    imageSrc:
      "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120-5.svg",
    hasBackground: false,
  },
  {
    title: "Training Young Women",
    imageSrc: "https://c.animaapp.com/mgda0b0iChwFy2/img/frame-1000002120.svg",
    hasBackground: false,
  },
];

const recognitionImages = [
  {
    src: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-19.png",
    className: "w-[314px] ml-[-6.00px] relative h-80",
  },
  {
    src: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-20.png",
    className: "w-[314px] relative h-80",
  },
  {
    src: "https://c.animaapp.com/mgda0b0iChwFy2/img/rectangle-21.png",
    className:
      "w-[703px] mr-[-6.00px] rounded-[31px] object-cover relative h-80",
  },
];

export function ImageGallerySection() {
  return (
    <section className="flex flex-col w-full max-w-[1595px] mx-auto items-start gap-10 relative px-4">
      <Card className="w-full bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
        <CardContent className="flex flex-col items-center justify-center gap-[65px] px-0 py-[88px]">
          <p className="max-w-[805px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-normal text-[#ff9700] text-[32px] text-center tracking-[0] leading-[32.3px]">
            A visual journey of our people, projects, and the change we create.
          </p>
        </CardContent>
      </Card>

      {galleryData.map((gallery, index) => (
        <article
          key={`gallery-${index}`}
          className="flex flex-col items-center gap-[55px] relative w-full translate-y-[-1rem] animate-fade-in opacity-0"
          style={
            {
              "--animation-delay": `${(index + 1) * 100}ms`,
            } as React.CSSProperties
          }
        >
          <Card
            className={`w-full rounded-[46px] shadow-[0px_4px_26.5px_#0000000d] ${
              gallery.hasBackground
                ? "[background:url(https://c.animaapp.com/mgda0b0iChwFy2/img/frame-48.png)_50%_50%_/_cover,linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)]"
                : "bg-white"
            }`}
          >
            <CardContent className="flex flex-col items-start justify-center gap-[65px] px-[65px] py-[88px]">
              <div
                className={`inline-flex flex-col items-start justify-center ${gallery.gap || "gap-[54px]"}`}
              >
                <div className="inline-flex items-center gap-[15px]">
                  <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-bold text-[#128341] text-5xl text-center tracking-[0] leading-[48.5px] whitespace-nowrap">
                    {gallery.title}
                  </h2>
                </div>

                <img
                  className="w-full max-w-[1456px]"
                  alt={`${gallery.title} gallery`}
                  src={gallery.imageSrc}
                />
              </div>
            </CardContent>
          </Card>
        </article>
      ))}

      <article
        className="flex flex-col items-center gap-[55px] relative w-full translate-y-[-1rem] animate-fade-in opacity-0"
        style={
          {
            "--animation-delay": `${(galleryData.length + 1) * 100}ms`,
          } as React.CSSProperties
        }
      >
        <Card className="w-full bg-white rounded-[46px] shadow-[0px_4px_26.5px_#0000000d]">
          <CardContent className="flex flex-col items-start justify-center gap-[65px] px-[65px] py-[88px]">
            <div className="inline-flex flex-col items-start justify-center gap-[15px]">
              <div className="inline-flex items-center gap-[15px]">
                <h2 className="[text-shadow:0px_4px_4px_#00000040] [font-family:'Roboto',Helvetica] font-bold text-[#128341] text-5xl text-center tracking-[0] leading-[48.5px] whitespace-nowrap">
                  Recognition
                </h2>
              </div>

              <div className="flex flex-col w-full max-w-[1445px] items-start gap-[55px]">
                <div className="flex items-center justify-center gap-[63px] w-full">
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
  );
}