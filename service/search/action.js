import {
  FETCH_SHOP_LIST,
  FETCH_NEWESTSHOP_LIST,
  RESET_SHOP_FILTER_LIST,
  FETCH_SHOP_FILTER_LIST,
  FETCH_FILTER_PBM_LIST,
  FETCH_FILTER_RPG_LIST,
  FETCH_MODEL_SERVICES,
  SET_FIND_LOCATION,
  SET_LOAD_SERVICE,
  SET_LOAD_FILTER,
  SET_SEARCH_FILTER,
  IS_FIND_OUT,
  GET_SHOP_DEVICES,
  SET_DEVICES,
  SET_DEVICE_BRANDS,
  SET_BRAND_MODELS,
  UPDATE_REPARATION_LOADING,
  SAVE_REPARATION_LOADING,
  GET_PAGES,
  GET_PAGE_DETAILS,
} from "./types";

export const setLoadFilter = (data) => ({
  type: SET_LOAD_FILTER,
  payload: data,
});

export const setSearchFilter = (data) => ({
  type: SET_SEARCH_FILTER,
  payload: data,
});

export const fetchShopList = (data) => ({
  type: FETCH_SHOP_LIST,
  payload: data,
});

export const fetchNewestShopList = (data) => ({
  type: FETCH_NEWESTSHOP_LIST,
  payload: data,
});

export const resetShopFilterList = (data) => ({
  type: RESET_SHOP_FILTER_LIST,
  payload: data,
});

export const fetchShopFilterList = (data) => ({
  type: FETCH_SHOP_FILTER_LIST,
  payload: data,
});

export const fetchFiterPBMList = (data) => ({
  type: FETCH_FILTER_PBM_LIST,
  payload: data,
});

export const fetchFiterRPGList = (data) => ({
  type: FETCH_FILTER_RPG_LIST,
  payload: data,
});

export const setFindOut = (data) => ({
  type: IS_FIND_OUT,
  payload: data,
});

export const setFindedLocation = (data) => ({
  type: SET_FIND_LOCATION,
  payload: data,
});

export const fetchModelServices = (data) => ({
  type: FETCH_MODEL_SERVICES,
  payload: data,
});

export const setLoadService = (data) => ({
  type: SET_LOAD_SERVICE,
  payload: data,
});

export const setShopDevices = (data) => ({
  type: GET_SHOP_DEVICES,
  payload: data,
});
export const setDevices = (data) => ({
  type: SET_DEVICES,
  payload: data,
});
export const setDeviceBrands = (data) => ({
  type: SET_DEVICE_BRANDS,
  payload: data,
});
export const setBrandModels = (data) => ({
  type: SET_BRAND_MODELS,
  payload: data,
});

export const updateReparationLoading = (data) => ({
  type: UPDATE_REPARATION_LOADING,
  payload: data,
});
export const saveReparationStatus = (data) => ({
  type: SAVE_REPARATION_LOADING,
  payload: data,
});
export const getPageList = (data) => ({
  type: GET_PAGES,
  payload: data,
});
export const getDetailsOfPage = (data) => ({
  type: GET_PAGE_DETAILS,
  payload: data,
});
