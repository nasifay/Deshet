import React from "react";

export default function ProgramsHero({
  hero,
  programsList,
}: {
  hero: React.ReactNode;
  programsList: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-20">
      {hero}
      {programsList}
    </div>
  );
}
