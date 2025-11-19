import React from "react";

type SectionCardProps = React.HTMLAttributes<HTMLDivElement> & {
  maxWidth?: number;
  radius?: number;
  padding?: { t: number; r: number; b: number; l: number };
  minHeight?: number;
};

export default function SectionCard({
  className = "",
  children,
  maxWidth = 1595,
  radius = 46,
  padding = { t: 88, r: 65, b: 88, l: 65 },
  minHeight = 874,
  ...props
}: SectionCardProps) {
  return (
    <div className={`mx-auto w-full`} style={{ maxWidth }}>
      <div
        className={`bg-white border border-border ${className}`}
        style={{
          borderRadius: radius,
          paddingTop: padding.t,
          paddingRight: padding.r,
          paddingBottom: padding.b,
          paddingLeft: padding.l,
          minHeight,
          boxShadow: "0px 4px 26.5px 0px #0000000D",
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}