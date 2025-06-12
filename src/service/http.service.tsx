// src/services/httpService.ts

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://dummyjson.com";

// ✅ Create Axios Instance
const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor (Add token if exists)
http.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("authToken");
  config.headers = config.headers || {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response Interceptor with Toast Error Handler
http.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError) => {
    if (!error.response) {
      toast.error("🚫 Network error. Please check your internet.");
    } else {
      const status = error.response.status;
      switch (status) {
        case 401:
          toast.error("🔒 Unauthorized access (401)");
          break;
        case 403:
          toast.error("⛔ Forbidden (403)");
          break;
        case 404:
          toast.error("❓ Resource not found (404)");
          break;
        case 500:
          toast.error("💥 Internal Server Error (500)");
          break;
        default:
          toast.error(error.message || "Something went wrong!");
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Typed HTTP Request Wrapper
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
    ...(data && { data }),
  };

  const response: AxiosResponse = await http.request(finalConfig);
  return response.data;
};

// ✅ Shortcuts
export const get = (url: string, config?: AxiosRequestConfig) =>
  asyncRequest(url, "get", undefined, config);

export const post = (url: string, data?: any, config?: AxiosRequestConfig) =>
  asyncRequest(url, "post", data, config);

export const put = (url: string, data?: any, config?: AxiosRequestConfig) =>
  asyncRequest(url, "put", data, config);

export const del = (url: string, config?: AxiosRequestConfig) =>
  asyncRequest(url, "delete", undefined, config);

// ✅ Export as Object
const httpService = {
  get,
  post,
  put,
  delete: del,
  request: asyncRequest,
};

export default httpService;
