import type { StateCreator } from "zustand";
import type { UserSlice } from "./user.types";
import { initialUserState } from "./user.constants";

export const createUserSlice: StateCreator<UserSlice> = () => ({
  user: initialUserState,
});
