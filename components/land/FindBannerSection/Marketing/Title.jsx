import "./Title.style.less";

import React, { useState } from "react";
import { connect } from "react-redux";

import { CommonText, GreenText } from "./Title.style.jsx";

function Title() {
  return (
    <div className="form-title">
      <CommonText>Altijd een werkende telefoon</CommonText>{" "}
    </div>
  );
}

export default connect(Title);
