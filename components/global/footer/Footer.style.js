import styled from "styled-components";

export const FooterViewSection = styled.div`
  width: 100%;
  background-color: #1c2430;
  color: #fff;
`;
export const FooterViewContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  background-color: #1c2430;
  padding: 75px 135px 20px 135px;
  ${(props) => `display: ${props.show};`}
  align-items: center;
  margin: 0 auto;

  @media (max-width: 570px) {
    padding: 75px 20px 50px 20px;
  }
`;

export const FooterViewContent = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 1125px) {
    display: unset;
  }
`;

export const FooterCopyright = styled.div`
  width: 100%;
  height: 55px;

  background: #181515;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterBrandArea = styled.div`
  width: 480px;
  padding-right: 50px;
  @media (max-width: 1125px) {
    width: 700px;
  }
  @media (max-width: 952px) {
    width: 500px;
    margin: 0px auto;
    display: table;
  }
  @media (max-width: 570px) {
    width: auto;
    padding: 0;
  }
`;

export const FooterBrandLogo = styled.div`
  display: flex;
  margin-bottom: 26px;
`;

export const FooterLogoIcon = styled.div`
  margin-right: 15px;
`;

export const FooterBrandTitle = styled.div``;

export const LogoTopTitle = styled.div`
  font-size: 24px;
  line-height: 28px;
`;

export const LogoBottomTitle = styled.div`
  font-size: 20px;
  color: #06c987;
  line-height: 24px;
`;

export const FooterBrandContent = styled.div``;

export const FooterLinkArea = styled.div`
  display: flex;
  width: 550px;
  @media (max-width: 1125px) {
    width: 700px;
    padding-top: 25px;
  }
  @media (max-width: 952px) {
    width: 500px;
    margin: 0px auto;
    display: table;
  }
  @media (max-width: 570px) {
    width: auto;
    margin: 0;
  }
`;

export const FooterSitemap = styled.div`
  width: 70%;
  @media (max-width: 570px) {
    width: 100%;
  }
`;

export const FooterSitemapTitle = styled.div`
  margin-bottom: 15px;
  font-size: 20px;
`;

export const Servicing = styled.div`
  width: 50%;
  @media (max-width: 570px) {
    width: 100%;
  }
`;

export const ServicingTitle = styled.div`
  margin-bottom: 15px;
  font-size: 20px;
`;

export const FollowUs = styled.div`
  width: 50%;
  @media (max-width: 570px) {
    width: 100%;
  }
`;

export const FollowUsTitle = styled.div`
  margin-bottom: 18px;
  font-size: 20px;
`;

export const DevicesContainer = styled.div`
  width: 100%;
  max-width: 1600px;
  background-color: #1c2430;
  padding: 0px 135px 50px 135px;
  ${(props) => `display: ${props.show};`}
  align-items: center;
  margin: 0 auto;

  @media (max-width: 570px) {
    padding: 75px 20px 50px 20px;
  }
`;
