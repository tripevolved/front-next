import type { StateCreator } from "zustand";
import { TravelerStateSlice, TravelerStateValue } from "./traveler.types";
import { initialTravelerStateValue } from "./traveler.constants";
import { FETCH_STATE } from "../store.helpers";
import { TravelerState } from "@/core/types";

export const createTravelerStateSlice: StateCreator<TravelerStateSlice> = (set) => {
  const update = (newTravelerState: Partial<TravelerStateValue> | TravelerStateValue) =>
    set((state) => ({ travelerState: { ...state.travelerState, ...newTravelerState } }));

  return {
    travelerState: initialTravelerStateValue,
    updateTravelerState: update,
    setTravelerState: (travelerState: TravelerState | null) => {
      if (!travelerState) return;
      const fetchedState = travelerState.id ? FETCH_STATE.FETCHED : FETCH_STATE.ERROR;
      update({ ...travelerState, ...fetchedState });
    },
  };
};
