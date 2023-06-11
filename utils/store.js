import produce from "immer";

export const apiMiddleware = () => (next) => async (action) => {
  const { type, promise, schema, ...rest } = action;
  const isPromise = promise instanceof Promise;
  if (!isPromise || !type) {
    next(action);
    return;
  }

  next({ type: `${type}_REQUEST`, ...rest });
  try {
    const result = await promise;
    if (schema) {
      next({ type, ...rest, data: result, schema });
    }
    next({ type: `${type}_SUCCESS`, ...rest, result });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
    next({ type: `${type}_FAILURE`, ...rest, error });
  }
};

function DEFAULT(state) {
  return state;
}

export function createReducer(reducers) {
  const reducerInitialState = reducers.initialState || {};
  return function reducerFn(state = reducerInitialState, action) {
    const { type } = action;

    if (!type) {
      console.warn("Action without type", action);
      return DEFAULT(state);
    }

    const reducer = reducers[type];

    if (!reducer) {
      return DEFAULT(state);
    }

    if (typeof reducer !== "function") {
      console.warn(`Reducer for ${type} is not a function`);
      return DEFAULT(state);
    }

    return produce(state, (nextState) => {
      return reducer(nextState, action, state);
    });
  };
}
