import React from "react";

import { OuterContainer } from "@/components/faq/FaqMain/Faq.style";

import Question from "./Question";

const QuestionList = ({ data }) => {
  return (
    <OuterContainer>
      {data.map((item, index) => {
        return <Question key={index} data={item} />;
      })}
    </OuterContainer>
  );
};

export default QuestionList;
