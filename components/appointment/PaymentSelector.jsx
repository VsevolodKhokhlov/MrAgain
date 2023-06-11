import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faCreditCard, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import InlineSelector from "./InlineSelector";

//

const DEFAULT_OPTIONS = [
  {
    label: "Cash",
    description: "Pay cash when checking out from the store",
    icon: faMoneyBill,
    value: "cash",
  },
  {
    label: "Credit card",
    description: "Create an apointment to visit our store",
    icon: faCreditCard,
    value: "credit-card",
  },
  {
    label: "Paypal",
    description: "Coming soon",
    icon: faPaypal,
    disabled: true,
    value: "paypal",
  },
];

export default function PaymentSelector(props) {
  return <InlineSelector options={DEFAULT_OPTIONS} {...props} />;
}
