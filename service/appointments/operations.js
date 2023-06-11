import { API_PATH } from '../../constants'
import axios from 'axios'
import {
  fetchAppointmentlist,
  fetchReparationGuarantee,
  manualAppointmentStatus,
  fetchSingleAppointment,
} from './action'
import { tokenConfig, tokenConfigGet } from '../account/operations'
import { logoutA } from '../account/action'
import { authHeaderPost, authHeader } from './api'

export function createAppointment(data, data1, name, address, datetime, dispatch) {
  axios
    .post(
      `${API_PATH.CREATEAPPOINTMENT}/`,
      {
        appointmentData: data,
        repairSeviceData: data1,
        name,
        address,
        datetime,
      },
      authHeaderPost()
    )
    .then((res) => {
      data1.appointment = res.data.appointment_id
      axios
        .post(`${API_PATH.CREATESHOPREPAIRSERVICE}/`, data1, authHeaderPost())
        .then((res) => {})
        .catch((err) => {})
    })
    .catch((err) => {})
}

export async function checkReviewPage(auth) {
  return await axios
    .post(
      `${API_PATH.CHECKREVIEWPAGE}/`,
      {
        auth: auth,
      },
      authHeaderPost()
    )
    .then((res) => {
      return true
    })
    .catch((err) => {
      return false
    })
}

export async function createReview(auth, data, dispatch) {
  return await axios
    .post(
      `${API_PATH.CREATEREVIEW}/`,
      {
        auth: auth,
        reviewData: data,
      },
      authHeaderPost()
    )
    .then((res) => {
      axios.get(`${API_PATH.EVALUATERATE}/${data.shop}/`)
      return true
    })
    .catch((err) => {
      return false
    })
}

export function getReparationGuarantee(id, dispatch) {
  return axios
    .get(`${API_PATH.GETREPARATIONGUARANTEE}/${id}/`)
    .then((res) => {
      dispatch(fetchReparationGuarantee(res.data))
    })
    .catch((err) => {
      dispatch(logoutA())
    })
}

export async function getAppointmentNumber(data) {
  try {
    const res = await axios.post(`${API_PATH.GETAPPOINTMENTNUMBER}/`, data, authHeaderPost())
    return res.data
  } catch (error) {
    console.warn(error)
    return -1
  }
}

export async function getAppointmentTimeTable(data) {
  try {
    const res = await axios.post(`${API_PATH.GETAPPOINTMENTTIMETABLE}/`, data, authHeaderPost())
    return res.data
  } catch (error) {
    return []
  }
}

export async function getAppointments(id, dispatch) {
  axios
    .get(`${API_PATH.GETAPPOINTMENTS}/${id}/`, tokenConfig())
    .then((res) => {
      dispatch(fetchAppointmentlist(res.data))
    })
    .catch((err) => {
      dispatch(logoutA())
    })
}

export async function getSingleAppointment(id) {
  try {
    const response = await axios.get(`${API_PATH.GETSINGLEAPPOINTMENT}/${id}/`, tokenConfig())
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export function filterReparationOverview(data, dispatch) {
  axios
    .get(`${API_PATH.FILTERREPARATION}/`, { params: data })
    .then((res) => {
      dispatch(fetchAppointmentlist(res.data))
    })
    .catch((err) => {
      dispatch(logoutA())
    })
}

export function updateAppointment(id, email, data, shop_id, dispatch) {
  let status = data.status
  axios
    .put(`${API_PATH.UPDATEAPPOINTMENT}/${id}/`, data)
    .then((res) => {
      axios.get(`${API_PATH.GETAPPOINTMENTS}/${shop_id}/`, tokenConfig()).then((res) => {
        dispatch(fetchAppointmentlist(res.data))
        if (status === 1) {
          axios
            .post(
              `${API_PATH.REPAIRCOLSEAUTUEMAIL}/`,
              {
                id: id,
                email: email,
                shop: shop_id,
              },
              authHeaderPost()
            )
            .then((res) => {})
        }
      })
    })
    .catch((err) => {})
}

export function CancelAppointment(id, shop_id, dispatch) {
  axios
    .delete(`${API_PATH.CANCELAPPOINTMENT}/${shop_id}/`, tokenConfigGet({ appoint_id: id }))
    .then((res) => {
      axios
        .get(`${API_PATH.GETAPPOINTMENTS}/${shop_id}/`, tokenConfig())
        .then((res) => {
          dispatch(fetchAppointmentlist(res.data))
        })
        .catch((err) => {
          dispatch(logoutA())
        })
    })
    .catch((err) => {})
}

export function createManualAppointment(data, dispatch) {
  // dispatch(manualAppointmentStatus(false));

  axios
    .post(`${API_PATH.CREATEAPPOINTMENTMANUALLY}`, data, tokenConfig())
    .then((res) => {
      dispatch(manualAppointmentStatus(true))
      setTimeout(() => {
        dispatch(manualAppointmentStatus(false))
      }, 1500)
      return res
    })
    .catch((err) => {
      dispatch(manualAppointmentStatus('error'))
      setTimeout(() => {
        dispatch(manualAppointmentStatus(false))
      }, 1500)

      return err
    })
}
export default { createAppointment }
