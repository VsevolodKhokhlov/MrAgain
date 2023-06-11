import React from "react";

import {
  AboutSectionArea,
  AboutSectionContent,
  AboutSectionContentDescription,
  AboutSectionContentSubTitle,
  AboutSectionContentTitle,
  AboutSectionQuote,
} from "./AboutUsSection.style.jsx";

const AboutUsSection = () => (
  <AboutSectionArea>
    <AboutSectionQuote>
      &quot;Wij geloven dat de wereld net een beetje mooier wordt als we er voor
      kunnen zorgen dat de levensduur van jouw apparaat wordt verlengd&quot;
    </AboutSectionQuote>
    <AboutSectionContent>
      <AboutSectionContentTitle>OVER MRAGAIN</AboutSectionContentTitle>
      <AboutSectionContentSubTitle>
        Ons team en onze dromen
      </AboutSectionContentSubTitle>
      <AboutSectionContentDescription>
        MrAgain is een start-up uit Utrecht. We zijn ondernemers, dromers en
        idealisten met een gezonde dosis optimisme. We zijn MrAgain gestart
        vanuit het besef dat het repareren van elektronische apparaten de norm
        moet zijn. We promoten reparatie van elektronische apparatuur - en dus
        hergebruik - door deze markt transparant en overzichtelijk te maken. Dat
        is bovenal goed voor het milieu, maar natuurlijk ook voor je
        portemonnee.
      </AboutSectionContentDescription>
    </AboutSectionContent>
  </AboutSectionArea>
);

export default AboutUsSection;
