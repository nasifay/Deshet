import React from "react";

export default function Stat({ value, label }: { value: React.ReactNode; label: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <div className="text-2xl md:text-3xl font-extrabold text-primary">{value}</div>
      <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">{label}</div>
    </div>
  );
}

