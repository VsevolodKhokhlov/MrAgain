import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  routerReducer,
  createRouterMiddleware,
  initialRouterState,
} from "connected-next-router";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import Router from "next/router";
import searchReducer from "./service/search";
import accountReducer from "./service/account";
import appointmentReducer from "./service/appointments";
import * as listReducer from "@/modules/list/reducers";
import * as formReducer from "@/modules/forms/reducers";
import * as dataFetcher from "@/modules/dataFetcher/reducer";
import * as modal from "@/modules/modal/reducers";
import { format } from "url";
import { createReducer, apiMiddleware } from "./utils/store";

const rootReducer = combineReducers({
  router: routerReducer,
  search: searchReducer,
  account: accountReducer,
  appointment: appointmentReducer,
  list: createReducer(listReducer),
  forms: createReducer(formReducer),
  forms: createReducer(formReducer),
  fetcher: createReducer(dataFetcher),
  modal: createReducer(modal),
});

function ssrReducer(state, action) {
  if (
    action.type === HYDRATE &&
    (Object.keys(action.payload.fetcher).length !== 0 ||
      Object.keys(action.payload.forms).length !== 0)
  ) {
    return {
      ...state,
      ...action.payload,
      fetcher: {
        ...state.fetcher,
        ...action.payload.fetcher,
      },
      forms: {
        ...state.forms,
        ...action.payload.forms,
      },
      modal: {
        ...state.modal,
        ...action.payload.modal,
      },
    };
  }

  return rootReducer(state, action);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const store = {
  ref: null,
};

export const initStore = (context) => {
  const routerMiddleware = createRouterMiddleware();
  const { asPath, pathname, query } = context.ctx || Router.router || {};
  let initialState;
  if (asPath) {
    const url = format({ pathname, query });
    initialState = {
      router: initialRouterState(url, asPath),
    };
  }

  store.ref = createStore(
    ssrReducer,
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware, thunk, apiMiddleware))
  );
  return store.ref;
};

export const wrapper = createWrapper(initStore);
