import { DownOutlined } from "@ant-design/icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tree } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

import SettingsImage from "@/assets/icons/settings.svg";
import api from "@/utils/api";

import { API_PATH } from "../../../../constants";
import { MenuHeader } from "../menu-styles";

const accountMenuItems = (shopId) => [
  {
    title: "Account gegevens",
    key: "account-settings",
    icon: <Image width="24" height="24" src={SettingsImage} />,
    selectable: true,
  },
];

export const AccountMenu = ({ selected, onSelect, shopId }) => {
  const router = useRouter();
  return (
    <>
      <MenuHeader>ACCOUNT</MenuHeader>
      <Tree
        showIcon
        showLine={false}
        switcherIcon={<DownOutlined />}
        selectedKeys={selected}
        onSelect={onSelect}
        multiple
        blockNode
        treeData={accountMenuItems(shopId)}
      />
      <Tree
        showIcon
        showLine={false}
        switcherIcon={<DownOutlined />}
        onSelect={async () => {
          await api.get(`${API_PATH.LOGOUT}`);
          localStorage.setItem("auth-user", null);
          localStorage.setItem("auth-token", null);
          router.push("/");
        }}
        treeData={[
          {
            title: "Logout",
            key: "logout",
            icon: <FontAwesomeIcon icon={faSignOutAlt} />,
          },
        ]}
      />
    </>
  );
};
