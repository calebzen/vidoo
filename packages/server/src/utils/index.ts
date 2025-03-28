import axios, { type AxiosRequestConfig } from "axios";

interface Config {
  baseURL?: string;
  prefix?: string;
  options?: AxiosRequestConfig & { token?: string };
}

export const createRequest = ({ baseURL, prefix, options }: Config) => {
  const instance = axios.create({
    baseURL: `${baseURL || "https://api.themoviedb.org/3"}${prefix}`,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    ...options,
    proxy: {
      host: "127.0.0.1",
      port: 7890,
      protocol: "http",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      if (options?.token) {
        config.headers.Authorization = `Bearer ${options.token}`;
      }
      config.params = {
        ...config.params,
        api_key: process.env.API_KEY || "2033f2aec626516ea5a36bfb44b15a42",
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return async <T = any>(
    config: Omit<AxiosRequestConfig, "method"> & {
      method: "GET" | "POST" | "PUT" | "DELETE";
    }
  ) => {
    try {
      return (await instance(config)) as T;
    } catch (err) {
      console.error(err);
      return {
        status: "INTERNAL_ERROR",
        error: err,
      } as T;
    }
  };
};

export const extractQuery = (req) => {
  const { language, page, region } = req.query;
  return {
    language,
    page,
    region,
  };
};
