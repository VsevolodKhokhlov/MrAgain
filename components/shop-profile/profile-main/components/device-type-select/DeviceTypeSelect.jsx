import "./DeviceTypeSelect.less";

import { Select } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getBrandModels, getDeviceBrands } from "service/search/operations.js";
import {
  getReparationModelDetails,
  getShopDevices,
} from "service/search/operations.js";

const { Option } = Select;

const DeviceTypeSelect = (routerProps) => {
  const [isLoad, setLoad] = React.useState(false);
  const [phone, setPhone] = React.useState(0);
  const [brand, setBrand] = React.useState(0);
  const [brandflg, setBrandflg] = React.useState(false);
  const [isShowModel, setShowModel] = React.useState(false);
  const [model, setModel] = React.useState(0);
  const [shopId, setShopId] = React.useState(0);
  const [deviceId, setDeviceId] = React.useState(0);
  const [brandId, setBrandId] = React.useState(0);
  const [shopDeviceBrands, setShopDeviceBrands] = React.useState([]);
  const [shopBrandModels, setShopBrandModels] = React.useState([]);
  // const [reparationDetails, setReparationDetails] = React.useState([]);
  const {
    filterlistPBM,
    filterlistRPG,
    shopReparationList,
    getReparationModelDetails,
    getShopDevices,
    shopDevices,
    deviceBrands,
    account_profile,
  } = routerProps;

  let repList = [];
  let isExistR = [];

  if (filterlistRPG !== []) {
    filterlistRPG.map((element) => {
      isExistR = repList.filter((rep) => rep.id === element.reparation.id);
      if (isExistR.length === 0) {
        repList.push(element.reparation);
      }
      return true;
    });
  }

  if (isLoad === false) {
    setLoad(true);
  }

  function handlePhoneChange(value) {
    setPhone(value);
    setDeviceId(value);
    getDeviceBrands(shopId, value).then((res) => {
      setShopDeviceBrands(res.data);
    });
    // setPhoneflg(true);
    if (brandflg === true) {
      setBrandflg(false);
      setShowModel(false);
      setBrand(0);
    }
  }

  function handleBrandChange(value) {
    console.log(value);
    setBrandId(value);
    getBrandModels(shopId, deviceId, value).then((res) => {
      setShopBrandModels(res.data);
    });
    setBrand(value);
    setBrandflg(true);
    setShowModel(true);
    setModel(0);
  }

  function handleModelChange(value) {
    setModel(value);

    let services = {
      shop: shopId,
      device: deviceId,
      brand: brandId,
      model: value,
    };
    getReparationModelDetails(services);
  }

  useEffect(() => {
    const id = account_profile.id;
    if (id) {
      getShopDevices(id);
      setShopId(id);
    }
  }, [account_profile]);
  function initBrandSelect() {
    let show = false;
    let phoneObj = filterlistPBM.filter((el) => el.id === phone);
    return (
      phoneObj[0] !== undefined &&
      phoneObj[0]["brand"].map((element) => {
        show = false;
        for (let i = 0; i < shopReparationList.length; i++) {
          if (
            shopReparationList[i].brand === element.id &&
            shopReparationList[i].active === true
          ) {
            show = true;
            break;
          }
        }
        if (show === true) {
          return (
            <Option value={element.id} key={element.id}>
              {element.brand_name}
            </Option>
          );
        } else {
          return null;
        }
      })
    );
  }

  function initModelSelect() {
    let phoneObj = filterlistPBM.filter((el) => el.id === phone);
    let modelObj = phoneObj[0]["brand"].filter((e1) => e1.id === brand);
    let show = false;
    return (
      modelObj[0] !== undefined &&
      modelObj[0]["model"].map((element) => {
        show = false;
        for (let i = 0; i < shopReparationList.length; i++) {
          if (
            shopReparationList[i].model === element.id &&
            shopReparationList[i].active === true
          ) {
            show = true;
            break;
          }
        }
        if (show === true) {
          return (
            <Option value={element.id} key={element.id}>
              {element.model_name}
            </Option>
          );
        } else {
          return null;
        }
      })
    );
  }
  // console.log(shopDevices);
  return (
    <div className="device-type-select">
      <div className="device-type-wrap">
        <Select
          className="device-select"
          defaultValue="Alle apparaten"
          value={phone === 0 ? "Alle apparaten" : phone}
          onChange={handlePhoneChange}
        >
          {shopDevices.map((element) => {
            return (
              <Option value={element.device_id} key={element.device_id}>
                {element.device.device_name}
              </Option>
            );
          })}
        </Select>
        <Select
          className="brand-select"
          defaultValue="Alle merken"
          onChange={handleBrandChange}
          value={brand === 0 ? "Alle merken" : brand}
        >
          {shopDeviceBrands.map((element) => {
            return (
              <Option value={element.brand_id} key={element.brand_id}>
                {element.brand.brand_name}
              </Option>
            );
          })}
          {/* {initBrandSelect()} */}
        </Select>
        <Select
          className={isShowModel ? "model-select" : "model-select hidden"}
          defaultValue="Alle modellen"
          onChange={handleModelChange}
          value={model === 0 ? "Alle modellen" : model}
        >
          {shopBrandModels.map((element) => {
            return (
              <Option value={element.model_id} key={element.model_id}>
                {element.model.model_name}
              </Option>
            );
          })}
          {/* {brandflg && initModelSelect()} */}
        </Select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  filterlistPBM: state.search.fieldlistPBM,
  filterlistRPG: state.search.fieldlistRPG,
  shopReparationList: state.appointment.shopReparationList,
  account_profile: state.account.shop_account_profile,
  shopDevices: state.search.shopDevices,
  deviceBrands: state.search.deviceBrands,
  brandModels: state.search.brandModels,
  shopReparationDetails: state.search.shopReparationDetails,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    getReparationModelDetails: (data) => {
      getReparationModelDetails(data, dispatch);
    },
    getShopDevices: (id) => {
      getShopDevices(id, dispatch);
    },
    getDeviceBrands: (shopId, deviceId) => {
      getDeviceBrands(shopId, deviceId, dispatch);
    },
    getBrandModels: (shopId, deviceId, brandId) => {
      getBrandModels(shopId, deviceId, brandId, dispatch);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceTypeSelect);
