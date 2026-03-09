import type { SimpleItinerary } from "@/core/types";
import { StoreState, UpdateState } from "../store.types";

export type SimpleItineraryValue = Partial<SimpleItinerary>;

export type SimpleItineraryState = StoreState<SimpleItineraryValue>;

export interface SimpleItinerarySlice {
  simpleItinerary: SimpleItineraryState;
  updateSimpleItineraryState: UpdateState<SimpleItineraryValue>;
  setSimpleItinerary: (simpleItinerary: SimpleItineraryValue) => void;
  clearSimpleItinerary: VoidFunction;
}
