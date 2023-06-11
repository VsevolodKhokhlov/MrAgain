import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import { createFormModule } from "@/modules/forms";
import { privateApi } from "@/utils/api";
import { notification } from "antd";


export const currentUser = dataFetcher({
  selectors: ["currentUser"],
  fetchData() {
    return privateApi.get(`${API_PATH.GETAUTHUSER}/`);
  },
});

export const getDevices = dataFetcher({
  selectors: [""],
  fetchData() {
    return privateApi.get(`${API_PATH.GETDEVICES}/`);
  },
});

export const getBrands = dataFetcher({
  selectors: [""],
  fetchData() {
    return privateApi.get(`${API_PATH.GETACTIVEBRANDS}/`);
  },
});

export const getReparations = dataFetcher({
  selectors: [""],
  fetchData() {
    return privateApi.get(`${API_PATH.GETREPARATIONS}/`, {
      device: 2,
      model: 2,
    });
  },
});

export const getPurchases = dataFetcher({
  selectors: [""],
  fetchData() {
    return privateApi.get(`${API_PATH.GETPURCAHSES}/`);
  },
});

export const shopInfoFetcher = dataFetcher({
  selectors: [],
  async fetchData() {
    const shopId = currentUser.selector(store.ref.getState())?.result
      ?.account_id;
    const data = await privateApi.get(
      `${API_PATH.GETSHOPGENERALINFO}/${shopId}`
    );
    return data;
  },
});

export const getShopNonWorkingDays = dataFetcher({
  selectors: [],
  async fetchData() {
    const shopId = currentUser.selector(store.ref.getState())?.result
      ?.account_id;
    const data = await privateApi.get(`${API_PATH.GETINVALIDTIME}/${shopId}/`);
    return data;
  },
});

export const saveShopNonWorkingDays = (data) => {
  const shopId = currentUser.selector(store.ref.getState())?.result?.account_id;
  const promise = privateApi.post(
    `${API_PATH.SAVEINVALIDTIME}/${shopId}`,
    data
  );

  notification.success({
    message: "Succesvol opgeslagen",
  });

  return promise;
};

export const shopManagementGeneralInfo = dataFetcher({
  selectors: [],
  async fetchData() {
    const id = currentUser.selector(store.ref.getState())?.result?.account_id;
    const data = await privateApi.get(`${API_PATH.ACCOUNTSETTING}/${id}`);
    return data;
  },
});

export const getValidOpenTime = dataFetcher({
  selectors: [],
  async fetchData() {
    const id = currentUser.selector(store.ref.getState())?.result?.account_id;
    const data = await privateApi.get(`${API_PATH.GETVALIDOPENTIME}/${id}/`);
    return data;
  },
});

export const saveValidOpenTime = async (payload) => {
  const id = currentUser.selector(store.ref.getState())?.result?.account_id;
  const data = await privateApi.put(`${API_PATH.UPDATEVALIDOPENTIME}/${id}/`, {
    id: id,
    shop: id,
    valid_day_time: payload,
  });
  return data;
};

export const deleteNonRegularHours = async (id) => {
  const shopId = currentUser.selector(store.ref.getState())?.result?.account_id;
  const data = await privateApi.post(
    `${API_PATH.DELETEINVALIDTIME}/${shopId}/`,
    {
      id,
    }
  );
  return data;
};

export const shopManagementGeneralForm = createFormModule({
  guid: "saveGeneralInfo",
  async init() {
    const id = currentUser.selector(store.ref.getState())?.result?.account_id;
    const fetchedData = await privateApi.get(
      `${API_PATH.ACCOUNTSETTING}/${id}`
    );
    return {
      about_us: fetchedData.about_us || "",
      phone_number: fetchedData.phone_number || "",
      site_url: fetchedData.site_url || "",
      whatsapp_number: fetchedData.whatsapp_number || "",
    };
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.account_id;
    const promise = privateApi.patch(`${API_PATH.ACCOUNTSETTING}/${shop}/`, {
      about_us: data.about_us,
      phone_number: data.phone_number,
      site_url: data.site_url,
      whatsapp_number: data.whatsapp_number,
      shop,
    });

    if (promise) {
      notification.success({
        message: "Je wijzigingen zijn succesvol opgeslagen",
      });
    }
    return promise;
  },
});

export const shopManagementAdditionalForm = createFormModule({
  guid: "saveAdditionalInfo",
  async init(shopId) {
    const shopInfoData = await privateApi.get(
      `${API_PATH.GETSHOPGENERALINFO}/${shopId}/`
    );

    if (shopInfoData.length !== 0) {
      return {
        devices: shopInfoData[0].replacementDevices || [],
        brands: shopInfoData[0].cateredBrand?.map((id) => id.toString()) || [],
        cateredBrand: shopInfoData[0].cateredBrand?.map((id) => id.toString()) || [],
        payMethod: shopInfoData[0].paymentMethod || [],
        purchases:
          shopInfoData[0]?.ShopPurchase?.map((id) => id.toString()) || [],
        temporaryReplacement: !!shopInfoData[0].temporaryReplacement,
        waitingArea: shopInfoData[0].waitingArea,
        reparationOption:
          shopInfoData[0]?.reparationOption?.map((id) => id.toString()) || [],
        services: shopInfoData[0]?.services || [],
        parkingArea: shopInfoData[0]?.parkingArea || [],
        insurance: shopInfoData[0]?.insurance,
      };
    }

    return {};
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.account_id;
    const promise = privateApi.put(
      `${API_PATH.UPDATESHOPGENERALINFO}/${shop}/`,
      {
        payMethod: data.payMethod.map((id) => +id),
        repairOption: data.reparationOption.map((id) => +id),
        services: "",
        waitingArea: data.waitingArea ? 1 : 0,
        temporaryReplacement: data.temporaryReplacement ? 1 : 0,
        parkingArea: data?.parkingArea?.map((id) => +id),
        insurance: data?.insurance,
        devices: data.devices.map((id) => +id),
        brands: data.brands.map((id) => +id),
        cateredBrand: data.brands.map((id) => +id),
        purchases: data.purchases.map((b) => parseInt(b)),
      }
    );

    if (promise) {
      notification.success({
        message: "Je gegevens zijn opgeslagen",
      });
    }

    return promise;
  },
});
