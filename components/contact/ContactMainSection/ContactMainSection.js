import "./ContactMainSection.style.css";

import React from "react";

import {
  ContactContainer,
  ContactContent,
  ContactSectionArea,
} from "../Contact.style.jsx";
import MainContactUs from "./MainContactUs/MainContactUs";
import MainLocateUs from "./MainLocateUs/MainLocateUs";

const ContactMainSection = () => (
  <ContactSectionArea>
    <ContactContainer className="contact-container">
      <ContactContent className="contact-content">
        <MainLocateUs />
        <MainContactUs />
      </ContactContent>
    </ContactContainer>
  </ContactSectionArea>
);

export default ContactMainSection;
