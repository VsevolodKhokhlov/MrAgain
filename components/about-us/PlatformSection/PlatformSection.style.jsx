import styled from "styled-components";

import media from "@/utils/media";

export const PlatformSectionArea = styled.div`
  position: unset;
  padding: 0px;
  background-color: white;
  flex-direction: column;
  ${media.tablet`
        position: relative;
        padding: 120px 0px;
        background-color: #f3f3f3;
        flex-direction: row;
    `}
`;

export const PlatformSectionImage = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(/smartphone-reparatie.jpg);
  height: 200px;
  max-width: 768px;
  background-size: cover;
  position: unset;
  border-radius: 13px;
  left: calc(50% + 45px);
  top: 50%;
  width: calc(100% - 40px);
  transform: unset;
  margin: auto;
  ${media.tablet`
        position: absolute;
        width: calc(50% - 65px);
        transform: translate(0%, -50%);
        margin: unset;
        border-radius: unset;
        height: 561px;
        max-width: 521px;
    `}
`;

export const PlatformSectionContentBackground = styled.div`
  background-color: white;
`;

export const PlatformSectionContentArea = styled.div`
  padding: 20px;
  max-width: 1133px;
  margin: auto;
  ${media.tablet`
        padding: 120px 20px;
    `}
`;

export const PlatformSectionContent = styled.div`
  width: unset;
  padding: 0px;
  ${media.tablet`
        width: 50%;
        padding-right: 60px;
    `}
`;

export const PlatformSectionContentTitle = styled.div`
  color: #0076a3;
  font-size: 15px;
`;

export const PlatformSectionContentSubTitle = styled.div`
  font-size: 20px;
  padding-bottom: 22px;
  ${media.tablet`
        font-size: 30px;
    `}
`;

export const PlatformSectionContentDescription = styled.div`
  font-size: 15px;
`;
