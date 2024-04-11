import axios from "axios";

export const axiosInstance = axios.create();

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      config.headers = {
        Authorization: `Bearer ${authToken}`,
        Accept: "application/json",
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
