import * as React from "react";

function ArrowSVG({ searchInputFocus, ...props }) {
  return (
    <svg
      width="3em"
      height="3em"
      viewBox="0 0 46 44"
      fill="none"
      {...props}
      className="arrow-svg"
    >
      <rect
        width={46}
        height={44}
        rx={5}
        fill={searchInputFocus ? "#06C987" : "#C0C0C0"}
      />
      <path
        d="M15 22h16M24 15l7 7-7 7"
        stroke="#fff"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MemoArrowSVG = React.memo(ArrowSVG);
export default MemoArrowSVG;
