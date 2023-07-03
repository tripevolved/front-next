export interface User {
  email: string;
  username: string;
}

export interface UserCredentials {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}
