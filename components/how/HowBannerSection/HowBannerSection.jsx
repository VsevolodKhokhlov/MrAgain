import "./HowBannerSection.style.less";

import React from "react";

import { HowContainer, HowSectionArea } from "../How.style.jsx";
import { HowBannerTitle } from "./HowBannerSection.style.jsx";

const HowBannerSection = () => (
  <HowSectionArea className="how-banner-area">
    <HowContainer className="how-banner-container">
      <HowBannerTitle></HowBannerTitle>
    </HowContainer>
  </HowSectionArea>
);

export default HowBannerSection;
