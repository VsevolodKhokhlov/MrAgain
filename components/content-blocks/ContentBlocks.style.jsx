import styled from "styled-components";

export const Wrapper = styled.div`
  height: auto;
  @media (max-width: 540px) {
    padding: 0 20px;
  }
`;

export const HeaderContainer = styled.div`
  margin-bottom: 48px;
`;

export const Category = styled.h6`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: #404040;
  margin-bottom: 18px;
`;

export const Headline = styled.h2`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 33px;
  color: #404040;
`;

export const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 30px;
  @media (max-width: 540px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`;

export const Post = styled.div`
  padding-right: 60px;
  @media (max-width: 800px) {
    padding-right: 30px;
  }
  @media (max-width: 540px) {
    padding-right: 0;
  }
`;

export const PostTitle = styled.h4`
  font-family: Montserrat;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 27px;
  color: #404040;
  margin-bottom: 24px;
`;

export const Content = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #404040;
`;
