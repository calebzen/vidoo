import axios from "axios";

interface RequestOption {
  url?: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  params?: { [key: string]: any };
  data?: { [key: string]: any };
}

const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 10 * 60 * 1000;

export const request = async <T = any>(options: RequestOption) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      accept: "application/json",
    },
    params: {
      language: "en-US",
    },
  });

  const cacheKey = JSON.stringify(options);
  const now = Date.now();
  const cachedData = cache[cacheKey];
  if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
    console.log("Using cached data!");
    return cache[cacheKey] as T;
  }

  try {
    return (await instance.request({ ...options })).data as T;
  } catch (err: any) {
    return {
      status: "INTERVAL_ERROR",
      err,
    } as T;
  }
};
