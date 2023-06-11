import "./index.less";

import { Button, Checkbox, Input, message, Popconfirm, Select } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { resetAuthError } from "service/account/action.js";
import {
  deleteAccount,
  getAccountSettings,
  getShopIdByInformation,
  resetPasswordConfirm,
  updateAccountSettings,
} from "service/account/operations.js";
import { logout } from "service/account/operations.js";

import lib from "@/assets/js/lib";

import { Layout } from "../../../components/global";
import { FRONT_END_URL } from "../../../constants.js";
import filterObjectKeys from "../../../scripts/filterObjectKeys";

const { Option } = Select;

const AccountSetting = (routerProps) => {
  const {
    acc_settings,
    auth_error,
    getAccountSettings,
    updateAccountSettings,
    resetPasswordConfirm,
    resetAuthError,
    deleteAccount,
    logOut,
  } = routerProps;

  const router = useRouter();
  const [isLoad, setLoad] = useState(false);
  const [settings, setSettings] = useState({});
  const [password, setPassword] = useState({});
  const [isEdit, setIsEdit] = useState(true);
  const [isAppEdit, setIsAppEdit] = useState(true);
  const [editBtnName, setEditBtnName] = useState("Wijzig gegevens");
  const [editAppBtnName, setEditAppBtnName] = useState(
    "Wijzig afspraak settings"
  );
  const [siteUrlTemp, setSiteUrlTemp] = useState();
  const shop_id = router.query.shopId;

  useEffect(() => {
    const auth_user = JSON.parse(localStorage.getItem("auth-user"));
    if (isLoad === false) {
      // if (auth_user === null || auth_user.name !== router.query.shopId) {
      if (auth_user === null) {
        router.push("/");
      } else {
        getAccountSettings(auth_user.account_id);
      }
    }
  }, [isLoad]);

  function handleDataChange(e) {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  }
  function handleTimePerChange(e) {
    console.log("time per change", e);
    let inter = "intervals";
    setSettings({ ...settings, [inter]: e });
  }
  function handleCheckDataChange(e) {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  }
  function handlePasswordChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  function handleEditStatus() {
    if (isEdit === true) {
      setIsEdit(false);
      setEditBtnName("Wijzigingen opslaan");
    } else {
      handleUpdate();
    }
  }

  function handleAppEditStatus() {
    if (isAppEdit === true) {
      setIsAppEdit(false);
      setEditAppBtnName("Wijzigingen opslaan");
    } else {
      handleUpdate();
    }
  }

  async function handleUpdate() {
    console.log("update");
    let id = acc_settings.id;
    let data = { ...settings };

    console.log(data);
    let loc = lib.formatZipcodeString(data.zipcode);
    if (loc === "zipcode-error") {
      alert("Er gaat wat fout, klopt je postcode?");
      return;
    }
    setIsEdit(true);
    setIsAppEdit(true);
    setEditBtnName("Wijzig gegevens");
    setEditAppBtnName("Wijzig afspraak settings");
    data.city = data.city;
    if (data.city === "zipcode-error") {
      alert("Er gaat wat fout, klopt je adres?");
      return;
    }
    data.zipcode = loc;
    delete data["id"];

    data.auth = acc_settings.auth;

    let msg = await updateAccountSettings(id, data);

    if (msg === "error") {
      // message.error("Er gaat wat fout, kloppen je adres en postcode?", [2.5]);
      message.error("Er gaat iets mis, probeer het later opnieuw!", [2.5]);
    }
    // else if (msg === "error1") {
    //   message.error("Er gaat wat fout, klopt je postcode?", [2.5]);
    // }
    else {
      message.success("Accountgegevens succesvol bijgewerkt", [2.5]);
      router.reload();
    }
  }

  useEffect(() => {
    // if (isLoad === false) {
    //   if (Object.keys(acc_settings).length !== 0) {
    //     setSettings(acc_settings);
    //     setLoad(true);
    //   }
    // }
    setSettings(acc_settings);
    if (auth_error !== null) {
      if (auth_error === "Je wachtwoord is gewijzigd") {
        message.success(auth_error, [2.5]);
        resetAuthError();
        return;
      }
      message.error(auth_error, [2.5]);
      resetAuthError();
    }
  }, [isLoad, acc_settings, auth_error, resetAuthError]);

  function updatePassword() {
    if (password.new_password !== password.confirm_password) {
      message.error("Je wachtwoord komt niet overeen", [2.5]);
    } else {
      let token = localStorage.getItem("auth-token");
      let data = {
        token: token,
        data: {
          old_password: password.old_password,
          new_password: password.new_password,
        },
      };
      resetPasswordConfirm(data);
      setPassword({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    }
  }

  function confirm(e) {
    deleteAccount(acc_settings.auth);
    message.success("Je account is succesvol verwijderd", [2.5]);
    setTimeout(() => {
      logOut();
      router.push("/");
    }, 3000);
  }

  const handleSiteUrlChange = (e) => {
    setSiteUrlTemp({ ...siteUrlTemp, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="account-setting-container">
        <Head>
          <title>Mr Again - Account gegevens</title>
          <meta name="Keywords" content="Beheer je account, MrAgain" />
          <meta name="description" content="Reparateur account beheer" />
          <link rel="canonical" href={FRONT_END_URL + "/account-gegevens"} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta
            name="og_title"
            property="og:title"
            content=" Account Settings"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          <meta name="og:url" content="url" />
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className="account-setting-container-wrap">
          <div className="setting-title-bar">
            <div className="setting-title">Account Settings</div>
            {/*<div className="setting-sub-title">
              Manage Reparation | abbonement
            </div>*/}
          </div>
          <div className="setting-content">
            <div className="first-setting-blog">
              <div className="setting-blog-title">Mijn gegevens</div>
              <div className="first-setting-blog-content">
                <div className="first-setting-blog-content-title">
                  Bedrijfsnaam
                </div>
                <div className="first-setting-blog-content-value">
                  <Input
                    placeholder="Bedrijfsnaam"
                    name="name"
                    value={settings.name}
                    onChange={handleDataChange}
                    disabled={isEdit}
                  ></Input>
                </div>
                <div className="first-setting-blog-content-title">Email</div>
                <div className="first-setting-blog-content-value">
                  <Input
                    placeholder="Emailadres"
                    name="email"
                    disabled
                    value={settings.email}
                    onChange={handleDataChange}
                  />
                </div>
                <div className="first-setting-blog-content-title">
                  Straat en huisnummer
                </div>
                <div className="first-setting-blog-content-value">
                  <Input
                    placeholder="Adres"
                    name="street"
                    value={settings.street}
                    onChange={handleDataChange}
                    disabled={isEdit}
                  ></Input>
                </div>

                <div className="first-setting-blog-content-title">Postcode</div>
                <div className="first-setting-blog-content-value">
                  <Input
                    placeholder="Postcode"
                    name="zipcode"
                    value={settings.zipcode}
                    onChange={handleDataChange}
                    disabled={isEdit}
                  ></Input>
                </div>

                <div className="first-setting-blog-content-title">Stad</div>
                <div className="first-setting-blog-content-value">
                  <Input
                    placeholder="Stad"
                    name="city"
                    value={settings.city}
                    onChange={handleDataChange}
                    disabled={isEdit}
                  ></Input>
                </div>

                <div className="first-setting-blog-content-title">Telefoon</div>
                <div className="first-setting-blog-content-value">
                  <Input
                    placeholder="Telefoon nummer"
                    name="phone_number"
                    value={settings.phone_number}
                    onChange={handleDataChange}
                    disabled={isEdit}
                  ></Input>
                </div>

                <div className="first-setting-blog-content-title">
                  kvk nummer
                </div>
                <div className="first-setting-blog-content-value">
                  <Input
                    placeholder="Je kvk nummer"
                    name="kvk"
                    value={settings.kvk}
                    onChange={handleDataChange}
                    disabled={isEdit}
                  ></Input>
                </div>

                <div className="first-setting-blog-content-title">
                  BTW nummer
                </div>
                <div className="first-setting-blog-content-value">
                  <Input
                    placeholder="Je BTW nummer"
                    name="btw"
                    value={settings.btw}
                    onChange={handleDataChange}
                    disabled={isEdit}
                  ></Input>
                </div>
                <div className="first-setting-blog-content-title">
                  IBAN rekening
                </div>
                <div className="first-setting-blog-content-value">
                  <Input
                    placeholder="Je IBAN"
                    name="iban"
                    value={settings.iban}
                    onChange={handleDataChange}
                    disabled={isEdit}
                  />
                </div>
                <div className="first-setting-blog-content-title">Website</div>
                <div className="first-setting-blog-content-value">
                  <Input
                    placeholder="website"
                    name="site_url"
                    value={settings.site_url}
                    disabled={isEdit}
                    onChange={handleDataChange}
                  />
                </div>
                <div className="first-setting-btn-group">
                  <Popconfirm
                    title="Weet je zeker dat je je account wilt verwijderen?"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className="account-delete-btn">
                      Deactivate Account
                    </Button>
                  </Popconfirm>

                  <Button
                    className="account-change-btn"
                    onClick={() => {
                      handleEditStatus();
                    }}
                  >
                    {editBtnName}
                  </Button>
                </div>
              </div>
            </div>
            <div className="second-setting-blog">
              <div className="second-setting-blog-sub">
                <div className="setting-blog-title">Afspraak settings</div>
                <div className="account-setting-appointment">
                  <div className="time-per-appointment">
                    <label>Tijd per afspraak:</label>
                    <Select
                      defaultValue="Select Times"
                      onChange={handleTimePerChange}
                      name="intervals"
                      value={settings.intervals}
                      disabled={isAppEdit}
                    >
                      <Option value={15} key={15}>
                        15
                      </Option>
                      <Option value={20} key={20}>
                        20
                      </Option>
                      <Option value={30} key={30}>
                        30
                      </Option>
                    </Select>
                  </div>
                  <Checkbox
                    name="double_appointment"
                    checked={settings.double_appointment}
                    onChange={handleCheckDataChange}
                    disabled={isAppEdit}
                  >
                    Dubbele afspraken mogelijk
                  </Checkbox>
                  <Button
                    className="appointment-change-btn"
                    onClick={() => {
                      handleAppEditStatus();
                    }}
                  >
                    {editAppBtnName}
                  </Button>
                </div>
              </div>
            </div>
            <div className="third-setting-blog">
              <div className="setting-blog-title">Wachtwoord wijzigen</div>
              <div className="third-setting-blog-content">
                <Input
                  type="password"
                  name="old_password"
                  className="account-change-password"
                  placeholder="Huidige wachtwoord"
                  value={password.old_password}
                  onChange={handlePasswordChange}
                />
                <Input
                  type="password"
                  name="new_password"
                  className="account-change-password"
                  value={password.new_password}
                  placeholder="Nieuw wachtwoord"
                  onChange={handlePasswordChange}
                />
                <Input
                  type="password"
                  name="confirm_password"
                  className="account-change-password"
                  placeholder="Bevestig nieuw wachtwoord"
                  value={password.confirm_password}
                  onChange={handlePasswordChange}
                />
                <Button
                  className="account-change-password-btn"
                  onClick={() => {
                    updatePassword();
                  }}
                >
                  Verander wachtwoord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  account_profile: state.account.account_profile,
  acc_settings: state.account.account_settings,
  auth_error: state.account.auth_error,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getAccountSettings: (data) => {
      getAccountSettings(data, dispatch);
    },
    updateAccountSettings: (id, data) =>
      updateAccountSettings(id, data, dispatch),

    resetPasswordConfirm: (data) => {
      resetPasswordConfirm(data, dispatch);
    },
    resetAuthError: () => {
      dispatch(resetAuthError());
    },
    deleteAccount: (id) => {
      deleteAccount(id, dispatch);
    },
    getShopIdByInformation: (str) => {
      getShopIdByInformation(str, dispatch);
    },
    logOut: () => {
      logout();
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
