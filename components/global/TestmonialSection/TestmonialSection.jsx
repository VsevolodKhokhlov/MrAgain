import "bootstrap/dist/css/bootstrap.min.css";
import "./TestmonialSection.style.less";

import React from "react";
import { Container, Row } from "react-bootstrap";

import {
  AdvantageSectionTitle,
  DotDevider,
  SectionModel,
} from "../component.style.jsx";
import TestmonialCarousel from "./TestmonialCarousel/TestmonialCarousel.jsx";
import { TestmonialSectionArea } from "./TestmonialSection.style";

const TestmonialSection = () => (
  <TestmonialSectionArea>
    <Container className="testmonial-section-container" fluid={true}>
      <Row>
        <h2 className="h2-title" color={"#1c2430"}>
          Wat onze bezoekers zeggen
        </h2>
      </Row>
      <Row>
        <SectionModel>
          <DotDevider color={"#f8f8f8"} />
        </SectionModel>
      </Row>
      <Row>
        <TestmonialCarousel />
      </Row>
    </Container>
  </TestmonialSectionArea>
);

export default TestmonialSection;
