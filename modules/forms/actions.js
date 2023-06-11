import { get, set } from "lodash";

import { store } from "@/configureStore";

function yupToFormErrors(yupError) {
  let errors = {};
  if (yupError.inner) {
    if (yupError.inner.length === 0) {
      if (yupError.path) {
        return set(errors, yupError.path, yupError.message);
      }
    }
    yupError.inner.forEach((err) => {
      if (!get(errors, err.path)) {
        if (err.path) {
          errors = set(errors, err.path, err.message);
        }
      }
    });
  }
  return errors;
}

export default class FormActions {
  constructor({ init, validator, submit, guid }) {
    this.initFn = init;
    this.validator = validator;
    this.submitFn = submit;
    this.guid = guid;
  }
  get moduleState() {
    return store.ref.getState().forms?.[this.guid];
  }

  _dispatch(payload) {
    store.ref.dispatch({ ...payload, guid: this.guid });
  }

  _runValidation = async (fields) => {
    const state = this.moduleState;
    if (!fields) {
      fields = Object.keys(state.values);
    }
    if (!this.validator) {
      return;
    }

    if (fields) {
      const errors = {
        inner: [],
      };

      const validations = fields.map(async (field) => {
        try {
          await this.validator.validateAt(field, state.values);
        } catch (err) {
          errors.inner.push(err);
        }
      });

      await Promise.allSettled(validations);

      return yupToFormErrors(errors);
    }

    try {
      await this.validator.validate(state.values, {
        abortEarly: false,
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        return yupToFormErrors(err);
      }

      throw err;
    }
  };

  validateField = async ({ name }) => {
    const state = this.moduleState;
    const errors = { ...state.errors };

    let fields = name;
    if (!Array.isArray(fields)) {
      fields = [name];
    }

    const validationErrors = await this._runValidation(fields);
    fields.forEach((field) => {
      if (validationErrors?.[field]) {
        errors[field] = validationErrors[field];
      } else {
        delete errors[field];
      }
    });

    this._dispatch({ type: "UPDATE_FORM_ERRORS", errors });
  };

  validateForm = async () => {
    const errors = await this._runValidation();
    this._dispatch({ type: "UPDATE_FORM_ERRORS", errors });
  };

  initialize(...args) {
    if (!this.initFn) {
      return;
    }

    const promise = this.initFn(...args);
    this._dispatch({ type: "INITIALIZE_FORM", promise });

    return promise;
  }

  submit = async () => {
    const transaction = async () => {
      await this.validateForm();
      const state = this.moduleState;

      const errors = state.errors || {};
      if (Object.keys(errors).length) {
        return Promise.reject({
          ...errors,
          get validationErrors() {
            return true;
          },
        });
      }

      return this.submitFn(state.values);
    };

    const promise = transaction();

    this._dispatch({
      type: "SUBMIT_FORM",
      promise,
    });

    return promise;
  };

  onFieldChange = ({ name, value }) => {
    const state = this.moduleState;
    const hasError = get(state.errors, name);
    this._dispatch({ type: "FORM_FIELD_CHANGE", name, value });
    if (hasError) {
      this.validateField({ name });
    }
  };

  batchChange({ updates }) {
    this._dispatch({ type: "FORM_BATCH_CHANGE", updates });
  }

  clearErrors({ fields }) {
    const state = this.moduleState;
    const errors = { ...state.errors };
    fields.forEach((field) => {
      delete errors[field];
    });

    this._dispatch({ type: "UPDATE_FORM_ERRORS", errors });
  }
}
