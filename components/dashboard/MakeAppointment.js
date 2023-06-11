import "bootstrap/dist/css/bootstrap.min.css";
import "./MakeAppointment.module.css";

import { Button, DatePicker, Divider, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { Label } from "semantic-ui-react";
import {
  getBrands,
  getDevices,
  getModels,
  getReparationDetails,
  getReparations,
} from "service/search/operations";

const Option = Select.Option;

const MakeAppointment = (routerProps) => {
  const {
    shop,
    onChangeStatus,
    devices,
    getBrands,
    getModels,
    deviceBrands,
    brandModels,
  } = routerProps;
  const [modal, setmodal] = useState(null);
  const [device, setDevice] = useState(0);
  const [brand, setBrand] = useState(0);
  const [model, setModel] = useState(0);
  const [price, setPrice] = useState(1);
  const [guarantee, setGuarantee] = useState(1);
  const [reparation, setReparation] = useState(0);
  const [reparaties, setReparaties] = useState([]);
  const [showSaveReparation, setShowSaveReparation] = useState(true);
  const [isResponse, setIsResponse] = useState(false);

  useEffect(() => {
    // getDevices(dispatch);
    setmodal(true);
  }, []);

  const handleModalClose = () => {
    setmodal(false);
    onChangeStatus();
  };

  const handleDeviceChange = (value) => {
    setDevice(value);
    getBrands(value);
    setBrand(0);
    setModel(0);
  };
  const handleBrandChange = (value) => {
    setBrand(value);
    getModels(device, value);
    setModel(0);
  };

  const handleModelChange = (value) => {
    setModel(value);
    const data = {
      device,
      model: value,
    };
    getReparations(data).then((res) => {
      console.log(res.data);
      setReparaties(res.data);
    });
  };
  const handleReparatiesChange = (value) => {
    setReparation(value);
    const data = {
      device,
      model,
      repar: value,
      brand,
      shop,
    };

    getReparationDetails(data).then((res) => {
      if (res.data.length === 0) {
        setIsResponse(false);
      } else {
        setIsResponse(true);
        const details = res.data[0];
        setPrice(details.price);
        setGuarantee(details.guarantee_time);
      }
    });
    setShowSaveReparation(true);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleGuaranteeChange = (e) => {
    setGuarantee(e.target.value);
  };
  const saveReparationDetails = () => {
    const reparationDetails = {
      repaData: {
        device: device,
        brand: brand,
        model: model,
        shop: shop,
        reparation: reparation,
        price: price,
        guarantee_time: guarantee,
      },
    };
    console.log(reparationDetails);
  };

  return (
    <Fragment>
      <Modal
        show={modal}
        onHide={handleModalClose}
        className="reparation-change-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Nieuwe afspraak</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="select-device-reparation"> */}
          <div className="row ">
            <div className="col-md-12 px-5 model_main">
              <div className="pb-3">
                <div className="shop-appointment-form-label">
                  <Label>Selecteer je device</Label>
                </div>
                <div>
                  <Select
                    className="w-100 "
                    value={device}
                    onChange={handleDeviceChange}
                  >
                    <Option value={0} key={0}>
                      Alle apparaten
                    </Option>
                    {devices.map((element) => {
                      return (
                        <Option value={element.id} key={element.id}>
                          {element.device_name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="pb-3">
                <div className="shop-appointment-form-label">
                  <Label>Selecteer je merk</Label>
                </div>
                <div>
                  <Select
                    className="w-100 "
                    value={brand}
                    onChange={handleBrandChange}
                  >
                    <Option value={0} key={0}>
                      Alle merken
                    </Option>
                    {deviceBrands.map((element) => {
                      return (
                        <Option value={element.id} key={element.id}>
                          {element.brand_name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="pb-3">
                <div className="shop-appointment-form-label">
                  <Label>Selecteer je model</Label>
                </div>
                <div>
                  <Select
                    className="w-100 "
                    value={model}
                    onChange={handleModelChange}
                  >
                    <Option value={0} key={0}>
                      Alle modellen
                    </Option>
                    {brandModels.map((element) => {
                      return (
                        <Option value={element.id} key={element.id}>
                          {element.model_name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="pb-3">
                <div className="shop-appointment-form-label">
                  <Label>Type reparatie</Label>
                </div>
                <div>
                  <Select
                    className="w-100 "
                    value={reparation}
                    onChange={handleReparatiesChange}
                  >
                    <Option value={0} key={0}>
                      Alle reparaties
                    </Option>
                    {reparaties.map((element) => {
                      return (
                        <Option value={element.id} key={element.id}>
                          {element.reparation_name}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              {showSaveReparation && (
                <Fragment>
                  <div className="row">
                    <div className="col-md-6 pb-3">
                      <div className="shop-appointment-form-label">
                        <Label>Price</Label>
                      </div>
                      <div>
                        <Input
                          className="location-select"
                          placeholder="price"
                          onChange={(e) => handlePriceChange(e)}
                          value={price}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 pb-3">
                      <div className="shop-appointment-form-label">
                        <Label>Garantie (mnd)</Label>
                      </div>
                      <div>
                        <Input
                          className="location-select"
                          placeholder="guarantee"
                          onChange={(e) => handleGuaranteeChange(e)}
                          value={guarantee}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pb-3">
                    <Button
                      block
                      className="save-button"
                      onClick={() => saveReparationDetails()}
                    >
                      Update reparatie database
                    </Button>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModalClose()}>
            Annuleer
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => (
  console.log(state),
  {
    auth_user: state.account.auth_user,
    account_profile: state.account.account_profile,
    devices: state.search.devices,
    deviceBrands: state.search.deviceBrands,
    brandModels: state.search.brandModels,
    reparationDetails: state.search.reparationDetails,
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    getBrands: (id) => {
      getBrands(id, dispatch);
    },
    getModels: (deviceId, brandId) => {
      getModels(deviceId, brandId, dispatch);
    },
    getReparations: (data) => {
      getReparations(data, dispatch);
    },
    getReparationDetails: (data) => {
      getReparationDetails(data, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeAppointment);
