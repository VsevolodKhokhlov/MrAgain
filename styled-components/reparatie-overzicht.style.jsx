import styled from "styled-components";

export const RepairSingleImage = styled.div`
  width: 300px;
  height: 300px;
  margin: 50px auto;
  max-height: 300px;
  ${(props) => `background-image: url(${props.src});`}
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
