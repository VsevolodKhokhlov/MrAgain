import { useMemo } from "react";
import { connect, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { store } from "@/configureStore";
import { Field } from "@/modules/forms/Blocks";

const SEPARATOR = "~";

export default function dataFetcher({ selectors = [], fetchData }) {
  function getPath(state) {
    return selectors.reduce((accumulator, selector) => {
      function join(string) {
        return accumulator ? `${accumulator}${SEPARATOR}${string}` : string;
      }
      if (typeof selector === "string") {
        return join(selector);
      }
      const result = selector(state);
      return join(result);
    }, "");
  }

  function getSelector() {
    const getModuleState = createSelector(
      (state) => state.fetcher,
      getPath,
      (data, path) => {
        return (
          data[path] || {
            result: null,
            isLoading: undefined,
          }
        );
      }
    );

    return getModuleState;
  }

  return {
    fetch(...args) {
      const path = getPath(store.ref.getState());
      const promise = fetchData(path.split(SEPARATOR), ...args);
      store.ref.dispatch({
        type: "FETCH_DATA",
        path,
        promise,
      });

      return promise;
    },

    selector: getSelector(),
  };
}

export function keyedDataFetcher({ selectors, fetchData }) {
  const _registry = {};
  return {
    key(key) {
      if (_registry[key]) {
        return _registry[key];
      }

      const fetcher = dataFetcher({
        selectors: [...selectors, key],
        fetchData(selectors, query) {
          return fetchData([...selectors, key], query);
        },
      });
      _registry[key] = fetcher;

      return _registry[key];
    },

    selector(state) {
      return Object.keys(_registry).reduce((accumulator, key) => {
        accumulator[key] = _registry[key].selector(state);
        return accumulator;
      }, {});
    },
  };
}

export function mapMetadataAsOptions(items) {
  return (items || []).map((item) => ({
    label: item.metadata.name,
    value: item.metadata.uid,
  }));
}

export function mapStringsAsOptions(items) {
  return (items || []).map((item) => ({
    label: item,
    value: item,
  }));
}

export function createSelectComponent({
  Component = Field,
  dataFetcher,
  parseOptions = (result) => result,
}) {
  const createFetcherSelector = (identifier) =>
    createSelector(dataFetcher.selector, (fetchStatus) => {
      return {
        options: identifier
          ? parseOptions(fetchStatus[identifier]?.result, identifier)
          : parseOptions(fetchStatus.result || []),
        loading: identifier
          ? fetchStatus[identifier]?.isLoading
          : fetchStatus.isLoading,
      };
    });

  return connect((state, ownProps) => {
    return createFetcherSelector(ownProps.identifier)(state);
  })(Component);
}

export function useFetcher({ identifier, dataFetcher }) {
  const selector = useMemo(() => {
    return createSelector(dataFetcher.selector, (fetchStatus) => {
      return {
        data: identifier ? fetchStatus[identifier]?.result : fetchStatus.result,
        isLoading: identifier
          ? fetchStatus[identifier]?.isLoading
          : fetchStatus.isLoading,
      };
    });
  }, [identifier]);

  return useSelector(selector);
}

export function withData({ Component, dataFetcher }) {
  const createFetcherSelector = (identifier) =>
    createSelector(dataFetcher.selector, (fetchStatus) => {
      return {
        data: identifier ? fetchStatus[identifier]?.result : fetchStatus.result,
        isLoading: identifier
          ? fetchStatus[identifier]?.isLoading
          : fetchStatus.isLoading,
      };
    });

  return connect((state, ownProps) => {
    return createFetcherSelector(ownProps.identifier)(state);
  })(Component);
}

export function isDataLoading(...fetchers) {
  return createSelector(
    fetchers.map((fetcher) => fetcher.selector),
    (...args) => {
      return args.some((fetcherState) => fetcherState.isLoading);
    }
  );
}
