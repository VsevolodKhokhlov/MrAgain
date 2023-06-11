import "./AdvantageFontAweSome.style.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Blog, BlogTitle, CircleIcon } from "./AdvantageFontAweSome.style.jsx";

const AdvantageFontAweSome = (param) => (
  <Blog>
    <CircleIcon>
      <FontAwesomeIcon icon={param.icon} />
    </CircleIcon>
    <BlogTitle>{param.title}</BlogTitle>
  </Blog>
);

export default AdvantageFontAweSome;
