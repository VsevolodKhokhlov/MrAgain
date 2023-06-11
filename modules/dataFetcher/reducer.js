export function FETCH_DATA_REQUEST(nextState, { path }, state) {
  nextState[path] = {
    result: state?.[path]?.result || null,
    isLoading: true,
  };
}

export function FETCH_DATA_SUCCESS(nextState, { path, result }, state) {
  nextState[path].result = result;
  nextState[path].isLoading = false;
}

export function FETCH_DATA_FAILURE(nextState, { path, result }, state) {
  nextState[path].result = result;
  nextState[path].isLoading = false;
}
