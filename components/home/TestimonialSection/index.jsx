import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import SliderOnMobile from "@/components/common/SliderOnMobile";
import { H2, SubTitle } from "@/components/styled/text";
import Button from "@/components/ui/Button";
import media from "@/utils/media";

const MainWrap = styled.div`
  border-radius: 200px;
  padding: 115px 0 0 0;
  position: relative;

  ${media.tablet`
    background-color: #f0f0f0;
    padding-left: 100px;
    left: -100px;
  `}
`;

const ContentWrap = styled.div`
  display: flex;
  margin-top: 30px;
  flex-direction: column;

  ${Button} {
    margin-top: 20px;
    min-width: 51px;
    font-weight: bold;

    ${media.desktop`
      span {
        display: none;
      }
    `}
  }

  ${media.desktop`
    flex-direction: row;
  `}
`;

const STATS = [
  {
    count: "267",
    label: "Aantal apparaten",
  },
  {
    count: "76",
    label: "Aangesloten reparateurs",
  },
  {
    count: "1,489",
    label: "Aantal reparaties",
  },
];

const TESTIMONIAL_DATA = [
  {
    author: "Vera",
    location: "Utrecht",
    review: (
      <>
        Mijn telefoon werd snel gerepareerd en doet het weer als vanouds! Super
        handig dat je direct een afspraak kan maken voor telefoon reparatie en
        weet wanneer ze tijd voor je hebben.
      </>
    ),
  },
  {
    author: "Quincy",
    location: "Den Haag",
    review: (
      <>
        {" "}
        Top dat je makkelijk kan vergelijken tussen reparateurs die je telefoon
        maken. Ik kon nog dezelfde dag terecht en had mijn mobiel na 30 minuten
        weer terug, lekker!
      </>
    ),
  },
];

const StatsWrap = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  ${media.desktop`
    margin-right: 50px;
    flex-direction: row;
  `}
`;

const StatWrap = styled.div`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #fff;
  display: inline-flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  margin: 4px;
  align-items: center;

  h6 {
    font-size: 22px;
    color: #06c987;
    font-weight: 500;
  }

  label {
    font-size: 12px;
    line-height: 15px;
    color: #303030;
    font-weight: 500;
    margin: 0;
  }

  ${media.tablet`
    width: 131px;
    height: 150px;
  `}
`;

const Testimonial = styled.div`
  border-radius: 20px;
  background-color: #ffffff;

  padding: 30px;
  font-size: 13px;
  color: #707070;
  font-weight: 300;
  text-align: left;
  position: relative;
  display: flex;
  align-items: center;
  min-height: 150px;
  margin: 19px 20px 10px 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04), 0 2px 2px rgba(0, 0, 0, 0.04),
    0 4px 4px rgba(0, 0, 0, 0.04), 0 6px 8px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.04);

  .svg-inline--fa {
    color: #0f75bc;
    font-size: 30px;
    position: absolute;
    top: -15px;
    right: 20px;
  }

  ${media.desktop`
    width: 430px;
    margin: 19px 10px 0 10px;
  `}
`;

const SliderWrap = styled.div`
  ${media.desktop`
    margin-top: -180px;
  `}
`;

const TestimonialAuthor = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #0f75bc;
  font-weight: 400;
  text-align: right;
  width: 66px;
  margin-left: 20px;
  white-space: nowrap;

  p {
    margin: 0;
  }

  location {
    font-size: 10px;
    line-height: 20px;
    color: #a0a0a0;
    font-weight: 400;
    text-align: right;
  }
`;

export default function TestimonialSection() {
  function renderStat(stat) {
    return (
      <StatWrap key={stat.label}>
        <h6>{stat.count}</h6>
        <label>{stat.label}</label>
      </StatWrap>
    );
  }

  function renderTestimonial(testimonial, index) {
    return (
      <div key={index}>
        <Testimonial>
          <FontAwesomeIcon className="icon-xxl" icon={["fas", "quote-right"]} />
          <div>{testimonial.review}</div>
          <TestimonialAuthor>
            <p>{testimonial.author}</p>
            <location>{testimonial.location}</location>
          </TestimonialAuthor>
        </Testimonial>
      </div>
    );
  }

  return (
    <MainWrap>
      <SubTitle>Over mragain.nl</SubTitle>
      <H2>Wat klanten zeggen</H2>
      <ContentWrap>
        <div>
          <StatsWrap>{STATS.map(renderStat)}</StatsWrap>
          <Button aria-label="Meer reviews">
            {" "}
            <span>Meer reviews</span> <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
        <SliderWrap>
          <SliderOnMobile>
            {TESTIMONIAL_DATA.map(renderTestimonial)}
          </SliderOnMobile>
        </SliderWrap>
      </ContentWrap>
    </MainWrap>
  );
}
