import "bootstrap/dist/css/bootstrap.min.css";
import "./TestimonialSection.style.less";

import React from "react";
import { Container, Row } from "react-bootstrap";

import phoneIcon from "@/assets/images/phone-icon2.png";

import {
  AdvantageSectionTitle,
  DotDevider,
  PhoneIcon,
  SectionModel,
} from "../component.style.jsx";
import TestimonialCarousel from "./TestimonialCarousel/TestimonialCarousel.jsx";
import { TestimonialSectionArea } from "./TestimonialSection.style";

const TestimonialSection = () => (
  <TestimonialSectionArea>
    <Container className="testimonial-section-container" fluid={true}>
      <Row>
        <AdvantageSectionTitle color={"#1c2430"}>
          Wat andere reparateurs zeggen
        </AdvantageSectionTitle>
      </Row>
      <Row>
        <SectionModel>
          <DotDevider color={"#f8f8f8"} />
          {/* <PhoneIcon bkImage={phoneIcon} bkColor={"#fff"} />*/}
        </SectionModel>
      </Row>
      <Row>
        <TestimonialCarousel />
      </Row>
    </Container>
  </TestimonialSectionArea>
);

export default TestimonialSection;
