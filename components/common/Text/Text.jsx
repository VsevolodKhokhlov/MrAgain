import "./styles.css";

import classNames from "classnames";
import React from "react";

// type TextTypes = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
// type TextSizes = '8' | '10' | '12' | '14' | '16' | '18' | '20';
// type TextWeight = 'regular' | 'bold' | 'extra-bold';
// type TextSpacing = '0' | '2';
// type TextLineHeight = '16' | '18' | '24' | '26' | '32' | '36' | '46';

const common = "";
export const generatePreset = (props, size, weight, spacing, lineHeight) => {
  return classNames(
    common,
    `size-${size || "2xl"}`,
    `weight-${weight || "regular"}`,
    `spacing-${spacing || "normal"}`,
    `leading-${lineHeight || "normal"}`,
    { "text-uppercase": props.upperCase },
    props.className
  );
};

const Headline = (props) => {
  const h2Preset = generatePreset(
    props,
    props.size || "20",
    props.weight || "extra-bold",
    "0",
    "24"
  );
  return (
    <h2 style={props.style} className={classNames(h2Preset, "headline")}>
      {props.children}
    </h2>
  );
};

const Body = (props) => {
  const h4Preset = generatePreset(
    props,
    props.size || "10",
    props.weight || "regular",
    props.spacing,
    props.lineHeight || "16"
  );
  return (
    <p style={props.style} className={h4Preset}>
      {props.children}
    </p>
  );
};

class Text {
  static Headline = Headline;
  static Body = Body;

  render() {
    const {
      size = "base",
      weight = "regular",
      spacing = "normal",
      lineHeight = "normal",
      upperCase = false,
      className,
      children,
    } = this.props;
    const preset = classNames(
      common,
      `size-${size}`,
      `weight-${weight}`,
      `spacing-${spacing}`,
      `leading-${lineHeight}`,
      { "text-uppercase": upperCase },
      className
    );
    return <span className={preset}>{children}</span>;
  }
}
export { Headline, Body, Text };
