import { FETCH_STATE } from "../store.helpers";
import type { AccommodationState } from "./accommodation.types";

export const initialAccommodationState = {
  id: '',
  code: '',
  system: '',
  signature: '',
  provider: '',
  ...FETCH_STATE.UN_FETCHED,
} satisfies AccommodationState;
