import { FETCH_STATE } from "../store.helpers";
import type { SimpleItineraryState } from "./itinerary.types";

export const initialSimpleItineraryState = {
  actions: [
    {
      title: "",
      type: "ROUTE",
    },
  ],
  ...FETCH_STATE.UN_FETCHED,
} satisfies SimpleItineraryState;
