export function INITIALIZE_LIST_REQUEST(nextState, { guid, query }) {
  nextState[guid] = {
    items: {},
    pages: [],
    isLoading: true,
    currentPage: 0,
    filters: query || {},
  };
}

function processResult(nextState, { guid, result }, state) {
  const nextPage = state[guid].currentPage + 1;

  nextState[guid].pages.push(state[guid].currentPage);
  nextState[guid].items[state[guid].currentPage] = result.items;
  nextState[guid].isLoading = false;
  nextState[guid].currentPage = nextPage;
}

export function INITIALIZE_LIST_SUCCESS(...args) {
  processResult(...args);
}

export function FETCH_LIST_DATA_REQUEST(nextState, { guid }) {
  nextState[guid].isLoading = true;
}

export function FETCH_LIST_DATA_FAILURE(nextState, { guid }) {
  nextState[guid].isLoading = false;
}

export function FETCH_LIST_DATA_SUCCESS(...args) {
  processResult(...args);
}

export function UPDATE_LIST_QUERY(nextState, { guid, filters }) {
  nextState[guid].items = {};
  nextState[guid].pages = [];
  nextState[guid].currentPage = 0;
  nextState[guid].filters = filters;
  nextState[guid].isLoading = true;
}

export function REFRESH_ITEMS(nextState, { guid, items }) {
  nextState[guid].items = items;
}
