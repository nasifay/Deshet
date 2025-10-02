import React from "react";

type SectionCardProps = React.HTMLAttributes<HTMLDivElement> & {
  maxWidth?: number;
  radius?: number;
  padding?: { t: number; r: number; b: number; l: number };
};

export default function SectionCard({
  className = "",
  children,
  maxWidth = 1595,
  radius = 46,
  padding = { t: 88, r: 65, b: 88, l: 65 },
  ...props
}: SectionCardProps) {
  return (
    <div className={`mx-auto w-full`} style={{ maxWidth }}>
      <div
        className={`bg-white rounded-[${radius}px] border border-border shadow-sm ${className}`}
        style={{
          borderRadius: radius,
          paddingTop: padding.t,
          paddingRight: padding.r,
          paddingBottom: padding.b,
          paddingLeft: padding.l,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}