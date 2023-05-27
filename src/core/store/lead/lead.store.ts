import type { StateCreator } from "zustand";
import { LeadSlice, LeadValue } from "./lead.types";
import { initialLeadValue } from "./lead.constants";
import { FETCH_STATE, makeState } from "../store.helpers";
import { Lead } from "@/core/types";

export const createLeadSlice: StateCreator<LeadSlice> = (set) => ({
  lead: makeState<LeadValue>(initialLeadValue),
  leadUpdate: (newLead) =>
    set((state) => {
      const lead = { ...state.lead, ...newLead };
      return { lead };
    }),
  leadStore: (lead: Lead) => {
    set({ lead: { ...lead, ...FETCH_STATE.FETCHED } });
  },
});
