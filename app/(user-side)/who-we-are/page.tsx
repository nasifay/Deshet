"use client";

import React from "react";
import { AboutHeroSection } from "~/components/sections/who-we-are/about-hero-section";
import VisionMission from "~/components/sections/who-we-are/VisionMissionSection";
import { CoreValuesSection } from "~/components/sections/who-we-are/CoreValuesSection";
import { LeadershipSection } from "~/components/sections/who-we-are/LeadershipSection";
import { TargetGroupSection } from "~/components/sections/who-we-are/TargetGroupSection";
import { OperationRegionsSection } from "~/components/sections/who-we-are/OperationRegionsSection";
import {
  coreValues,
  leadershipTeam,
  targetGroups,
} from "~/lib/data/who-we-are-data";

export default function AboutUs() {
  return (
    <main className="relative bg-white space-y-4 lg:space-y-8 overflow-x-hidden">
      <AboutHeroSection />

      <VisionMission />

      <CoreValuesSection coreValues={coreValues} />

      <LeadershipSection leadershipTeam={leadershipTeam} />

      <TargetGroupSection
        targetGroups={targetGroups}
        headerImage="https://c.animaapp.com/mgclt9blEcJSeI/img/young-millennials-african-friends-walking-city-happy-black-peopl.png"
      />

      <OperationRegionsSection />
    </main>
  );
}
