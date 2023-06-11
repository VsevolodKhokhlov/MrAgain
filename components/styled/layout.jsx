import styled from "styled-components";

export const MaxConstraints = styled.div`
  max-width: ${(props) => (props.small ? "945px" : "1133px")};
  padding: 0 20px;
  width: 100%;
  margin: 0 auto;
`;
