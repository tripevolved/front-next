import { LocalStorageService } from "@/services/store/local-storage.service";
import { Lead } from "@/types";

const KEY_LEAD = "lead";

export const getLocal = () => LocalStorageService.getJson<Lead>(KEY_LEAD);

export const deleteLocal = () => LocalStorageService.remove(KEY_LEAD);

export const saveLocal = (lead: Lead) => {
  LocalStorageService.saveJson(KEY_LEAD, lead);
}

export const LeadLocalService = { get: getLocal, save: saveLocal, remove: deleteLocal }
