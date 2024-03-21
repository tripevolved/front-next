import { FETCH_STATE } from "../store.helpers";
import type { UserState } from "./user.types";

export const initialUserState = {
  username: "",
  email: "",
  hasNotifications: false,
  showNotifications: false,
  ...FETCH_STATE.UN_FETCHED,
} satisfies UserState;
