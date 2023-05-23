import type { Lead } from "@/core/types";
import { LocalStorageService } from "@/services/store/local-storage.service";

const KEY_LEAD = "lead";

export const LeadLocalService = {
  get: () => LocalStorageService.getJson<Lead>(KEY_LEAD),
  save: (lead: Lead) => LocalStorageService.saveJson(KEY_LEAD, lead),
  remove: () => LocalStorageService.remove(KEY_LEAD),
};
