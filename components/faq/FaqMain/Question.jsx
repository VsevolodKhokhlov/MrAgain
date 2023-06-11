import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useState } from "react";

import {
  AnswerContainer,
  BlockText,
  Content,
  InnerContainer,
  PlusMinusButton,
  QuestionContainer,
  Title,
  TitleText,
  Underline,
} from "@/components/faq/FaqMain/Faq.style";

const Question = ({ data }) => {
  let { title, faq } = data;

  return (
    <InnerContainer>
      <Title>
        <TitleText>{title}</TitleText>
        <Underline />
      </Title>
      <Content>
        <Block faq={faq} />
      </Content>
    </InnerContainer>
  );
};

export default Question;

const Block = ({ faq }) => {
  const [expanded, setExpanded] = useState(false);
  const toggle = (index) => {
    if (expanded === index) {
      return setExpanded(null);
    }
    setExpanded(index);
  };

  if (!faq.length > 0) return null;
  return faq.map((item, index) => {
    let { answer, question } = item;
    let isOpen = expanded === index;
    return (
      <Fragment key={index}>
        <QuestionContainer
          style={{ fontWeight: !isOpen ? "500" : "700" }}
          onClick={() => toggle(index)}
        >
          <BlockText>{question}</BlockText>
          <PlusMinusButton>
            {!isOpen ? (
              <FontAwesomeIcon icon={faPlus} style={{ color: "#1CC174" }} />
            ) : (
              <FontAwesomeIcon icon={faMinus} style={{ color: "#1CC174" }} />
            )}
          </PlusMinusButton>
        </QuestionContainer>
        {isOpen && (
          <AnswerContainer>
            <BlockText>{answer}</BlockText>
          </AnswerContainer>
        )}
      </Fragment>
    );
  });
};
