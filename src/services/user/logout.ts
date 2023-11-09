import { useAppStore } from "@/core/store";
import { UserCredentials } from "./credentials";
import { initialUserState } from "@/core/store/user/user.constants";

export const logout = (callback?: VoidFunction) => {
  UserCredentials.del();
  useAppStore.setState((state) => ({ ...state, user: initialUserState }));
  callback?.();
};
