import { type LoginDTO, UserApiService } from "../api/user";
import { LoginResponse } from "../api/user/login";
import { CookieService } from "../cookie";

const CREDENTIALS_KEY = "user-credentials";

export type LoginArgs = LoginDTO;
export type LoginCallback = (user: LoginResponse) => Promise<void>;

const login = async (data: LoginArgs, callback?: LoginCallback) => {
  const response = await UserApiService.login(data);
  const { idToken, accessToken, refreshToken, ...user } = response;
  const credentials = JSON.stringify({
    idToken,
    accessToken,
    refreshToken,
  });

  CookieService.set(CREDENTIALS_KEY, credentials);
  await callback?.(response);
  return user;
};

const getCredentials = () => {
  const credentials = CookieService.get(CREDENTIALS_KEY);
  if (!credentials) return null;
  try {
    const { idToken, accessToken, refreshToken } = JSON.parse(credentials);
    if (!idToken || !accessToken || !refreshToken) return null;
    return { idToken, accessToken, refreshToken };
  } catch (error) {
    return null;
  }
};

const logout = (callback?: VoidFunction) => {
  CookieService.del(CREDENTIALS_KEY);
  callback?.();
};

const isGuest = () => !getCredentials();
const isAuth = () => !isGuest();

export const UserService = { login, logout, getCredentials, isGuest, isAuth };
