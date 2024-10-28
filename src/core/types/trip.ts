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

export interface FlightDetails {
  airlineCompanyLogoUrl: string;
  flightTime: string;
  flightCode: string;
  departure: string;
  arrival: string;
  fromAirportCode: string;
  fromAirportName: string;
  fromAirportAddress: string;
  luggageInfo: string;
  toAirportAddress: string;
  toAirportCode: string;
  toAirportName: string;
  connections: number;
  classFamily?: string;
}

export interface FlightView {
  airlineCompanyLogoUrl: string;
  flightTime: string;
  departure: string;
  arrival: string;
  connections: number;
  fromAirportCode: string;
  fromAirportName: string;
  flightDetails: FlightDetails[];
  toAirportCode: string;
  toAirportName: string;
}

export interface CompanyFlightView {
  airlineCompanyLogoUrl: string;
  outboundFlight: FlightView;
  returnFlight: FlightView;
}

export interface TripTransportation {
  partnerLogoUrl?: string;
  isReady: boolean;
  iconSlug: "car" | "flight" | "bus" | "train" | "rentalcar";
  transportationType: "ROUTE" | "FLIGHT" | "TRANSFER";
  departure: string;
  estimatedArrival: string;
  description: string;
  isSelected: boolean;
  fromAddress?: string;
  fromName?: string;
  isBuilding: boolean;
  isRouteFinished: boolean;
  isOffBudget: boolean;
  message: string;
  toAddress?: string;
  toName?: string;
  flightView: CompanyFlightView;
  previousActionId: string | null;
  nextActionId: string | null;
  actionId: string;
  from: string | null;
  fromLatitude: number;
  fromLongitude: number;
  isMain: boolean;
}

export interface TripConfiguration {
  formattedDates: string;
  startDate: string;
  endDate: string;
  period: string;
  budget: number;
  numAdults: number;
  numChildren: number;
  childrenAges: number[];
  rooms: TripConfigurationRoom[] | null;
}

export interface TripConfigurationRoom {
  numAdults: number;
  numChildren: number;
  childrenAges: number[];
}

// Traveler Dashboard
export interface TripDashboard {
  name: string;
  status: "AWAITING_ACTION" | "TO_HAPPEN" | "TAKEN" | "NONE";
  pendingActions: number;
  attractionsNumber: number;
  isScriptFinished: boolean;
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
  enableDeletion?: boolean;
}

export interface AllTrips {
  currentTrip?: TripListView | null;
  otherTrips?: TripListView[];
}

interface TripIncludes {
  title: string;
  slug: string | null;
}

export interface TripPrice {
  amount: number;
  amountWithDiscount: number | null;
  amountWithPixDiscount: number | null;
  price: number;
  serviceFee: number;
  pixDiscountAmount: number | null;
  pixPercentageDiscount: number | null;
  discountAmount: number | null;
  percentageDiscount: number | null;
  status: "NOT_READY" | "READY" | "PAID";
  description: string | null;
  includes: TripIncludes[];
}

export interface TripTravelers {
  tripId: string;
  travelers: Traveler[];
  travelerCount: number;
}

export interface TripTip {
  id: string;
  tripId: string;
  type: "RESTAURANT" | "ATTRACTION" | "INFORMATION" | "ALERT";
  title: string;
  subtitle: string | null;
  details: string;
  restaurantId: string | null;
  attractionId: string | null;
}
