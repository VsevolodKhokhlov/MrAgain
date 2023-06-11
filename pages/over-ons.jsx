import React from "react";

import {
  AboutBannerSection,
  AboutUsSection,
  MissionSection,
  PlatformSection,
} from "@/components/about-us";
import DefaultLayout from "@/components/layouts/Homepage";
import { Main } from "@/styled-components/over-ons.style.jsx";

const AboutUs = () => (
  <DefaultLayout showSignup>
    <Main>
      <AboutBannerSection />
      <AboutUsSection />
      <PlatformSection />
      <MissionSection />
    </Main>
  </DefaultLayout>
);

export default AboutUs;
