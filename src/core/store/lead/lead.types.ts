import { Lead } from "@/core/types";
import { StoreState, UpdateState } from "../store.types";

export type LeadValue = Lead;

export interface LeadSlice {
  lead: StoreState<LeadValue>;
  leadUpdate: UpdateState<LeadValue>;
  leadStore: (lead: Lead) => void;
}
