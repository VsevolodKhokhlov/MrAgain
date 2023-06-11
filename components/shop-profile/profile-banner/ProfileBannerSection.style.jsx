import styled from "styled-components";

export const ProfileBannerContainer = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: center;
  ${(
    props
  ) => `background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url(${props.bgImage})  no-repeat center center fixed;`}
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;
