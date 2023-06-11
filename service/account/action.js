import {
  SET_LOADED_PROFILE,
  SIGNUP_SUCCESS,
  SIGNUP_SUCCESS_DELETE,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_SUCCESS,
  AUTH_ERROR_RESET,
  REGISTER_AUTH_USER,
  FETCH_ACCOUNT_SETTINGS,
  RESETPASSWORD_FAIL,
  RESETPASSWORD_SUCCESS,
  INIT_ACCOUNT_PROFILE,
  INIT_INVALID_TIME,
  INIT_VALID_TIME,
  INIT_ACCOUNT_REVIEWS,
  INIT_LOAD_VALID_TIME,
  INITUSERLOGINCHANGE,
  FETCH_REPAIR_DEVICES,
  SET_GUARANTEE_DEVICE,
  SET_BRAND_MODEL,
  FETCH_SHOP_MODEL_GUARANTEE,
  SET_LOAD_PBM,
  SET_SEELCT_SHOP_GUARANTEE,
  SET_CREATED_GUARANTEE,
  SET_DELETED_GUARANTEE,
  UPDATE_SCHEDULE_TIME,
  HANDLE_CHECK_TIME,
  SET_SUCESS_DATA,
  CHECK_AUTHENTICATION,
  SHOP_ACCOUNT_PROFILE,
} from "./types";

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS,
});

export const signupSuccessDelete = () => ({
  type: SIGNUP_SUCCESS_DELETE,
});

export const signupFail = (data) => ({
  type: SIGNUP_FAIL,
  payload: data,
});

export const loginFail = () => ({
  type: LOGIN_FAIL,
});

export const authenticated = (data) => ({
  type: CHECK_AUTHENTICATION,
  payload: data,
});

export const resetPasswordFail = (data) => ({
  payload: data,
  type: RESETPASSWORD_FAIL,
});

export const resetPasswordSuccess = (data) => ({
  payload: data,
  type: RESETPASSWORD_SUCCESS,
});

export const logoutA = () => ({
  type: LOGOUT,
});

export const initUserLoginChange = (data) => ({
  payload: data,
  type: INITUSERLOGINCHANGE,
});

export const resetAuthError = () => ({
  type: AUTH_ERROR_RESET,
});

export const registerAuthToken = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const registerAuthUser = (data) => ({
  type: REGISTER_AUTH_USER,
  payload: data,
});

export const fetchAccountSettings = (data) => ({
  type: FETCH_ACCOUNT_SETTINGS,
  payload: data,
});

export const fetchRepairDevices = (data) => ({
  type: FETCH_REPAIR_DEVICES,
  payload: data,
});

export const initAccountProfile = (data) => ({
  type: INIT_ACCOUNT_PROFILE,
  payload: data[0],
});

export const initShopAccountProfile = (data) => ({
  type: SHOP_ACCOUNT_PROFILE,
  payload: data[0],
});

export const initAccountValidTime = (data) => ({
  type: INIT_VALID_TIME,
  payload: data,
});

export const initAccountInvalidTime = (data) => ({
  type: INIT_INVALID_TIME,
  payload: data,
});

export const initAccountReviews = (data) => ({
  type: INIT_ACCOUNT_REVIEWS,
  payload: data,
});

export const initLoadValidTime = () => ({
  type: INIT_LOAD_VALID_TIME,
});

export const setLoadedProfile = (data) => ({
  type: SET_LOADED_PROFILE,
  payload: data,
});

export const setGuaranteeDevice = (device) => ({
  type: SET_GUARANTEE_DEVICE,
  payload: device,
});

export const setBrandModel = (id, models) => ({
  type: SET_BRAND_MODEL,
  payload: { id, models },
});

export const fetchShopModelGuarantee = (data) => ({
  type: FETCH_SHOP_MODEL_GUARANTEE,
  payload: data,
});

export const setLoadPBM = (data) => ({
  type: SET_LOAD_PBM,
  payload: data,
});

export const setSelectShopGuarantee = (data) => ({
  type: SET_SEELCT_SHOP_GUARANTEE,
  payload: data,
});

export const setCreatedGuarantee = (data) => ({
  type: SET_CREATED_GUARANTEE,
  payload: data,
});

export const setDeletedGuarantee = (data) => ({
  type: SET_DELETED_GUARANTEE,
  payload: data,
});

export const setUpdateScheduleTime = (data) => ({
  type: UPDATE_SCHEDULE_TIME,
  payload: data,
});

export const setSuccessData = (data) => ({
  type: SET_SUCESS_DATA,
  payload: data,
});
