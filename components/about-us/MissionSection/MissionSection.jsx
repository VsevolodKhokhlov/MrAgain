import React from "react";

import {
  MissionSectionArea,
  MissionSectionContent,
  MissionSectionContentArea,
  MissionSectionContentDescription,
  MissionSectionContentSubtitle,
  MissionSectionContentTitle,
  MissionSectionImage,
} from "./MissionSection.style.jsx";

const MissionSection = () => (
  <MissionSectionArea>
    <MissionSectionImage />
    <MissionSectionContentArea>
      <MissionSectionContent>
        <MissionSectionContentTitle>WAAROM MRAGAIN</MissionSectionContentTitle>
        <MissionSectionContentSubtitle>
          Onze Missie
        </MissionSectionContentSubtitle>
        <MissionSectionContentDescription>
          In Nederland produceren we per jaar zo&apos;n 25 kilo(!) elektronisch
          afval per persoon per jaar. Een groot gedeelte daarvan betreft
          consumenten elektronica dat nog prima te gebruiken of te repareren is.
          Wij vinden dat dit anders kan en moet. Met ons platform focussen we
          onszelf eerst op het verlengen van de levensduur van deze apparaten en
          zetten we maximaal in op hergebruik van electronica.
        </MissionSectionContentDescription>
      </MissionSectionContent>
    </MissionSectionContentArea>
  </MissionSectionArea>
);

export default MissionSection;
