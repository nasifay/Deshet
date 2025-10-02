import React from "react";

type StatItem = {
  value: React.ReactNode;
  label: React.ReactNode;
};

export default function StatsBar({ items }: { items: StatItem[] }) {
  return (
    <div className="mx-auto w-full max-w-[1595px] px-4 md:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {items.map((it, i) => (
          <div key={i} className="flex flex-col">
            <div className="text-[32px] md:text-[36px] font-extrabold text-accent leading-none">{it.value}</div>
            <div className="text-[22px] md:text-[26px] text-gray-800">{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}