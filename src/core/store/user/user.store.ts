import type { StateCreator } from "zustand";
import type { UserSlice, UserValue } from "./user.types";

import { initialUserState } from "./user.constants";
import { FETCH_STATE } from "../store.helpers";

export const createUserSlice: StateCreator<UserSlice> = (set) => {
  const update = (newUser: Partial<UserValue> | UserValue) =>
    set((state) => ({ user: { ...state.user, ...newUser } }));
  return {
    user: initialUserState,
    updateUser: update,
    setUser: (user: UserValue) => update({ ...user, ...FETCH_STATE.FETCHED }),
    removeUser: () => set({ user: FETCH_STATE.UN_FETCHED }),
  };
};
