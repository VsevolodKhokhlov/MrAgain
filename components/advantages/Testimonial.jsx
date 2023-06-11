import React from "react";

import {
  GoldStar,
  StarsQuoteWrapper,
  TestimonialBox,
  TestimonialName,
  TestimonialText,
  TestimonialTitle,
  TextWrapper,
} from "./Testimonial.style";

const Testimonial = ({ title, text, name, place }) => {
  return (
    <>
      <TestimonialBox>
        <TextWrapper>
          <TestimonialTitle>{title}</TestimonialTitle>
          <TestimonialText>{text}</TestimonialText>
        </TextWrapper>
        <StarsQuoteWrapper>
          <GoldStar />
          <TestimonialName>{name}</TestimonialName>
          <TestimonialText>{place}</TestimonialText>
        </StarsQuoteWrapper>
      </TestimonialBox>
    </>
  );
};

export default Testimonial;
