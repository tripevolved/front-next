import { TripDestination } from "@/core/types/destination";
import { Photo } from "./photo";
import { Traveler } from "./traveler";

export interface TripDetails {
  id: string;
  destination: TripDestination;
  configuration: TripConfiguration;
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
}

// Traveler Dashboard
export interface TripDashboard {
  name: string;
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
  status: string;
  images: Photo[];
  period: string;
}

export interface AllTrips {
  currentTrip: TripListView | null;
  otherTrips: TripListView[];
}

export interface TripStay {
  id: string; // AccommodationId
  coverImageUrl: string | null;
  name: string;
  tags: string;
  highlight: TripStayHighlight;
  details: TripStayDetails;
  isSelected: boolean;
}

export interface TripStayHighlight {
  title: string;
  description: string | null;
  type: "luxury" | "personnel" | "comfort" | "clean" | "rustic" | "location" | null;
}

export interface TripStayDetails {
  images: TripStayImage[] | null;
  information: string;
  checkInTip: string | null;
  address: string | null;
  price: number;
  features: TripStayFeature[];
  rooms: TripStayRoom[];
}

interface TripStayImage {
  url: string;
  altText: string | null;
}

interface TripStayFeature {
  title: string;
  type: string | null;
}

export interface TripStayRoom {
  id: string; // AccommodationRoomId
  coverImageUrl: string;
  title: string;
  subtitle: string | null;
  isSelected: boolean;
  price: number;
  details: TripStayRoomDetails;
  features: TripStayRoomFeature[];
}

interface TripStayRoomDetails {
  information: string;
  amenities: string[] | null;
}

interface TripStayRoomFeature {
  title: string;
  type: string | null;
}

export interface TripPrice {
  isPaid: boolean;
  price: number;
  serviceFee: number;
  description: string | null;
}

export interface TripTravelers {
  tripId: string;
  travelers: Traveler[];
}
