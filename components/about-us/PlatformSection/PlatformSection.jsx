import React from "react";

import {
  PlatformSectionArea,
  PlatformSectionContent,
  PlatformSectionContentArea,
  PlatformSectionContentBackground,
  PlatformSectionContentDescription,
  PlatformSectionContentSubTitle,
  PlatformSectionContentTitle,
  PlatformSectionImage,
} from "./PlatformSection.style.jsx";

const PlatformSection = () => (
  <PlatformSectionArea>
    <PlatformSectionImage />
    <PlatformSectionContentBackground>
      <PlatformSectionContentArea>
        <PlatformSectionContent>
          <PlatformSectionContentTitle>WAT WE DOEN</PlatformSectionContentTitle>
          <PlatformSectionContentSubTitle>
            Ons Platform
          </PlatformSectionContentSubTitle>
          <PlatformSectionContentDescription>
            MrAgain is het platform waarop consumenten en reparateurs van
            elektronische apparaten worden samen gebracht. Hierdoor vind jij
            gemakkelijk een reparateur en beschik je daarbij over transparante
            en betrouwbare informatie over de kwaliteit, prijs en garantie. Door
            via ons platform een afspraak te maken weet je jezelf verzekerd van
            voordelen, bijvoorbeeld doordat je altijd direct geholpen wordt.
          </PlatformSectionContentDescription>
        </PlatformSectionContent>
      </PlatformSectionContentArea>
    </PlatformSectionContentBackground>
  </PlatformSectionArea>
);

export default PlatformSection;
