export interface TravelerState {
    id: string;
    travelerProfile: string | null;
    hasCurrentTrip: boolean;
    hasPastTrip: boolean;
    isActive: boolean;
    hasValidAddress: boolean;
}