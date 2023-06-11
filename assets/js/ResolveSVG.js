import React from "react";
import {
  AdvantagesClock,
  AdvantagesThumb,
  AdvantagesWallet,
  AdvantagesWarranty, SearchIcon, TestSvg
} from "../icons/SvgIcons";


const ResolveSVG = ({ name }) => {
  return (
    <>
      {name === "clock" && <AdvantagesClock />}
      {name === "thumb" && <AdvantagesThumb />}
      {name === "wallet" && <AdvantagesWallet />}
      {name === "warranty" && <AdvantagesWarranty />}
      {name === "test" && <TestSvg />}
      {name === "search" && <SearchIcon />}
    </>
  );
};

export default ResolveSVG;
