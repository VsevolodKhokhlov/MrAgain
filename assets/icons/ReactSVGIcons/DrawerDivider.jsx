import * as React from "react";

function DrawerDivider(props) {
  return (
    <svg
      width="493"
      height="4"
      viewBox="120 10495 4"
      fill="none"
      {...props}
    >
      <rect x="0.5" width="700" height="3.285" fill="#F0F0F0" />
      <rect x="0.5" width="194" height="3.285" fill="#06C987" />
    </svg>
  );
}

const MemoDrawerDivider = React.memo(DrawerDivider);
export default MemoDrawerDivider;
