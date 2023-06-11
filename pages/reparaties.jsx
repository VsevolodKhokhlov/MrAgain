import "./reparaties.less";
import "./reparaties_css.less";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Modal, Row } from "antd";
import classnames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useRef } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { connect } from "react-redux";
import {
  setBrandModel,
  setGuaranteeDevice,
  setLoadPBM,
} from "service/account/action";
import {
  createGuaranteeModels,
  createImportReparationAndGuaranteeCSV,
  deleteGuaranteeModels,
  getExportReparationAndGuaranteeCSV,
  getShopBrandModel,
} from "service/account/operations";
import { getSearchFilterField } from "service/search/operations.js";

import BrandModelCard from "@/components/phone-repair/brand-model-card/BrandModelCard";

import { Layout } from "../components/global";
import { FRONT_END_URL } from "../constants.js";

function showNotification(...args) {
  return import("sweetalert").then((module) => {
    module.default(...args);
  });
}

const PhoneRepair = (routerProps) => {
  const [isload, setIsLoad] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [exportBtnLoading, setExportBtnLoading] = useState(false);
  const [importBtnLoading, setImportBtnLoading] = useState(false);
  const [csv_file, setCSVFile] = useState(null);
  const [csv_file_error, setCSVFileError] = useState(null);
  const [brands, setBrand] = useState([]);
  const [editable, setEditable] = useState(false);
  const [editBtnLabel, setBtnLabel] = useState("Wijzig modellen");
  const [editGuarantee, setEditGuarantee] = useState(true);
  const [editButtonLoading, seteditButtonLoading] = useState(false);
  const [saveModalsLoading, setsaveModalsLoading] = useState(false);
  const [visibleExportModal, setvisibleExportModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [percentage, setPercentage] = useState({ per: 0 });
  const cancelFileUpload = useRef(null);

  const {
    listPBM,
    newGuarantees,
    deleteGuarantees,
    shopModelGuarantee,
    loadPBM,
    setLoadPBM,
    isLoadFilter,
    setBrandModel,
    isCreatedGuarantee,
    isDeletedGuarantee,
    setGuaranteeDevice,
    getShopBrandModel,
    getSearchFilterField,
    createGuaranteeModels,
    deleteGuaranteeModels,
    isSaveModalsLoading,
  } = routerProps;

  const router = useRouter();
  const [shopName, setshopName] = useState(null);
  useEffect(() => {
    if (
      isSaveModalsLoading === true &&
      saveModalsLoading === true
      // isDeletedGuarantee === true
    ) {
      showNotification("Gelukt!", "Je modellen zijn opgeslagen", "success");
    }
  }, [isSaveModalsLoading, saveModalsLoading, isDeletedGuarantee]);

  useEffect(() => {
    const initPBMLIST = () => {
      let brand = [];
      let tmp = listPBM.filter((e) => e.id === newGuarantees.device_id);
      if (tmp.length > 0) {
        tmp = tmp[0];
        brand = tmp.brand;
      }
      setBrand(brand);
    };

    if (loadPBM && isLoadFilter) {
      initPBMLIST();

      let arr = [];
      let tmp = [];
      let mtmp = [];

      shopModelGuarantee.map((el) => {
        mtmp = [];
        tmp = arr.filter((et) => et.brand_id === el.brand_id);
        if (tmp !== undefined && tmp.length > 0) {
          tmp = tmp[0];
          if (tmp.models !== undefined && tmp.models.indexOf(el.model_id) < 0) {
            tmp.models = [...tmp.models, el.model_id];
          }
        } else {
          mtmp.push(el.model_id);
          tmp = {
            brand_id: el.brand_id,
            models: mtmp,
          };
          arr.push(tmp);
        }
        return true;
      });
      arr.map((el) => {
        setBrandModel(el.brand_id, el.models);
        return true;
      });
      setLoadPBM(false);
    }
  }, [
    loadPBM,
    listPBM,
    setBrandModel,
    shopModelGuarantee,
    setLoadPBM,
    newGuarantees,
  ]);

  useEffect(() => {
    return () => {
      setLoadPBM(true);
    };
  }, [setLoadPBM]);

  useEffect(() => {
    if (isCreatedGuarantee === true && isDeletedGuarantee === true) {
      setEditGuarantee(true);
      setBtnLabel("Wijzig modellen");
    } else {
      setEditGuarantee(false);
      setBtnLabel("Opslaan ...");
    }
  }, [isCreatedGuarantee, isDeletedGuarantee]);

  async function initSearchFilterField() {
    return await getSearchFilterField();
  }

  const params = router.query;

  useEffect(() => {
    if (isload === true) {
      let auth_user = JSON.parse(localStorage.getItem("auth-user"));

      // if (
      //   auth_user === null ||
      //   parseInt(auth_user.account_id) !== parseInt(params.shopId)
      // ) {
      if (auth_user === null) {
        router.push("/");
      } else {
        setshopName(auth_user.name);
      }
      initSearchFilterField();
      setGuaranteeDevice(parseInt(params.deviceId));
      let data = {
        shop: params.shopId,
        device: params.deviceId,
      };
      getShopBrandModel(data);
      setIsLoad(false);
    }
  }, [isload]);

  const onEditModel = () => {
    if (editable === true) {
      seteditButtonLoading(true);
      setEditable(false);
      createGuaranteeModels({
        shop_id: params.shopId,
        payload: newGuarantees,
      });

      deleteGuaranteeModels({
        shop_id: params.shopId,
        device_id: newGuarantees.device_id,
        payload: deleteGuarantees,
      });
      setTimeout(() => {
        setsaveModalsLoading(true);
      }, 1000);
    } else {
      setEditable(true);
      setBtnLabel("Opslaan");
    }
  };

  const toggleEportModal = (e) => {
    setvisibleExportModal(!visibleExportModal);
  };
  // const displayBrands = () => {
  //   let rows = parseInt(brands.length / 4) + 1;
  //   let j, k;
  //   let limit;
  //   let arr = Array.apply(null, { length: rows }).map(Number.call, Number);

  //   return arr.map((ele) => {
  //     k = 0;
  //     j = ele * 4;
  //     limit = ele * 4 + 4;
  //     return (
  //       <Row>
  //         {brands.map((el) => {
  //           k = k + 1;
  //           if (k >= j + 1 && k < limit + 1) {
  //             return (
  //               <Col span={6} key={el.id}>
  //                 <BrandModelCard
  //                   brand_id={el.id}
  //                   isEditable={editable}
  //                   isShow={isShowBrand}
  //                 />
  //               </Col>
  //             );
  //           }
  //         })}
  //       </Row>
  //     );
  //   });
  // };

  const displayBrands = () => {
    return brands.map((el) => {
      return (
        <Col span={6} key={el.id}>
          <BrandModelCard
            shop_id={params.shopId}
            brand_id={el.id}
            isEditable={editable}
            isShow={false}
            isEditGuarantee={editGuarantee}
          />
        </Col>
      );
    });
  };

  const onToggleImportPopup = (async) => {
    setShowImportModal(!showImportModal);
  };

  const onUploadCSV = (event) => {
    const uploadedFile = event.target.files[0];
    const fileSize = event.target.files[0].size / 1024 / 1024;
    let error_csv = "";

    if (!uploadedFile) {
      error_csv = "Please select CSV.";
    } else if (!uploadedFile.name.match(/\.(csv)$/)) {
      error_csv = "Please select CSV file.";
    } else if (fileSize > 2) {
      error_csv = "Please select file size less then 10 MB";
    }
    if (error_csv === "") {
      setCSVFileError(null);
      setCSVFile(event.target.files[0]);
    } else {
      setCSVFileError(error_csv);
      setCSVFile(null);
    }
  };

  const onImportCSVFile = (e) => {
    if (csv_file === null) {
      setCSVFileError("Please select CSV.");
      return "";
    }
    setImportBtnLoading(true);
    const params = router.query;

    let formData = new FormData(); //formdata object

    formData.append("device_id", params.deviceId); //append the values with key, value pair
    formData.append("shop_id", params.shopId);
    formData.append("csv_file", csv_file);

    const options = {
      onUploadProgress: (ProgressEvent) => {
        console.log("ProgressEvent");
        console.log(ProgressEvent);
        // const { loaded, total } = progressEvent;
        // let percent = Math.floor((loaded * 100) / total);
        // console.log(percent);

        // if (percent < 100) {
        //   console.log("percent");
        // }
      },
      // cancelToken: new CancelToken(
      //   (cancel) => (cancelFileUpload.current = cancel)
      // ),
    };

    setShowImportModal(false);
    createImportReparationAndGuaranteeCSV(formData, options)
      .then((result) => {
        setImportBtnLoading(false);
        setCSVFile(null);

        showNotification(
          "Gelukt!",
          "Je reparaties zijn succesvol opgeslagen",
          "success"
        ).then((value) => {
          getShopBrandModel({ shop: params.shopId, device: params.deviceId });
        });
      })
      .catch((err) => {
        console.log(err.response);

        // showNotification("Error!", "Error occurred, Please try again later", "error").then(
        showNotification("Error!", err.response.data.error, "error").then(
          (value) => {
            setShowImportModal(false);
            setImportBtnLoading(false);
          }
        );
      });
  };

  const onExportCsv = async () => {
    setExportBtnLoading(true);
    // try {

    getExportReparationAndGuaranteeCSV(params)
      .then((result) => {
        const a = document.createElement("a");
        const blob = new Blob([result.data], { type: "octet/stream" }),
          url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = "MrAgain_reparatiebeheer.csv";
        a.click();
        window.URL.revokeObjectURL(url);
        setExportBtnLoading(false);
      })
      .catch((err) => {
        setExportBtnLoading(false);
        alert(
          "Er is een fout opgetreden bij het exporteren, probeer het later nog eens."
        );
      });

    // } catch (err) {
    //   console.log(err);

    // }
  };

  //have to check the code later

  return (
    <Layout>
      <Fragment>
        {importBtnLoading === true ? (
          <LoadingOverlay
            active={importBtnLoading}
            spinner
            text={"Importing file.."}
            // text={<p>ff {percentage} %</p>}
          ></LoadingOverlay>
        ) : null}
        <div className="phone-repair-page">
          <Modal
            visible={showImportModal}
            title="Importeer een CSV file"
            onCancel={onToggleImportPopup}
            footer={[
              <Button
                key="back"
                onClick={onToggleImportPopup}
                loading={importBtnLoading}
              >
                Cancel
              </Button>,
              <Button
                key="submit"
                type="primary"
                loading={importBtnLoading}
                onClick={(e) => onImportCSVFile(e)}
              >
                Uploaden
              </Button>,
            ]}
          >
            <div className="form-group">
              <label>CSV</label>
              <input
                type="file"
                name="csv_file"
                className={classnames({
                  "form-control": true,
                  "is-invalid": csv_file_error,
                })}
                style={{ height: "auto" }}
                onChange={(e) => onUploadCSV(e)}
              />
              {csv_file_error ? (
                <em id="email-error" className="error invalid-feedback">
                  {csv_file_error}
                </em>
              ) : null}
            </div>
          </Modal>

          <div className="main-title">
            <Head>
              <title>Mr Again - Reparatie beheer</title>
              <meta
                name="Keywords"
                content="Telefoon reparaties, telefoon modellen, telefoon reparateur, Samsung, Apple, Huawei"
              />
              <meta
                name="description"
                content="Beheer de modellen die jij repareert"
              />
              <link rel="canonical" href={FRONT_END_URL + "/reparaties"} />

              {/**Below mentioned meta tags are og tags that are used when website is through any socaial media.*/}
              <meta property="og:type" content="website" />
              <meta
                name="og_title"
                property="og:title"
                content=" Overzicht device"
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
            <div className="wrap">
              <h4>Overzicht device</h4>
            </div>
          </div>
          <div className="phone-repair-page-content">
            <div className="phone-repair-page-content-wrap">
              <div className="phone-repair-page-content-wrap-header">
                {brands.length > 0 && (
                  <Fragment>
                    <div className="repair-content-header-title">
                      Alle merken
                    </div>
                    <div className="repair-content-header-btn">
                      <OverlayTrigger
                        // key="top"
                        key="importCSV"
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            Importeer de door jou ingevulde csv file en update
                            in een keer al je reparaties!
                          </Tooltip>
                        }
                      >
                        <Button
                          className="device-manage-btn"
                          onClick={onToggleImportPopup}
                          loading={importBtnLoading}
                        >
                          <div className="pl-2 ">Import</div>
                        </Button>
                      </OverlayTrigger>

                      <OverlayTrigger
                        // key="top"
                        key="brands"
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            Exporteer een csv file waarmee je makkelijk je
                            reparaties beheert. Vul de velden prijs, garantie,
                            reparatie tijd en status (True of False) in en
                            upload de csv weer.
                          </Tooltip>
                        }
                      >
                        <Button
                          className="device-manage-btn"
                          onClick={toggleEportModal}
                          // loading={exportBtnLoading}
                        >
                          <div className="pl-2">Export</div>
                        </Button>
                      </OverlayTrigger>
                      <Modal
                        visible={visibleExportModal}
                        title="Exporteer je reparatie CSV file"
                        onCancel={(e) => toggleEportModal(e)}
                        footer={[
                          <Button
                            key="back"
                            onClick={(e) => toggleEportModal(e)}
                          >
                            Sluit
                          </Button>,
                        ]}
                      >
                        <p>
                          Download je reparatie file en de instructies voor het
                          gebruik ervan.
                        </p>
                        <a
                          href="/MrAgain_Instructies_Model_en_Reparatie_beheer-2020.pdf"
                          target="_blank"
                          download
                        >
                          <Button type="dashed">
                            <FontAwesomeIcon
                              icon={["fas", "download"]}
                            ></FontAwesomeIcon>
                            <span className="pl-2"> Download Instructies</span>
                          </Button>
                        </a>
                        <p className="mt-3">Of</p>
                        <Button
                          key="submit"
                          type="primary"
                          size="large"
                          block
                          loading={exportBtnLoading}
                          onClick={onExportCsv}
                        >
                          Exporteer reparatie CSV file
                        </Button>
                      </Modal>
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                          <Tooltip id={"tooltip-top"}>
                            Selecteer de modellen die jij repareert om je
                            overzicht up to date te houden.
                          </Tooltip>
                        }
                      >
                        <Button
                          className="device-manage-btn w-50"
                          onClick={() => {
                            onEditModel();
                          }}
                          disabled={
                            isCreatedGuarantee === true &&
                            isDeletedGuarantee === true
                              ? false
                              : true
                          }
                          // loading={!isDeletedGuarantee}
                          loading={!isCreatedGuarantee || !isDeletedGuarantee}
                        >
                          {isDeletedGuarantee && isCreatedGuarantee ? (
                            <FontAwesomeIcon
                              icon={["fas", "plus-circle"]}
                            ></FontAwesomeIcon>
                          ) : null}
                          <div className="pl-1">{editBtnLabel}</div>
                        </Button>
                      </OverlayTrigger>

                      <Button
                        className="device-manage-btn"
                        onClick={() => {
                          router.push(`/apparaten-beheer/${shopName}`);
                        }}
                        disabled={
                          isCreatedGuarantee === true &&
                          isDeletedGuarantee === true
                            ? false
                            : true
                        }
                      >
                        <FontAwesomeIcon
                          icon={["fas", "undo"]}
                        ></FontAwesomeIcon>
                        <div className="pl-1">Terug</div>
                      </Button>
                    </div>
                  </Fragment>
                )}
              </div>
              <div className="phone-repair-page-content-wrap-body">
                <Row>{displayBrands()}</Row>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  listPBM: state.search.fieldlistPBM,
  newGuarantees: state.account.newGuarantees,
  deleteGuarantees: state.account.deleteGuarantees,
  shopModelGuarantee: state.account.shopModelGuarantee,
  loadPBM: state.account.loadPBM,
  isLoadFilter: state.search.isLoadFilter,
  isCreatedGuarantee: state.account.isCreatedGuarantee,
  isDeletedGuarantee: state.account.isDeletedGuarantee,
  isSaveModalsLoading: state.account.isGettingModals,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getSearchFilterField: () => getSearchFilterField(dispatch),
    setBrandModel: (id, models) => {
      dispatch(setBrandModel(id, models));
    },
    setLoadPBM: (data) => {
      dispatch(setLoadPBM(data));
    },
    createGuaranteeModels: (data) => {
      createGuaranteeModels(data, dispatch);
    },

    deleteGuaranteeModels: (data) => {
      deleteGuaranteeModels(data, dispatch);
    },
    getShopBrandModel: (data) => {
      getShopBrandModel(data, dispatch);
    },
    createImportReparationAndGuaranteeCSV: (data) => {
      createImportReparationAndGuaranteeCSV(data, dispatch);
    },
    getExportReparationAndGuaranteeCSV: (data) => {
      getExportReparationAndGuaranteeCSV(data, dispatch);
    },

    setGuaranteeDevice: (id) => {
      dispatch(setGuaranteeDevice(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhoneRepair);
