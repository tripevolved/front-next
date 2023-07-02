import { TripDestination } from "@/core/types/destination";

export interface TripDetails {
  id: string;
  destination: TripDestination;
  configuration: TripConfiguration;
  transportation?: TripTransportation;
  // stay?: TripStay;
  // script?: TripScriptPreview;
  // foodTips: TripFoodTips;
  // support: TripSupportInformation;
  // price: TripPriceDetails;
}

export interface TripTransportation {
  companyLogoUrl?: string;
  type: string;
  title: string;
  departure: string;
  arrival: string;
}

export interface TripConfiguration {
  dates: string;
  period: string;
  budget: string;
}

// Traveler Dashboard
export interface TripDashboard {
  pedingActions: number;
  documents: number;
  flightAndTickets: number;
  tips: number;
  attractionsNumber: number;
}

export interface TripMatchedDestination {
  destinationId: string;
  isYourChoice: boolean;
  matchScore: number;
  price: number;
  name: string;
  uniqueName: string;
}

export interface TripProposal {
  mainChoice: TripMatchedDestination;
  otherChoices?: TripMatchedDestination[];
}

export interface TripAbstract {
  id: string;
  imageUrl: string | null;
  viewType: number;
  period: string;
  destinationProposal: TripProposal;
  tripDashboard: TripDashboard;
}

export interface AllTrips {
  currentTrip: TripAbstract | null;
  otherTrips: TripAbstract[];
}
