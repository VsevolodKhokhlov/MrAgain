import "./Header.less";

import { Avatar, Button, Dropdown, Layout, Menu } from "antd";
import { BACK_END_URL } from "constants.js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { initUserLoginChange } from "service/account/action.js";
import { logout } from "service/account/operations.js";
import {
  getAccountProfile,
  getAccountSettings,
  getAuthUser,
  getDevices,
  getShopIdByInformation,
} from "service/account/operations.js";
import { getAppointments } from "service/appointments/operations.js";

import logo from "@/assets/images/logo.png";

const { Header } = Layout;

const HeaderView = (routerProps) => {
  const {
    authUser,
    logout,
    user_login_change,
    initUserLoginChange,
    getAccountSettings,
    getAccountProfile,
    getAuthUser,
  } = routerProps;
  const [auth_user, setAuthUser] = useState({});
  const [admin_Id, setadmin_Id] = useState({});
  const [is_load, setLoad] = useState(true);
  const [adminName, setAdminName] = useState(null);
  const router = useRouter();

  // const usr = localStorage.getItem("auth-user");
  const headerClass = (() => {
    if (router.pathname === "/") return `App-header home-page`;
    else if (router.pathname === "/over-ons") return `App-header home-page`;
    else if (router.pathname === "/meld-je-aan-als-reparateur")
      return `App-header home-page`;
    else if (router.pathname === "/reparatie") return `App-header home-page`;
    else if (router.pathname === "/veel-gestelde-vragen")
      return `App-header home-page`;
    else if (router.pathname === "/hoe-werkt-het")
      return `App-header home-page`;
    else if (router.pathname === "/contact") return `App-header home-page`;
    else return `App-header`;
  })();

  useEffect(() => {
    if (is_load === true) {
      let user = localStorage.getItem("auth-user");
      if (user !== null) {
        const authUserData = JSON.parse(user);
        // userData = authUserData;
        setAdminName(authUserData.name.replaceAll(" ", "-"));
        setAuthUser(JSON.parse(user));
      }
      initUserLoginChange(false);
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    if (user_login_change === true) {
      let user = localStorage.getItem("auth-user");
      if (user !== null) {
        setAuthUser(JSON.parse(user));
      }
      initUserLoginChange(false);
    }
  }, [user_login_change, initUserLoginChange]);

  useEffect(() => {
    let admin_auth = JSON.parse(localStorage.getItem("auth-user"));
    if (admin_auth) {
      const accountId = admin_auth.name.replaceAll(" ", "-");
      // setadmin_Id(admin_auth.account_id);
      setadmin_Id(accountId);
    }
    let token = localStorage.getItem("auth-token");
    if (token && Object.keys(authUser).length === 0) {
      getAuthUser();
    }
  }, [authUser, auth_user, admin_Id]);

  const logOut = () => {
    logout();
    router.push("/");
  };

  const handleGetDevice = () => {
    // getDevices();
  };
  const handleAccountSettings = () => {
    const user = JSON.parse(localStorage.getItem("auth-user"));
    getAccountSettings(user.account_id);
  };

  const handleAccountProfile = () => {
    getAccountProfile(auth_user.account_id);
  };

  const initSignMenu = () => {
    const [authToken, setAuthToken] = useState("");
    useEffect(() => {
      setAuthToken(localStorage.getItem("auth-token"));
    });
    if (!authToken) {
      return (
        <div className="navbar-sign">
          <Link prefetch={false} href="/login">
            <Button type="login">Inloggen</Button>
          </Link>
          <Link prefetch={false} href="/meld-je-aan-als-reparateur">
            <Button type="register">Registreer</Button>
          </Link>
        </div>
      );
    }

    const menu2 = (
      <Menu>
        {auth_user !== null && authUser.is_super === true && (
          <Menu.Item>
            <a href={BACK_END_URL + "/admin/"}>Admin pagina</a>
          </Menu.Item>
        )}
        <Menu.Item>
          <Link
            prefetch={false}
            href={
              "/account-gegevens/" +
              (auth_user.account_id === undefined && adminName !== null
                ? admin_Id
                : adminName)
            }
            onClick={() => {
              handleAccountSettings();
            }}
          >
            Account Settings
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link prefetch={false} href={"/dashboard"}>
            Dashboard
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            prefetch={false}
            href={
              "/apparaten-beheer/" +
              (auth_user.account_id === undefined && adminName !== null
                ? admin_Id
                : adminName)
            }
            onClick={() => {
              handleGetDevice();
            }}
          >
            Reparaties & Garanties
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            prefetch={false}
            href={
              "/profiel-beheer/" +
              (auth_user.account_id === undefined && adminName !== null
                ? admin_Id
                : adminName)
            }
            onClick={() => {
              handleAccountProfile();
            }}
          >
            Mijn Profiel
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link prefetch={false} href={"/hoe-werkt-het"}>
            Hoe werkt het
          </Link>
        </Menu.Item>
        <Menu.Item>
          <span
            onClick={() => {
              logOut();
            }}
          >
            Uitloggen
          </span>
        </Menu.Item>
      </Menu>
    );

    return (
      <div>
        <Dropdown className="dropdown-user-menu" overlay={menu2}>
          <a
            href="/"
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            <Avatar
              style={{ backgroundColor: "#06c987" }}
              icon="user"
              size="large"
            />
          </a>
        </Dropdown>
      </div>
    );
  };

  return (
    <Fragment>
      <Header className={headerClass} id="Mobile-Header">
        <div className="logo-blog">
          <a className="logo" href="/">
            <Image
              quality={50}
              loading={"eager"}
              priority={true}
              width={120}
              height={46}
              src={logo}
              alt="Logo Mr Again"
              style={{
                display: "table-cell",
                verticalAlign: "middle",
              }}
            />
          </a>
          <div className="logo-title">
            <div className="top" />
            <div className="bottom" />
          </div>
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="/">
            <Link prefetch={false} className="home-link" href="/">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="/over-ons">
            <Link prefetch={false} href="/over-ons">
              Over MrAgain
            </Link>
          </Menu.Item>
          <Menu.Item key="/reparatie">
            <Link prefetch={false} href="/reparatie">
              Reparatie
            </Link>
          </Menu.Item>
          <Menu.Item key="/meld-je-aan-als-reparateur">
            <Link prefetch={false} href="/meld-je-aan-als-reparateur">
              Meld je aan als telefoon reparateur
            </Link>
          </Menu.Item>
        </Menu>
        {initSignMenu()}
      </Header>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  user_login_change: state.account.user_login_change,
  authUser: state.account.auth_user,
  // account_profile: state.account.account_profile,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getAuthUser: () => {
      getAuthUser(dispatch);
    },
    logout: () => {
      logout(dispatch);
    },
    initUserLoginChange: (data) => {
      dispatch(initUserLoginChange(data));
    },
    getDevices: () => {
      getDevices(dispatch);
    },
    getAccountSettings: (data) => {
      getAccountSettings(data, dispatch);
    },
    getAccountProfile: (id) => {
      getAccountProfile(id, dispatch);
    },
    getAppointments: (id) => {
      getAppointments(id, dispatch);
    },
    getShopIdByInformation: (str) => {
      getShopIdByInformation(str, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderView);
