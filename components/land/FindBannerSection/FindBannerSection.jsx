import Head from "next/head";
import React from "react";

import { FRONT_END_URL } from "../../../constants.js";
import AccountCreate2 from "./CreateAccount/AccountCreate2.jsx";
import { BannerSection } from "./FindBannerSection.style.jsx";

const FindBannerSection = () => (
  <BannerSection>
    <Head>
      <title>Meld je aan als reparateur - mragain.nl</title>
      <meta
        name="Keywords"
        content="Telefoon reparatie, Telefoon reparateurs, Scherm vervangen, Batterij vervangen, water schade, MrAgain, Tablet reparatie, Tablet reparateurs, telefoonscherm vervangen, scherm telefoon kapot, telefoonscherm kapot, waterschade telefoon, telefoon in water laten vallen, iphone 6 batterij vervangen, nieuwe batterij iphone 7, iphone reparateur, telefoon in wc gevallen, scherm reparatie, iphone glas vervangen, kapot scherm, iphone glas vervangen, scherm iphone 6, nieuw scherm iphone 6, iphone 6 glas vervangen, telefoonscherm reparatie, scherm ipad vervangen"
      />
      <meta name="description" content="Meld je aan als telefoon reparateur" />
      <link
        rel="canonical"
        href={FRONT_END_URL + "/meld-je-aan-als-reparateur"}
      />

      {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
      <meta property="og:type" content="website" />
      <meta
        name="og_title"
        property="og:title"
        content="Meld je aan als telefoon reparateur"
      />
      <meta
        property="og:description"
        content="Meld je aan als telefoon reparateur"
      />
      <meta
        name="og:url"
        content={FRONT_END_URL + "/meld-je-aan-als-reparateur"}
      />
      <meta
        property="og:image"
        content={FRONT_END_URL + "/meld-je-aan-als-telefoon-reparateur.jpg"}
      />
      <meta name="og_site_name" property="og:site_name" content="Mr Again" />

      <meta name="theme-color" content="#ffffff" />
    </Head>
    <AccountCreate2 classname="banner-section"></AccountCreate2>
  </BannerSection>
);

export default FindBannerSection;
