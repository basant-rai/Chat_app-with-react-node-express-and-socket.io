import axios from "axios";
import { AppConfig } from "../config/app.config";
import { RootState } from "../redux/Store";
// import { store } from "../redux/Store";

const axiosInstance = axios.create({
  baseURL: AppConfig.api_url,
  headers: {
    "Content-Type": "application/json",
  }
})

const setAuthorizationHeader = (config: any, token: string) => {
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosInstance.interceptors.request.use(async (config) => {
  const state: RootState = await import("../redux/Store").then(
    (mod) => mod.store.getState()
  );

  const token = state.auth.token;

  if (token) {
    return setAuthorizationHeader(config, token);
  }

})

axiosInstance.interceptors.response.use((res) => {
  return res
},
  async function (error) {
    const state: RootState = await import("../redux/Store").then(
      (mod) => mod.store.getState()
    );

    const token = state.auth.token;
    
    const originalRequest = error.config;

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // return axiosInstance(originalRequest);



  }
)

export default axiosInstance