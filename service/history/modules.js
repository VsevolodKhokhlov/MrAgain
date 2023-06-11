import { notification } from "antd";

import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import { createListModule } from "@/modules/list";
import { createModalModule } from "@/modules/modal";
import { privateApi } from "@/utils/api";

export const currentUser = dataFetcher({
  selectors: ["currentUser"],
  fetchData() {
    return privateApi.get(`${API_PATH.GETAUTHUSER}/`);
  },
});

export const reparationsList = createListModule({
  guid: "shop-reprations",
  async fetchData(query = {}) {
    const shopId = currentUser.selector(store.ref.getState())?.result
      ?.account_id;

    try {
      const data = await privateApi.get(
        `${API_PATH.GETAPPOINTMENTS}/${shopId}/`,
        query
      );
      return {
        items: data,
      };
    } catch (err) {
      notification.error({
        message:
          "Er gaat iets fout, neem contact met ons op als het zich blijft voordoen",
      });

      return { items: [] };
    }
  },
});

export const historyFetcher = dataFetcher({
  selectors: [],
  async fetchData() {
    const shopId = currentUser.selector(store.ref.getState())?.result
      ?.account_id;
    const data = await privateApi.get(`${API_PATH.GETAPPOINTMENTS}/${shopId}/`);
    return data.map(({ item }) => item);
  },
});

export const viewRecordModal = createModalModule();
