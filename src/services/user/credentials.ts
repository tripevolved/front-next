import { CookieService } from "@/services/cookie";

const CREDENTIALS_KEY = "user-credentials";

interface Credentials {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}

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

const setCredentials = ({ idToken, accessToken, refreshToken }: Credentials) => {
  const credentials = JSON.stringify({
    idToken,
    accessToken,
    refreshToken,
  });

  CookieService.set(CREDENTIALS_KEY, credentials);
};

const delCredentials = () => CookieService.del(CREDENTIALS_KEY);

export const UserCredentials = { get: getCredentials, set: setCredentials, del: delCredentials };
