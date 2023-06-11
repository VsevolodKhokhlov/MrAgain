import Head from "next/head";
import React from "react";

import { FRONT_END_URL } from "../../../constants.js";
import { AboutSectionArea } from "./AboutBannerSection.style";

const AboutBannerSection = () => (
  <AboutSectionArea>
    <Head>
      <title>Over Mr Again</title>
      <meta
        name="description"
        content="Bij MrAgain vinden we het belangrijk dat je de beste telefoon reparateur voor jouw device vindt."
      />
      <meta
        name="Keywords"
        content="MrAgain, Telefoon reparatie, telefoon reparateur, E-waste, Hergebruik, telefoon scherm reparatie, telefoon batterij vervangen, iPhone, Samsung, Huawei telefoon, Sony telefoon"
      />
      <link rel="canonical" href={FRONT_END_URL + "/over-ons"} />
      {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
      <meta
        name="og_title"
        property="og:title"
        content="Over MrAgain, het platform voor telefoon reparateurs | MrAgain"
      />
      <meta
        property="og:description"
        content="Over MrAgain, het platform voor telefoon reparateurs | MrAgain"
      />
      <meta property="og:type" content="website" />
      <meta name="og:url" content={FRONT_END_URL + "/over-ons"} />
      <meta property="og:image" content="/electronica-reparatie.jpg" />
      <meta name="og_site_name" property="og:site_name" content="Mr Again" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  </AboutSectionArea>
);

export default AboutBannerSection;
