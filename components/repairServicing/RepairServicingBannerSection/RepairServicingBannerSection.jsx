import "bootstrap/dist/css/bootstrap.min.css";
import "./RepairServicingBannerSection.style.less";

import Head from "next/head";
import React from "react";
import { Breadcrumb } from "react-bootstrap";

import { FRONT_END_URL } from "../../../constants.js";
import {
  RepairServicingContainer,
  RepairServicingSectionArea,
} from "../RepairServicing.style.jsx";
import {
  RepairServicingBannerTitle,
  RepairServicingBreadcrumb,
} from "./RepairServicingBannerSection.style.jsx";

const RepairServicingBannerSection = () => (
  <RepairServicingSectionArea className="repair-servicing-banner-area">
    <Head>
      <title>Telefoon reparatie | Mr Again</title>
      <meta
        name="Keywords"
        content="Telefoon reparatie, service, garantie, telefoon maken, telefoon kapot, MrAgain"
      />
      <meta
        name="description"
        content="Telefoon kapot? Bij MrAgain heb je vooraf inzage in de prijs en kwaliteit van je reparatie en vind je de beste telefoon reparateur bij jou in de buurt."
      />
      <link rel="canonical" href={FRONT_END_URL + "/reparatie"} />
      {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
      <meta property="og:type" content="website" />
      <meta
        name="og_title"
        property="og:title"
        content="Telefoon Reparatie"
      />{" "}
      <meta
        property="og:description"
        content="Bij MrAgain heb je vooraf duidelijkheid over de prijs en de kwaliteit van je telefoon reparatie."
      />
      <meta name="og:url" content={FRONT_END_URL + "/reparatie"} />
      <meta
        property="og:image"
        content={FRONT_END_URL + "/telefoon-reparatie-mragain.jpg"}
      />
      <meta name="og_site_name" property="og:site_name" content="Mr Again" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <RepairServicingContainer className="repair-servicing-banner-container">
      <RepairServicingBreadcrumb>
        <h1 className="h1-title">Telefoon reparatie via MrAgain</h1>
      </RepairServicingBreadcrumb>
    </RepairServicingContainer>
  </RepairServicingSectionArea>
);

export default RepairServicingBannerSection;
