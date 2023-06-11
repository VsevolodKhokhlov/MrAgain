import styled from "styled-components";

export const BenefitText = styled.div`
  font-size: 15px;
  color: #303030;
  font-weight: 700;
  font-family: "Montserrat";
  margin-left: 44px;
  width: 350px;
  max-width: 350px;
  min-width: 200px;
  @media (max-width: 570px) {
    font-size: 10px;
    max-width: 200px;
    margin-left: 25px;
  }
`;

export const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
`;
