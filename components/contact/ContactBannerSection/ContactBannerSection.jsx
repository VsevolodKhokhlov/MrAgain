import "./ContactBannerSection.style.less";

import React from "react";
import { Breadcrumb } from "react-bootstrap";

import {
  ContactContainer,
  ContactContainerWrap,
  ContactSectionArea,
} from "../Contact.style.jsx";
import {
  AboutBannerTitle,
  AboutBreadcrumb,
} from "./ContactBannerSection.style.jsx";

const ContactBannerSection = () => (
  <ContactSectionArea className="about-banner-area">
    <ContactContainerWrap>
      <ContactContainer className="about-banner-container">
        <AboutBreadcrumb>
          <AboutBannerTitle>Contact</AboutBannerTitle>
        </AboutBreadcrumb>
      </ContactContainer>
    </ContactContainerWrap>
  </ContactSectionArea>
);

export default ContactBannerSection;
