import type { StateCreator } from "zustand";
import { LeadSlice, LeadValue } from "./lead.types";
import { initialLeadValue } from "./lead.constants";
import { FETCH_STATE, makeState } from "../store.helpers";
import { Lead } from "@/core/types";

export const createLeadSlice: StateCreator<LeadSlice> = (set) => {
  const update = (newLead: Partial<LeadValue> | LeadValue) =>
    set((state) => ({ lead: { ...state.lead, ...newLead } }));

  return {
    lead: makeState<LeadValue>(initialLeadValue),
    leadUpdate: update,
    leadCreate: (lead: Lead | null) => {
      if (!lead) return;
      const fetchedState = lead.id ? FETCH_STATE.FETCHED : FETCH_STATE.ERROR;
      update({ ...lead, ...fetchedState });
    },
  };
};
