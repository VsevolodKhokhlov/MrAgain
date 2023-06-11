import Head from "next/head";
import React from "react";

import { Layout } from "@/components/global";
import PrivacyBannerSection from "@/components/privacy/PrivacyBannerSection/PrivacyBannerSection";
import PrivacySection from "@/components/privacy/PrivacySection/PrivacySection";
import { Main } from "@/styled-components/algemene-voorwaarden.style.jsx";

import { FRONT_END_URL } from "../constants.js";

const Privacy = () => (
  <Layout>
    <Main>
      <Head>
        <title>Algemene voorwaarden MrAgain</title>
        <meta name="Keywords" content="Algemene-voorwaarden, Mr-Again" />
        <meta name="description" content="Algemene voorwaarden MrAgain" />
        <link rel="canonical" href={FRONT_END_URL + "/algemene-voorwaarden"} />
        {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
        <meta property="og:type" content="website" />
        <meta
          name="og_title"
          property="og:title"
          content="Algemene-voorwaarden"
        />
        <meta
          property="og:description"
          content="Vind de beste reparateur bij jou in de buurt"
        />
        <meta name="og:url" content={FRONT_END_URL + "/algemene-voorwaarden"} />
        <meta property="og:image" content="" />
        <meta name="og_site_name" property="og:site_name" content="Mr Again" />
      </Head>
      <PrivacyBannerSection />
      <PrivacySection />
    </Main>
  </Layout>
);

export default Privacy;
