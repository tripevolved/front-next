export interface User {
  email: string;
  username: string;
  hasNotifications: boolean;
  showNotifications: boolean;
}

export interface UserCredentials {
  idToken: string;
  accessToken: string;
  refreshToken: string;
}
