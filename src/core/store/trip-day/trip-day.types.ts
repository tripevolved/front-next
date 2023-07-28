import { TripScriptAction, TripScriptDay, TripScriptDayDetail } from "@/core/types";
import { UpdateState } from "../store.types";

export type TripScriptDayValue = TripScriptDay;

export interface TripScriptDaySlice {
  tripScriptDay: TripScriptDayValue;
  updateTripScriptDay: UpdateState<TripScriptAction>;
  setTripScriptDay: (scriptAction: TripScriptAction | null) => void;
}
