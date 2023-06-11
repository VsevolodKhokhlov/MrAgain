import "./PrivacyBannerSection.style.less";

import React from "react";

import { PrivacyContainer, PrivacySectionArea } from "../Privacy.style.jsx";
import { PrivacyBannerTitle } from "./PrivacyBannerSection.style.jsx";

const PrivacyBannerSection = () => (
  <PrivacySectionArea className="privacy-banner-area">
    <PrivacyContainer className="privacy-banner-container">
      <PrivacyBannerTitle>Voorwaarden & Privacy</PrivacyBannerTitle>
    </PrivacyContainer>
  </PrivacySectionArea>
);

export default PrivacyBannerSection;
