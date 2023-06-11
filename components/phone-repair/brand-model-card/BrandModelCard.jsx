import "./BrandModelCard.less";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Divider } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setBrandModel, setSelectShopGuarantee } from "service/account/action";

const BrandModelCard = (routerProps) => {
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [brand, setBrand] = useState({});
  const [models, setModels] = useState([]);
  const [newModels, setNewModels] = useState([]);
  const [load, setLoad] = useState(false);
  const [checks, setChecks] = useState([]);

  const {
    brand_id,
    listPBM,
    newGuarantees,
    setBrandModel,
    isEditable,
    isEditGuarantee,
    shopModelGuarantee,
    setSelectShopGuarantee,
    shop_id,
  } = routerProps;

  const handleEditReparation = (device_id, brand_id, model_id) => {
    // let data = shopModelGuarantee.filter(
    //   (el) =>
    //     el.reparation.device === device_id &&
    //     el.brand_id === brand_id &&
    //     el.model_id === model_id
    // );
    // setSelectShopGuarantee(data);
  };

  const onChangeCheckVaule = (e, i, model_id) => {
    let arr = [...checks];
    arr[i] = e.target.checked;
    setChecks(arr);
    let tmp = newModels;
    if (e.target.checked === true) {
      tmp.push(model_id);
    } else {
      const index = tmp.indexOf(model_id);
      if (index > -1) {
        tmp.splice(index, 1);
      }
    }
    setNewModels(tmp);
    setBrandModel(brand_id, tmp);
  };

  const onChangeAllCheck = (e) => {
    let tmp = [];
    let arr = Array(models.length).fill(e.target.checked);
    setChecks(arr);
    if (e.target.checked === true) {
      models.map((el) => {
        tmp.push(el.id);
        return true;
      });
    }
    setNewModels(tmp);
    setBrandModel(brand_id, tmp);
    setIsAllCheck(e.target.checked);
  };

  useEffect(() => {
    const initPBMLIST = () => {
      let brand = {};
      let model = [];
      let tmp = listPBM.filter((e) => e.id === newGuarantees.device_id);
      if (tmp.length > 0) {
        tmp = tmp[0];
        tmp = tmp.brand;
        tmp = tmp.filter((e) => e.id === brand_id);
        if (tmp.length > 0) {
          tmp = tmp[0];
          brand = {
            id: tmp.id,
            name: tmp.brand_name,
          };
          model = tmp.model;
        }
      }
      setBrand(brand);
      /** */
      let brandtmp = newGuarantees.brand.filter(
        (e) => e.brand_id === brand_id
      )[0];

      if (brandtmp !== undefined) {
        setNewModels(brandtmp.models);
        let arr = Array(model.length).fill(false);

        if (model.length === brandtmp.models.length) {
          setIsAllCheck(true);
        }
        for (let i = 0; i < model.length; i++) {
          for (let j = 0; j < brandtmp.models.length; j++) {
            if (model[i].id === brandtmp.models[j]) {
              arr[i] = true;
            }
          }
        }
        setChecks(arr);
      }
      /** */
      setModels(model);
    };
    if (load === false) {
      initPBMLIST();
      if (models.length > 0) {
        setLoad(true);
      }
    }
  }, [brand_id, listPBM, newGuarantees]);

  return (
    <div className="brand-model-card">
      <div className="brand-model-card-title">{brand.name}</div>
      <div className="brand-model-card-body">
        {isEditable === true && (
          <Checkbox
            tabIndex={brand_id}
            key={brand_id}
            onChange={(e) => {
              onChangeAllCheck(e);
            }}
            checked={isAllCheck}
          >
            <div>select all</div>
          </Checkbox>
        )}
        <Divider />
        {models.map((el, i) => {
          return (
            <div className="brand-model-card-body-check" key={i}>
              {(checks[i] === true || isEditable === true) && (
                <div className="brand-model-card-body-checkbox">
                  {isEditable === true && (
                    <Checkbox
                      tabIndex={el.id}
                      key={el.id}
                      checked={checks[i]}
                      onChange={(e) => {
                        onChangeCheckVaule(e, i, el.id);
                      }}
                    ></Checkbox>
                  )}
                  <div>{el.model_name}</div>
                </div>
              )}
              {checks[i] === true && isEditable === false && (
                <Link
                  href={`/model-gegevens/?shopId=${shop_id}&deviceId=${newGuarantees.device_id}&brandId=${brand_id}&modelId=${el.id}&modelName=${el.model_name}`}
                  //   disabled={isEditGuarantee === true ? false : true}
                >
                  <a>
                    <FontAwesomeIcon
                      className="brand-model-reparation-edit"
                      icon={["fas", "edit"]}
                    ></FontAwesomeIcon>
                  </a>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  listPBM: state.search.fieldlistPBM,
  newGuarantees: state.account.newGuarantees,
  shopModelGuarantee: state.account.shopModelGuarantee,
});

const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    setBrandModel: (id, models) => {
      dispatch(setBrandModel(id, models));
    },
    setSelectShopGuarantee: (data) => {
      dispatch(setSelectShopGuarantee(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandModelCard);
