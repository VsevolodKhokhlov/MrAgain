import isEqual from "fast-deep-equal";
import { debounce } from "lodash";
import { createContext, useContext } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { v4 as uuid } from "uuid";

import { store } from "@/configureStore";

export function createListModule({
  fetchData,
  getInitialQuery,
  guid = uuid(),
} = {}) {
  function getModuleState(state) {
    return state.list?.[guid];
  }

  const getItems = createSelector(getModuleState, (moduleState) => {
    if (!moduleState) {
      return [];
    }

    const { pages, items } = moduleState;

    return pages.reduce((accumulator, page) => {
      return accumulator.concat(items[page]);
    }, []);
  });

  const getQuery = createSelector(getModuleState, (moduleState) => {
    const page = moduleState.currentPage;
    const filters = moduleState.filters;

    return {
      ...filters,
      offset: page * filters?.limit,
    };
  });

  function fetchItems() {
    const query = getQuery(store.ref.getState());
    store.ref.dispatch({
      type: "FETCH_LIST_DATA",
      guid,
      promise: fetchData(query),
    });
  }

  const debouncedFetchItems = debounce(fetchItems, 1000);

  function dispatch(action) {
    store.ref.dispatch(action);
  }

  return {
    guid,
    actions: {
      async initialize() {
        const query = await getInitialQuery?.();
        const promise = fetchData(query);
        dispatch({
          type: "INITIALIZE_LIST",
          guid,
          promise,
          query,
        });

        return promise;
      },
      nextPage() {
        dispatch({ type: "NEXT_PAGE", guid });
        fetchItems();
      },
      refreshItems(items) {
        dispatch({ type: "REFRESH_ITEMS", items, guid });
      },
      updateQuery(filters) {
        const moduleState = getModuleState(store.ref.getState());
        if (!moduleState) {
          return;
        }
        const existingFilters = moduleState.filters;

        if (isEqual(filters, existingFilters) || moduleState.isLoading) {
          return;
        }

        dispatch({ type: "UPDATE_LIST_QUERY", guid, filters });
        debouncedFetchItems();
      },
    },
    get state() {
      return store.ref.getState().list?.[guid];
    },
    selectors: {
      getItems,
      getQuery,
    },
  };
}

const ListContext = createContext();

export function useListContext() {
  return useContext(ListContext);
}

const List = connect((state, ownProps) => ({
  moduleState: state.list?.[ownProps.module.guid],
  ...(state.list?.[ownProps.module.guid]
    ? {
        items: ownProps.module.selectors.getItems(state),
      }
    : {}),
}))(function ({ moduleState, module, children, items }) {
  if (!moduleState) {
    return null;
  }

  return (
    <ListContext.Provider
      value={{ state: moduleState, actions: module.actions, items }}
    >
      {children}
    </ListContext.Provider>
  );
});

export default List;
