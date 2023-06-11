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

export const getBasicSettings = dataFetcher({
  selectors: [],
  fetchData() {
    return privateApi.get(`${API_PATH.REPAIRDEVICES}/`);
  },
});

export const basicSettingsForm = createFormModule({
  guid: "saveGeneralInfo",
  async init(id) {
    const fetchedData = await privateApi.get(
      `${API_PATH.ACCOUNTSETTING}/${id}`
    );
    return {
      address: fetchedData.address || "",
      allow_appointment: fetchedData.allow_appointment || false,
      city: fetchedData.city || "",
      country: fetchedData.country || "",
      phone_number: fetchedData.phone_number || "",
      btw: fetchedData.btw || "",
      email: fetchedData.email || "",
      iban: fetchedData.iban || "",
      kvk: fetchedData.kvk || "",
      name: fetchedData.name || "",
      ptype: fetchedData.ptype || 0,
      shop_active: fetchedData.shop_active || false,
      shop_type: fetchedData.shop_type ? fetchedData?.shop_type?.toString() : "1,2",
      site_url: fetchedData.site_url || "",
      status_app_email: fetchedData.status_app_email || false,
      street: fetchedData.street || "",
      zipcode: fetchedData.zipcode || "",
      intervals: fetchedData.intervals || 30,
      st_number: fetchedData.st_number || "",
    };
  },
  submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.account_id;
    const auth = currentUser.selector(store.ref.getState())?.result?.id;


    const promise = privateApi.patch(`${API_PATH.ACCOUNTSETTING}/${auth}/`, {
      ...data,
      double_appointment: true,
      shop,
      auth,
      shop_type: data.shop_type == "1,2" ? [1, 2] : [parseInt(data.shop_type),]
    });

    if (promise) {
      notification.success({
        message: "Je gegevens zijn succesvol opgeslagen",
      });
    }

    return promise;
  },
});

export const changePasswordForm = createFormModule({
  guid: "changePassword",
  async init() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  },
  async submit(data) {
    const shop = currentUser.selector(store.ref.getState())?.result?.account_id;
    const id = currentUser.selector(store.ref.getState())?.result?.id;

    const promise = privateApi.put(`${API_PATH.RESETPASSWORDCONFIRM}/`, {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
      shop,
    });

    promise.then((response) => {
      notification.success({
        message: "Je wachtwoord is gewijzigd",
      });
    }).catch((res) => {
      for (let message of res.errors) {
        notification.error({
          message: message,
        });
      }
    })
    return promise;
  },
});
