import React, { useEffect } from "react";

import { TestmonialSection } from "@/components";

import AdvantageSection from "./AdvantageSection/AdvantageSection";
import { Main } from "./RepairServicing.style.jsx";
import RepairServicingBannerSection from "./RepairServicingBannerSection/RepairServicingBannerSection";

const RepairServicing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  <Main>
    <RepairServicingBannerSection />
    <AdvantageSection />
    <TestmonialSection />
  </Main>;
};

export default RepairServicing;
