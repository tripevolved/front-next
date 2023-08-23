import { UserCredentials } from "@/services/user/credentials";
import axios, { type AxiosResponse, AxiosError } from "axios";

export const expiredTokenCheckInterceptor = async (config: AxiosResponse) => {
  // TODO: Create some way to use redirectToSignIn here
  try {
    if (config.status === 401) {
      UserCredentials.del();
      window.location.replace("/app/entrar");
    }
  } catch (error) {
    console.error(error);
  }
  return config;
};

export const expiredTokenVerificationInterceptorError = (config: AxiosError) => {
  try {
    if (config.response?.status === 401) {
      UserCredentials.del();
      window.location.replace("/app/entrar");
    }
  } catch (error) {
    console.error(error);
  }
  return config;
};
