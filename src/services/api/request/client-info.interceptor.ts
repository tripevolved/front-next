import axios, { type InternalAxiosRequestConfig } from "axios";

interface IpInfo {
  ip: string;
}

export const HEADER_NAME_IP = "X-Forwarded-For";

declare global {
  interface Window {
    clientIp: string;
  }
}

export const clientInfoInterceptor = async (config: InternalAxiosRequestConfig) => {
  if (typeof window === "undefined") return config;
  try {
    // if (!window.clientIp) {
    //   const { data } = await axios.get<IpInfo>("https://api.ipify.org/?format=json");
    //   window.clientIp = data.ip;
    // }
    config.headers.set(HEADER_NAME_IP, window.clientIp);
  } catch (error) {
    config.headers.set(HEADER_NAME_IP, undefined);
    console.error(error);
  }
  return config;
};
