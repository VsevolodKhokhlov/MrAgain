import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
`;

export const HowSectionArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const HowContainer = styled.div`
  max-width: 1600px;
  width: 1600px;
  padding-left: 80px;
  padding-right: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0px 0px;
  }
`;

// export const HowContent = styled.div`
//   width: 100%;
//   height: 485px;
// `
