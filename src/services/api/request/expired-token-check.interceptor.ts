import { useAppStore } from "@/core/store";
import { initialUserState } from "@/core/store/user/user.constants";
import { UserCredentials } from "@/services/user/credentials";
import type { AxiosError } from "axios";

const handleExpiredToken = () => {
  UserCredentials.del();
  useAppStore.setState((state) => ({ ...state, user: initialUserState }));
  const redirectTo = encodeURIComponent(`${location.pathname}${location.search}`);
  location.replace(`/app/entrar?redirectTo=${redirectTo}`);
};

export const expiredTokenInterceptor = (config: AxiosError) => {
  const isUnauthorized = config.status === 401 || config.response?.status === 401;
  if (isUnauthorized) handleExpiredToken();
  return config;
};
