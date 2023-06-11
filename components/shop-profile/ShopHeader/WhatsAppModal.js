import Link from "next/link";
import React, { useCallback } from "react";
import { WhatsappIcon } from "react-share";
import styled from "styled-components";

import { TextButton } from "@/components/ui/Button";
import { useScreenSize } from "@/utils/media";

const ButtonExtend = styled(TextButton)`
  height: 52px;
  padding: 0;
`;

export default function DetailsModal({ number }) {
  const isMobile = useScreenSize().size === "mobile";
  const iconSIze = isMobile ? 35 : 52;
  return (
    <>
      <ButtonExtend id="whatsAppButton">
        <WhatsAppClick number={number}>
          <WhatsappIcon size={iconSIze} round enableBackground={false} />
        </WhatsAppClick>
      </ButtonExtend>
    </>
  );
}

const WhatsAppClick = ({ children, number }) => {
  if (typeof number !== "string") {
    number = number.toString();
  }

  const isMobile = useScreenSize().size === "mobile";

  // https://faq.whatsapp.com/general/chats/how-to-use-click-to-chat/?lang=en
  // remove zeros or +
  function stripeNumber(number) {
    if (number.startsWith("00")) {
      return number.slice(2);
    }
    if (number.startsWith("0")) {
      return "31" + number.slice(1);
    }
    if (number.startsWith("+")) {
      return number.slice(1);
    }
    return number;
  }

  function whatsappLink() {
    return (
      "https://" +
      (isMobile ? "api" : "web") +
      `.whatsapp.com/send/?phone=${stripeNumber(number)}`
    );
  }

  return (
    <>
      <Link href={whatsappLink()}>
        <a target="_blank">{children}</a>
      </Link>
    </>
  );
};
