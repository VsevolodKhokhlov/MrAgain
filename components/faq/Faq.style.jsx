import styled from "styled-components";
import { sizes } from "utils/media";

export const Main = styled.div`
  width: 100%;
`;

export const FaqSectionArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const FaqContainer = styled.div`
  max-width: 1600px;
  width: 1600px;
  padding-left: 135px;
  padding-right: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${sizes.tablet}px) {
    padding: 0px 0px;
  }
`;

export const FaqContent = styled.div`
  width: 100%;
  height: 485px;
`;
