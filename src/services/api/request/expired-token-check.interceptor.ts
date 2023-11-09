import type { AxiosError } from "axios";
import { UserService } from "@/services/user";
import { delay } from "@/utils/helpers/delay.helpers";

const handleExpiredToken = async () => {
  UserService.logout();
  await delay(500);
  const AvoidRedirectTo = /painel|entrar|sair/.test(location.pathname);
  const redirectTo = encodeURIComponent(location.pathname);
  const pathname = AvoidRedirectTo ? "/app/entrar" : `/app/entrar?redirectTo=${redirectTo}`;
  location.replace(pathname);
};

export const expiredTokenInterceptor = (config: AxiosError) => {
  const isUnauthorized = config.status === 401 || config.response?.status === 401;
  if (isUnauthorized) handleExpiredToken();
  return config;
};
