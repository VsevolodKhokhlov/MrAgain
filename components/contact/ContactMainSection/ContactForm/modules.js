import * as yup from "yup";

import { API_PATH } from "@/constants";
import { createFormModule } from "@/modules/forms";
import api from "@/utils/api";

const contactValidator = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email("Email is not valid"),
  telephone: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(9, "Must be exactly 9 digits")
    .max(9, "Must be exactly 9 digits"),
  contents: yup.string(),
});

export const contactFormModule = createFormModule({
  validator: contactValidator,
  async init() {
    return {
      name: "",
      email: "",
      telephone: "",
      contents: "",
    };
  },

  async submit(data) {
    const message = {
      name: data.name,
      email: data.email,
      telephone: data.telephone,
      contents: data.contents,
    };
    return api.post(`${API_PATH.CONTACTUS}/`, message);
  },
});
