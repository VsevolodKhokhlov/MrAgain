import React from "react";
import styled, { css } from "styled-components";

import media from "@/utils/media";

const MainWrap = styled.div`
  font-size: 13px;
  letter-spacing: 0px;
  color: #303030;
  font-weight: 500;
  display: flex;
  background-color: #fff;
  height: 40px;
  margin: 0 -20px;
  padding: 0 20px;
  align-items: center;

  ${media.tablet`
    margin: 50px 0;
    background-color: #ececec;
    height: 60px;
    border-radius: 30px;
  `}
`;

const StepWrap = styled.div`
  cursor: pointer;
  margin: 0 7px;
  count {
    width: 22px;
    line-height: 22px;
    height: 22px;
    border-radius: 11px;
    background-color: #e0e0e0;
    display: inline-block;
    text-align: center;
    color: #fff;
    margin-right: 6px;
  }

  ${media.tablet`
    margin: 0 15px;

    count {
      width: 30px;
      line-height: 30px;
      height: 30px;
      border-radius: 15px;
    }
  `}

  ${(props) =>
    props.isCurrent &&
    css`
      count {
        background-color: #0076a3;
      }
    `}
`;

const STEPS_META = [
  {
    title: "Afspraak",
  },
  {
    title: "Informatie",
  },
  // {
  //   title: "Payment",
  // },
];

export default function Steps({ currentStep, updateStep }) {
  function renderStep(step, index) {
    return (
      <StepWrap
        key={index}
        isCurrent={index === currentStep}
        onClick={() => updateStep(index)}
      >
        <count>{index + 1}</count> {step.title}
      </StepWrap>
    );
  }

  return <MainWrap>{STEPS_META.map(renderStep)}</MainWrap>;
}
