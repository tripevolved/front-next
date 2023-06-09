import type { TripDetails } from "@/core/types";
import { LocalStorageService } from "@/services/store/local-storage.service";

const KEY_TRIP = "currentTrip";

interface LocalTrip {
  id: string;
}

export const TripLocalService = {
  get: () => LocalStorageService.getJson<LocalTrip>(KEY_TRIP),
  save: (trip: TripDetails) => LocalStorageService.saveJson(KEY_TRIP, trip),
  remove: () => LocalStorageService.remove(KEY_TRIP),
};
