import { TravelerState } from "@/core/types";
import { StoreState, UpdateState } from "../store.types";

export type TravelerStateValue = TravelerState;

export interface TravelerStateSlice {
  travelerState: StoreState<TravelerStateValue>;
  updateTravelerState: UpdateState<TravelerStateValue>;
  setTravelerState: (travelerState: TravelerStateValue | null) => void;
}
