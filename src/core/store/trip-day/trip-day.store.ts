import type { StateCreator } from "zustand";
import { TripScriptDaySlice, TripScriptDayValue } from "./trip-day.types";
import { initialTripScriptDayValue } from "./trip-day.constants";
import { FETCH_STATE } from "../store.helpers";
import { TripScriptDay } from "@/core/types";

export const currentTripScriptDaySlice: StateCreator<TripScriptDaySlice> = (set) => {
  const update = (tripScriptDay: Partial<TripScriptDayValue> | TripScriptDayValue) =>
    set((state) => ({ tripScriptDay: { ...state.tripScriptDay, ...tripScriptDay } }));

  return {
    tripScriptDay: initialTripScriptDayValue,
    updateTripScriptDay: update,
    setTripScriptDay(tripScriptDay: TripScriptDay | null) {
      if (!tripScriptDay) return;
      const fetchedState = tripScriptDay.id ? FETCH_STATE.FETCHED : FETCH_STATE.ERROR;

      update({ ...tripScriptDay, ...fetchedState });
    },
  };
};
