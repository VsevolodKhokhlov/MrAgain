import { Radio } from "antd";
import dynamic from "next/dynamic";

import Loader from "@/components/common/Loader";

const Menu = dynamic(() => import("react-horizontal-scrolling-menu"), {
  loading: Loader,
  ssr: false,
});

export function MobileRadioButtons({ options, value, ...rest }) {
  const menuData = options.map((option) => (
    <Radio.Button key={option.value} value={option.value}>
      {option.label}
    </Radio.Button>
  ));
  return (
    <Radio.Group value={value} {...rest}>
      <Menu
        alignCenter={false}
        data={menuData}
        selected={value}
        hideArrows={true}
      />
    </Radio.Group>
  );
}
