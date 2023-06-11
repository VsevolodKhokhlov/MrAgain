import styled from "styled-components";

import media from "@/utils/media";

export const MissionSectionArea = styled.div`
  position: relative;
  padding-bottom: 100px;
  background-color: white;
  ${media.tablet`
        background-color: #f3f3f3;
    `}
`;

export const MissionSectionImage = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/recycling-refurbish-electronica.jpg");
  height: 150px;
  ${media.tablet`
        height: 461px;
    `}
`;

export const MissionSectionContentArea = styled.div`
  max-width: 1133px;
  margin: auto;
  padding: 20px;
  margin-top: -42px;
  ${media.tablet`
        margin-top: -100px;
    `}
`;
export const MissionSectionContent = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  ${media.tablet`
        padding: 110px;
    `}
`;

export const MissionSectionContentTitle = styled.div`
  color: #0076a3;
  font-size: 15px;
`;

export const MissionSectionContentSubtitle = styled.div`
  font-size: 20px;
  padding-bottom: 22px;
  ${media.tablet`
        font-size: 30px;
    `}
`;

export const MissionSectionContentDescription = styled.div`
  font-size: 15px;
`;
