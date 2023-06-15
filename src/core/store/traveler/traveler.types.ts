import { TravelerState } from "@/core/types";
import { UpdateState } from "../store.types";

export type TravelerStateValue = TravelerState;

export interface TravelerStateSlice {
  travelerState: TravelerStateValue;
  updateTravelerState: UpdateState<TravelerStateValue>;
  setTravelerState: (travelerState: TravelerStateValue | null) => void;
}
