import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { REFERENCEURL } from '../AppConstant';

import { setLoaderExternally } from '../hooks/useGlobalLoader';

const axiosInstance = axios.create({ baseURL: REFERENCEURL });

// Request Interceptor to set token
axiosInstance.interceptors.request.use((config) => {
  // setLoaderExternally(true);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['X-Profile-Id'] = userId;
  }
  return config;
},
  (error) => {
    setLoaderExternally(false);
    toast.error("Request error");
    return Promise.reject(error);
  }
);



axiosInstance.interceptors.response.use(
  (response) => {
    setLoaderExternally(false);
    return response;
  },
  (error) => {
    setLoaderExternally(false);
    return Promise.reject(error);
  }
);


// GET  Method
export const get = async (url: string, params: object = {}, headers: object = {}) => {
  try {
    const response = await axiosInstance.get(url, { params, headers });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Reusable POST request function
export const post = async (url: string, data = {}, headers = {}) => {
  try {
    const payload = data;
    const response = await axiosInstance.post(url, payload, { headers: { ...headers } });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// PATCH  Method
export const patch = async (url: string, data: any = {}, headers: object = {}) => {
  try {
    // const payload = await encodePayload(data);
    const response = await axiosInstance.patch(url, data, { headers });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// PUT Method
export const put = async (url: string, data: any = {}, headers: object = {}) => {
  try {
    const payload = await encodePayload(data);
    const response = await axiosInstance.put(url, payload, { headers });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// normal put Method
export const normalPut = async (url: string, data: any = {}, headers: object = {}) => {
  try {
    // const payload = await encodePayload(data);
    const response = await axiosInstance.put(url, data, { headers });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Reusable DELETE request function
export const del = async (url:string, headers: object = {}) => {
  try {
    const response = await axiosInstance.delete(url, { headers: { ...headers } });
    return response.data;
  } catch (error:any) {
    handleError(error);

  }
};

// Centralized error handler
const handleError = (error: AxiosError<any>) => {
  console.log("🚀 ~ handleError ~ error:", error)
  const status = error?.response?.status;
  const message = error?.response?.data?.message || error?.response?.data?.errors?.[0]?.message || "Unexpected error occurred.";

  switch (status) {
    case 400:
    case 404:
    case 409:
    case 500:
      toast.error(message);
      break;
    case 401:
      handleStatus401();
      break;
    default:
      if (error.code === "ERR_NETWORK" || status === 503) {
        toast.error("Something went wrong, please try again.");
      } else {
        toast.error(message);
      }
  }
  throw error;
};
