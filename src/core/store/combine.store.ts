import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { GLOBAL_STORE_NAME } from "@/core/configs/store.config";

import { type AccessesSlice, createAccessesSlice } from "./accesses";
import { type LeadSlice, createLeadSlice } from "./lead";
import { type UserSlice, createUserSlice } from "./user";

export type StoreSlices = AccessesSlice & LeadSlice & UserSlice;

export const useAppStore = create<StoreSlices>()(
  devtools(
    persist(
      (...a) => ({
        ...createAccessesSlice(...a),
        ...createLeadSlice(...a),
        ...createUserSlice(...a),
      }),
      { name: GLOBAL_STORE_NAME }
    )
  )
);
