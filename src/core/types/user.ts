export interface User {
  email: string;
  username: string;
  hasNotifications: boolean;
  credentials?: UserCredentials;
}

export interface UserCredentials {
  idToken?: string;
  accessToken: string;
  refreshToken?: string;
}
