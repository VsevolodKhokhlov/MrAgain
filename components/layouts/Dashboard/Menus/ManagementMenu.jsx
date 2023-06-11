import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import Image from "next/image";

import HistoryImage from "@/assets/icons/history.svg";
import ServicesImage from "@/assets/icons/services.svg";
import ShopImage from "@/assets/icons/shop.svg";

import { MenuHeader } from "../menu-styles";

const managementMenuItems = (shopId) => [
  {
    title: "Afgeronde reparaties",
    key: "history",
    icon: <Image width="24" height="24" src={HistoryImage} />,
    selectable: true,
  },
  {
    title: "Profiel beheer",
    key: "shop-management",
    icon: <Image width="24" height="24" src={ShopImage} />,
    selectable: true,
  },
  {
    title: "Reparatie management",
    key: "repair-management",
    icon: <Image width="24" height="24" src={ServicesImage} />,
    selectable: true,
  },
];

export const ManagementMenu = ({ shopId, selected, onSelect }) => (
  <>
    <MenuHeader>MANAGEMENT</MenuHeader>
    <Tree
      showIcon
      showLine={false}
      switcherIcon={<DownOutlined />}
      selectedKeys={selected}
      onSelect={onSelect}
      multiple
      blockNode
      treeData={managementMenuItems(shopId)}
    />
  </>
);
