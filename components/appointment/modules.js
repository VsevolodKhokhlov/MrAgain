import moment from "moment";
import router from "next/router";
import * as yup from "yup";

import { store } from "@/configureStore";
import { API_PATH } from "@/constants";
import dataFetcher from "@/modules/dataFetcher";
import { createFormModule } from "@/modules/forms";
import { createModalModule } from "@/modules/modal";
import api from "@/utils/api";

import { getLocationOptions } from "./LocationSelector";

//

export const appointmentConfirmation = createModalModule();
export const appointmentReview = createModalModule();

const DEFAULT_SERVICE = {
  guarantee: 0,
  price: 0,
  device: 4,
  brand: 20,
  model: 748,
  status: -1,
  reparation: 54,
};

const requiredAddress = yup.string().when("location", {
  is: "home",
  then: yup.string().required(),
});

// NOTE: when adding address validation
// use the when method (https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema)
const validator = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  tel: yup.string().required(),
  time: yup.string().when(["type", "location"], {
    is(type, location) {
      return type === "contact" || location === "home";
    },
    otherwise: yup.string().required(),
  }),
  enquiry: yup.string().when("type", {
    is: "contact",
    then: yup.string().required(),
  }),
  address: requiredAddress,
  city: requiredAddress,
  zip: requiredAddress,
});

export const appointmentForm = createFormModule({
  validator,
  async init({ shop, type = "appointment" }) {
    const fromAddressBar = router.router.query;

    const locations = getLocationOptions(shop).filter(
      (option) => !option.disabled
    );

    function getDefaultValue(type, defaultValue) {
      const value = fromAddressBar[type];
      if (["undefined", "null"].includes(value)) {
        return defaultValue;
      }

      return value;
    }

    const address = [shop.street || "", shop.city || ""]
      .filter(Boolean)
      .join(", ");
    const values = {
      shop: shop.id,
      shopAddress: address,
      shopName: shop.name,
      ...fromAddressBar,
      device: getDefaultValue("device", DEFAULT_SERVICE.device),
      brand: getDefaultValue("brand", DEFAULT_SERVICE.brand),
      model: getDefaultValue("model", DEFAULT_SERVICE.model),
      service: getDefaultValue("service", DEFAULT_SERVICE.reparation),
      location: locations?.[0]?.value || "in-store",
      paymentType: "cash",
      type,
      time: "",
      name: "",
      email: "",
      tel: "",
      address: "",
      city: "",
      zip: "",
      state: "",
      date: new Date().toString(),
    };

    return values;
  },

  async submit(data) {
    const service = serviceFetcher.selector(store.ref.getState()).result;
    const formatedDate = moment(data.date).format("YYYY-MM-DD");
    const reparationId = service?.reparation.id
      ? parseInt(service.reparation.id)
      : 0;

    let repairSeviceData = {
      device: parseInt(data.device),
      brand: parseInt(data.brand),
      model: parseInt(data.model),
      status: -1,
      price: service?.price,
      guarantee: service?.guarantee_time,
      reparation: reparationId,
    };
    let emailServiceData = {
      appointment: 389,
      device: parseInt(data.device),
      brand: parseInt(data.brand),
      model: parseInt(data.model),
      price: service?.price,
      guarantee: service?.guarantee_time,
      reparation: reparationId,
    };

    if (!reparationId) {
      repairSeviceData = {
        guarantee: 0,
        price: 0,
        device: 4,
        brand: 20,
        model: 748,
        status: -1,
        reparation: 54,
      };
      emailServiceData = {
        appointment: 389,
        device: 1,
        brand: 1,
        model: 1,
        price: 25,
        guarantee: 12,
        reparation: 2,
      };
    }

    let client_address;
    if (data.location !== "in-store") {
      client_address = [data.address, data.city, data.state, data.zip]
        .filter(Boolean)
        .join(", ");
    }

    const payload = {
      name: data.shopName,
      address: data.shopAddress,
      datetime: data.type === "contact" ? "" : `${formatedDate} - ${data.time}`,
      appointmentData: {
        date: data.type === "contact" ? "" : formatedDate,
        time: data.type === "contact" ? "" : data.time,
        appointment_type:
          data.type === "contact" ? 3 : data.location === "in-store" ? 1 : 2,
        reparation: reparationId || 54,
        client_name: data.name,
        client_email: data.email,
        client_phone: data.tel,
        shop: data.shop,
        appointment_comment: data.enquiry,
        client_address,
        active: true,
      },
      repairSeviceData,
    };

    const appointment = await api.post(
      `${API_PATH.CREATEAPPOINTMENT}/`,
      payload
    );
    const create_repair_service = await api.post(
      `${API_PATH.CREATESHOPREPAIRSERVICE}/`,
      {
        appointment: appointment.appointment_id,
        ...repairSeviceData,
      }
    );

    emailServiceData.appointment = appointment.appointment_id;
    api.post(`${API_PATH.APPOINTMENTEMAIL}/`, emailServiceData);

    return create_repair_service;
  },
});

