import React from "react";

const statsData = [
  { number: "58", label: "Staffs" },
  {
    number: "5",
    label: "Offices in ",
    highlight: "4",
    highlightLabel: " Regions",
  },
  { number: "250+", label: "Volunteers" },
  { number: "15", label: "Protocols" },
];

export default function StatisticsSection() {
  return (
    <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] flex flex-col items-center justify-center gap-2.5 px-[148px] py-0 relative w-full max-w-[1595px] mx-auto h-[168px]">
      <div className="flex items-center gap-[209px] w-full">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="inline-flex flex-col w-[242px] h-[168px] items-start gap-[18px] px-0 py-[35px] bg-white translate-y-[-1rem] animate-fade-in opacity-0"
            style={
              {
                "--animation-delay": `${400 + index * 100}ms`,
              } as React.CSSProperties
            }
          >
            <div className="mt-[-1.00px] flex items-center justify-center w-fit [font-family:'Roboto',Helvetica] font-semibold text-[#ff9700] text-5xl tracking-[0] leading-[38px] whitespace-nowrap">
              {stat.number}
            </div>
            <div className="flex items-center justify-center w-fit [font-family:'Roboto',Helvetica] font-light text-transparent text-5xl tracking-[0] leading-[38px] whitespace-nowrap">
              {stat.highlight ? (
                <>
                  <span className="text-[#020202]">{stat.label}</span>
                  <span className="text-[#4eb778]">{stat.highlight}</span>
                  <span className="text-[#020202]">
                    {stat.highlightLabel}
                  </span>
                </>
              ) : (
                <span className="text-[#020202]">{stat.label}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}