import { useAppStore } from "@/core/store";
import { initialUserState } from "@/core/store/user/user.constants";
import { UserService } from "@/services/user";
import { delay } from "@/utils/helpers/delay.helpers";
import type { AxiosError } from "axios";

const handleExpiredToken = async () => {
  UserService.logout();
  useAppStore.setState((state) => ({ ...state, user: initialUserState }));
  await delay(500);
  const redirectTo = encodeURIComponent(`${location.pathname}${location.search}`);
  location.replace(`/app/entrar?redirectTo=${redirectTo}`);
};

export const expiredTokenInterceptor = (config: AxiosError) => {
  const isUnauthorized = config.status === 401 || config.response?.status === 401;
  if (isUnauthorized) handleExpiredToken();
  return config;
};
