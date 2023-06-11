import "bootstrap/dist/css/bootstrap.min.css";
import "./model-gegevens.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Switch from "react-switch";
import { setLoadPBM, setSelectShopGuarantee } from "service/account/action";
import { setGuaranteeDevice } from "service/account/action.js";
import {
  deleteShopGuarantee,
  // getShopBrandModel,
  getShopRepairation,
  updateShopModalGuarantees,
} from "service/account/operations";

import { Layout } from "@/components/global";

const DetailPerPhone = (routerProps) => {
  const [update, setUpdate] = useState(true);
  // const [isActive, setActive] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [guaranteeList, setGuaranteeList] = useState([]);
  const [load, setload] = useState(false);

  const {
    selectedShopGuarantee,
    loadPBM,
    location,
    auth_user,
    newGuarantees,
    // getShopBrandModel,
    shopModelGuarantee,
    setSelectShopGuarantee,
    setGuaranteeDevice,
    reparationData,
  } = routerProps;

  // const onDeleteGuarantee = guar_id => {
  //   deleteShopGuarantee(guar_id, auth_user.account_id, newGuarantees.device_id);
  //   setUpdate(false);
  // };
  const router = useRouter();
  const params = router.query;

  //   if (load === false) {
  //   }

  const handleGuaranteeActiveChange = (checked, id) => {
    let glist = [...guaranteeList];
    let guar = glist.filter((e) => e.id === id);
    guar = guar[0];

    if (checked === true) {
      if (parseInt(guar["price"]) === 0) {
        alert("De prijs moet ingevuld zijn");
        return;
      }
      if (parseInt(guar["reparation_time"]) === 0) {
        alert("Een schatting van de reparatie tijd is verplicht");
        return;
      }
    }

    guar["active"] = checked;
    setGuaranteeList([...glist]);
  };

  function validateInterger(num) {
    let val = Number(num);
    if (isNaN(val)) {
      alert("Het lijkt erop dat je geen geldig nummer hebt ingevoerd");
      return 0;
    }
    return val;
  }

  const handelGuaranteeChange = (e, id) => {
    let glist = [...guaranteeList];
    let guar = glist.filter((el) => el.id === id);
    guar = guar[0];
    guar[e.target.name] = validateInterger(e.target.value);
    setGuaranteeList([...glist]);
  };

  const handelSaveChanges = () => {
    let data = {
      shop_id: params.shopId,
      payload: guaranteeList,
    };
    updateShopModalGuarantees(data);
    handleModalClose();
  };

  const handleModalClose = () => setshowModal(false);
  const handleModalShow = () => setshowModal(true);

  useEffect(() => {
    const init = () => {
      let arr = [...selectedShopGuarantee];
      setGuaranteeList(arr);
    };

    // if (loadPBM === true) {
    //   if (update === true) {
    //     let data = shopModelGuarantee.filter(
    //       (el) =>
    //         el.reparation.device === parseInt(params.deviceId) &&
    //         el.brand_id === parseInt(params.brandId) &&
    //         el.model_id === parseInt(params.modelId)
    //     );

    //     setSelectShopGuarantee(data);
    //     setLoadPBM(false);
    //     if (update === true) {
    //       setUpdate(false);
    //     }
    //   }
    // }
    if (load === false) {
      let data = {
        shop: parseInt(params.shopId),
        device: parseInt(params.deviceId),
        model: parseInt(params.modelId),
        brand: parseInt(params.brandId),
      };
      //   getShopBrandModel(data);
      getShopRepairation(data).then((res) => {
        console.log(res);
        setGuaranteeList(res.data);
      });
      setload(true);
    }
    // else {
    //   if (selectedShopGuarantee.length > 0) {
    //     init();
    //   }
    // }
  }, [
    loadPBM,
    load,
    update,
    shopModelGuarantee,
    setSelectShopGuarantee,
    newGuarantees,
    location,
    selectedShopGuarantee,
    getShopRepairation,
    reparationData,
  ]);

  const handleBrandModel = async (id) => {
    // setGuaranteeDevice(id);
    // let ret = await getSearchFilterField();
    // let data = {
    //   shop: auth_user.account_id,
    //   device: id,
    // };
    // getShopBrandModel(data);
  };

  return (
    <Layout>
      <div className="detail-per-phone-page">
        <div className="main-title">
          <div className="wrap">
            <h4>{params.modelName}</h4>
          </div>
        </div>
        <div className="main-container">
          <div className="main-container-wrap">
            <div className="main-container-wrap-blog">
              <div className="main-container-title">
                {params.modelName} overzicht
              </div>
              <div className="main-container-content">
                <Table
                  striped
                  bordered
                  hover
                  className="detail-per-phone-table "
                >
                  <thead className="detail-per-phone-table-header">
                    <tr>
                      <th>Type reparatie</th>
                      <th>Prijs (incl.btw)</th>
                      <th>Garantie in maanden</th>
                      <th>Reparatietijd (min.)</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {selectedShopGuarantee.map((el) => { */}
                    {guaranteeList.map((el, i) => {
                      return (
                        <tr key={el.id}>
                          <td>{el.reparation.reparation_name}</td>
                          <td>€{el.price}</td>
                          <td>{el.guarantee_time} Maanden</td>
                          <td>{el.reparation_time} Minuten</td>
                          <td>
                            {/* <Popconfirm
                              title="Are you sure delete this guarantee?"
                              onConfirm={() => onDeleteGuarantee(el.id)}
                              okText="Yes"
                              cancelText="No"
                            > */}
                            {el.active === true && (
                              <FontAwesomeIcon
                                className="color-green minus-circle-btn"
                                icon={["fas", "check-circle"]}
                              ></FontAwesomeIcon>
                            )}
                            {el.active !== true && (
                              <FontAwesomeIcon
                                className="color-red minus-circle-btn"
                                icon={["fas", "minus-circle"]}
                              ></FontAwesomeIcon>
                            )}
                            {/* </Popconfirm> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Modal
                  show={showModal}
                  className="edit-reparation-modal"
                  onHide={handleModalClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Wijzigen reparatie</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Table
                      striped
                      bordered
                      hover
                      className="detail-per-phone-table detail-per-phone-table-modal"
                    >
                      <thead className="detail-per-phone-table-header">
                        <tr>
                          <th>Soort reparatie</th>
                          <th>Prijs</th>
                          <th>Garantie (maanden)</th>
                          <th>Reparatie tijd(min)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {guaranteeList.map((el) => {
                          return (
                            <tr key={el.id}>
                              <td>{el.reparation.reparation_name}</td>
                              <td>
                                <div className="flex-row">
                                  €
                                  <Input
                                    name="price"
                                    placeholder={el.price}
                                    onChange={(e) => {
                                      handelGuaranteeChange(e, el.id);
                                    }}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="flex-row">
                                  <Input
                                    name="guarantee_time"
                                    placeholder={el.guarantee_time}
                                    onChange={(e) => {
                                      handelGuaranteeChange(e, el.id);
                                    }}
                                  />{" "}
                                  Maanden
                                </div>
                              </td>
                              <td>
                                <div className="flex-row">
                                  <Input
                                    name="reparation_time"
                                    placeholder={el.reparation_time}
                                    onChange={(e) => {
                                      handelGuaranteeChange(e, el.id);
                                    }}
                                  />{" "}
                                  Minuten
                                </div>
                              </td>
                              <td>
                                <Switch
                                  name="active"
                                  onChange={(checked) => {
                                    handleGuaranteeActiveChange(checked, el.id);
                                  }}
                                  checked={el.active}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className="reparation-change-btn"
                      onClick={handelSaveChanges}
                    >
                      Save & terug
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Button
                  className="reparation-change-btn"
                  onClick={handleModalShow}
                >
                  Wijzigen
                </Button>
                <Link
                  href={`/reparaties?shopId=${params.shopId}&deviceId=${params.deviceId}`}
                  onClick={() => {
                    handleBrandModel(params.deviceId);
                  }}
                >
                  <Button className="reparation-change-btn">Terug</Button>
                </Link>
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
  loadPBM: state.account.loadPBM,
  listPBM: state.search.fieldlistPBM,
  selectedShopGuarantee: state.account.selectedShopGuarantee,
  auth_user: state.account.auth_user,
  newGuarantees: state.account.newGuarantees,
  shopModelGuarantee: state.account.shopModelGuarantee,
  reparationData: state.account.reparationData,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    deleteShopGuarantee: (id, account, device) => {
      deleteShopGuarantee(id, account, device, dispatch);
    },
    // getShopBrandModel: (data) => {
    //   getShopBrandModel(data, dispatch);
    // },
    getShopRepairation: (data) => {
      getShopRepairation(data, dispatch);
    },
    setSelectShopGuarantee: (data) => {
      dispatch(setSelectShopGuarantee(data));
    },
    setLoadPBM: (data) => {
      dispatch(setLoadPBM(data));
    },
    updateShopModalGuarantees: (data) => {
      updateShopModalGuarantees(data, dispatch);
    },
    setGuaranteeDevice: (id) => {
      dispatch(setGuaranteeDevice(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailPerPhone);
