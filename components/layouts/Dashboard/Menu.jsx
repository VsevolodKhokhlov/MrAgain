import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";

import DashboardImage from "@/assets/icons/dashboard.svg";
import Select from "@/components/ui/Select";

import { MenuWrap } from "./menu-styles";
import { AccountMenu } from "./Menus/AccountMenu";
import { ManagementMenu } from "./Menus/ManagementMenu";

export default function Menu() {
  const router = useRouter();
  const { shopId } = router.query;
  const matchingRoute = router.pathname.substring(1);
  const [selected, setSelected] = useState([
    matchingRoute.split("/")[0],
    matchingRoute,
  ]);

  const onSelect = (selectedKeys) => {
    if (selectedKeys.length !== 0) {
      const lastSelectedKey = selectedKeys[selectedKeys.length - 1];
      setSelected([lastSelectedKey]);
      router.push(`/${lastSelectedKey}`);
    }
  };

  return (
    <MenuWrap>
      <Select
        className="mb-4"
        options={[{ label: "Hoofd locatie", value: "0" }]}
        value="0"
      />
      <Tree
        showIcon
        showLine={false}
        switcherIcon={<DownOutlined />}
        selectedKeys={selected}
        onSelect={onSelect}
        multiple
        blockNode
        treeData={[
          {
            title: "Dashboard",
            key: "dashboard",
            icon: <img src={DashboardImage} />,
            selectable: true,
          },
        ]}
      />
      <ManagementMenu shopId={shopId} selected={selected} onSelect={onSelect} />
      <AccountMenu shopId={shopId} selected={selected} onSelect={onSelect} />
    </MenuWrap>
  );
}
