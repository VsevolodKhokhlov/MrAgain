import styled from "styled-components";

export const MainContactUsBlog = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  // height: 416px;
  @media (max-width: 768px) {
    width: 100%;
    padding-bottom: 20px;
  }
  @media (max-width: 608px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const MainContactUsContent = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContentTitle = styled.div`
  font-size: 30px;
`;

export const MainContactForm = styled.div`
  display: flex;
  height: 188px;
  justify-content: space-between;
  @media (max-width: 466px) {
    display: contents;
  }
`;

export const FormSubBlog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  padding: 0 10px;
  @media (max-width: 466px) {
    width: 100%;
    float: left;
  }
`;
