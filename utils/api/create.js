import axios from "axios";

export default function createApiService({
  baseUrl = "",
  catchMissingAuth,
  catchUnavailableServices,
  getDefaultHeaders = () => ({}),
} = {}) {
  function promisify(request) {
    function handleError(err) {
      if (!err.response) {
        return;
      }
      if (err.response.status === 401 && catchMissingAuth) {
        catchMissingAuth(err);
      }

      if (
        [502, 503].includes(err.response.status) &&
        catchUnavailableServices
      ) {
        catchUnavailableServices();
      }

      throw err.response.data;
    }

    const promise = request.then((res) => res.data).catch(handleError);

    Object.defineProperties(promise, {
      status: {
        get() {
          return request.then((res) => res.status);
        },
      },
      headers: {
        get() {
          return request.then((res) => res.headers);
        },
      },
    });

    return promise;
  }

  function getOptions(options = {}) {
    const defaultHeaders = getDefaultHeaders();
    return {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    };
  }

  return {
    get(url, query, options) {
      const request = axios.get(url, getOptions({ ...options, params: query }));
      return promisify(request);
    },

    put(url, body, options) {
      const request = axios.put(url, body, getOptions(options));
      return promisify(request);
    },

    post(url, body, options) {
      const request = axios.post(url, body, getOptions(options));
      return promisify(request);
    },

    patch(url, body, options) {
      const request = axios.patch(url, body, getOptions(options));
      return promisify(request);
    },

    delete(url, query = {}, options) {
      const request = axios.delete(
        url,
        getOptions({ ...options, params: query })
      );
      return promisify(request);
    },
  };
}
