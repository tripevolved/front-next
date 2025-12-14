import axios from "axios";

import { ensureNotSlashEnds } from "@/utils/helpers/url.helper";
import { UserService } from "@/services/user";
import { clientInfoInterceptor } from "./client-info.interceptor";

const API_URL = ensureNotSlashEnds(process.env.NEXT_PUBLIC_API_URL || "");
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

type ApiRequestMethod = "get" | "post" | "put" | "delete" | "patch";

const makeInstance = async (method: ApiRequestMethod) => {
  const baseURL = `${API_URL}/api`;
  const credentials = await UserService.getCredentials();
  const Authorization = credentials ? `Bearer ${credentials.token}` : undefined;
  const headers = { "X-API-Key": API_KEY, Authorization };
  const instance = axios.create({ baseURL, headers });
  instance.interceptors.request.use(clientInfoInterceptor);
  return instance[method];
};

// TODO: add exception handler
export const ApiRequest = {
  get: async <ResponseData = any>(route = "/") => {
    const method = await makeInstance("get");
    return method<ResponseData>(route).then(({ data }) => data);
  },
  post: async <ResponseData = any>(route = "/", body: any) => {
    const method = await makeInstance("post");
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
