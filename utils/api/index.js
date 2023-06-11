import createApiService from "./create";

const api = createApiService({});
export const privateApi = createApiService({
  getDefaultHeaders() {
    const token = localStorage.getItem("auth-token");
    return {
      Authorization: `Token ${token}`,
    };
  },
});

export default api;
