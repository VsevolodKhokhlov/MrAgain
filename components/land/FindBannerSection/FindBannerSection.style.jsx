import styled from "styled-components";
// import bannerImage from '@/assets/images/meld-je-aan-als-telefoon-reparateur.jpg'

export const BannerSection = styled.div`
  width: 100;
  padding-left: 135px;
  padding-right: 135px;
  // height: 698px;
  margin-top: -78px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/meld-je-aan-als-telefoon-reparateur.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 668px) {
    padding-left: 75px;
    padding-right: 75px;
  }
  @media (max-width: 400px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;
