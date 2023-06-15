import type { Lead } from "@/core/types";
import { LocalStorageService } from "@/services/store/local-storage.service";
import { GLOBAL_STORE_NAME } from "@/core/configs/store.config";

const KEY_LEAD = "lead";

interface TripStore {
  state?: LocalState;
}

interface LocalState {
  lead?: LocalLead;
};

interface LocalLead {
  id?: string;
  email?: string;
}

export const LeadLocalService = {
  get: () => LocalStorageService.getJson<TripStore>(GLOBAL_STORE_NAME)?.state?.lead,
  save: (lead: Lead) => LocalStorageService.saveJson(KEY_LEAD, lead),
  remove: () => LocalStorageService.remove(KEY_LEAD),
};
