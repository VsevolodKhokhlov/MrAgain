import styled from "styled-components";

export const AdvantageSectionTitle = styled.div`
  margin: 0 auto;
  height: 48px;
  font-size: 50px;
  letter-spacing: 2px;
  font-weight: bold;
  ${(props) => `color: ${props.color};`}
  @media (max-width:570px) {
    font-size: 30px;
    text-align: center;
  }
`;

export const SectionModel = styled.div`
  width: 648px;
  height: 98px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
export const DotDevider = styled.div`
  width: 100%;
  ${(props) => `border-bottom: 2px dotted ${props.color};`}
`;
export const PhoneIcon = styled.div`
  width: 40px;
  height: 40px;
  ${(props) => `background-color: ${props.bkColor};`}
  ${(props) => `background-image: url(${props.bkImage});`}
  z-index: 1;
  position: absolute;
  right: 50%;
  background-position: center;
  background-repeat: no-repeat;
`;
