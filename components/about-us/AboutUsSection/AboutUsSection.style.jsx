import styled from "styled-components";

import media from "@/utils/media";

export const AboutSectionArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1133px;
  margin: auto;
  padding: 0px;
  flex-direction: column;
  ${media.tablet`
    padding: 107px 20px;
    flex-direction: row;
  `}
`;

export const AboutSectionQuote = styled.div`
  width: 100%;
  margin-right: 100px;
  font-size: 20px;
  font-weight: bold;
  margin: 0px;
  padding: 20px;
  background-image: linear-gradient(to right, #fafafa, #ffffff);
  ${media.tablet`
    font-size: 25px;
    margin-right: 100px;
    padding: unset;
    background-image: unset;
  `}
`;

export const AboutSectionContent = styled.div`
  width: 100%;
  padding: 20px;
  background-color: white;
  ${media.tablet`
    padding: unset;
    background-color: unset;
  `}
`;

export const AboutSectionContentTitle = styled.div`
  color: #0076a3;
  font-size: 15px;
`;

export const AboutSectionContentSubTitle = styled.div`
  font-size: 20px;
  padding-bottom: 22px;
  ${media.tablet`
    font-size: 30px;
  `}
`;

export const AboutSectionContentDescription = styled.div`
  font-size: 15px;
`;
