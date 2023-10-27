import type { TripStay } from "@/core/types";
import { StoreState, UpdateState } from "../store.types";

export type AccommodationValue = Partial<TripStay & { uniqueTransactionId?: string }>;

export type AccommodationState = StoreState<AccommodationValue>;

export interface AccommodationSlice {
  accommodation: AccommodationState;
  updateAccommodationState: UpdateState<AccommodationValue>;
  setAccommodation: (accommodation: AccommodationValue) => void;
  clearAccommodation: VoidFunction;
}
