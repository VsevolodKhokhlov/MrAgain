import "bootstrap/dist/css/bootstrap.min.css";
import "react-day-picker/lib/style.css";
import "./index.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Checkbox,
  Divider,
  Input,
  message,
  Modal,
  Select,
  TimePicker,
} from "antd";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import DayPicker from "react-day-picker";
import { connect } from "react-redux";
import { setLoadedProfile } from "service/account/action.js";
import {
  getShopIdByInformation,
  getShopProfileAccount,
  updateInvalidOpenTime,
  updateValidOpenTime,
} from "service/account/operations.js";
import {
  updateAccountProfile,
  uploadImage,
} from "service/account/operations.js";

import { Layout } from "@/components/global";

import { FRONT_END_URL } from "../../../constants.js";
// import { getPublishProfies } from "../../../lib/getPublishProfiles";

const { TextArea } = Input;
const { Option } = Select;

function ProfileManage(routerProps) {
  const {
    match,
    uploadImage,
    updateAccountProfile,
    updateValidOpenTime,
    account_profile,
    account_valid_time,
    account_invalid_time,
    account_valid_time_id,
    account_invalid_time_id,
    getShopProfileAccount,
    isLoadedProfile,
    isScheduleTimeLoading,
    setLoadedProfile,
    getShopIdByInformation,
  } = routerProps;

  const router = useRouter();

  const url_shopId = router.query.shopId;
  useEffect(() => {
    getShopIdByInformation(url_shopId);
  }, []);

  const [is_load, setLoad] = useState(true);
  const [auth_user, setAuthUser] = useState({});

  // useEffect(() => {
  //   if (Object.keys(account_profile).length !== 0) {
  //     console.log(account_profile);
  //     setAuthUser(account_profile);
  //     // getShopProfileAccount(account_profile.id);
  //   }
  // }, []);

  useEffect(() => {
    if (is_load === true) {
      let auth_user = JSON.parse(localStorage.getItem("auth-user"));
      // if (auth_user === null || auth_user.name !== router.query.shopId) {
      if (auth_user === null) {
        router.push("/");
      }
      getShopProfileAccount(parseInt(auth_user.account_id), url_shopId);
      if (localStorage.getItem("auth-user") === null) {
        router.push("/");
      }

      setLoad(false);
    }
  }, [is_load]);

  useEffect(() => {
    if (isLoadedProfile === true) {
      if (Object.keys(account_profile).length !== 0) {
        setLoadedProfile(false);
        setAuthUser(account_profile);

        initProfilePage();
      }
    }
  });

  function initProfilePage() {
    // setPreview(account_profile.bg_photo);
    setPreview(
      account_profile.logo_photo === ""
        ? account_profile.bg_photo
        : account_profile.logo_photo
    );
    setAboutUs(account_profile.about_us);
    setAboutUsTemp(account_profile.about_us);
    // if (account_profile.site_url !== "") {
    //   let temp = JSON.parse(account_profile.site_url);
    //   setSiteUrl({ ...temp });
    // }
    if (Object.keys(account_valid_time).length !== 0) {
      // let temp = JSON.parse(account_valid_time);
      // setValidTime(temp);
    }

    /** openning time*/
    let temp = [];
    if (Object.keys(account_valid_time).length !== 0) {
      temp = JSON.parse(account_valid_time);
      setTimeTable(temp);
    }
    if (Object.keys(account_invalid_time).length !== 0) {
      temp = JSON.parse(account_invalid_time);
      setCheckTimeTable(temp);
    }
    /** */
  }

  const [isCloseDay, setIsCloseDay] = useState(false);
  const [visibleM1, setVisibleM1] = useState(false);
  const [visibleM2, setVisibleM2] = useState(false);
  const [imagePreviewUrl, setUrl] = useState(null);
  const [imagePreview, setPreview] = useState(null);
  const [aboutUs, setAboutUs] = useState();
  const [aboutUsTemp, setAboutUsTemp] = useState("");
  const [CharaterCount, setCharaterCount] = useState(0);
  const [isValidChanged, setValidChanged] = useState(false);
  const [isInvalidChanged, setInvalidChanged] = useState(false);
  const [checkDay, setCheckDay] = useState(null);
  const [checkOpenTime, setCheckOpenTime] = useState(null);
  const [checkCloseTime, setCheckCloseTime] = useState(null);
  const [checkReason, setCheckReason] = useState(null);
  const [weekDay, setWeekDay] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [openTimeVisible, setOpenTimeVisible] = useState(false);
  const [invalidTimeVisible, setInvalidTimeVisible] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [openTimeTable, setTimeTable] = useState({
    Mon: "",
    Tue: "",
    Wed: "",
    Thu: "",
    Fri: "",
    Sat: "",
    Sun: "",
  });
  const [checkTimeTable, setCheckTimeTable] = useState([]);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [isClose, setClose] = useState(false);
  const [invalidTimeTitle, setInvalidTimeTitle] = useState("");
  const [isEditOpenTimes, setIsEditOpenTimes] = useState(false);
  const [isEditIrregularTimes, setIsEditIrregularTimes] = useState(false);
  const [editOBtn, setIsEditOBtn] = useState("Wijzig openingstijden");
  const [editRBtn, setIsEditRBtn] = useState(
    "Voeg een afwijkende openingstijd toe"
  );
  const [isCloseAll, setCloseAll] = useState(false);
  const [isInvalidTimeLoading, setInvalidTimeLoading] = useState(false);
  // const [siteUrl, setSiteUrl] = useState({ site_url: "", social_link: "" });
  // const [siteUrlTemp, setSiteUrlTemp] = useState();
  /** openning time table start*/
  // const [isEditable, setEditable] = useState(false);

  /** openning time table*/

  function onChangeCheckReason(e) {
    setCheckReason(e.target.value);
  }

  const handleCheckClose = (e) => {
    if (e.target.checked === true) {
      setClose(true);
    } else {
      setClose(false);
    }
  };

  const handleCheckTimeCancel = () => {
    setInvalidTimeVisible(false);
  };
  function initWeekSelect() {
    const week = [
      ["Alle dagen", "All"],
      ["Maandag", "Mon"],
      ["Dinsdag", "Tue"],
      ["Woensdag", "Wed"],
      ["Donderdag", "Thu"],
      ["Vrijdag", "Fri"],
      ["Zaterdag", "Sat"],
      ["Zondag", "Sun"],
    ];
    return week.map((element) => {
      return (
        <Option value={element[1]} key={element[1]}>
          {element[0]}
        </Option>
      );
    });
  }

  const showModalM1 = () => {
    setVisibleM1(true);
  };

  const handleCancel = () => {
    setVisibleM1(false);
  };

  /**
   * @description: Function called to open the pop up for text input box(over ons).
   * @Omschrijving : Aanroepen Functie om het pop-upvenster voor tekstinvoer te openen (over ons).
   */
  const showOverOnsPopUp = () => {
    setVisibleM2(true);
  };

  /**
   * @description: Function called to set the image / profile picture on the profile page.
   * @Omschrijving : Functie aangeroepen om de afbeelding / profielfoto op de profielpagina in te stellen.
   * @param {*} e for event handling
   */
  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files.length) {
      setShowButton(false);
      let file = e.target.files[0];
      setUrl(file);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  /**
   * @description : Function called for saving the image and uploading in onto the server.
   * @Omschrijving : Functie aangeroepen voor het opslaan van de afbeelding en het uploaden naar de server.
   * @param {*} e for event handling
   */
  const onImageChangeSaveButton = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imagePreviewUrl);
    // formData.append("shop_id", auth_user.account_id);
    formData.append("shop_id", auth_user.id);
    // uploadImage(formData, auth_user.account_id, account_profile.name, true);
    uploadImage(formData, auth_user.id, account_profile.name, true);
    message.success("Afbeelding succesvol opgeslagen.", [2.5]);
    setTimeout(() => {
      setShowButton(true);
    }, 1000);
  };

  /**
   * @description: Function called for text entry box and number of characters on the left.
   * @Omschrijving : Functie opgeroepen voor tekst invoervak ​​en aantal tekens aan de linkerkant.
   * @param {*} e for event handling
   */
  const handleAboutChange = (e) => {
    setAboutUsTemp(e.target.value);
    setCharaterCount(e.target.value.length);
  };

  /**
   * @description: Function called to open the pop up for about_us.
   */
  const handleAboutOk = () => {
    setVisibleM2(false);
    setAboutUs(aboutUsTemp);
    // updateAccountProfile(auth_user.account_id, {
    //   shop_id: auth_user.account_id,
    //   about_us: aboutUsTemp,
    // });
    updateAccountProfile(auth_user.id, {
      shop_id: auth_user.id,
      about_us: aboutUsTemp,
    });
  };

  /**
   * @description: Function to close the pop up for About_us.
   */
  const handleAboutCancel = () => {
    setVisibleM2(false);
  };

  /**
   * @description: FUnction called to validate time(opening / closing time)
   * @param {*} oTime : to set opening time.
   * @param {*} cTime : to set closing time.
   * @return {*} opening / closing time.
   */
  function timeValidate(oTime, cTime) {
    let oT = "";
    let cT = "";
    oTime.split(":").map((el) => {
      oT = oT + el;
      return true;
    });
    cTime.split(":").map((el) => {
      cT = cT + el;
      return true;
    });
    return +oT < +cT;
  }

  /**
   * @description : Function called for opening the time schedule pop up.
   */
  const showOpenTimeModal = () => {
    setIsCloseDay(false);
    setOpenTimeVisible(true);
  };

  /**
   * @description: Function called to save the time slot using api in data base.
   * @Omschrijving : Functie aangeroepen om het tijdslot op te slaan met behulp van api in de database.
   * @let data : for setting the data into api.
   */
  const updateOpenTime = async () => {
    let data;
    setIsEditOpenTimes(false);
    setIsEditOBtn("Wijzig openingstijden");
    if (isValidChanged === true) {
      // setschedulTimseSlotLoading(true);
      data = {
        valid_day_time: JSON.stringify(openTimeTable),
        // shop: auth_user.account_id,
        shop: auth_user.id,
      };
      updateValidOpenTime(account_valid_time_id, data);
      getShopProfileAccount(auth_user.id, url_shopId);
      message.success("Je openingstijden zijn aangepast.", [2.5]);
      setValidChanged(false);
      setWeekDay("");
      setOpenTime("");
      setCloseTime("");
      setIsCloseDay(false);
    }
  };

  const showCheckCalendarModal = () => {
    if (checkDay === null) {
      message.warning("Selecteer een dag a.u.b.", [2.5]);
      return;
    }
    setInvalidTimeVisible(true);
  };

  /**
   * @description : Function called for setting Standard & different opening hours
   * @Omschrijving : Functie vereist voor het instellen van standaard en verschillende openingstijden.
   * @param {*} e for event handling.
   * @return {*} closing/ opening time.
   */
  const handleScheduleTimeSlot = (e) => {
    e.preventDefault();
    if (timeValidate(openTime, closeTime) === true) {
      setIsEditOBtn("Wijzigingen opslaan");
      setValidChanged(true);
      if (weekDay === "All") {
        if (isCloseDay === true) {
          let str = "Gesloten";
          setCloseAll(!isCloseAll);
          setTimeTable({
            Mon: str,
            Tue: str,
            Wed: str,
            Thu: str,
            Fri: str,
            Sat: str,
            Sun: str,
          });
        } else {
          setTimeTable({
            Mon: openTime + "-" + closeTime,
            Tue: openTime + "-" + closeTime,
            Wed: openTime + "-" + closeTime,
            Thu: openTime + "-" + closeTime,
            Fri: openTime + "-" + closeTime,
            Sat: openTime + "-" + closeTime,
            Sun: openTime + "-" + closeTime,
          });
        }
      } else if (weekDay === "") {
        message.error("Selecteer een dag a.u.b.", [2.5]);
        return;
      } else {
        if (isCloseDay === true) {
          setTimeTable({
            ...openTimeTable,
            [weekDay]: "Gesloten",
          });
        } else {
          setTimeTable({
            ...openTimeTable,
            [weekDay]: openTime + "-" + closeTime,
          });
        }
      }
    } else {
      if (openTime === "" || closeTime === "") {
        if (weekDay !== "") {
          setIsEditOBtn("Wijzigingen opslaan");
          setValidChanged(true);
          if (weekDay === "All") {
            if (isCloseDay === true) {
              let str = "Gesloten";
              setCloseAll(!isCloseAll);
              setTimeTable({
                Mon: str,
                Tue: str,
                Wed: str,
                Thu: str,
                Fri: str,
                Sat: str,
                Sun: str,
              });
            }
          } else {
            if (isCloseDay === true) {
              setTimeTable({
                ...openTimeTable,
                [weekDay]: "Gesloten",
              });
            } else {
              setTimeTable({
                ...openTimeTable,
                [weekDay]: "",
              });
            }
          }
          return;
        }
      }
      message.error("Heb je een tijd ingevoerd?", [2.5]);
    }
  };

  /**
   * @callback_function
   * @description: component lifecycle used for caling the api when the function is called.
   */
  useEffect(() => {
    if (weekDay === "") {
      setValidChanged(false);
    } else {
      updateOpenTime(); //!Most imp for Gesloten + set time (be whatever selected first)
    }
    updateIrregularTime();
  }, [isValidChanged, isInvalidChanged]);

  /**
   * @description: Function called to cancel/close the time scheduling popup.
   * @Omschrijving : Functie aangeroepen om de pop-up voor tijdplanning te annuleren / sluiten.
   */
  const handleCancelScheduleTimePopUp = () => {
    setOpenTimeVisible(false);
    setWeekDay("");
    setOpenTime("");
    setCloseTime("");
    setIsCloseDay(false);
  };

  function onCheckOpenTimeChange(date, dateString) {
    setCheckOpenTime(dateString);
  }

  function onCheckCloseTimeChange(date, dateString) {
    setCheckCloseTime(dateString);
  }

  function onOpenTimeChange(date, dateString) {
    setOpenTime(dateString);
  }

  function onCloseTimeChange(date, dateString) {
    setCloseTime(dateString);
  }

  function onWeekDayChange(e) {
    setWeekDay(e);
  }

  function selectDate(date, { selected, disabled }) {
    let current = new Date();
    if (date.getTime() < current.getTime()) {
      alert("Dit moment ligt helaas al in het verleden!");
      return;
    }
    setSelectedDay(date);
    let m = moment(date);
    setInvalidTimeTitle("Afwijkende openingstijden " + m.format("DD-MM-YYYY"));
    let str = m.format("DD-MM-YYYY");
    let timestamp = moment(str, "DD-MM-YYYY").valueOf();
    setCheckDay(timestamp);
  }

  function handleCheckCloseDay(e) {
    setIsCloseDay(e.target.checked);
  }

  /**
   * @description: Function called to send the selected datae and time data to the server.
   *
   */
  const updateIrregularTime = () => {
    let data;
    setIsEditIrregularTimes(false);
    setIsEditRBtn("Voeg een afwijkende openingstijd toe");
    if (isInvalidChanged === true) {
      setInvalidTimeLoading(true);
      data = {
        invalid_day_time: JSON.stringify(checkTimeTable),
        // shop: auth_user.account_id,
        shop: auth_user.id,
      };
      updateInvalidOpenTime(account_invalid_time_id, data).then((res) => {
        setInvalidTimeLoading(false);
      });
      message.success("Je wijzigingen zijn succesvol opgeslagen.", [2.5]);
      // getShopProfileAccount(auth_user.account_id);
      getShopProfileAccount(auth_user.id, url_shopId);
      setInvalidChanged(false);
    }
    setClose(false);
  };

  /**
   * @description: Function called to save/set the data in the state with respect to the applied condition.
   *
   * @return {*}
   */
  const handleCheckTime = () => {
    setIsEditRBtn("Sla aangepaste openingstijd op");
    setIsEditIrregularTimes(false);
    if (isClose === true) {
      let objArray = checkTimeTable;
      let obj = {
        checkDay: checkDay,
        reason: checkReason,
        open_close_time: "-",
      };
      let index = objArray.findIndex(
        ({ checkDay }) => checkDay === obj.checkDay
      );
      if (index === -1) {
        objArray.push(obj);
      } else {
        objArray[index] = obj;
      }
      setInvalidChanged(true);
      setCheckTimeTable(objArray);
      setInvalidTimeVisible(false);
      // updateIrregularTime(); // is for setting checkDay "-" closed
    } else {
      if (checkOpenTime === null || checkCloseTime === null) {
        message.warning("Heb je zowel een open als sluitingstijd aangegeven?", [
          2.5,
        ]);
        return;
      }
      if (timeValidate(checkOpenTime, checkCloseTime) === true) {
        let objArray = checkTimeTable;
        let obj = {
          checkDay: checkDay,
          reason: checkReason,
          open_close_time: checkOpenTime + "-" + checkCloseTime,
        };
        let index = objArray.findIndex(
          ({ checkDay }) => checkDay === obj.checkDay
        );

        if (index === -1) {
          objArray.push(obj);
        } else {
          objArray[index] = obj;
        }
        setInvalidChanged(true);
        setCheckTimeTable(objArray);
        setInvalidTimeVisible(false);
        // updateIrregularTime(); // for checkOpenTime + "-" + checkCloseTime,
      } else {
        message.error("Heb je een tijd geselecteerd?", [2.5]);
      }
    }
  };

  function disabledHours() {
    return [0, 1, 2, 3, 4, 5, 6, 22, 23];
  }

  function splitOpenTime(arg, flg) {
    if (arg === undefined || arg === "") {
      return "";
    }

    if (arg === "Gesloten") {
      if (flg === 0) return "Gesloten";
      else {
        return "";
      }
    }

    let spls = arg.split("-");
    if (flg === 0) return spls[0];
    else {
      return spls[1];
    }
  }

  /** calendar initialize start*/
  let dateArr = [];
  let closeDateArr = [];
  if (Object.keys(account_invalid_time).length !== 0) {
    let temp = JSON.parse(account_invalid_time);
    temp.map((el) => {
      if (el.open_close_time !== "-") {
        dateArr.push(new Date(el.checkDay));
      } else {
        closeDateArr.push(new Date(el.checkDay));
      }
      return true;
    });
  }
  const modifiers = {
    sunday: { daysOfWeek: [0] },
    saturday: { daysOfWeek: [6] },
    invalid: dateArr,
    closed: closeDateArr,
  };

  const modifiersStyles = {
    sunday: {
      color: "red",
      borderLeft: "none",
    },
    saturday: {
      color: "blue",
      borderRight: "none",
    },
    invalid: {
      color: "white",
      backgroundColor: "orange",
    },
    closed: {
      color: "white",
      backgroundColor: "red",
    },
  };
  /** calendar initialize end*/

  return (
    <Layout>
      <div className="repair-shop-profile">
        <Head>
          <title>Mr Again - Profiel</title>
          <meta
            name="Keywords"
            content="Profiel, MrAgain, Telefoon Reparateur"
          />
          <meta name="description" content="Beheer je profiel bij MrAgain" />
          <link rel="canonical" href={FRONT_END_URL + "/profiel-beheer"} />
          {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
          <meta property="og:type" content="website" />
          <meta
            name="og_title"
            property="og:title"
            content=" Reparatie managementt"
          />{" "}
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
        <div className="repair-shop-profile-container">
          <div className="shop-profile-wrap">
            <div className="shop-profile-blog">
              <div className="profile-picture-about">
                <div className="profile-picture">
                  {imagePreview ? (
                    <img
                      style={{
                        aspectRatio: 16 / 9,
                        objectFit: "contain",
                      }}
                      alt=""
                      src={imagePreview}
                    ></img>
                  ) : (
                    ""
                  )}
                  <input
                    className="image-picker-input"
                    id="car"
                    type="file"
                    accept="image/*"
                    capture="camera"
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                  />
                  <div className="image-picker-label">
                    <label className="image-picker-btn" htmlFor="car">
                      <FontAwesomeIcon
                        className="margin-10"
                        icon={["fas", "camera"]}
                      />
                      Wijzig foto
                    </label>
                    {showButton === false ? (
                      <Button
                        className="image-save-btn"
                        style={{
                          width: "70px",
                          height: "35px",
                          marginBottom: "9px",
                        }}
                        onClick={(e) => {
                          onImageChangeSaveButton(e);
                        }}
                      >
                        Opslaan
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="profile-about">
                  <div className="profile-about-title">
                    <div>Over ons</div>
                    <Button
                      className="contact-edit-btn"
                      onClick={() => {
                        showOverOnsPopUp();
                      }}
                    >
                      <FontAwesomeIcon icon={["fas", "edit"]} />
                      Wijzig
                    </Button>
                  </div>
                  <div className="profile-about-content">
                    <span className="about-content-1">{aboutUs}</span>
                  </div>
                </div>
                <div className="time-blog-title">
                  Standaard & afwijkende openingstijden
                </div>
                <div className="edit-opentime-blog">
                  <div className="edit-opentime-blog-left">
                    <Modal
                      title="Wijzig openingstijden"
                      visible={openTimeVisible}
                      // onOk={(e) => {
                      //   handleScheduleTimeSlot(e);
                      // }}
                      onCancel={() => {
                        handleCancelScheduleTimePopUp();
                      }}
                      footer={[
                        <Button
                          key="back"
                          onClick={() => {
                            handleCancelScheduleTimePopUp();
                          }}
                          // loading={importBtnLoading}
                        >
                          Annuleer
                        </Button>,
                        <Button
                          key="submit"
                          type="primary"
                          loading={!isScheduleTimeLoading}
                          onClick={(e) => {
                            handleScheduleTimeSlot(e);
                          }}
                        >
                          Sla op
                        </Button>,
                      ]}
                    >
                      <div className="open-time-modal-item  day-picker">
                        <div className="time-picker-label mr-1">Dag: </div>
                        <Select
                          className="contact-modal-input"
                          placeholder="website"
                          // defaultValue="selecteer"
                          value={weekDay === "" ? "Selecteer" : weekDay}
                          defaultKey="All"
                          onChange={onWeekDayChange}
                        >
                          {initWeekSelect()}
                        </Select>
                      </div>
                      <div className="select-time-picker">
                        <div className="open-time-item">
                          <div className="time-picker-label mr-1">
                            Openingstijd:{" "}
                          </div>
                          <TimePicker
                            onChange={onOpenTimeChange}
                            picker="time"
                            format="HH:mm"
                            disabled={false}
                            minuteStep={15}
                            value={
                              openTime !== "" ? moment(openTime, "HH:mm") : null
                            }
                            disabledHours={disabledHours}
                            hideDisabledOptions={true}
                          />
                        </div>
                        <div className="open-time-item ml-3">
                          <div className="time-picker-label mr-1">
                            Sluitingstijd:{" "}
                          </div>
                          <TimePicker
                            onChange={onCloseTimeChange}
                            picker="time"
                            format="HH:mm"
                            disabled={false}
                            value={
                              closeTime !== ""
                                ? moment(closeTime, "HH:mm")
                                : null
                            }
                            minuteStep={15}
                            disabledHours={disabledHours}
                            hideDisabledOptions={true}
                          />
                        </div>
                      </div>
                      <div className="close-day-check-blog pt-3">
                        <Checkbox
                          checked={isCloseDay}
                          onChange={handleCheckCloseDay}
                        >
                          Op deze dag zijn we gesloten
                        </Checkbox>
                      </div>
                    </Modal>
                    <div className="opentime-blog-title">
                      Standaard openingstijden
                    </div>
                    <div className="opentime-blog-content">
                      <Table>
                        <thead>
                          <tr>
                            <th>Dag</th>
                            <th>Openingstijd</th>
                            <th>Sluitingstijd</th>
                            {/* <th>
                              <Button
                                className="close-all-day-btn"
                                onClick={handleCloseAllDay}
                                disabled
                              >
                                Close All Day
                              </Button>
                            </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Maandag</td>
                            <td>{splitOpenTime(openTimeTable.Mon, 0)}</td>
                            <td>{splitOpenTime(openTimeTable.Mon, 1)}</td>
                            {/* <td className="check-box-cell">
                              <Checkbox
                                name="Mon"
                                checked={
                                  openTimeTable.Mon === "CLOSED" ? true : false
                                }
                                disabled
                                onChange={handleCheckCloseDay}
                              ></Checkbox>
                            </td> */}
                          </tr>
                          <tr>
                            <td>Dinsdag</td>
                            <td>{splitOpenTime(openTimeTable.Tue, 0)}</td>
                            <td>{splitOpenTime(openTimeTable.Tue, 1)}</td>
                            {/* <td className="check-box-cell">
                              <Checkbox
                                name="Tue"
                                checked={
                                  openTimeTable.Tue === "CLOSED" ? true : false
                                }
                                disabled
                                onChange={handleCheckCloseDay}
                              ></Checkbox>
                            </td> */}
                          </tr>
                          <tr>
                            <td>Woensdag</td>
                            <td>{splitOpenTime(openTimeTable.Wed, 0)}</td>
                            <td>{splitOpenTime(openTimeTable.Wed, 1)}</td>
                            {/* <td className="check-box-cell">
                              <Checkbox
                                name="Wed"
                                checked={
                                  openTimeTable.Wed === "CLOSED" ? true : false
                                }
                                disabled
                                onChange={handleCheckCloseDay}
                              ></Checkbox>
                            </td> */}
                          </tr>
                          <tr>
                            <td>Donderdag</td>
                            <td>{splitOpenTime(openTimeTable.Thu, 0)}</td>
                            <td>{splitOpenTime(openTimeTable.Thu, 1)}</td>
                            {/* <td className="check-box-cell">
                              <Checkbox
                                name="Thu"
                                checked={
                                  openTimeTable.Thu === "CLOSED" ? true : false
                                }
                                disabled
                                onChange={handleCheckCloseDay}
                              ></Checkbox>
                            </td> */}
                          </tr>
                          <tr>
                            <td>Vrijdag</td>
                            <td>{splitOpenTime(openTimeTable.Fri, 0)}</td>
                            <td>{splitOpenTime(openTimeTable.Fri, 1)}</td>
                            {/* <td className="check-box-cell">
                              <Checkbox
                                name="Fri"
                                checked={
                                  openTimeTable.Fri === "CLOSED" ? true : false
                                }
                                disabled
                                onChange={handleCheckCloseDay}
                              ></Checkbox>
                            </td> */}
                          </tr>
                          <tr>
                            <td>Zaterdag</td>
                            <td>{splitOpenTime(openTimeTable.Sat, 0)}</td>
                            <td>{splitOpenTime(openTimeTable.Sat, 1)}</td>
                            {/* <td className="check-box-cell">
                              <Checkbox
                                name="Sat"
                                checked={
                                  openTimeTable.Sat === "CLOSED" ? true : false
                                }
                                disabled
                                onChange={handleCheckCloseDay}
                              ></Checkbox>
                            </td> */}
                          </tr>
                          <tr>
                            <td>Zondag</td>
                            <td>{splitOpenTime(openTimeTable.Sun, 0)}</td>
                            <td>{splitOpenTime(openTimeTable.Sun, 1)}</td>
                            {/* <td className="check-box-cell">
                              <Checkbox
                                name="Sun"
                                checked={
                                  openTimeTable.Sun === "CLOSED" ? true : false
                                }
                                disabled
                                onChange={handleCheckCloseDay}
                              ></Checkbox>
                            </td> */}
                          </tr>
                        </tbody>
                      </Table>
                      <div className="time-change-btn-group">
                        <Button
                          className="mr-5"
                          onClick={() => {
                            showOpenTimeModal();
                          }}
                        >
                          {editOBtn}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="edit-opentime-blog-right">
                    <Modal
                      // title="Normal openning times not valid on"
                      title={invalidTimeTitle}
                      visible={invalidTimeVisible}
                      // onOk={() => {
                      //   handleCheckTime();
                      // }}
                      onCancel={() => {
                        handleCheckTimeCancel();
                      }}
                      footer={[
                        <Button
                          key="back"
                          onClick={() => {
                            handleCheckTimeCancel();
                          }}
                          // loading={importBtnLoading}
                        >
                          Annuleer
                        </Button>,
                        <Button
                          key="submit"
                          type="primary"
                          loading={isInvalidTimeLoading}
                          onClick={() => {
                            handleCheckTime();
                          }}
                        >
                          Sla op
                        </Button>,
                      ]}
                    >
                      <div className="open-time-modal-item">
                        <div className="time-picker-label mr-1">Reden: </div>
                        <Input
                          placeholder="Reden voor afwijkende openingstijd"
                          onChange={onChangeCheckReason}
                        ></Input>
                      </div>
                      <div className="select-time-picker">
                        <div className="open-time-item">
                          <div className="time-picker-label mr-1">
                            Openingstijd:{" "}
                          </div>
                          <TimePicker
                            onChange={onCheckOpenTimeChange}
                            picker="time"
                            format="HH:mm"
                            minuteStep={15}
                            disabledHours={disabledHours}
                            hideDisabledOptions={true}
                          />
                        </div>
                        <div className="open-time-item ml-3">
                          <div className="time-picker-label mr-1">
                            Sluitingstijd:{" "}
                          </div>
                          <TimePicker
                            onChange={onCheckCloseTimeChange}
                            picker="time"
                            format="HH:mm"
                            minuteStep={15}
                            disabledHours={disabledHours}
                            hideDisabledOptions={true}
                          />
                        </div>
                      </div>
                      <div className="close-day-check-blog pt-3">
                        <Checkbox checked={isClose} onChange={handleCheckClose}>
                          Deze dag zijn we gesloten
                        </Checkbox>
                      </div>
                    </Modal>
                    <div className="opentime-blog-title mb-3">
                      Afwijkende openingstijden
                    </div>
                    <div className="opentime-blog-content">
                      <DayPicker
                        selectedDays={selectedDay}
                        onDayClick={selectDate}
                        month={new Date()}
                        modifiers={modifiers}
                        modifiersStyles={modifiersStyles}
                      />
                      <div className="">
                        <Button
                          className="check-calendar-btn mt-4"
                          onClick={() => {
                            showCheckCalendarModal();
                          }}
                        >
                          {editRBtn}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Modal
                  title="Over ons"
                  visible={visibleM2}
                  onOk={() => {
                    handleAboutOk();
                  }}
                  onCancel={() => {
                    handleAboutCancel();
                  }}
                >
                  <TextArea
                    maxLength={400}
                    className="contact-modal-input mb-0"
                    placeholder="Over ons"
                    value={aboutUsTemp}
                    onChange={(e) => {
                      handleAboutChange(e);
                    }}
                  />
                  <p>{CharaterCount}/400</p>
                </Modal>
                {/* <Button
                  className="profile-update-btn"
                  onClick={() => {
                    showOverOnsPopUp();
                  }}
                >
                  Update
                </Button> */}
              </div>
              <div className="profile-contact-opentime">
                <div className="contact-opentime-wrap">
                  {/* <div className="profile-contact"> */}
                  {/* <div className="profile-contact-title">
                      Adres & contact gegevens
                    </div>
                    <Divider />
                    <div className="profile-contact-content">
                      <div className="contact-site-address">
                        {siteUrl.site_url}
                      </div>
                      <div className="contact-shop-name">
                        {siteUrl.social_link}
                      </div>
                      <Button
                        className="contact-edit-btn"
                        onClick={() => {
                          showModalM1();
                        }}
                      >
                        <FontAwesomeIcon icon={["fas", "edit"]} />
                        Wijzig
                      </Button>
                      <Modal
                        title="Address & Contact Details"
                        visible={visibleM1}
                        onOk={() => {
                          handleSiteUrl();
                        }}
                        onCancel={() => {
                          handleCancel();
                        }}
                      >
                        <Input
                          className="contact-modal-input"
                          placeholder="website"
                          name="site_url"
                          onChange={(e) => {
                            handleSiteUrlChange(e);
                          }}
                        />
                        <Input
                          name="social_link"
                          placeholder="Facebook pagina"
                          onChange={(e) => {
                            handleSiteUrlChange(e);
                          }}
                        />
                      </Modal>
                    </div> */}
                  {/* </div> */}
                  <div className="profile-opentime">
                    <div className="profile-opentime-title">
                      Toelichting openingstijden
                    </div>
                    <Divider />
                    <div className="profile-opentime-content">
                      <ul>
                        <li>
                          De tabel met openingstijden toont de openingstijden
                          die elke week geldend zijn.
                        </li>
                        <li>
                          De kalender voor afwijkende openingstijden is om aan
                          te geven welke dagen afwijken van de standaard
                          openingstijden.
                        </li>
                        <li>
                          Let op: bezoekers kunnen afspraken maken tijdens uw
                          openingstijden!
                        </li>
                        <li>
                          Voorbeeld 1: U bent maandag open van 09.00-17.00,
                          bezoekers kunnen tussen 09.00-17.00 afspraken bij u
                          maken afhankelijk van de afspraak settings die u heeft
                          (zie account settings). Voorbeeld 2: U bent normaal
                          gesproken van 09.00-17.00 open op maandag, maar bij
                          afwijkende openingstijden heeft u aangegeven dat u
                          maandag 22 juni dicht bent. Op de kalender zien
                          bezoekers dat u 22 juni dicht bent.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  account_profile: state.account.account_profile,
  account_valid_time: state.account.account_valid_time,
  account_valid_time_id: state.account.account_valid_time_id,
  account_invalid_time: state.account.account_invalid_time,
  account_invalid_time_id: state.account.account_invalid_time_id,
  isLoadedProfile: state.account.isLoadedProfile,
  isScheduleTimeLoading: state.account.isUpdateScheduleTimeLoading,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    uploadImage: (data, id, name, flg) => {
      uploadImage(data, id, name, flg, dispatch);
    },
    updateAccountProfile: (id, data) => {
      updateAccountProfile(id, data, dispatch);
    },
    setLoadedProfile: (data) => {
      dispatch(setLoadedProfile(data));
    },
    updateValidOpenTime: (id, data) => {
      updateValidOpenTime(id, data, dispatch);
    },
    getShopProfileAccount: (id, data) => {
      getShopProfileAccount(id, data, dispatch);
    },
    getShopIdByInformation: (str) => {
      getShopIdByInformation(str, dispatch);
    },
  };
};
//
// export async function getServerSideProps() {
//   await getPublishProfies();
//   return {
//     props: {
//       data: "data",
//     },
//   };
// }

export default connect(mapStateToProps, mapDispatchToProps)(ProfileManage);
