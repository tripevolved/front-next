import { TripDestination } from "@/core/types/destination";
import { Photo } from "./photo";
import { Traveler } from "./traveler";

export interface TripDetails {
  id: string;
  destination: TripDestination;
  configuration: TripConfiguration;
  isBuilding: boolean;
  hasScript: boolean;
}

export interface TripTransportation {
  partnerLogoUrl?: string;
  iconSlug: "car" | "flight" | "bus" | "train" | "rentalcar";
  departure: string;
  estimatedArrival: string;
  description: string;
  isSelected: Boolean;
  fromAddress?: string;
  fromName?: string;
  isBuilding: boolean;
  isRouteFinished: boolean;
  message: string;
  toAddress?: string;
  toName?: string;
}

export interface TripConfiguration {
  dates: string;
  period: string;
  budget: number;
  numAdults: number;
  numChildren: number;
}

// Traveler Dashboard
export interface TripDashboard {
  name: string;
  status: "AWAITING_ACTION" | "TO_HAPPEN" | "TAKEN" | "NONE";
  pendingActions: number;
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
  otherChoices?: TripMatchedDestination[] | null;
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
  status: string;
  images: Photo[];
  period: string;
}

export interface AllTrips {
  currentTrip: TripListView | null;
  otherTrips: TripListView[];
}

export interface TripPrice {
  isPaid: boolean;
  price: number;
  serviceFee: number;
  description: string | null;
  total: number;
}

export interface TripTravelers {
  tripId: string;
  travelers: Traveler[];
  travelerCount: number;
}
