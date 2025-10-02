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
            <div
              className="text-[48px] font-semibold text-accent"
              style={{ lineHeight: "38px", letterSpacing: 0, verticalAlign: "middle" as const }}
            >
              {it.value}
            </div>
            <div
              className="text-[48px] text-[#020202]"
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