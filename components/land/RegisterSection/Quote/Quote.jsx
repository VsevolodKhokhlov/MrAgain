import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import {
  QuoteArea,
  QuoteContentArea,
  QuoteTitle,
  QuoteTitleArea,
} from "./Quote.style";

const QuoteContent = (props) => {
  const { text } = props;
  return (
    <QuoteContentArea>
      <FontAwesomeIcon icon={faCheck} className="quote-check" />
      {text}
    </QuoteContentArea>
  );
};

const Quote = () => {
  return (
    <QuoteArea>
      <QuoteTitleArea>
        <QuoteTitle>
          Beter online gevonden worden is dichter bij dan je denkt!
        </QuoteTitle>
      </QuoteTitleArea>
      <QuoteContent text={"Word beter gevonden bij jou in de buurt"} />
      <QuoteContent
        text={"Ontvang automatisch afspraken bij jou in de agenda"}
      />
      <QuoteContent text={"Krijg online reviews van al je klanten"} />
      <QuoteContent text={"Overzicht op al je afgeronde reparaties"} />
    </QuoteArea>
  );
};

export default Quote;
