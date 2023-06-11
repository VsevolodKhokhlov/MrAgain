import styled from "styled-components";

import media from "@/utils/media";

export const AboutSectionArea = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/electronica-reparatie.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  ${media.tablet`
    height: 587px;
  `}
`;
