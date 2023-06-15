import type { TravelerStateValue } from "./traveler.types";

export const initialTravelerStateValue = {
  id: "",
  travelerProfile: null,
  hasCurrentTrip: false,
  hasPastTrip: false,
  isActive: false,
  hasValidAddress: false
} satisfies TravelerStateValue;
