import { notification } from "antd";
import router from "next/router";

import { API_PATH } from "@/constants";
import dataFetcher, { keyedDataFetcher } from "@/modules/dataFetcher";
import { createListModule } from "@/modules/list";
import { createModalModule } from "@/modules/modal";
import api from "@/utils/api";
const { createFormModule } = require("@/modules/forms");

export const filtersFormModule = createFormModule({
  guid: "shop-services",
  async init(shopId) {
    const fromAddressBar = router.router.query;

    return {
      device: fromAddressBar.device || "0",
      brand: fromAddressBar.brand || "0",
      model: fromAddressBar.model || "0",
      shop: shopId,
    };
  },

  submit(data) {
    return shopServicesListModule.actions.updateQuery(data);
  },
});

export const serviceFormModule = createFormModule({
  guid: "shop-selectedService",
  async init() {
    return {
      service: null,
      services: {},
    };
  },
});

export const shopServicesListModule = createListModule({
  guid: "shop-services",
  async fetchData(query = {}) {
    try {
      const data = await api.get(
        `${API_PATH.GETSHOPREPARATIONDETAILS}/`,
        query
      );
      const sorted = [...data].sort((item1, item2) => {
        if (
          item2.guarantee_time === 0 &&
          item2.price === 0 &&
          item2.reparation_time === "0"
        ) {
          return -1;
        }

        return 0;
      });

      return {
        items: sorted,
      };
    } catch (err) {
      notification.error({
        message:
          "Er gaat iets fout, neem contact met ons op als dit probleem zich blijft voordoen",
      });

      return { items: [] };
    }
  },
  getInitialQuery() {
    return filtersFormModule.state?.values;
  },
});

export const nextSlotFetcher = keyedDataFetcher({
  selectors: ["shops", "nextSlot"],
  async fetchData([_1, _2, shopId]) {
    return api
      .post(`${API_PATH.NEXT_SLOTS}/`, { shops: shopId })
      .then((data) => data[0]);
  },
});

export const reviewsFetcher = keyedDataFetcher({
  selectors: ["shops", "reviews"],
  async fetchData([_1, _2, shopId]) {
    return api.get(`${API_PATH.GETREVIEWS}/${shopId}/`);
  },
});

export const deviceFetcher = dataFetcher({
  selectors: ["shops", "devices", () => filtersFormModule.state.values.shop],
  async fetchData([_1, _2, shopId]) {
    const data = await api.get(`${API_PATH.GETSHOPDEVICES}/`, { shop: shopId });
    return data.map(({ device }) => device);
  },
});

export const brandFetcher = keyedDataFetcher({
  selectors: ["shops", "brands", () => filtersFormModule.state.values.shop],
  async fetchData([_1, _2, shop, deviceId]) {
    const data = await api.get(`${API_PATH.GETDEVICEBRANDS}/?`, {
      device: deviceId,
      shop,
    });
    return data.map(({ brand }) => brand);
  },
});

export const modelFetcher = keyedDataFetcher({
  selectors: [
    "shops",
    "models",
    () => filtersFormModule.state.values.shop,
    () => filtersFormModule.state.values.device,
  ],
  async fetchData([_1, _2, shop, deviceId, brandId]) {
    const data = await api.get(`${API_PATH.GETBRANDMODELS}/`, {
      device: deviceId,
      shop,
      brand: brandId,
    });
    return data.map(({ model }) => model);
  },
});

export const openTimeFetcher = dataFetcher({
  selectors: ["shops", "open-time", () => filtersFormModule.state.values.shop],
  async fetchData([_1, _2, shop]) {
    const response = await api.get(`${API_PATH.GETVALIDOPENTIME}/${shop}/`);
    try {
      return JSON.parse(response?.[0]?.valid_day_time || "");
    } catch (err) {
      return null;
    }
  },
});

export const reviewsModal = createModalModule();
export const shopInfo = createModalModule();
export const continueWitoutServiceModal = createModalModule();
export const whatsAppModal = createModalModule();
