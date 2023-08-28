import { useAppStore } from "@/core/store";
import { initialUserState } from "@/core/store/user/user.constants";
import { UserCredentials } from "@/services/user/credentials";
import type { AxiosResponse, AxiosError } from "axios";

const handleExpiredToken = () => {
  UserCredentials.del();
  useAppStore.setState((state) => ({ ...state, user: initialUserState }));
  const redirectTo = encodeURIComponent(`${location.pathname}${location.search}`);
  location.replace(`/app/entrar?redirectTo=${redirectTo}`);
};

export const expiredTokenCheckInterceptor = async (config: AxiosResponse) => {
  if (config.status === 401) handleExpiredToken();
  return config;
};

export const expiredTokenVerificationInterceptorError = (config: AxiosError) => {
  if (config.response?.status === 401) handleExpiredToken();
  return config;
};
