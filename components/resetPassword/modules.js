import * as yup from "yup";

import { API_PATH } from "@/constants";
import { createFormModule } from "@/modules/forms";
import api from "@/utils/api";

const resetPasswordValidator = yup.object({
  email: yup.string().required().email("Email is not valid"),
});

export const resetPasswordModule = createFormModule({
  validator: resetPasswordValidator,
  async init() {
    return {
      email: "",
    };
  },

  async submit(data) {
    return api.post(`${API_PATH.RESETPASSWORDEMAIL}/`, {
      email: data.email,
    });
  },
});
