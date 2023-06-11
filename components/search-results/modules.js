import { notification } from "antd";
import router from "next/router";
import querystring from "querystring";

import { API_PATH } from "@/constants";
import dataFetcher, { keyedDataFetcher } from "@/modules/dataFetcher";
import { createFormModule } from "@/modules/forms";
import { createListModule } from "@/modules/list";
import { createModalModule } from "@/modules/modal";
import api from "@/utils/api";

import { getLongAndLat } from "../common/GooglePlaces";

//

export async function prepareData({ location, ...data }) {
  let parsedData = { lat: 0, long: 0, ...data };
  try {
    const locationMetadata = await getLongAndLat(location);

    parsedData = {
      ...parsedData,
      ...locationMetadata,
      location,
    };
  } catch (err) {}

  return parsedData;
}

export const filtersFormModule = createFormModule({
  guid: "shops",
  async init(query = {}) {
    return {
      location: query.zip || query.location || "",
      device: query.device || "0",
      brand: query.brand || "0",
      model: query.model || "0",
      service: query.service || "0",
      distance: query.distance || "5",
      guarantee: query.guarantee || "-1",
      price: query.price || "-1",
      sort: parseInt(query.sort) || 0,
      long: query.long || 0,
      shop_type: 0,
      lat: query.lat || 0,
      limit: 100,
    };
  },
});

export const shopListModule = createListModule({
  guid: "shops",
  async fetchData(query = {}) {
    const params = await prepareData(query);
    if (typeof window !== "undefined") {
      const nextURL = `${router.pathname}?${querystring.stringify(params)}`;
      router.router.replace(nextURL, nextURL, { shallow: true });
    }
    try {
      let data = await api.get(`${API_PATH.SEARCH}/`, {
        ...params,
        brand: parseInt(params.brand),
        service: parseInt(params.service),
        model: parseInt(params.model),
        phone: parseInt(params.device),
        reparation: parseInt(params.service),
        distance: parseInt(params.distance),
        price: parseInt(params.price),
        guarantee: parseInt(params.guarantee),
        sort: params.sort,
      });

      let shopDevices = await api.post(`${API_PATH.SHOP_DEVICES}/`, {
        shops: data.map((item) => item.shop.id).join(","),
      });
      data = data.map((item) => {
        item.devices = [];
        for (let device of shopDevices) {
          if (device.shop_id === item.shop.id) {
            item.devices.push(device);
          }
        }
        return item;
      });

      api
        .post(`${API_PATH.NEXT_SLOTS}/`, {
          shops: data.map((item) => item.shop.id).join(","),
        })
        .then((slots) => {
          const items = shopListModule.state.items;
          const refreshed = Object.keys(items).reduce((accumulator, key) => {
            accumulator[key] = items[key].map((item) => {
              const slot = slots.find(
                (s) => `${s.shop_id}` === `${item.shop.id}`
              );
              if (slot) {
                return {
                  ...item,
                  ...slot,
                };
              }

              return item;
            });
            return accumulator;
          }, {});

          shopListModule.actions.refreshItems(refreshed);
        });

      return {
        items: data,
      };
    } catch (err) {
      notification.error({
        message:
          "We hebben geen resultaten gevonden, heb je je locatie en apparaat ingevuld?",
      });

      return { items: [] };
    }
  },
  getInitialQuery() {
    return filtersFormModule.state?.values;
  },
});

export const deviceFetcher = dataFetcher({
  selectors: ["shops", "devices"],
  fetchData() {
    return api.get(`${API_PATH.GETDEVICES}/`);
  },
});

export const brandFetcher = keyedDataFetcher({
  selectors: ["shops", "brands"],
  fetchData([_1, _2, deviceId]) {
    return api.get(`${API_PATH.GETBRANDS}/?device=${deviceId}`);
  },
});

export const modelFetcher = keyedDataFetcher({
  selectors: ["shops", "models", () => filtersFormModule.state.values.device],
  fetchData([_1, _2, deviceId, bandId]) {
    return api.get(`${API_PATH.GETMODELS}/?device=${deviceId}&brand=${bandId}`);
  },
});

export const serviceFetcher = keyedDataFetcher({
  selectors: ["shops", "services", () => filtersFormModule.state.values.device],
  fetchData([_1, _2, device, model]) {
    return api.get(`${API_PATH.GETREPARATIONS}/`, { device, model });
  },
});

export const refineSearchModal = createModalModule();
