import axios from "axios";

import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";
import { UserService } from "@/services/user";
import { clientInfoInterceptor } from "./client-info.interceptor";
import { expiredTokenInterceptor } from "./expired-token-check.interceptor";

export const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

type ApiRequestMethod = "get" | "post" | "put" | "delete" | "patch";

const makeInstance = (method: ApiRequestMethod) => {
  const baseURL = `${API_URL}/api`;
  const credentials = UserService.getCredentials();
  const Authorization = credentials ? `Bearer ${credentials.accessToken}` : undefined;
  const headers = { "X-API-Key": API_KEY, Authorization };
  const instance = axios.create({ baseURL, headers });
  instance.interceptors.request.use(clientInfoInterceptor);
  instance.interceptors.response.use(undefined, expiredTokenInterceptor);
  return instance[method];
};

// TODO: add exception handler
export const ApiRequest = {
  get: <ResponseData = any>(route = "/") =>
    makeInstance("get")<ResponseData>(route).then(({ data }) => data),
  post: <ResponseData = any>(route = "/", body: any) =>
    makeInstance("post")<ResponseData>(route, body).then(({ data }) => data),
  put: <ResponseData = any>(route = "/", body: any) =>
    makeInstance("put")<ResponseData>(route, body).then(({ data }) => data),
  delete: <ResponseData = any>(route = "/") =>
    makeInstance("delete")<ResponseData>(route).then(({ data }) => data),
};
