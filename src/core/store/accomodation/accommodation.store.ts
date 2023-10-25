import type { StateCreator } from "zustand";
import type { AccommodationSlice, AccommodationValue } from "../accomodation";

import { initialAccommodationState } from "./accommodation.constants";
import { FETCH_STATE } from "../store.helpers";

export const createAccommodationSlice: StateCreator<AccommodationSlice> = (set) => {
  const update = (newAccommodation: AccommodationValue) =>
    set((state) => ({ accommodation: { ...state.accommodation, ...newAccommodation } }));
  return {
    accommodation: initialAccommodationState,
    updateAccommodationState: update,
    setAccommodation: (accommodation: AccommodationValue) =>
      set({ accommodation: { ...accommodation, ...FETCH_STATE.FETCHED } }),
    clearAccommodation: () => set({ accommodation: initialAccommodationState }),
  };
};
