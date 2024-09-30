import type { StateCreator } from "zustand";
import type { SimpleItinerarySlice, SimpleItineraryValue } from "./itinerary.types";

import { initialSimpleItineraryState } from "./itinerary.constants";
import { FETCH_STATE } from "../store.helpers";

export const createSimpleItinerarySlice: StateCreator<SimpleItinerarySlice> = (set) => {
  const update = (newSimpleItinerary: SimpleItineraryValue) =>
    set((state) => ({ ...state, ...newSimpleItinerary.actions }));
  return {
    simpleItinerary: initialSimpleItineraryState,
    updateSimpleItineraryState: update,

    setSimpleItinerary: (simpleItinerary: SimpleItineraryValue) =>
      set({ simpleItinerary: { ...simpleItinerary, ...FETCH_STATE.FETCHED } }),
    clearSimpleItinerary: () => set({ simpleItinerary: initialSimpleItineraryState }),
  };
};
