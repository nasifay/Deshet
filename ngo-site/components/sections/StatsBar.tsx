import React from "react";

type StatItem = {
  value: React.ReactNode;
  label: React.ReactNode;
};

export default function StatsBar({ items }: { items: StatItem[] }) {
  return (
    <div className="mx-auto w-full max-w-[1595px] px-4 md:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex flex-col justify-center p-4 gap-2 lg:w-[344px] lg:h-[100px]"
          >
            <div
              className="text-[48px] font-semibold text-accent"
              style={{ lineHeight: "38px", letterSpacing: 0, verticalAlign: "middle" as const }}
            >
              {it.value}
            </div>
            <div
              className="text-[48px] text-[#020202] break-words"
              style={{ fontWeight: 300, lineHeight: "38px", letterSpacing: 0, verticalAlign: "middle" as const }}
            >
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}