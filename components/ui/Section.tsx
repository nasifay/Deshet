import React from "react";

export type SectionProps = React.HTMLAttributes<HTMLElement> & {
  padding?: "sm" | "md" | "lg" | "none";
};

const paddingMap = {
  sm: "py-8",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  none: "py-0",
} as const;

export default function Section({ padding = "md", className = "", ...props }: SectionProps) {
  const paddingClass = paddingMap[padding];
  return <section className={`${paddingClass} ${className}`} {...props} />;
}