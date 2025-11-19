"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ArrowColor = "orange" | "green";

const slides: { src: string; title: string; arrow: ArrowColor }[] = [
  {
    src: "/images/mission-1.jpg",
    title: "Youth Empowerment & Peacebuilding",
    arrow: "orange",
  },
  {
    src: "/images/mission-2.jpg",
    title: "Sexual & Reproduction Health & Gender Equality",
    arrow: "green",
  },
  {
    src: "/images/mission-3.jpg",
    title: "Climate Justice & Livelihoods",
    arrow: "orange",
  },
  {
    src: "/images/mission-4.jpg",
    title: "Children's Rights Protection",
    arrow: "green",
  },
];

function ArrowCircle({ color = "orange" }: { color?: ArrowColor }) {
  const bg = color === "orange" ? "bg-[var(--accent)]" : "bg-[#4EB778]";
  return (
    <div className={`w-[67.63px] h-[67.63px] rounded-full ${bg} grid place-items-center rotate-[-40.11deg] shadow`}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-rotate-[-40.11deg]">
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" fill="#fff" />
      </svg>
    </div>
  );
}

export default function MissionScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 0;
      const progress = Math.min(1, Math.max(0, (viewportH - rect.top) / (rect.height + viewportH)));
      const newIndex = Math.min(slides.length - 1, Math.floor(progress * slides.length));
      setIndex(newIndex);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="mx-auto w-full max-w-[1595px] px-4 md:px-6">
      <div
        ref={containerRef}
        className="relative h-[640px] md:h-[800px] lg:h-[945px]"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 48.08%, rgba(0,0,0,0.5) 100%)",
          borderRadius: 46,
        }}
      >
        {/* Slides */}
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <div className="absolute inset-0 p-6 md:p-10 lg:p-[65px]">
              <div className="relative w-full h-[520px] md:h-[700px] lg:h-[854px] rounded-[46px] overflow-hidden shadow-[0px_4px_26.5px_0px_rgba(0,0,0,0.05)]">
                <Image src={s.src} alt={s.title} fill className="object-contain bg-black/60" />
                <div className="absolute inset-0 pointer-events-none" />
                <div className="absolute left-6 bottom-6 md:left-10 md:bottom-10 flex items-end gap-4">
                  <h3 className="text-white font-black uppercase leading-[1.01] text-[40px] md:text-[72px] lg:text-[100px] max-w-[863px]">
                    {s.title}
                  </h3>
                  <ArrowCircle color={s.arrow} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}