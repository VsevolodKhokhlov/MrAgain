import { notification } from "antd";
import { default as Axios, default as axios } from "axios";
import router from "next/router";

import { registerFormModule } from "@/components/land/RegisterSection/RegisterForm/modules";

import { API_PATH } from "../../constants";
import {
  authenticated,
  fetchAccountSettings,
  fetchRepairDevices,
  fetchShopModelGuarantee,
  initAccountInvalidTime,
  initAccountProfile,
  initAccountReviews,
  initAccountValidTime,
  initShopAccountProfile,
  initUserLoginChange,
  loginFail,
  logoutA,
  registerAuthUser,
  resetPasswordFail,
  resetPasswordSuccess,
  setCreatedGuarantee,
  setDeletedGuarantee,
  setLoadedProfile,
  setLoadPBM,
  setSuccessData,
  setUpdateScheduleTime,
  signupFail,
} from "./action";

export const tokenConfig = () => {
  const token = localStorage.getItem("auth-token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

export const tokenConfigOnly = () => {
  const token = localStorage.getItem("auth-token");
  const config = { headers: {} };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

export const tokenConfig1 = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

export const tokenConfigGet = (data) => {
  const token = localStorage.getItem("auth-token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  config.params = data;
  return config;
};

export function registerUser() {
  return async function thunk() {
    try {
      await registerFormModule.actions.submit();

      notification.success({
        description:
          "Bedankt voor je aanmelding bij MrAgain. We voeren nu enkele checks uit waarna je een email van ons ontvangt om je account te activeren. Let op: deze email kan in je spam terecht komen!",
        duration: 5.5,
      });

      setTimeout(() => {
        router.router.push("/");
      }, 6000);
    } catch (error) {
      const { errors } = registerFormModule.state;
      if (Object.keys(errors).length) {
        return;
      }
      if (error !== "") {
        notification.error({
          message: error,
        });
      }
    }
  };
}

export function getAuthUser(dispatch) {
  axios
    .get(`${API_PATH.GETAUTHUSER}/`, tokenConfig())
    .then((res) => {
      dispatch(registerAuthUser(res.data));
    })
    .catch((err) => {
      localStorage.setItem("auth-token", null);
      localStorage.setItem("auth-user", null);
      dispatch(logoutA());
    });
}

export function login(data, dispatch) {
  dispatch(authenticated(true));

  axios
    .post(`${API_PATH.LOGIN}/`, {
      email: data.email,
      password: data.password,
    })
    .then((res) => {
      // dispatch(authenticated(null));
      let token = res.data.key;
      // dispatch(registerAuthToken(token));
      axios
        .get(`${API_PATH.GETAUTHUSER}/`, tokenConfig1(token))
        .then((res) => {
          localStorage.setItem("auth-token", token);
          let obj = Object.assign({}, res.data);
          delete obj.is_super;
          localStorage.setItem("auth-user", JSON.stringify(obj));
          dispatch(registerAuthUser(res.data));
          dispatch(initUserLoginChange(true));
        })
        .catch((err) => {});
    })
    .catch((err) => {
      dispatch(authenticated(false));
      dispatch(loginFail());
    });
}

export function loginAsUser(token) {
  axios
    .post(`${API_PATH.LOGINASUSER}/`, token)
    .then((res) => {
      console.log(res, "------ res -------");
    })
    .catch((err) => {
      console.log(err, "------ error -------");
    });
}

export async function logout(dispatch) {
  axios
    .get(`${API_PATH.LOGOUT}/`, tokenConfig())
    .then((res) => {
      dispatch(logoutA());
      localStorage.setItem("auth-token", null);
      localStorage.setItem("auth-user", null);
    })
    .catch((err) => {});
}

export function resetPasswordEmail(_data, dispatch) {
  var url = API_PATH.RESETPASSWORDEMAIL;
  axios
    .post(`${url}/`, _data)
    .then((res) => {})
    .catch((err) => {});
}

export async function resetPasswordConfirmEmail(_data, dispatch) {
  var url = API_PATH.RESETPASSWORDCONFIRMEMAIL;
  return await axios
    .put(`${url}/`, _data)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      if (err.response.data !== null) {
        let error = "";
        if ("new_password2" in err.response.data) {
          error = err.response.data.new_password2[0];
        } else if ("token" in err.response.data) {
          error = "token: " + err.response.data.token[0];
        }
        dispatch(signupFail(error));
        return false;
      }
    });
}

export function getAccountSettings(data, dispatch) {
  axios
    .get(`${API_PATH.ACCOUNTSETTING}/${data}/`, tokenConfig())
    .then((res) => {
      dispatch(fetchAccountSettings(res.data));
    })
    .catch((err) => {
      dispatch(logoutA());
    });
}

export function getDevices(dispatch) {
  axios
    .get(`${API_PATH.REPAIRDEVICES}/`, tokenConfig())
    .then((res) => {
      dispatch(fetchRepairDevices(res.data));
    })
    .catch((err) => {
      dispatch(logoutA());
    });
}

export function getShopIdByInformation(str, dispatch) {
  return axios
    .get(`${API_PATH.GETSHOPIDBYINFORMATION}/`, { params: { shop_info: str } })
    .then((res) => {
      dispatch(initAccountProfile(res.data));

      return res.data;
    })
    .catch((err) => {});
}
// for result search profiles
export function getShopProfileByInformationServer(str) {
  return axios
    .get(`${API_PATH.GETSHOPIDBYINFORMATION}/`, { params: { shop_info: str } })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function getGeneralShopInfoServer(shopId) {
  return axios
    .get(`${API_PATH.GETSHOPGENERALINFO}/${shopId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

// for result search profiles
export function getShopProfileByInformation(str, dispatch) {
  return axios
    .get(`${API_PATH.GETSHOPIDBYINFORMATION}/`, { params: { shop_info: str } })
    .then((res) => {
      console.log("shop profile data", res.data);
      dispatch(initShopAccountProfile(res.data));

      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

export function getShopBrandModel(data, dispatch) {
  dispatch(setLoadPBM(false));

  axios
    .get(`${API_PATH.REPAIRBRANDMODEL}/${data.shop}/`, tokenConfigGet(data))
    .then((res) => {
      dispatch(fetchShopModelGuarantee(res.data));
      // dispatch(setLoadPBM(true));
    })
    .catch((err) => {
      dispatch(logoutA());
    });
}

export async function getShopRepairation(data, dispatch) {
  const res = await axios.get(
    `${API_PATH.GETSHOPREPAIRATION}`,
    tokenConfigGet(data)
  );
  return res;
}

export async function verifyAccount(data, dispatch) {
  const res = await axios.get(
    `${API_PATH.VERIFYACCOUNT}/${data.mainid}/${data.subid}/`
  );
  return res;
}

export async function updateAccountSettings(id, data, dispatch) {
  // data = filterObjectKeys(data,['auth','name','street','zipcode','city','phone_number','kvk','btw','iban','site_url','inter']);
  return await axios
    .put(`${API_PATH.ACCOUNTSETTING}/${id}/`, data, tokenConfig())

    .then((res) => {
      let user = JSON.parse(localStorage.getItem("auth-user"));
      user.name = data.name;
      localStorage.setItem("auth-user", JSON.stringify(user));
      dispatch(fetchAccountSettings(res.data));

      // data = filterObjectKeys(data, ["auth", "street", "zipcode", "city"]);
      // return axios
      //   .put(`${API_PATH.UPDATEACCOUNTLOCATION}/${id}/`, data, tokenConfig())
      //   .then((res) => {
      //     if (res.data.city === "error") {
      //       return "error";
      //     }
      //     return "Je account settings zijn gewijzigd";
      //   })
      //   .catch((err) => {
      //     return "error1";
      //   });
    })
    .catch((err) => {
      return "error";
    });
}

export function resetPasswordConfirm(data, dispatch) {
  axios
    .put(`${API_PATH.RESETPASSWORDCONFIRM}/`, data, tokenConfig())
    .then((res) => {
      dispatch(resetPasswordSuccess("Je wachtwoord is gewijzigd"));
    })
    .catch((err) => {
      dispatch(resetPasswordFail(err.response.data));
    });
}

export function deleteAccount(id, dispatch) {
  axios
    .delete(`${API_PATH.UPDATEACCOUNT}/${id}`, id, tokenConfig())
    .then((res) => {})
    .catch((err) => {});
}

export function deleteShopGuarantee(id, account, device, dispatch) {
  dispatch(setLoadPBM(false));
  axios
    .delete(`${API_PATH.SHOPGUARANTEE}/`, tokenConfig())
    .then((res) => {
      axios
        .get(
          `${API_PATH.REPAIRBRANDMODEL}/${account}/`,
          tokenConfigGet({
            shop: account,
            device: device,
          })
        )
        .then((res) => {
          dispatch(fetchShopModelGuarantee(res.data));
        })
        .catch((err) => {});
    })
    .catch((err) => {});
}

export function getSimpleAccountInformation(id, dispatch) {
  dispatch(setLoadedProfile(false));
  // console.log("account id---------------------------->", id);
  axios
    .get(`${API_PATH.UPDATEACCOUNTPROFILE}/${id}/`, tokenConfig())
    .then((res) => {
      dispatch(initAccountProfile(res.data));
      dispatch(setLoadedProfile(true));
    })
    .catch((err) => {
      dispatch(logoutA());
    });
}
// to get searched shop information
export async function getShopAccountProfile(id, dispatch) {
  let shopDevices;
  let validTime;
  let invalidTime;
  let reviews;
  dispatch(setLoadedProfile(false));

  return axios
    .get(`${API_PATH.GETVALIDOPENTIME}/${id}/`)
    .then((res) => {
      validTime = res.data;
      return axios
        .get(`${API_PATH.GETINVALIDOPENTIME}/${id}/`)
        .then((res) => {
          invalidTime = res.data;
          return axios
            .get(`${API_PATH.GETREVIEWS}/${id}/`)
            .then((res) => {
              reviews = res.data;
              if (reviews.length === 0) {
                reviews = [];
              }
              dispatch(initAccountReviews(reviews));
              dispatch(initAccountValidTime(validTime));
              dispatch(initAccountInvalidTime(invalidTime));
              dispatch(setLoadedProfile(true));
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    })
    .catch((err) => {});
}

// to get main shop profile info
export function getAccountProfile(id, str, dispatch) {
  // console.log(str);
  let profile;
  let validTime;
  let invalidTime;
  let reviews;
  dispatch(setLoadedProfile(false));
  axios
    .get(`${API_PATH.UPDATEACCOUNTPROFILE}/${id}/`)
    .then((res) => {
      profile = res.data;
      axios
        .get(`${API_PATH.GETVALIDOPENTIME}/${id}/`)
        .then((res) => {
          validTime = res.data;
          axios
            .get(`${API_PATH.GETINVALIDOPENTIME}/${id}/`)
            .then((res) => {
              invalidTime = res.data;
              axios
                .get(`${API_PATH.GETREVIEWS}/${id}/`)
                .then((res) => {
                  reviews = res.data;
                  if (reviews.length === 0) {
                    reviews = [];
                  }
                  if (str === true) {
                    dispatch(initShopAccountProfile(profile));
                  } else {
                    dispatch(initAccountProfile(profile));
                  }
                  dispatch(initAccountValidTime(validTime));
                  dispatch(initAccountInvalidTime(invalidTime));
                  dispatch(initAccountReviews(reviews));
                  dispatch(setLoadedProfile(true));
                  return profile;
                })
                .catch((err) => {});
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    })
    .catch((err) => {});
}

// same as above for shop profile
export function getShopProfileAccount(id, str, dispatch) {
  let profile;
  let validTime;
  let invalidTime;
  let reviews;
  dispatch(setLoadedProfile(false));
  axios
    .get(`${API_PATH.GETSHOPIDBYINFORMATION}/`, { params: { shop_info: str } })
    .then((res) => {
      profile = res.data;
      axios
        .get(`${API_PATH.GETVALIDOPENTIME}/${id}/`)
        .then((res) => {
          validTime = res.data;
          axios
            .get(`${API_PATH.GETINVALIDOPENTIME}/${id}/`)
            .then((res) => {
              invalidTime = res.data;
              axios
                .get(`${API_PATH.GETREVIEWS}/${id}/`)
                .then((res) => {
                  reviews = res.data;
                  if (reviews.length === 0) {
                    reviews = [];
                  }
                  dispatch(initAccountProfile(profile));
                  dispatch(initAccountValidTime(validTime));
                  dispatch(initAccountInvalidTime(invalidTime));
                  dispatch(initAccountReviews(reviews));
                  dispatch(setLoadedProfile(true));
                })
                .catch((err) => {});
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    })
    .catch((err) => {});
}

/**
 * @description Function called to upload the image to the server for the profile page.
 *
 * @export
 * @param {*} data : for sending the formData to the sever
 * @param {*} id
 * @param {*} name
 * @param {*} flg
 * @param {*} dispatch
 */
export async function uploadImage(data) {
  axios
    .post(`${API_PATH.UPLOADIMAGE}`, data, tokenConfig())
    .then((res) => {
      console.log("image upload for post", res);
    })
    .catch((err) => {
      return console.log("error");
    });
}

export async function uploadLogoImage(data) {
  axios
    .post(`${API_PATH.UPLOADLOGOIMAGE}`, data, tokenConfig())
    .then((res) => {
      console.log("image upload for post", res);
    })
    .catch((err) => {
      return console.log("error");
    });
}

/**
 * @description: Function called to upadate the account with the details liek image , id etc
 *
 * @export
 * @param {*} id
 * @param {*} data
 * @param {*} dispatch
 */
export function updateAccountProfile(id, data, dispatch) {
  axios
    .post(`${API_PATH.UPDATEACCOUNTDETAIL}`, data, tokenConfig())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("error");
    });
}
export function updateValidOpenTime(id, data, dispatch) {
  dispatch(setUpdateScheduleTime(false));
  axios
    .put(`${API_PATH.UPDATEVALIDOPENTIME}/${id}/`, data, tokenConfig())
    .then((res) => {
      dispatch(setUpdateScheduleTime(true));
      return res;
    })
    .catch((err) => {
      console.log(err);
      dispatch(setUpdateScheduleTime(true));
    });
}

export function updateInvalidOpenTime(id, data, dispatch) {
  const res = axios.put(
    `${API_PATH.UPDATEINVALIDOPENTIME}/${id}/`,
    data,
    tokenConfig()
  );
  return res;
  // .then((res) => {
  //   // console.log("success");
  //   console.log(res);
  //   // dispatch(setHandleCheckTime(true));
  //   return res;
  // })
  // .catch((err) => {
  //   console.log("error");
  //   dispatch(setHandleCheckTime(true));
  // });
}

export function createRepairDevice(data, dispatch) {
  axios
    .post(`${API_PATH.REPAIRDEVICES}/`, data, tokenConfig())
    .then((res) => {
      axios
        .get(`${API_PATH.REPAIRDEVICES}/`, tokenConfig())
        .then((res) => {
          dispatch(fetchRepairDevices(res.data));
        })
        .catch((err) => {
          dispatch(logoutA());
        });
    })
    .catch((err) => {});
}

export function createGuaranteeModels(data, dispatch) {
  dispatch(setCreatedGuarantee(false));
  axios
    .post(`${API_PATH.GUARANTEEMODELS}/`, data, tokenConfig())
    .then((res) => {
      dispatch(setSuccessData(false));
      axios
        .get(
          `${API_PATH.REPAIRBRANDMODEL}/${data.shop_id}/`,
          tokenConfigGet({
            shop: data.shop_id,
            device: data.payload.device_id,
          })
        )
        .then((res) => {
          dispatch(setSuccessData(true));
          dispatch(fetchShopModelGuarantee(res.data));
          dispatch(setSuccessData(null));
        })
        .catch((err) => {
          dispatch(logoutA());
        });
      dispatch(setCreatedGuarantee(true));
    })
    .catch((err) => {});
}

export function updateShopModalGuarantees(data, dispatch) {
  axios
    .put(`${API_PATH.GUARANTEEMODELS}/`, data, tokenConfig())
    .then((res) => {})
    .catch((err) => {});
}

export function deleteRepairDevice(id, dispatch) {
  axios
    .delete(`${API_PATH.DELETEREPAIRDEVICE}/${id}/`, tokenConfig())
    .then((res) => {
      axios
        .get(`${API_PATH.REPAIRDEVICES}/`, tokenConfig())
        .then((res) => {
          dispatch(fetchRepairDevices(res.data));
        })
        .catch((err) => {
          dispatch(logoutA());
        });
    })
    .catch((err) => {});
}

export const deleteGuaranteeModels = async (data, dispatch) => {
  dispatch(setDeletedGuarantee(false));
  await axios
    .put(`${API_PATH.DELETEGUARANTEEMODELS}`, data, tokenConfig())
    .then((res) => {
      // axios
      //   .get(
      //     `${API_PATH.REPAIRBRANDMODEL}/${data.shop_id}/`,
      //     tokenConfigGet({
      //       shop: data.shop_id,
      //       device: data.device_id,
      //     })
      //   )
      //   .then((res) => {
      //     dispatch(fetchShopModelGuarantee(res.data));
      //   })
      //   .catch((err) => {
      //     dispatch(logoutA());
      //   });

      dispatch(setDeletedGuarantee(true));
    })
    .catch((err) => {});
};

export const createImportReparationAndGuaranteeCSV = async (data) => {
  const configure = {
    onUploadProgress: (progressEvent) => console.log(progressEvent.loaded),
  };
  const config = tokenConfigOnly();
  const result = await axios.post(
    `${API_PATH.IMPORTCSV}`,
    data,
    config,
    configure
  );
  return result;
};

export const getExportReparationAndGuaranteeCSV = async (data) => {
  const result = await Axios.get(
    `${API_PATH.EXPORTCSV}${data.shopId}/?device=${data.deviceId}&shop=${data.shopId}`
  );
  return result;
};

export default { registerUser };
