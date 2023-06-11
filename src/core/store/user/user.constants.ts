import { FETCH_STATE } from "../store.helpers";
import type { UserState } from "./user.types";

export const initialUserState = {
  ...FETCH_STATE.UN_FETCHED,
} satisfies UserState;
