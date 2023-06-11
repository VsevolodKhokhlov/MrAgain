import set from "lodash/set";

export function INITIALIZE_FORM_REQUEST(nextState, { guid }) {
  nextState[guid] = {
    initialValues: {},
    values: {},
    isLoading: true,
    submitted: false,
    errors: {},
  };
}

export function INITIALIZE_FORM_SUCCESS(nextState, { guid, result }) {
  nextState[guid].initialValues = result;
  nextState[guid].values = result;
  nextState[guid].isLoading = false;
}

export function FORM_FIELD_CHANGE(nextState, { guid, name, value }) {
  set(nextState[guid].values, name, value);
}

export function FORM_BATCH_CHANGE(nextState, { guid, updates }, state) {
  nextState[guid].values = {
    ...state[guid].values,
    ...updates,
  };
}

export function UPDATE_FORM_ERRORS(nextState, { guid, errors }) {
  nextState[guid].errors = errors;
}

export function SUBMIT_FORM_REQUEST(nextState, { guid }) {
  nextState[guid].isSubmitting = true;
}

export function SUBMIT_FORM_SUCCESS(nextState, { guid }) {
  nextState[guid].isSubmitting = false;
  nextState[guid].submitted = true;
}

export function SUBMIT_FORM_FAILURE(nextState, { guid }) {
  nextState[guid].isSubmitting = false;
}
