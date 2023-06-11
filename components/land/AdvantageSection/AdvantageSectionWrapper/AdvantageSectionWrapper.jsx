import "./AdvantageSectionWrapper.style.less";

import React from "react";
import { Col, Row } from "react-bootstrap";

import phoneIcon from "@/assets/images/phone-icon1.png";

import {
  AdvantageSectionTitle,
  DotDevider,
  PhoneIcon,
  SectionModel,
} from "../../component.style.jsx";
import AdvantageFontAweSome from "./AdvantageFontAweSome/AdvantageFontAweSome.jsx";
import { AdvantageSectionArea } from "./AdvantageSectionWrapper.style.jsx";

const AdvantageSectionWrapper = () => (
  <AdvantageSectionArea>
    <div className="advantage-section-container">
      <Row>
        <h2 className="h2-title-advantage">
          De voordelen voor telefoon reparateurs
        </h2>
      </Row>
      <Row>
        <SectionModel>
          <DotDevider color="#f8f8f8" />
          {/* <PhoneIcon bkImage={phoneIcon} bkColor={"#06c987"}/>*/}
        </SectionModel>
      </Row>
      <Row>
        <div className="dollar-icon custm-dollar-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "map-marked-alt"]}
            title={"Wordt beter gevonden bij jou in de buurt"}
          />
        </div>
        <div className="tasks-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "calendar-check"]}
            title={"Ontvang automatisch afspraken in je agenda"}
          />
        </div>
        <div className="cog-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "star"]}
            title={"Ontvang reviews van al je klanten"}
          />
        </div>
        <div className="clipboard-list col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "hands-helping"]}
            title={"Altijd overzicht over je afgeronde reparaties"}
          />
        </div>
      </Row>
    </div>
  </AdvantageSectionArea>
);

export default AdvantageSectionWrapper;
