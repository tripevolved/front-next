import type { StateCreator } from "zustand";
import type { AccessesSlice } from "./accesses.types";
import { initialAccessesState } from "./accesses.constants";

export const createAccessesSlice: StateCreator<AccessesSlice> = () => ({
  accesses: initialAccessesState
})
