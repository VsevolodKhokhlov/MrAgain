import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-picker/dist/index.css";
import "./index.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Checkbox, Input, Select } from "antd";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import ImagePicker from "react-image-picker";
import { connect } from "react-redux";
import { Label } from "semantic-ui-react";
import {
  getShopIdByInformation,
  getSimpleAccountInformation,
  uploadImage,
} from "service/account/operations.js";
import { setLoadAppointment } from "service/appointments/action.js";
import {
  CancelAppointment,
  getAppointments,
} from "service/appointments/operations.js";
import { setLoadService } from "service/search/action.js";
import {
  getSearchFilterField,
  getSearchFilterFieldExt,
} from "service/search/operations.js";

import { Layout } from "@/components/global";
import { RepairSingleImage } from "@/styled-components/reparatie-overzicht.style";

import menu_icon from "../../../assets/images/menu.png";
import { FRONT_END_URL } from "../../../constants.js";

const { Option } = Select;

const ReparationOverView = (routerProps) => {
  const router = useRouter();
  const url_shopId = router.query.shopId;
  const {
    match,
    getAppointments,
    getSearchFilterField,
    getSearchFilterFieldExt,
    filterlistPBM,
    filterlistRPG,
    auth_user,
    appointmentList,
    isLoadAppointment,
    isLoadService,
    modelServices,
    setLoadService,
    setLoadAppointment,
    account_profile,
    getSimpleAccountInformation,
    isLoggedIn,
    getShopIdByInformation,
  } = routerProps;

  useEffect(() => {
    getShopIdByInformation(url_shopId);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    setState({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    function updateDimensions() {
      setState({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
  }, []);

  const [state, setState] = useState({
    height: 0,
    width: 0,
  });
  // console.log(state);

  const [isLoad, setLoad] = React.useState(false);
  const [phone, setPhone] = React.useState(1);
  const [brand, setBrand] = React.useState(0);
  const [model, setModel] = React.useState(0);
  const [reparation, setReparation] = React.useState(0);
  const [serialnumber, setSerialNumber] = React.useState("");
  const [color, setColor] = React.useState("");
  const [memory, setMemory] = React.useState("");
  const [comments, setComment] = React.useState("");
  const [closeRepair, setCloseRepair] = React.useState(false);
  const [mobileID, setMobileId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [selectImg, setSelectImg] = React.useState("");
  const [display, setDisplay] = useState("none");
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [appointlist, setAppointList] = useState([]);
  const [appCountAll, setAppCountAll] = useState(0);

  let repList = [];
  let isExistR = [];

  const handleGetAppointments = () => {
    getAppointments(40);
  };

  useEffect(() => {
    if (isLoad === false) {
      let auth_user = JSON.parse(localStorage.getItem("auth-user"));
      // if (auth_user === null || auth_user.name !== router.query.shopId) {
      if (auth_user === null) {
        router.push("/");
      } else if (auth_user !== null) getAppointments(auth_user.account_id);

      // handleGetSimpleAccount();
      // handleGetAppointments();
      getSearchFilterField();
    }
  }, [isLoad]);

  useEffect(() => {
    if (isLoadService === true) {
      if (modelServices.length > 0) {
        setLoadService(false);
      }
    }
    if (isLoad === false || isLoadAppointment === true) {
      if (appointmentList === undefined) {
        setAppCountAll(0);
      } else {
        let count = getAppointmentsCountAll(appointmentList);
        setAppCountAll(count);
      }
      function compare_item(a, b) {
        if (a.appointment.date < b.appointment.date) {
          return -1;
        } else if (a.appointment.date > b.appointment.date) {
          return 1;
        } else {
          return 0;
        }
      }
      let applist = appointmentList.sort(compare_item);
      setAppointList(applist);
      setLoadAppointment(false);
      setLoad(true);
    }
  }, [
    isLoadService,
    isLoad,
    isLoadAppointment,
    appointmentList,
    modelServices,
    setLoadService,
    setLoadAppointment,
  ]);

  if (filterlistRPG !== undefined) {
    filterlistRPG.map((element) => {
      isExistR = repList.filter((rep) => rep.id === element.reparation.id);
      if (isExistR.length === 0) {
        repList.push(element.reparation);
      }
      return true;
    });
  }

  const handleModalClose = () => setShowModal(false);
  const handlePictureModalClose = () => setShowModal1(false);
  const handleModalShow = (el) => {
    setPhone(el.device.id);
    setBrand(el.brand.id);
    setModel(el.model.id);
    setReparation(el.reparation.id);
    setShowModal(true);
    setSerialNumber(el.serialnumber);
    setColor(el.color);
    setMemory(el.memory);
    setComment(el.comments);
    setCloseRepair(el.status === 1 ? true : false);
    if (el.images.length > 0) {
      setImageList(JSON.parse(el.images));
    } else {
      setImageList([]);
    }
    getSearchFilterFieldExt(el.model.id);
  };

  function initBrandSelect() {
    let phoneObj = filterlistPBM.filter((el) => el.id === phone);
    return (
      phoneObj[0] !== undefined &&
      phoneObj[0]["brand"].map((element) => {
        return (
          <Option value={element.id} key={element.brand_name}>
            {element.brand_name}
          </Option>
        );
      })
    );
  }

  function initModelSelect() {
    let phoneObj = filterlistPBM.filter((el) => el.id === phone);
    if (phoneObj[0] !== undefined) {
      let modelObj = phoneObj[0]["brand"].filter((e1) => e1.id === brand);
      return (
        modelObj[0] !== undefined &&
        modelObj[0]["model"].map((element) => {
          return (
            <Option value={element.id} key={element.model_name}>
              {element.model_name}
            </Option>
          );
        })
      );
    }
  }

  function initReparationSelect() {
    return (
      repList !== [] &&
      repList.map((element) => {
        return (
          <Option value={element.id} key={element.name}>
            {element.name}
          </Option>
        );
      })
    );
  }

  function showGuaranteeDate(el) {
    let date = new Date(el.appointment.date);
    date = new Date(date.setMonth(date.getMonth() + el.guarantee));
    date = new Date(date.setDate(date.getDate()));
    return moment(date, "DD-MM-YYYY").format("DD-MM-YYYY");
  }

  function formatDate(date, frmString) {
    let date1 = new Date(date);
    date1 = new Date(date1.setDate(date1.getDate()));
    return moment(new Date(date1), frmString).format(frmString);
  }

  function getAppointmentsCountAll(_list) {
    let count = 0;

    if (_list !== undefined) {
      _list.map((el) => {
        if (el.status === -1) {
          count = count + 1;
        }
        return true;
      });
    }
    return count;
  }

  function onMobileIDChange(e) {
    setMobileId(e.target.value);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function filterReparation() {
    function filter_email(a, email, mobile_id) {
      if (email.length > 0) {
        if (a.appointment.client_email !== email) {
          return false;
        }
      }
      if (mobile_id.length > 0) {
        if (a.serialnumber !== mobile_id) {
          return false;
        }
      }
      return true;
    }
    let applist = appointmentList.filter((el) => {
      return filter_email(el, email, mobileID);
    });
    setAppointList(applist);
  }

  const onImagePick = (e) => {
    setSelectImg(e.src);
    setShowModal1(true);
    return;
  };
  const onDisplayChange = (e) => {
    if (display === "none") {
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  };
  return (
    <Layout>
      <div className="shop-reparation-overview-page">
        <div className="shop-reparation-overview-page-container">
          <span className="menu-btn" onClick={onDisplayChange}>
            <img src={menu_icon} />
          </span>

          {state.width < 1020 ? (
            <div className="dashboard-page-widget" style={{ display: display }}>
              <Avatar
                className="shop-widget-avatar"
                // src={
                //   account_profile.bg_photo !== undefined &&
                //   account_profile.bg_photo
                // }
                src={
                  account_profile.logo_photo === "" ||
                  account_profile.logo_photo !== undefined ||
                  account_profile.bg_photo !== undefined
                    ? account_profile.bg_photo
                    : account_profile.logo_photo
                }
              />
              <div className="widget-shop-title">
                {account_profile.name !== undefined && account_profile.name}
              </div>
              <div className="widget-shop-email">{auth_user.email}</div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "calendar"]}
                />
                <Link prefetch={false} href={"/dashboard"}>
                  Dashboard
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="over-icon"
                  icon={["fas", "chalkboard-teacher"]}
                />
                <Link
                  prefetch={false}
                  href={"/reparatie-overzicht/" + url_shopId}
                >
                  Reparatie Overzicht
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "tasks"]}
                />
                <Link prefetch={false} href={"/apparaten-beheer/" + url_shopId}>
                  Model & Reparatie beheer
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "user"]}
                />
                <Link prefetch={false} href={"/profiel-beheer/" + url_shopId}>
                  Profiel
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "cogs"]}
                />
                <Link prefetch={false} href={"/account-gegevens/" + url_shopId}>
                  Account Settings
                </Link>
              </div>
            </div>
          ) : (
            <div className="dashboard-page-widget" style={{ display: "block" }}>
              <Avatar
                className="shop-widget-avatar"
                // src={
                //   account_profile.bg_photo !== undefined &&
                //   account_profile.bg_photo
                // }
                src={
                  account_profile.logo_photo === "" ||
                  account_profile.logo_photo !== undefined ||
                  account_profile.bg_photo !== undefined
                    ? account_profile.bg_photo
                    : account_profile.logo_photo
                }
              />
              <div className="widget-shop-title">
                {account_profile.name !== undefined && account_profile.name}
              </div>
              <div className="widget-shop-email">{auth_user.email}</div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "calendar"]}
                />
                <Link prefetch={false} href={"/dashboard/" + url_shopId}>
                  Dashboard
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="over-icon"
                  icon={["fas", "chalkboard-teacher"]}
                />
                <Link
                  prefetch={false}
                  href={"/reparatie-overzicht/" + url_shopId}
                >
                  Reparatie Overzicht
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "tasks"]}
                />
                <Link prefetch={false} href={"/apparaten-beheer/" + url_shopId}>
                  Model & Reparatie beheer
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "user"]}
                />
                <Link prefetch={false} href={"/profiel-beheer/" + url_shopId}>
                  Profiel
                </Link>
              </div>
              <div className="widget-shop-appointment">
                <FontAwesomeIcon
                  className="calendar-icon"
                  icon={["fas", "cogs"]}
                />
                <Link prefetch={false} href={"/account-gegevens/" + url_shopId}>
                  Account Settings
                </Link>
              </div>
            </div>
          )}

          <div className="dashboard-page-content">
            <Head>
              <title>Mr Again - Reparatie & Garantie Overzicht</title>
              <meta
                name="Keywords"
                content="Telefoon reparaties, Tablet reparaties, reparatie overzicht"
              />
              <meta name="description" content="Reparatie-overzicht" />
              <link
                rel="canonical"
                href={FRONT_END_URL + "/reparatie-overzicht"}
              />
              {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
              <meta property="og:type" content="website" />
              <meta
                name="og_title"
                property="og:title"
                content=" Reparatie & Garantie Overzicht"
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
            {/* <div className="dashboard-page-header">
              <div>
                <Avatar
                  className="dashboard-page-header-avatar"
                  src={account_profile.bg_photo}
                />
                Repair Shop | Settings
              </div>
              <div>
                Notifications
                <FontAwesomeIcon
                  className="shop-dashboard-bell"
                  icon={["far", "bell"]}
                />
                <Badge count={appCountAll}>
                  <a href="/dashboard" className="head-example"></a>
                </Badge>
              </div>
            </div>*/}
            <div className="dashboard-page-body">
              <div className="dashboard-page-body-title">
                Reparatie & Garantie Overzicht
              </div>
              <div className="shop-appointment-table-header">
                <div className="filter-btn-group">
                  <Input
                    className="filter-input"
                    placeholder="IMEI nummer"
                    onChange={(e) => {
                      onMobileIDChange(e);
                    }}
                  />
                  <Input
                    className="filter-input"
                    placeholder="Emailadres"
                    onChange={(e) => {
                      onEmailChange(e);
                    }}
                  />
                  <Button
                    className="search-btn"
                    onClick={() => {
                      filterReparation();
                    }}
                  >
                    Zoek
                  </Button>
                </div>
              </div>
              <div className="shop-appointment-table-body">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Datum</th>
                      <th>Reparatie type</th>
                      <th>Apparaat</th>
                      <th>Prijs</th>
                      <th>Afgesloten</th>
                      <th>IMEI nummer</th>
                      <th>Garantie tot</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointlist &&
                      appointlist.map((el) => {
                        if (el.status === 1) {
                          return (
                            <tr key={el.id}>
                              <td>
                                {formatDate(el.appointment.date, "DD-MM-YYYY")}
                              </td>
                              <td>{el.reparation.reparation_name}</td>
                              <td>{el.device.device_name}</td>
                              <td>{el.price}</td>
                              <td>{el.status === 1 ? "Ja" : "Nee"}</td>
                              <td>{el.serialnumber}</td>
                              <td>{showGuaranteeDate(el)}</td>
                              <td className="reparation-action-btn-group">
                                <Button
                                  className="reparation-change-btn"
                                  onClick={() => {
                                    handleModalShow(el);
                                  }}
                                >
                                  Meer informatie
                                </Button>
                              </td>
                            </tr>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </tbody>
                </Table>
                <Modal
                  show={showModal}
                  onHide={handleModalClose}
                  className="reparation-change-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Reparatie details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="select-device-reparation">
                      <div>
                        <Select
                          className="device-select"
                          value={phone}
                          disabled={true}
                        >
                          {filterlistPBM.map((element) => {
                            return (
                              <Option
                                value={element.id}
                                key={element.device_name}
                              >
                                {element.device_name}
                              </Option>
                            );
                          })}
                        </Select>
                      </div>
                      <div>
                        <Select
                          className="brand-select"
                          value={brand}
                          disabled={true}
                        >
                          {initBrandSelect()}
                        </Select>
                      </div>
                      <div>
                        <Select
                          className="model-select"
                          value={model}
                          disabled={true}
                        >
                          {initModelSelect()}
                        </Select>
                      </div>
                      <div>
                        <Select
                          className="service-select"
                          value={reparation}
                          disabled={true}
                        >
                          {initReparationSelect()}
                        </Select>
                      </div>
                    </div>
                    <div className="repair-input-group">
                      <Label className="repair-input-label">
                        IMEI nummer :{" "}
                      </Label>
                      <Input
                        className="repair-input"
                        value={serialnumber}
                        disabled={true}
                      />
                    </div>
                    <div className="repair-input-group">
                      <Label className="repair-input-label">
                        Uitvoering/kleur
                      </Label>
                      <Input
                        className="repair-input"
                        value={color}
                        disabled={true}
                      />
                    </div>
                    <div className="repair-input-group">
                      <Label className="repair-input-label">
                        Klacht omschrijving
                      </Label>
                      <Input
                        className="repair-input"
                        value={memory}
                        disabled={true}
                      />
                    </div>
                    <div className="repair-input-group">
                      <Label className="repair-input-label">Opmerkingen</Label>
                      <Input
                        className="repair-input"
                        value={comments}
                        disabled={true}
                      />
                    </div>
                    <div className="repair-input-group-check">
                      <Checkbox checked={closeRepair} disabled={true} />
                      <Label>Deze reparatie is klaar</Label>
                    </div>
                    <div className="repair-input-group-image">
                      <input
                        className="image-picker-input"
                        id="car"
                        type="file"
                        accept="image/*"
                        capture="camera"
                        disabled={true}
                      />
                      <ImagePicker
                        images={imageList.map((image, i) => ({
                          src: image,
                          value: i,
                        }))}
                        disabled={true}
                        onPick={(e) => {
                          onImagePick(e);
                        }}
                      />
                      <div className="image-picker-label">
                        <label className="image-picker-label-btn" htmlFor="car">
                          Voeg een foto toe
                        </label>
                        <Button className="image-picker-btn" disabled={true}>
                          Verwijder foto
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                      Sluit
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal
                  show={showModal1}
                  onHide={handlePictureModalClose}
                  className="repir-single-picture-modal"
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <div className="repir-single-picture">
                      <RepairSingleImage src={selectImg} />
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth_user: state.account.auth_user,
  appointmentList: state.appointment.appointmentList,
  filterlistPBM: state.search.fieldlistPBM,
  filterlistRPG: state.search.fieldlistRPG,
  isLoadAppointment: state.appointment.isLoadAppointment,
  modelServices: state.search.modelServices,
  isLoadService: state.search.isLoadService,
  account_profile: state.account.account_profile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAppointments: (id) => {
      getAppointments(id, dispatch);
    },
    getSearchFilterField: (data) => {
      getSearchFilterField(dispatch);
    },
    getSearchFilterFieldExt: (model_id) => {
      getSearchFilterFieldExt(model_id, dispatch);
    },
    CancelAppointment: (id, shop) => {
      CancelAppointment(id, shop, dispatch);
    },
    setLoadService: (data) => {
      dispatch(setLoadService(data));
    },
    setLoadAppointment: (data) => {
      dispatch(setLoadAppointment(data));
    },
    getSimpleAccountInformation: (id) => {
      getSimpleAccountInformation(id, dispatch);
    },
    getShopIdByInformation: (str) => {
      getShopIdByInformation(str, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReparationOverView);
