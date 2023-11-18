const isDev = true;
export const BASE_URL = isDev ? "http://localhost:8084/api" : "https://indieip.startlump.com/api";
export const getApi = (baseUrl) => (main) => (sub) => (etc) => {
  return [baseUrl, main, sub, etc].join("/");
};
export const httpObject = (url, method, payload, header) => {
  return {
    url: url,
    method: method ? method : "GET",
    body: payload ? payload : null,
    headers: header
      ? header
      : {
          "Content-type": "application/json; charset=utf-8",
        },
  };
};
