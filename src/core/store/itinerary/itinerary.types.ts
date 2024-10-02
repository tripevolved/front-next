import type { SimpleItinerary, ItineraryListV2 } from "@/core/types";
import { StoreState, UpdateState } from "../store.types";

export type SimpleItineraryValue = Partial<SimpleItinerary>;

export type SimpleItineraryState = StoreState<SimpleItineraryValue>;
export type ItineraryListV2State = StoreState<ItineraryListV2>;

export interface SimpleItinerarySlice {
  simpleItinerary: SimpleItineraryState;
  updateSimpleItineraryState: UpdateState<SimpleItineraryValue>;
  setSimpleItinerary: (simpleItinerary: SimpleItineraryValue) => void;
  clearSimpleItinerary: VoidFunction;
}
