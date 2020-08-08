import axios from "axios";
import { getAccessToken } from "../utils";
import { authRouteConstants } from "../constants/route-constants";

export const API_URL = "http://localhost:8000";
// export const API_URL = "https://api.ems.cropchain.online";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    Authorization: (function() {
      const token = getAccessToken();
      return `Bearer ${token}}`;
    })()
  }
});

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    console.log("error response interceptors", error.response);
    if (error && error.response && error.response.status === 401) {
      window.location.href = authRouteConstants.LOGIN;
    }
    return Promise.reject(error);
  }
);

export default instance;
