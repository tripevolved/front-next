import axios, { type InternalAxiosRequestConfig } from "axios";

interface IpInfo {
  ip: string;
}

export const clientInfoInterceptor = async (config: InternalAxiosRequestConfig) => {
  try {
    const { data } = await axios.get<IpInfo>("https://api.ipify.org/?format=json");
    config.headers.set("x-forwarded-for", data.ip);
  } catch (error) {
    config.headers.set("x-forwarded-for", "unset");
    console.error(error);
  }
  return config;
};
