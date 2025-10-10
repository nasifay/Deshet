"use client";

import React from "react";
import { AboutUsHeader } from "~/components/sections/who-we-are/AboutUsHeader";
import { TaglineSection } from "~/components/sections/who-we-are/TaglineSection";
import { GroupPhotoSection } from "~/components/sections/who-we-are/GroupPhotoSection";
import { AboutTSDSection } from "~/components/sections/who-we-are/AboutTSDSection";
import { VisionMissionSection } from "~/components/sections/who-we-are/VisionMissionSection";
import { CoreValuesSection } from "~/components/sections/who-we-are/CoreValuesSection";
import { LeadershipSection } from "~/components/sections/who-we-are/LeadershipSection";
import { TargetGroupSection } from "~/components/sections/who-we-are/TargetGroupSection";
import { OperationRegionsSection } from "~/components/sections/who-we-are/OperationRegionsSection";
import { WhatsAppButton } from "~/components/sections/who-we-are/WhatsAppButton";
import { 
  coreValues, 
  leadershipTeam, 
  targetGroups, 
  operationRegions 
} from "~/lib/data/who-we-are-data";

export default function AboutUs() {
  return (
    <main className="relative">
      <AboutUsHeader />

      <TaglineSection 
        tagline="Working hand in hand with communities for a brighter future." 
      />

      <GroupPhotoSection 
        imageSrc="https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-921.svg"
        altText="TSD Team - Working hand in hand with communities for a brighter future"
      />

      <AboutTSDSection 
        description="Tamra for Social Development Organization (TSD) is an Ethiopian civil society organization founded in 1998 by ten visionary youths as an Anti-AIDS club at Shashemene High School. It was re-registered as a local CSO by the Authority for Civil Society Organizations (ACSO) on June 7, 2019, with registration No. 0184. TSD focuses on Youth Empowerment, Peacebuilding, Sexual and Reproductive health, Gender Development, and Climate justice. Operating across Addis Ababa, Oromia, Sidama, South Ethiopia, and Central Ethiopia regions, it coordinates efforts through regional offices in Shashemene and Wolayita Sodo, as well as project coordination offices in towns like Hawassa."
        backImageSrc="https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-929.png"
        frontImageSrc="https://c.animaapp.com/mgclt9blEcJSeI/img/rectangle-930.png"
      />

      <VisionMissionSection 
        visionImage="/images/Mask group.png"
        visionText="TSD envisioned a developed Ethiopia with empowered youth and women."
        missionImage="/images/Mask group (1).png"
        missionText="TSD Strives To Realize The Human Right Of Youth And Women Through Evidence-Based Advocacy And Empowerment Works."
      />

      <CoreValuesSection coreValues={coreValues} />

      <LeadershipSection leadershipTeam={leadershipTeam} />

      <TargetGroupSection 
        targetGroups={targetGroups}
        headerImage="https://c.animaapp.com/mgclt9blEcJSeI/img/young-millennials-african-friends-walking-city-happy-black-peopl.png"
      />

      <OperationRegionsSection 
        operationRegions={operationRegions}
        mapImageSrc="/images/Objects.png"
        mapLayerSrc="https://c.animaapp.com/mgclt9blEcJSeI/img/layer-1.png"
      />

      <WhatsAppButton phoneNumber="" />
    </main>
  );
}