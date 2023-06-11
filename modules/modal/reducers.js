export function OPEN_MODAL(nextState, { guid, payload }) {
  nextState[guid] = {
    payload,
  };
}
export function CLOSE_MODAL(nextState, { guid }) {
  delete nextState[guid];
}
