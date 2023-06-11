import styled from "styled-components";

export const QuoteArea = styled.div`
  color: #000;
  width: 100%;
  height: 100%;
  background-color: #f1fefa;
  border-radius: 20px;
  padding: 75px 100px;
  @media (max-width: 768px) {
    border-radius: 0px;
    padding: 30px;
  }
`;

export const QuoteTitleArea = styled.div`
  margin-bottom: 30px;
  max-width: 450px;
`;

export const QuoteTitle = styled.h1`
  color: #06c987;
  font-weight: bold;
  font-size: 45px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

export const QuoteContentArea = styled.div`
  .quote-check {
    color: #06c987;
    margin-right: 10px;
  }
`;
