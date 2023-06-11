import "./AdvantageSectionWrapper.style.less";

import React from "react";
import { Col, Row } from "react-bootstrap";

import phoneIcon from "@/assets/images/phone-icon1.png";

import {
  AdvantageSectionTitle,
  DotDevider,
  PhoneIcon,
  SectionModel,
} from "../component.style.jsx";
import AdvantageFontAweSome from "./AdvantageFontAweSome/AdvantageFontAweSome.jsx";
import { AdvantageSectionArea } from "./AdvantageSectionWrapper.style.jsx";

const AdvantageSectionWrapper = () => (
  <AdvantageSectionArea>
    <div className="advantage-section-container">
      <Row>
        <h2 className="advantage-h2-title">Jouw voordelen bij MrAgain</h2>
      </Row>
      <Row>
        <SectionModel>
          <DotDevider color="#FFFFFF" />
        </SectionModel>
      </Row>
      <Row>
        <div className="dollar-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "euro-sign"]}
            title={"Direct inzage in je telefoon reparatiekosten"}
          />
        </div>
        <div className="tasks-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "star"]}
            title={"Betrouwbare reviews van mensen die je voorgingen"}
          />
        </div>
        <div className="cog-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "tools"]}
            title={
              "Nooit meer onnodig wachten, maar direct geholpen worden met jouw reparatie"
            }
          />
        </div>
        <div className="hourglass-icon col-md-3 col-sm-6 mt-5">
          <AdvantageFontAweSome
            icon={["fas", "file-contract"]}
            title={"De langst mogelijke garantie op je telefoon reparatie"}
          />
        </div>
      </Row>
    </div>
  </AdvantageSectionArea>
);

export default AdvantageSectionWrapper;
