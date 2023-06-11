import { type LoginDTO, UserApiService } from "../api/user";
import { CookieService } from "../cookie";

const CREDENTIALS_KEY = "user-credentials";

export type LoginArgs = LoginDTO;

const login = async (data: LoginArgs) => {
  const response = await UserApiService.login(data);
  const { idToken, accessToken, refreshToken, ...user } = response;
  const credentials = JSON.stringify({
    idToken,
    accessToken,
    refreshToken,
  });

  CookieService.set(CREDENTIALS_KEY, credentials);
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

const logout = () => {
  CookieService.del(CREDENTIALS_KEY);
};

const isGuest = () => !getCredentials();
const isAuth = () => !isGuest();

export const UserService = { login, logout, getCredentials, isGuest, isAuth };
