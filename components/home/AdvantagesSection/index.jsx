import {
  faCheck,
  faClock,
  faReceipt,
  faTree,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

import SliderOnMobile from "@/components/common/SliderOnMobile";
import { H2, SubTitle } from "@/components/styled/text";
import media from "@/utils/media";

//

const ADVANTAGES = [
  {
    icon: faClock,
    title: "Cashback & beste prijs",
    1: "Reparateurs beheren de prijzen op MrAgain, hierdoor krijg je altijd de beste prijs",
    2: "Veel reparateurs komen ook op locatie",
    3: "Reparateur zonder review? Schrijf de eerste en krijg €10 cashback",
  },
  {
    icon: faReceipt,
    title: "Vooraf duidelijkheid",
    1: "Direct inzicht in reparatiekosten en garantie die je krijgt",
    2: "Authentieke reviews van klanten die je voorgingen",
  },
  {
    icon: faTree,
    title: "Je bent goed bezig",
    1: "Je helpt het milieu door duurzaam met je apparaat om te gaan",
    2: "Door jouw review help je anderen",
  },
];

const AdvantageWrap = styled.div`
  width: 281px;
  display: inline-block;
  margin: 15px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  vertical-align: top;
  position: relative;

  font-size: 12px;
  color: #707070;
  font-weight: 400;

  &:after {
    content: "";
    width: 46px;
    height: 46px;
    border-radius: 23px;
    background-color: #fafafa;
    position: absolute;
    top: 24px;
    left: 45px;
  }

  h3 {
    font-size: 15px;
    letter-spacing: 0px;
    color: #2a3444;
    font-weight: 600;
    margin: 15px 0 19px;
  }

  .svg-inline--fa {
    font-size: 34px;
    color: #06c987;
    position: relative;
    z-index: 1;
    margin-top: 3px;
  }

  d-item {
    padding-left: 30px;
    margin: 6px 0;
    position: relative;
    display: block;

    .svg-inline--fa {
      font-size: 11px;
      color: #06c987;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

const AdvantagesWrap = styled.div`
  margin: 0 -15px;
  ${media.desktop`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `}
`;

export default function AdvantagesSection() {
  function renderAdvantage({ icon, title, ...rest }) {
    return (
      <AdvantageWrap key={title}>
        <FontAwesomeIcon icon={icon} />
        <h3>{title}</h3>
        {Object.keys(rest).map((perk, index) => (
          <d-item key={index}>
            <FontAwesomeIcon icon={faCheck} /> {rest[perk]}
          </d-item>
        ))}
      </AdvantageWrap>
    );
  }

  return (
    <>
      <SubTitle>mragain.nl</SubTitle>
      <H2>Jouw voordelen</H2>
      <AdvantagesWrap>
        <SliderOnMobile
          tabletConfig={{
            slidesToShow: 2,
            centerMode: true,
            centerPadding: "40px",
          }}
        >
          {ADVANTAGES.map(renderAdvantage)}
        </SliderOnMobile>
      </AdvantagesWrap>
    </>
  );
}
