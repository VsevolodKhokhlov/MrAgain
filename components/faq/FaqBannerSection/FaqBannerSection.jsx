import "./FaqBannerSection.style.less";

import React from "react";

import { FaqContainer, FaqSectionArea } from "../Faq.style.jsx";
import { FaqBannerTitle } from "./FaqBannerSection.style.jsx";

const FaqBannerSection = () => (
  <FaqSectionArea className="faq-banner-area">
    <FaqContainer className="faq-banner-container">
      <FaqBannerTitle>Veel gestelde vragen</FaqBannerTitle>
    </FaqContainer>
  </FaqSectionArea>
);

export default FaqBannerSection;