export const deviceFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "device",
    () => appointmentForm.state?.values.shop,
    () => appointmentForm.state?.values.device,
  ],
  async fetchData([_1, _2, shopId, deviceId]) {
    const data = await api.get(`${API_PATH.GETSHOPDEVICES}/`, { shop: shopId });

    return data
      .map(({ device }) => device)
      .find((device) => `${device.id}` === deviceId);
  },
});

export const brandFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "brand",
    () => appointmentForm.state?.values.shop,
    () => appointmentForm.state?.values.device,
    () => appointmentForm.state?.values.brand,
  ],
  async fetchData([_1, _2, shop, deviceId, brandId]) {
    const data = await api.get(`${API_PATH.GETDEVICEBRANDS}/?`, {
      device: deviceId,
      shop,
    });

    return data
      .map(({ brand }) => brand)
      .find((brand) => `${brand.id}` === brandId);
  },
});

export const modelFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "model",
    () => appointmentForm.state?.values.shop,
    () => appointmentForm.state?.values.device,
    () => appointmentForm.state?.values.brand,
    () => appointmentForm.state?.values.model,
  ],
  async fetchData([_1, _2, shop, deviceId, brandId, modelId]) {
    const data = await api.get(`${API_PATH.GETBRANDMODELS}/`, {
      device: deviceId,
      shop,
      brand: brandId,
    });
    return data
      .map(({ model }) => model)
      .find((model) => `${model.id}` === modelId);
  },
});

export const serviceFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "service",
    () => appointmentForm.state?.values.shop,
    () => appointmentForm.state?.values.device,
    () => appointmentForm.state?.values.brand,
    () => appointmentForm.state?.values.model,
    () => appointmentForm.state?.values.service,
  ],
  async fetchData([_1, _2, shop, deviceId, brandId, modelId, serviceId]) {
    const data = await api.get(`${API_PATH.GETSHOPREPARATIONDETAILS}/`, {
      device: deviceId,
      shop,
      brand: brandId,
      model: modelId,
    });
    return data.find((service) => `${service.id}` === serviceId);
  },
});

export const openTimeFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "open-time",
    () => appointmentForm.state.values.shop,
  ],
  async fetchData([_1, _2, shop]) {
    const response = await api.get(`${API_PATH.GETVALIDOPENTIME}/${shop}/`);
    try {
      return JSON.parse(response?.[0]?.valid_day_time || "");
    } catch (err) {
      return null;
    }
  },
});

export const invalidTimeFetcher = dataFetcher({
  selectors: [
    "appoitment",
    "invalid-time",
    () => appointmentForm.state?.values.shop,
  ],
  async fetchData([_1, _2, shop]) {
    const data = await api.get(`${API_PATH.GETINVALIDOPENTIME}/${shop}/`);
    return JSON.parse(data?.[0]?.invalid_day_time || "[]");
  },
});

export function payForAppointment({ appointment, shop, service }) {
  return api.post(`${API_PATH.PAYMENT}`, {
    appointment,
    shop: shop.id,
    price: `${service.price}.00`,
    title: `${shop.name} appointment payment`,
  });
}
