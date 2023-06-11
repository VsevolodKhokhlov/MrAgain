import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutBannerSection.style.less";

import React from "react";
import { Breadcrumb } from "react-bootstrap";

import { AboutContainer, AboutSectionArea } from "../ShopAppointment.style.jsx";
import {
  AboutBannerTitle,
  AboutBreadcrumb,
} from "./AboutBannerSection.style.jsx";

const AboutBannerSection = () => (
  <AboutSectionArea className="about-banner-area">
    <AboutContainer className="about-banner-container">
      <AboutBreadcrumb>
        <AboutBannerTitle>Afspraak</AboutBannerTitle>
        <Breadcrumb className="about-bread-crumb">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/about" active>
            Afspraak
          </Breadcrumb.Item>
        </Breadcrumb>
      </AboutBreadcrumb>
    </AboutContainer>
  </AboutSectionArea>
);

export default AboutBannerSection;
