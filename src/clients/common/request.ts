import axios from "axios";

import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

type ApiRequestMethod = "get" | "post" | "put" | "delete" | "patch";

interface RequestOptions {
  headers?: Record<string, string>;
}

const makeInstance = (method: ApiRequestMethod, options: RequestOptions = {}) => {
  const baseURL = `${API_URL}/api`;
  const headers = { 
    "X-API-Key": API_KEY,
    ...options.headers 
  };
  const instance = axios.create({ baseURL, headers });
  return instance[method];
};

// TODO: add exception handler
export const ApiRequest = {
  get: <ResponseData = any>(route = "/", options: RequestOptions = {}) =>
    makeInstance("get", options)<ResponseData>(route).then(({ data }) => data),
  post: <ResponseData = any>(route = "/", body: any, options: RequestOptions = {}) =>
    makeInstance("post", options)<ResponseData>(route, body).then(({ data }) => data),
  put: <ResponseData = any>(route = "/", body: any, options: RequestOptions = {}) =>
    makeInstance("put", options)<ResponseData>(route, body).then(({ data }) => data),
  delete: <ResponseData = any>(route = "/", options: RequestOptions = {}) =>
    makeInstance("delete", options)<ResponseData>(route).then(({ data }) => data),
};
