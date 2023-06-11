import {
  FETCH_APPOINTMENT_LIST,
  FETCH_SINGLE_APPOINTMENT,
  FETCH_APPOINTMENT_COUNT,
  FETCH_REPARATION_LIST,
  SET_LOAD_APPOINTMENT,
  SET_APPOINTMENT_DATE,
  MANUAL_APPOINTMENT_STATUS,
} from './types'

const initial_state = {
  appointmentDate: null,
  appointmentList: [],
  appointmentNum: 0,
  isLoadAppointment: 0,
  shopReparationList: [],
  manualAppointmentLoading: false,
  singleAppointment: {},
}

const appointmentReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_APPOINTMENT_DATE: {
      return {
        ...state,
        appointmentDate: action.payload,
      }
    }
    case FETCH_APPOINTMENT_COUNT: {
      return {
        ...state,
        appointmentNum: action.payload,
      }
    }
    case FETCH_SINGLE_APPOINTMENT: {
      return {
        ...state,
        singleAppointment: action.payload,
      }
    }
    case FETCH_APPOINTMENT_LIST: {
      return {
        ...state,
        appointmentList: action.payload,
        isLoadAppointment: true,
      }
    }
    case FETCH_REPARATION_LIST: {
      return {
        ...state,
        shopReparationList: action.payload,
      }
    }
    case SET_LOAD_APPOINTMENT: {
      return {
        ...state,
        isLoadAppointment: false,
      }
    }
    case MANUAL_APPOINTMENT_STATUS: {
      console.log('loading => ', action.payload)
      return {
        ...state,
        manualAppointmentLoading: action.payload,
      }
    }

    default: {
      return state
    }
  }
}

export default appointmentReducer
