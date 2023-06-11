import {
  SIGNUP_SUCCESS,
  SIGNUP_SUCCESS_DELETE,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  AUTH_ERROR_RESET,
  LOGIN_FAIL,
  RESETPASSWORD_FAIL,
  RESETPASSWORD_SUCCESS,
  REGISTER_AUTH_USER,
  FETCH_ACCOUNT_SETTINGS,
  INIT_ACCOUNT_PROFILE,
  INIT_VALID_TIME,
  INIT_INVALID_TIME,
  FETCH_REPAIR_DEVICES,
  LOGOUT,
  SET_LOADED_PROFILE,
  SET_GUARANTEE_DEVICE,
  SET_BRAND_MODEL,
  INIT_ACCOUNT_REVIEWS,
  FETCH_SHOP_MODEL_GUARANTEE,
  SET_LOAD_PBM,
  SET_SEELCT_SHOP_GUARANTEE,
  INIT_LOAD_VALID_TIME,
  INITUSERLOGINCHANGE,
  SET_CREATED_GUARANTEE,
  SET_DELETED_GUARANTEE,
  UPDATE_SCHEDULE_TIME,
  SET_SUCESS_DATA,
  CHECK_AUTHENTICATION,
  SHOP_ACCOUNT_PROFILE,
} from "./types";

const initial_state = {
  isSignUp: false,
  isLogged: null,
  isAuth_Error: false,
  user_login_change: false,
  auth_token: "",
  auth_user: {},
  auth_error: null,
  account_settings: {},
  account_profile: {},
  shop_account_profile: {},
  account_valid_time: {},
  account_valid_time_id: null,
  account_invalid_time: {},
  account_review: {},
  account_invalid_time_id: null,
  repair_devices: [],
  isLoadedProfile: false,
  isLoadValidTime: false,
  loadPBM: false,
  newGuarantees: {
    device_id: null,
    brand: [],
  },
  deleteGuarantees: [],
  shopModelGuarantee: [],
  selectedShopGuarantee: [],
  reparationData: [],
  isCreatedGuarantee: true,
  isDeletedGuarantee: true,
  isUpdateScheduleTimeLoading: true,
  isHandleInvalidTimeLoading: true,
  isGettingModals: null,
  isRedirect: null,
  isAuthenticated: null,
};

const accountReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS: {
      return {
        ...state,
        auth_token: action.payload,
        isSignUp: true,
      };
    }
    case SIGNUP_SUCCESS_DELETE: {
      return {
        ...state,
        isSignUp: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        auth_token: action.payload,
        isLogged: true,
      };
    }
    case INITUSERLOGINCHANGE: {
      return {
        ...state,
        user_login_change: action.payload,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("auth-user");
      return {
        ...state,
        auth_user: {},
        isLogged: false,
        isSignUp: false,
        account_settings: {},
        account_profile: {},
        account_valid_time: {},
        account_invalid_time: {},
        account_valid_time_id: null,
        account_invalid_time_id: null,
        user_login_change: true,
        newGuarantees: {
          device_id: null,
          brand: [],
        },
        deleteGuarantees: [],
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        auth_error: "Er gaat iets mis, kloppen je emailadres en wachtwoord?",
      };
    }
    case CHECK_AUTHENTICATION: {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }
    case SIGNUP_FAIL: {
      return {
        ...state,
        isAuth_Error: true,
        auth_error: action.payload,
      };
    }
    case RESETPASSWORD_FAIL: {
      return {
        ...state,
        auth_error: action.payload.error,
      };
    }
    case RESETPASSWORD_SUCCESS: {
      return {
        ...state,
        auth_error: "Je wachtwoord is gewijzgid",
      };
    }
    case AUTH_ERROR_RESET: {
      return {
        ...state,
        auth_error: null,
        isAuth_Error: false,
      };
    }
    case REGISTER_AUTH_USER: {
      return {
        ...state,
        auth_user: action.payload,
        isLogged: true,
      };
    }
    case FETCH_ACCOUNT_SETTINGS: {
      return {
        ...state,
        account_settings: action.payload,
      };
    }
    case INIT_ACCOUNT_PROFILE: {
      return {
        ...state,
        account_profile: action.payload,
      };
    }
    case SHOP_ACCOUNT_PROFILE: {
      return {
        ...state,
        shop_account_profile: action.payload,
      };
    }
    case SET_LOADED_PROFILE: {
      return {
        ...state,
        isLoadedProfile: action.payload,
      };
    }
    case SET_GUARANTEE_DEVICE: {
      console.log("newguarantee......................", action.payload);
      let new_guar = {
        device_id: action.payload,
        brand: [],
      };
      return {
        ...state,
        newGuarantees: new_guar,
        deleteGuarantees: [],
      };
    }
    case SET_BRAND_MODEL: {
      let new_guar = state.newGuarantees;
      let del_guar = state.deleteGuarantees;

      let tmp_brand = new_guar.brand.filter(
        (el) => el.brand_id === action.payload.id
      );

      let tmpGuarList = state.shopModelGuarantee.filter(
        (el) => el.brand_id === action.payload.id
      );
      if (tmpGuarList.length > 0) {
        let flgExist = false;
        tmpGuarList.map((e1) => {
          flgExist = false;
          action.payload.models.map((e2) => {
            if (e1.model_id === e2) {
              flgExist = true;
            }
            return true;
          });
          if (flgExist === false) {
            let _istmp = del_guar.filter(
              (e3) =>
                e3.device_id === new_guar.device_id &&
                e3.brand_id === action.payload.id &&
                e3.model_id === e1.model_id
            );
            if (_istmp.length < 1) {
              del_guar.push({
                device_id: new_guar.device_id,
                brand_id: action.payload.id,
                model_id: e1.model_id,
              });
            }
          }
          return true;
        });
      }

      if (tmp_brand.length > 0) {
        tmp_brand = tmp_brand[0];
        tmp_brand.models = action.payload.models;
        let index = new_guar.brand.findIndex(
          (x) => x.brand_id === tmp_brand.brand_id
        );
        new_guar.brand[index] = tmp_brand;
      } else {
        tmp_brand = {
          brand_id: action.payload.id,
          models: action.payload.models,
        };
        new_guar.brand.push(tmp_brand);
      }

      return {
        ...state,
        newGuarantees: new_guar,
        deleteGuarantees: del_guar,
      };
    }
    case SET_LOAD_PBM: {
      return {
        ...state,
        loadPBM: action.payload,
      };
    }
    case SET_SEELCT_SHOP_GUARANTEE: {
      return {
        ...state,
        selectedShopGuarantee: action.payload,
      };
    }
    case INIT_LOAD_VALID_TIME: {
      return {
        ...state,
        isLoadValidTime: false,
      };
    }
    case INIT_VALID_TIME: {
      return {
        ...state,
        account_valid_time_id: action.payload[0].id,
        account_valid_time: action.payload[0].valid_day_time,
        isLoadValidTime: true,
      };
    }
    case INIT_ACCOUNT_REVIEWS: {
      return {
        ...state,
        account_review: action.payload,
      };
    }
    case INIT_INVALID_TIME: {
      return {
        ...state,
        account_invalid_time_id: action.payload[0].id,
        account_invalid_time: action.payload[0].invalid_day_time,
      };
    }
    case FETCH_REPAIR_DEVICES: {
      let arr = action.payload.filter((el) => el.is_deleted === false);
      return {
        ...state,
        repair_devices: arr,
      };
    }
    case FETCH_SHOP_MODEL_GUARANTEE: {
      console.log("--------------- 295 --------------");
      console.log(action.payload);
      return {
        ...state,
        shopModelGuarantee: action.payload,
        loadPBM: true,
      };
    }
    case SET_CREATED_GUARANTEE: {
      console.log("isCreatedGuarantee...................", action.payload);
      return {
        ...state,
        isCreatedGuarantee: action.payload,
      };
    }
    case SET_DELETED_GUARANTEE: {
      console.log("isDeletedGuarantee...................", action.payload);
      return {
        ...state,
        isDeletedGuarantee: action.payload,
      };
    }
    case UPDATE_SCHEDULE_TIME: {
      console.log("updateScheduleTime...................", action.payload);
      return {
        ...state,
        isUpdateScheduleTimeLoading: action.payload,
      };
    }

    case SET_SUCESS_DATA: {
      return {
        ...state,
        isGettingModals: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default accountReducer;
