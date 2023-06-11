import { faBox, faHome, faStore } from "@fortawesome/free-solid-svg-icons";
import React from "react";

import InlineSelector from "./InlineSelector";

//

export const LOCATION_OPTIONS = [
  {
    label: "Reparatie in de winkel",
    description: "Kom bij ons langs voor je reparatie",
    icon: faStore,
    value: "in-store",
    apiValue: "1",
  },
  {
    label: "Reparatie op locatie",
    // @pim fix this description and remove this line once it's done
    description: "Wij komen naar jou!",
    icon: faHome,
    value: "home",
    apiValue: "2",
  },
  // {
  //   label: "Opsturen",
  //   description: "Coming soon",
  //   icon: faBox,
  //   disabled: true,
  //   value: "delivery",
  // },
];

export function getLocationOptions(shop) {
  return LOCATION_OPTIONS.map((option) => ({
    ...option,
    disabled: !shop.shop_type.includes(option.apiValue),
  }));
}

export default function LocationSelector(props) {
  return <InlineSelector {...props} />;
}
