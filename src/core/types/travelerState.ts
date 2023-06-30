export interface TravelerState {
  id: string;
  travelerProfile: string | null;
  name: string;
  hasCurrentTrip: boolean;
  hasPastTrip: boolean;
  isActive: boolean;
  hasValidAddress: boolean;
}
