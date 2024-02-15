import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { GLOBAL_STORE_NAME } from "@/core/configs/store.config";

import { type AccessesSlice, createAccessesSlice } from "./accesses";
import { type LeadSlice, createLeadSlice } from "./lead";
import { type UserSlice, createUserSlice } from "./user";
import { type TravelerStateSlice, createTravelerStateSlice } from "./traveler";
import { type TripScriptDaySlice, currentTripScriptDaySlice } from "./trip-day";
import { type AccommodationSlice, createAccommodationSlice } from "./accomodation";
import { type SimpleItinerarySlice, createSimpleItinerarySlice } from "./itinerary";

export type StoreSlices = AccessesSlice &
  LeadSlice &
  UserSlice &
  TravelerStateSlice &
  TripScriptDaySlice &
  AccommodationSlice &
  SimpleItinerarySlice;

export const useAppStore = create<StoreSlices>()(
  devtools(
    persist(
      (...a) => ({
        ...createAccessesSlice(...a),
        ...createLeadSlice(...a),
        ...createUserSlice(...a),
        ...createTravelerStateSlice(...a),
        ...currentTripScriptDaySlice(...a),
        ...createAccommodationSlice(...a),
        ...createSimpleItinerarySlice(...a),
      }),
      { name: GLOBAL_STORE_NAME }
    )
  )
);
