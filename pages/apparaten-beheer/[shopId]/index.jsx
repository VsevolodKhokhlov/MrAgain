import "./index.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Modal } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setGuaranteeDevice } from "service/account/action.js";
import {
  createRepairDevice,
  getDevices,
  getShopIdByInformation,
} from "service/account/operations.js";
import { getShopBrandModel } from "service/account/operations.js";

import { Layout } from "@/components/global";

import { FRONT_END_URL } from "../../../constants.js";

const ReparationGuarantee = (routerProps) => {
  const [isload, setIsLoad] = useState(true);
  const [isProfileLoad, setIsProfileLoad] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [deviceName, setDeviceName] = useState("");

  // const [deleteDeviceValues, setDeleteDeviceValues] = useState([]);

  const {
    match,
    getDevices,
    isLoggedIn,
    account_profile,
    getShopIdByInformation,
    repairDevices,
    createRepairDevice,
  } = routerProps;

  const router = useRouter();

  const url_shopId = router.query.shopId;

  useEffect(() => {
    getShopIdByInformation(url_shopId);
  }, []);

  useEffect(() => {
    if (account_profile.id !== undefined) {
      setAccountId(account_profile.id);
      console.log(account_profile);
    }
  }, [account_profile]);

  useEffect(() => {
    if (isload === true) {
      let auth_user = JSON.parse(localStorage.getItem("auth-user"));
      // if (auth_user === null || auth_user.name !== router.query.shopId) {
      if (auth_user === null) {
        router.push("/");
      }
      getDevices();
      setIsLoad(false);
    }
  }, [isload]);
  // console.log(isLoggedIn);
  // if (isLoggedIn === false) {
  //   return <Redirect to="/" />;
  // }
  useEffect(() => {
    if (isProfileLoad === false) {
      if (account_profile.id !== undefined) setAccountId(account_profile.id);
      setIsProfileLoad(true);
    }
  }, [isProfileLoad, account_profile]);

  const handleAddDevice = () => {
    setIsShowModal(false);

    let newArray = repairDevices.filter(function (el) {
      return el.device_name === deviceName;
    });

    if (newArray.length === 0) {
      let data = {
        device_name: deviceName,
      };
      createRepairDevice(data);
    }
  };
  const handleAddDeviceCancel = () => {
    setIsShowModal(false);
  };

  const handleDataChange = (e) => {
    setDeviceName(e.target.value);
  };

  const handleBrandModel = async (id) => {
    // setGuaranteeDevice(id);
    // let data = {
    //   shop: auth_user.account_id,
    //   device: id,
    // };
    // getShopBrandModel(data);
  };

  function onCreateDevice() {
    setIsShowModal(true);
  }
  // const onChangeCheckVaule = (e) => {
  //   let arr = [];
  //   let item = e.target.value;
  //   if (e.target.checked === true) {
  //     const index = deleteDeviceValues.indexOf(item);
  //     if (index < 0) {
  //       arr = deleteDeviceValues;
  //       arr.push(item);
  //       setDeleteDeviceValues(arr);
  //     }
  //   } else {
  //     const index = deleteDeviceValues.indexOf(item);
  //     if (index > -1) {
  //       arr = deleteDeviceValues;
  //       arr.splice(index, 1);
  //       setDeleteDeviceValues(arr);
  //     }
  //   }
  // };

  // function onDeleteDevice() {
  //   for (let i = 0; i < deleteDeviceValues.length; i += 1) {
  //     deleteRepairDevice(deleteDeviceValues[i]);
  //   }
  //   setDeleteDeviceValues([]);
  // }
  return (
    <Layout>
      <div className="reparation-guarantee">
        <Head>
          <title>Mr Again - Apparaten beheer</title>
          <meta
            name="Keywords"
            content="Devices, apparaten, telefoons, tablets, laptops, beheer, MrAgain"
          />
          <meta
            name="description"
            content="Beheer gemakkelijk de apparaten die jij repareert."
          />
          <link rel="canonical" href={FRONT_END_URL + "/apparaten-beheer"} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta
            name="og_title"
            property="og:title"
            content=" Reparatie managementt"
          />
          <meta
            property="og:description"
            content="Vind de beste reparateur bij jou in de buurt"
          />
          <meta name="og:url" content={FRONT_END_URL} />
          <meta property="og:image" content="" />
          <meta
            name="og_site_name"
            property="og:site_name"
            content="Mr Again"
          />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <div className="main-title">
          <div className="wrap">
            <h4>Reparatie management</h4>
          </div>
        </div>
        <div className="reparation-guarantee-container">
          <div className="reparation-guarantee-container-wrap">
            <div className="device-repair-blog">
              <Modal
                title="Create Device"
                visible={isShowModal}
                onOk={() => {
                  handleAddDevice();
                }}
                onCancel={() => {
                  handleAddDeviceCancel();
                }}
              >
                <Input
                  className="contact-modal-input mb-0"
                  placeholder="add device name"
                  onChange={(e) => {
                    handleDataChange(e);
                  }}
                />
              </Modal>
              <div className="device-repair-blog-title">
                <h5>Apparaten die jij repareert</h5>
                <p>Beheer je apparaten,modellen en reparaties</p>
              </div>
              <div className="device-repair-blog-content">
                <div className="device-repair-blog-list">
                  <ul>
                    {repairDevices.map((el) => {
                      return (
                        <li className="device-repair-check-box" key={el.id}>
                          {/* <Checkbox
                            tabIndex={el.id}
                            onChange={e => {
                              onChangeCheckVaule(e);
                            }}
                            disabled
                          ></Checkbox> */}
                          <Link
                            href={`/reparaties?shopId=${
                              accountId !== null && accountId
                            }&deviceId=${el.id}`}
                            onClick={() => {
                              // handleBrandModel(el.id);
                            }}
                            className="guarantee-device-edit-link"
                          >
                            <a className="device-check-box-link">
                              <div className="device-check-box-title">
                                {el.device_name}
                              </div>
                              <FontAwesomeIcon
                                icon={["fas", "edit"]}
                              ></FontAwesomeIcon>
                            </a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* <div className="device-manage-btn-group">
                  <Button
                    className="device-manage-btn"
                    onClick={onCreateDevice}
                    disabled
                  >
                    <FontAwesomeIcon
                      icon={["fas", "plus-circle"]}
                    ></FontAwesomeIcon>
                    <div>Voeg apparaat toe</div>
                  </Button>
                  <Popconfirm
                    title="Are you sure delete this device?"
                    onConfirm={onDeleteDevice}
                    okText="Yes"
                    cancelText="No"
                  > 
                  <Button className="device-manage-btn" disabled>
                    <FontAwesomeIcon
                      icon={["fas", "minus-circle"]}
                    ></FontAwesomeIcon>
                    <div>Verwijder apparaat</div>
                  </Button>
                  </Popconfirm> 
                </div>*/}
              </div>
            </div>
            <div className="simple-profile-blog">
              <div className="simple-profile-blog-wrap">
                <img src={"/profile_photo.jpg"} alt=""></img>
                <div className="shop-contact-info"></div>
                {/* <div className="shop-contact-item">
                    <FontAwesomeIcon
                      className="margin-10"
                      icon={["fas", "phone-alt"]}
                    />
                    <a href="#+41 55604480" to="/page">
                      <label className="contact-info-label">+41 55604480</label>
                    </a>
                  </div>
                  <div className="shop-contact-item">
                    <FontAwesomeIcon
                      className="margin-10 position-icon"
                      icon={["fas", "globe-americas"]}
                    />
                    <a href="#www.phonemaker.nl" to="/page">
                      <label className="contact-info-label">
                        www.phonemaker.nl
                      </label>
                    </a>
                  </div>
                  <div className="shop-contact-item">
                    <FontAwesomeIcon
                      className="margin-10 position-icon"
                      icon={["fas", "map-marker-alt"]}
                    />
                    <a href="#14/1dummy address" to="/page">
                      <label className="contact-info-label">
                        Faustdreef 153 LD Utrechet
                      </label>
                    </a>
                  </div> */}
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
  repairDevices: state.account.repair_devices,
  auth_user: state.account.auth_user,
  isLoggedIn: state.account.isLogged,
  account_profile: state.account.account_profile,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getDevices: () => {
      getDevices(dispatch);
    },
    createRepairDevice: (data) => {
      createRepairDevice(data, dispatch);
    },
    // deleteRepairDevice: (id) => {
    //   deleteRepairDevice(id, dispatch);
    // },
    getShopBrandModel: (data) => {
      getShopBrandModel(data, dispatch);
    },
    setGuaranteeDevice: (id) => {
      dispatch(setGuaranteeDevice(id));
    },
    getShopIdByInformation: (str) => {
      getShopIdByInformation(str, dispatch);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReparationGuarantee);
