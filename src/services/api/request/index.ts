import axios from "axios";

import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";
import { clientInfoInterceptor } from "./client-info.interceptor";
import { getAccessToken } from "@auth0/nextjs-auth0/client";
import { auth0 } from "@/lib/auth0";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

type ApiRequestMethod = "get" | "post" | "put" | "delete" | "patch";
interface RequestOptions {
  headers?: Record<string, string>;
}

const makeInstance = async (method: ApiRequestMethod, options: RequestOptions = {}) => {
  const baseURL = `${API_URL}/api`;
  const credentials = await getAccessToken();
  const Authorization = credentials ? `Bearer ${credentials}` : undefined;
  const headers = { "X-API-Key": API_KEY, Authorization, ...options.headers };
  const instance = axios.create({ baseURL, headers });
  instance.interceptors.request.use(clientInfoInterceptor);
  return instance[method];
};

const makeServerSideInstance = async (method: ApiRequestMethod, options: RequestOptions = {}) => {
  const baseURL = `${API_URL}/api`;
  const credentials = await auth0.getAccessToken();
  const Authorization = credentials ? `Bearer ${credentials}` : undefined;
  const headers = { "X-API-Key": API_KEY, Authorization, ...options.headers };
  const instance = axios.create({ baseURL, headers });
  instance.interceptors.request.use(clientInfoInterceptor);
  return instance[method];
};

// TODO: add exception handler
export const ApiRequest = {
  get: async <ResponseData = any>(route = "/", options: RequestOptions = {}) => {
    const method = await makeInstance("get", options);
    return method<ResponseData>(route).then(({ data }) => data);
  },
  getServerSide: async <ResponseData = any>(route = "/", options: RequestOptions = {}) => {
    const method = await makeServerSideInstance("get", options);
    return method<ResponseData>(route).then(({ data }) => data);
  },
  post: async <ResponseData = any>(route = "/", body: any, options: RequestOptions = {}) => {
    const method = await makeInstance("post", options);
    return method<ResponseData>(route, body).then(({ data }) => data);
  },
  put: async <ResponseData = any>(route = "/", body: any) => {
    const method = await makeInstance("put");
    return method<ResponseData>(route, body).then(({ data }) => data);
  },
  delete: async <ResponseData = any>(route = "/") => {
    const method = await makeInstance("delete");
    return method<ResponseData>(route).then(({ data }) => data);
  },
};
