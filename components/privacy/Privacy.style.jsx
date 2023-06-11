import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
`;

export const PrivacySectionArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const PrivacyContainer = styled.div`
  max-width: 1600px;
  width: 1600px;
  padding-left: 135px;
  padding-right: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0px 0px;
  }
`;

export const PrivacyContent = styled.div`
  width: 100%;
  height: 485px;
`;
