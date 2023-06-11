import { notification } from "antd";

import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import { createModalModule } from "@/modules/modal";
import { privateApi } from "@/utils/api";

export const currentUser = dataFetcher({
  selectors: ["currentUser"],
  fetchData() {
    return privateApi.get(`${API_PATH.GETAUTHUSER}/`);
  },
});

export const getAllModels = dataFetcher({
  selectors: [],
  fetchData() {
    return privateApi.get(`${API_PATH.GETFILTERFIELDS}/`);
  },
});

export const getRepairDevices = dataFetcher({
  selectors: [],
  fetchData() {
    return privateApi.get(`${API_PATH.REPAIRDEVICES}/`);
  },
});

export const getRepairBrandModel = dataFetcher({
  selectors: [],
  fetchData() {
    const shopId = currentUser.selector(store.ref.getState())?.result
      ?.account_id;
    return privateApi.get(
      `${API_PATH.REPAIRBRANDMODEL}/${shopId}/?shop=${shopId}&device=1`
    );
  },
});

export const shopInfoFetcher = dataFetcher({
  selectors: [],
  async fetchData() {
    const shopName = currentUser.selector(store.ref.getState())?.result?.name;
    const data = await privateApi.get(`${API_PATH.REPAIRDEVICES}/`);
    return data;
  },
});

export const getShopReparations = dataFetcher({
  selectors: [],
  async fetchData() {
    const shopId = currentUser.selector(store.ref.getState())?.result.account_id
      ?.account_id;
    const data = await privateApi.get(
      `${API_PATH.GETSHOPREPAIRATION}/?shop=${shopId}&device=1&model=34&brand=2`
    );
    return data;
  },
});

export const saveModelReparations = dataFetcher({
  selectors: [],
  async fetchData(selectors, data) {
    const shopId = currentUser.selector(store.ref.getState())?.result
      .account_id;
    const fetchedData = await privateApi.get(
      `${API_PATH.GETSHOPREPAIRATION}/?shop=${shopId}&device=${data.deviceId}&model=${data.modelId}&brand=${data.brandId}`
    );
    return fetchedData;
  },
});

export const saveSelectedModels = async (payload) => {
  console.log("PYLD", payload);
  const shopId = currentUser.selector(store.ref.getState())?.result?.account_id;
  const data = await privateApi.post(`${API_PATH.GUARANTEEMODELS}/`, {
    payload,
    shop_id: shopId,
  });
  editRepairModelModal.actions.close();
  notification.success({
    message: "Succesvol opgeslagen",
  });
  return data;
};

export const saveShopReparations = async (payload) => {
  const shopId = currentUser.selector(store.ref.getState())?.result?.account_id;
  const data = await privateApi.put(`${API_PATH.SHOPGUARANTEE}/`, {
    payload: payload,
    shop_id: shopId,
  });
  editRepairModelModal.actions.close();
  notification.success({
    message: "Succesvol opgeslagen",
  });
  return data;
};

export const editRepairModelModal = createModalModule();
