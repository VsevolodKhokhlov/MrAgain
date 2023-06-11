import { API_PATH } from "../../constants";
import {
  setFindOut,
  resetShopFilterList,
  fetchFiterPBMList,
  fetchFiterRPGList,
  fetchShopFilterList,
  fetchModelServices,
  setLoadService,
  fetchNewestShopList,
  setLoadFilter,
  setShopDevices,
  setDeviceBrands,
  setShopReparationDetails,
  setReparationData,
  setDevices,
  setBrandModels,
  setReparations,
  setReparaties,
  setReparationDetails,
  updateReparationLoading,
  saveReparationStatus,
  getPageList,
  getDetailsOfPage,
} from "./action";
import axios from "axios";
import { logoutA } from "../account/action";
import { DETAILS_OF_SHOP_REPARATION } from "./types";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.withCredentials = true;

export const tokenConfig = () => {
  const token = localStorage.getItem("auth-token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

axios.create({
  headers: {
    get: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    post: {
      "content-type": "multipart/form-data",
      Accept: "application/json",
    },
  },
  withCredentials: true,
});
export async function getNewestShopList(count, city, dispatch) {
  return axios
    .get(`${API_PATH.GETNEWESTSHOPS}/`, {
      params: { count: count, city: city },
    })
    .then((res) => {
      if (dispatch) {
        dispatch(fetchNewestShopList(res.data));
      } else {
        return res.data;
      }
    })
    .catch((err) => {});
}

export async function getSearchFilterField(dispatch) {
  dispatch(setLoadFilter(false));
  return await axios
    .get(`${API_PATH.GETFILTERFIELDS}/`)
    .then((res) => {
      // console.log(res.status);
      if (res.status === 401) {
        dispatch(logoutA());
      } else {
      }
      dispatch(fetchFiterPBMList(res.data));
      return true;
    })
    .catch((err) => {
      return false;
    });
}

export async function getDevices(dispatch) {
  dispatch(setLoadFilter(false));
  return await axios
    .get(`${API_PATH.GETDEVICES}/`)
    .then((res) => {
      // console.log(res.status);
      if (res.status === 401) {
        dispatch(logoutA());
      } else {
      }
      dispatch(setDevices(res.data));
      return true;
    })
    .catch((err) => {
      return false;
    });
}
export async function getBrands(id, dispatch) {
  dispatch(setLoadFilter(false));
  return await axios
    .get(`${API_PATH.GETBRANDS}/?device=${id}`)
    .then((res) => {
      // console.log(res.status);
      if (res.status === 401) {
        dispatch(logoutA());
      } else {
        dispatch(setDeviceBrands(res.data));
        return true;
      }
    })
    .catch((err) => {
      return false;
    });
}
export async function getModels(deviceId, brandId, dispatch) {
  dispatch(setLoadFilter(false));
  return await axios
    .get(`${API_PATH.GETMODELS}/?device=${deviceId}&brand=${brandId}`)
    .then((res) => {
      // console.log(res.status);
      if (res.status === 401) {
        dispatch(logoutA());
      } else {
        dispatch(setBrandModels(res.data));
        return true;
      }
    })
    .catch((err) => {
      return false;
    });
}

export function getModelService(data, dispatch) {
  dispatch(setLoadService(false));
  axios
    .get(`${API_PATH.GETMODELSERVICE}/`, { params: data })
    .then((res) => {
      dispatch(fetchModelServices(res.data));
      dispatch(setLoadService(true));
    })
    .catch((err) => {});
}

export async function getReparations(data, dispatch) {
  return await axios.get(`${API_PATH.GETREPARATIONS}/`, { params: data });
  // .then((res) => {
  //   console.log("operations", res.data);
  //   dispatch(setReparaties(res.data));
  //   return;
  // })
  // .catch((err) => {});
}

export function getReparationModelDetails(data, dispatch) {
  dispatch(setLoadService(false));
  axios
    .get(`${API_PATH.GETSHOPREPARATIONDETAILS}/`, { params: data })
    .then((res) => {
      dispatch(fetchModelServices(res.data));
      dispatch(setLoadService(true));
    })
    .catch((err) => {});
}

export function getSearchFilterFieldExt(model_id, dispatch) {
  axios
    .get(`${API_PATH.GETFILTERFIELDEXT}/?id=${model_id}`)
    .then((res) => {
      dispatch(fetchFiterRPGList(res.data));
    })
    .catch((err) => {});
}

export function searchShopFilter(data, dispatch) {
  axios
    .get(`${API_PATH.SEARCH}/`, { params: data })
    .then((res) => {
      // if (res.data.length > 0) {
      dispatch(setFindOut(true));
      dispatch(fetchShopFilterList(res.data));
      return;
      // }
      // if (res.data.length > 0) {
      //   if (res.data[0].model_id === 0) {
      //     dispatch(setFindOut(true));
      //     dispatch(resetShopFilterList());
      //     return;
      //   }
      // }
      // dispatch(setFindOut(true));
      // dispatch(fetchShopFilterList(res.data));
    })
    .catch((err) => {
      dispatch(setFindOut(true));
      dispatch(resetShopFilterList());
    });
}
export function getShopDevices(id, dispatch) {
  axios
    .get(`${API_PATH.GETSHOPDEVICES}/?shop=${id}`)
    .then((res) => {
      dispatch(setShopDevices(res.data));
      return res;
    })
    .catch((err) => {});
}
export async function getDeviceBrands(shopId, deviceId, dispatch) {
  return await axios.get(
    `${API_PATH.GETDEVICEBRANDS}/?shop=${shopId}&device=${deviceId}`
  );
}

export async function getBrandModels(shopId, deviceId, brandId, dispatch) {
  return await axios.get(
    `${API_PATH.GETBRANDMODELS}/?shop=${shopId}&device=${deviceId}&brand=${brandId}`
  );
}

export function contactUs(data, dispatch) {
  axios
    .post(`${API_PATH.CONTACTUS}/`, data)
    .then((res) => {})
    .catch((err) => {console.log(err)});
}

export async function getReparationDetails(data, dispatch) {
  const token = localStorage.getItem("auth-token");
  const headers = {
    Authorization: `Token ` + token,
  };
  return await axios.get(`${API_PATH.GETREPARATIONDETAILS}/`, {
    params: data,
    headers,
  });
}
export function saveReparationData(data, dispatch) {
  axios
    .post(`${API_PATH.SAVESHOPREPARATION}/`, data, tokenConfig())
    .then((res) => {
      dispatch(saveReparationStatus(true));
      setTimeout(() => {
        dispatch(saveReparationStatus(false));
      }, 1500);
      return res;
    })
    .catch((err) => {
      dispatch(saveReparationStatus("error"));
      setTimeout(() => {
        dispatch(saveReparationStatus(false));
      }, 1500);
      return err;
    });
}

export function updateReparationData(data, shop, dispatch) {
  // dispatch(updateReparationLoading(false));

  axios
    .put(`${API_PATH.UPDATESHOPREPARATION}/${shop}/`, data, tokenConfig())
    .then((res) => {
      dispatch(updateReparationLoading(true));
      setTimeout(() => {
        dispatch(updateReparationLoading(false));
      }, 1500);
      return res;
    })
    .catch((err) => {
      dispatch(updateReparationLoading("error"));
      setTimeout(() => {
        dispatch(updateReparationLoading(false));
      }, 1500);
      return err;
    });
}

export function getPages(pageType, dispatch) {
  axios
    .get(`${API_PATH.GETPAGES}/?t=${pageType}`)
    .then((res) => {
      dispatch(getPageList(res.data));
    })
    .catch((err) => {
      return err;
    });
}

export function getPageDetails(slugInfo, dispatch) {
  axios
    .get(`${API_PATH.GETPAGEDETAILS}/?slug=${slugInfo}`)
    .then((res) => {
      dispatch(getDetailsOfPage(res.data));
    })
    .catch((err) => {
      return err;
    });
}

export function getModelDetails(model) {
  return axios
    .get(`${API_PATH.GETMODELDETAILS}/?model=${model}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export function getModelReparations(data) {
  const body = JSON.stringify(data),
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  return axios
    .post(`${API_PATH.GETMODELREPARATIONS}/`, body, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}

export function getAllBrandModels(data) {
  const body = JSON.stringify(data),
    config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  return axios
    .post(`${API_PATH.GETALLBRANDSMODELS}/`, body, config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
export default { searchShopFilter };
