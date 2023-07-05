import { TripDestination } from "@/core/types/destination";
import { Photo } from "./photo";

export interface TripDetails {
  id: string;
  destination: TripDestination;
  configuration: TripConfiguration;
  // transportation?: TripTransportation;
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
  images: Photo[];
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
  viewType: "ORGANIZATION" | "PROPOSAL";
  destinationProposal?: TripProposal;
  tripDashboard?: TripDashboard;
}

export interface TripListView {
  id: string;
  title: string;
  images: Photo[];
  period: string;
}

export interface AllTrips {
  currentTrip: TripListView | null;
  otherTrips: TripListView[];
}
