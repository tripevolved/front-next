import { UserCredentials } from "./credentials";

export const logout = (callback?: VoidFunction) => {
  UserCredentials.del();
  callback?.();
};
