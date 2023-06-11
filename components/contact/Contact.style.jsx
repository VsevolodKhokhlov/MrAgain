import styled from "styled-components";

import bannerImage from "@/assets/images/telefoon-reparatie.jpg";
export const Main = styled.div`
  width: 100%;
`;

export const ContactSectionArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ContactContainerWrap = styled.div`
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bannerImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
`;

export const ContactContainer = styled.div`
  max-width: 1600px;
  // padding-left: 135px;
  // padding-right: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ContactContent = styled.div`
  width: 100%;
  // height: 270px;
  @media (max-width: 768px) {
    float: left;
    display: contents;
  }
`;
