import { TripScriptDay, TripScriptDayDetail } from "@/core/types";
import { UpdateState } from "../store.types";

export type TripScriptDayValue = TripScriptDay;

export interface TripScriptDaySlice {
  tripScriptDay: TripScriptDayValue;
  updateTripScriptDay: UpdateState<TripScriptDay>;
  setTripScriptDay: (tripScriptDay: TripScriptDay | null) => void;
}
