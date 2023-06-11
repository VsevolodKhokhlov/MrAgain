import React from "react";

import ResolveSVG from "../../assets/js/ResolveSVG";
import { BenefitText, Wrapper } from "./Benefit.style";

const Benefit = ({ svgName, text }) => {
  return (
    <>
      <Wrapper>
        <ResolveSVG name={svgName} />
        <BenefitText>{text}</BenefitText>
      </Wrapper>
    </>
  );
};

export default Benefit;
