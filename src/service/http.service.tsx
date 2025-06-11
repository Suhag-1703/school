// src/services/httpService.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "https://dummyjson.com"; // Change as needed

// ✅ Create Axios Instance
const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  config.headers = config.headers || {}; // Ensure headers is not undefined
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response Interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ✅ Reusable Typed HTTP Request
type HttpMethod = "get" | "post" | "put" | "delete";

export const asyncRequest = async (
  url: string,
  method: HttpMethod,
  data?: any,
  config?: AxiosRequestConfig
): Promise<any> => {
  const finalConfig = {
    ...config,
    method,
    url,
    ...(data && { data }), // only add `data` if present
  };

  const response: AxiosResponse = await http.request(finalConfig);
  return response.data;
};

// ✅ Optional direct methods
export const get = (url: string, config?: AxiosRequestConfig) => asyncRequest(url, "get", undefined, config);
export const post = (url: string, data?: any, config?: AxiosRequestConfig) => asyncRequest(url, "post", data, config);
export const put = (url: string, data?: any, config?: AxiosRequestConfig) => asyncRequest(url, "put", data, config);
export const del = (url: string, config?: AxiosRequestConfig) => asyncRequest(url, "delete", undefined, config);

// ✅ Export as object
const httpService = {
  get,
  post,
  put,
  delete: del,
  request: asyncRequest
};

export default httpService;



