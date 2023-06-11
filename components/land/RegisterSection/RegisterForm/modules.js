import * as yup from "yup";

import { API_PATH } from "@/constants";
import { createFormModule } from "@/modules/forms";
import { createModalModule } from "@/modules/modal";
import api from "@/utils/api";

const validator = yup.object({
  companyName: yup.string().required(),
  chamber: yup.string().required(),
  email: yup
    .string()
    .required()
    .email("Heb je een geldig emailadres gebruikt?"),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf(
      [yup.ref("password"), null],
      "Je wachtwoorden moeten hetzelfde zijn!"
    ),
  terms: yup.boolean().isTrue("Bevestig de algemene voorwaarden!"),
});

export const registerFormModule = createFormModule({
  validator,
  async init() {
    return {
      companyName: "",
      chamber: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    };
  },

  async submit(data) {
    const user = {
      name: data.companyName,
      email: data.email,
      password: data.password,
      country: "The Netherlands",
      address: "",
      street: "",
      zipcode: "",
      city: "",
      phonumber: 0,
      kvk: data.chamber,
      btw: "",
      iban: "",
      status_app_email: 1,
      allow_appointment: 1,
      site_url: "",
      about_us: "",
      bg_photo: "",
      logo_photo: "",
      distance: 0,
      geo_lat: 0,
      geo_long: 0,
      ptype: 0,
    };
    return api.post(`${API_PATH.REGISTERUSER}/`, user);
  },
});

export const agrementModal = createModalModule();
