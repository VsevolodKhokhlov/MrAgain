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
  GET_REPARATION_DETAILS,
  UPDATE_REPARATION_LOADING,
  SAVE_REPARATION_LOADING,
  GET_PAGES,
  GET_PAGE_DETAILS,
} from "./types";

const initial_state = {
  isFindOut: true,
  list: [],
  newestShopList: [],
  error: {},
  location: {},
  fieldlistPBM: [],
  fieldlistRPG: [],
  modelServices: [],
  devices: [],
  deviceBrands: [],
  brandModels: [],
  isLoadService: false,
  isSearchFilter: false,
  searchFilters: {
    location: null,
    device: null,
    brand: null,
    model: null,
    reparation: null,
  },
  isLoadFilter: false,
  shopDevices: [],
  updateReparationLoading: false,
  saveReparationLoading: false,
  listOfPages: [],
  pageDetails: [],
};

const searchReducer = (state = initial_state, action) => {
  switch (action.type) {
    case IS_FIND_OUT: {
      return {
        ...state,
        isFindOut: action.payload,
      };
    }
    case SET_LOAD_FILTER: {
      return {
        ...state,
        isLoadFilter: action.payload,
      };
    }
    case SET_SEARCH_FILTER: {
      return {
        ...state,
        isSearchFilter: action.payload.isSearchFilter,
        searchFilters: action.payload.filters,
      };
    }
    case RESET_SHOP_FILTER_LIST: {
      return {
        ...state,
        list: [],
      };
    }
    case SET_FIND_LOCATION: {
      return {
        ...state,
        location: action.payload,
      };
    }
    case SET_LOAD_SERVICE: {
      return {
        ...state,
        isLoadService: action.payload,
      };
    }
    case FETCH_MODEL_SERVICES: {
      let arr = [];
      action.payload.forEach((element) => {
        arr.push({
          key: element.reparation.id,
          price: `€${element.price}`,
          guarantee: element.guarantee_time,
          service: element.reparation.reparation_name,
        });
      });
      return {
        ...state,
        modelServices: arr,
        isLoadService: true,
      };
    }
    case FETCH_SHOP_LIST: {
      return {
        ...state,
        list: action.payload,
      };
    }
    case FETCH_NEWESTSHOP_LIST: {
      return {
        ...state,
        newestShopList: action.payload,
      };
    }
    case FETCH_SHOP_FILTER_LIST: {
      let shop;
      let shoplist = [];
      let temp = action.payload;
      temp.forEach((element) => {
        shop = {
          id: element.shop.id,
          name: element.shop.name,
          distance: element.shop.distance,
          price: element.price,
          mark: element.shop.mark,
          gua_time: element.guarantee_time,
          bg_photo: element.shop.bg_photo,
          logo_photo: element.shop.logo_photo,
          city: element.shop.city,
          street: element.shop.street,
          geo_lat: element.shop.geo_lat,
          geo_long: element.shop.geo_long,
        };
        shoplist.push(shop);
      });
      return {
        ...state,
        list: shoplist,
      };
    }
    case FETCH_FILTER_PBM_LIST: {
      // let fields = state.fieldlistPBM;
      let fields = [];
      let recvFields = action.payload;
      let devDest, isExist, brandSrc, brandDst, modelSrc;
      if (!Array.isArray(recvFields)) {
        return state;
      }
      recvFields.forEach((el1) => {
        devDest = el1["brand"]["device"];
        isExist = [];

        if (el1["brand"].is_deleted === true) {
          return;
        }

        if (fields.length > 0) {
          isExist = fields.filter(
            (el2) => el2["device_name"] === devDest["device_name"]
          );
        }
        if (isExist.length === 0 && devDest.is_deleted === false) {
          fields = [...fields, devDest];
        }
        fields.forEach((el3) => {
          if (el3["brand"] === undefined) {
            el3["brand"] = [];
          }
          isExist = [];
          brandSrc = el3["brand"];
          brandDst = el1["brand"];
          if (brandSrc.length > 0) {
            if (el3["id"] === brandDst["device"]["id"]) {
              isExist = brandSrc.filter(
                (el2) => el2["brand_name"] === brandDst["brand_name"]
              );
            } else {
              isExist = ["exist"];
            }
          }
          if (isExist.length === 0 && brandDst["is_deleted"] === false) {
            brandSrc = [
              ...brandSrc,
              {
                id: brandDst["id"],
                brand_name: brandDst["brand_name"],
              },
            ];
            el3["brand"] = brandSrc;
          }
          el3["brand"].forEach((el4) => {
            if (el4["model"] === undefined) {
              el4["model"] = [];
            }
            isExist = [];
            modelSrc = el4["model"];
            if (modelSrc.length > 0) {
              if (el4["id"] === el1["brand_id"]) {
                isExist = modelSrc.filter(
                  (el2) => el2["model_name"] === el1["model_name"]
                );
              } else {
                isExist = ["exist"];
              }
            }
            if (isExist.length === 0 && el1["is_deleted"] === false) {
              modelSrc = [
                ...modelSrc,
                {
                  id: el1["id"],
                  model_name: el1["model_name"],
                },
              ];
              el4["model"] = modelSrc;
            }
          });
        });
      });
      return {
        ...state,
        fieldlistPBM: fields,
        isLoadFilter: true,
      };
    }
    case FETCH_FILTER_RPG_LIST: {
      let fields = [];
      let recvFields = action.payload || [];
      if (!Array.isArray(recvFields)) {
        return state;
      }
      recvFields.forEach((el) => {
        fields.push({
          price: el.price,
          guar_time: el.guarantee_time,
          reparation: {
            id: el["reparation"].id,
            name: el["reparation"].reparation_name,
          },
        });
      });

      return {
        ...state,
        fieldlistRPG: fields,
      };
    }
    case GET_SHOP_DEVICES: {
      return {
        ...state,
        shopDevices: action.payload,
      };
    }
    case SET_DEVICES: {
      return {
        ...state,
        devices: action.payload,
      };
    }
    case SET_DEVICE_BRANDS: {
      return {
        ...state,
        deviceBrands: action.payload,
      };
    }

    case SET_BRAND_MODELS: {
      return {
        ...state,
        brandModels: action.payload,
        isLoadFilter: true,
      };
    }
    case UPDATE_REPARATION_LOADING: {
      return {
        ...state,
        updateReparationLoading: action.payload,
      };
    }
    case SAVE_REPARATION_LOADING: {
      return {
        ...state,
        saveReparationLoading: action.payload,
      };
    }
    case GET_PAGES: {
      return {
        ...state,
        listOfPages: action.payload,
      };
    }
    case GET_PAGE_DETAILS: {
      console.log(action.payload);
      return {
        ...state,
        pageDetails: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default searchReducer;
