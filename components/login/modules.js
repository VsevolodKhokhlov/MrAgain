import * as yup from "yup";

import { API_PATH } from "@/constants";
import { createFormModule } from "@/modules/forms";
import api from "@/utils/api";

const loginValidator = yup.object({
  email: yup.string().required().email("Email is not valid"),
  password: yup.string().required("No password provided"),
});

export const loginModule = createFormModule({
  validator: loginValidator,
  async init() {
    return {
      email: "",
      password: "",
    };
  },

  async submit(data) {
    return api.post(`${API_PATH.LOGIN}/`, {
      email: data.email,
      password: data.password,
    });
  },
});
