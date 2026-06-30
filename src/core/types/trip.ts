import { Traveler } from "./traveler";
import type { TravelIntent } from "./travelIntent";
import type { DestinationProposalResponse } from "./recommendations";

export enum TravelerType {
  COUPLE = "COUPLE",
  INDIVIDUAL = "INDIVIDUAL",
  FRIENDS = "FRIENDS",
  FAMILY = "FAMILY",
}

export type TripStatus = 'NEW' | 'PRE_PROPOSAL' | 'PROPOSAL' | 'MATCHED' | 'SET';

/** Statuses where the traveler may edit trip configuration (dates, budget, type) in the app. */
export const TRIP_STATUSES_ALLOW_CONFIGURATION_EDIT = ['NEW', 'PRE_PROPOSAL', 'SET'] as const;

export function isTripConfigurationEditableStatus(status: TripStatus | string | null | undefined): boolean {
  if (status == null || !String(status).trim()) return false;
  const key = String(status).trim().toUpperCase();
  return (TRIP_STATUSES_ALLOW_CONFIGURATION_EDIT as readonly string[]).includes(key);
}

export interface TripDetails {
  id: string;
  title: string;
  /** Trip lifecycle when returned by the API (same shape as list/timeline). */
  status?: TripStatus | string;
  /** Destination label/name when available (backend optional). */
  destination?: string | null;
  /** When set, used to load related destination suggestions (e.g. curators). */
  destinationUniqueName?: string | null;
  /** Collection unique name when the trip is inspired by a collection (nullable). */
  collection?: string | null;
  configuration: TripConfiguration;
  coverImage?: TripImage;
}

export interface TripImage {
  url: string;
  shortDescription?: string;
}

export interface TripVideo {
  url: string;
}

export interface FlightDetails {
  id?: number;
  airlineCompanyLogoUrl: string;
  flightTime: string;
  flightCode: string;
  departure: string;
  arrival: string;
  fromAirportCode: string;
  fromAirportName: string;
  fromAirportAddress: string;
  fromAirportServedCity: string;
  fromAirportServedStateProvinceCode: string | null;
  fromAirportServedCountry: string;
  luggageInfo: string;
  toAirportAddress: string;
  toAirportCode: string;
  toAirportName: string;
  toAirportServedCity: string;
  toAirportServedStateProvinceCode: string | null;
  toAirportServedCountry: string;
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
  startDate?: Date;
  endDate?: Date;
  month?: number;
  /** When set by API, reflects flexible budget flag used in updates. */
  hasFlexibleBudget?: boolean;
  budget: number;
  numAdults: number;
  numChildren: number;
  childrenAges: number[];
  rooms: TripConfigurationRoom[] | null;
  travelerType?: TravelerType;
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
  images: TripImage[];
  matchScore: number;
  price: number;
  name: string;
  uniqueName: string;
  destinationType?: DestinationType;
  features?: string[];
  details?: string;
  whyRecommended?: string;
  alignmentLabel?: string;
  alignedWithIntent?: Array<{ key: string; label: string }>;
  tradeoffs?: string[];
  bestFor?: string[];
}

export type DestinationType =
  | "POINT_OF_INTEREST"
  | "CRUISE"
  | "ACCOMMODATION"
  | "LOCAL"
  | "AIRPORT"
  | "CITY"
  | "REGION"
  | "STATE"
  | "COUNTRY"
  | "MACRO_REGION"
  | "CONTINENT";

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
  destination?: string;
  description?: string;
  status: TripStatus | string;
  images: TripImage[];
  /** @deprecated Use startDate/endDate instead */
  period?: string;
  startDate?: string | null;
  endDate?: string | null;
  price?: number | null;
  savings?: number | null;
  estimatedPrice?: number | null;
  estimatedSavings?: number | null;
  enableDeletion?: boolean;
}

export interface AllTrips {
  trips?: TripListView[];
  amountSaved?: number | null;
  estimatedAmountToBeSaved?: number | null;
}

export interface TripTravelers {
  tripId: string;
  travelers: Traveler[];
  travelerCount: number;
}

export interface TripDates {
  startDate: string | null
  endDate: string | null
  /**
   * Month of travel (1-12). When set, `startDate`/`endDate` are typically null.
   */
  month: number | null

  /**
   * When true, the backend should treat the selection as flexible around the selected month.
   */
  anyMonthFlexibility: boolean
  minDays: number
  maxDays: number
}

export interface CreateTripRoom {
  adults: number
  children: number
  type: TravelerType
  childrenAges: number[]
}

export interface CreateTripTravelers {
  adults?: number
  children?: number
  childrenAges?: number[]
  rooms?: CreateTripRoom[]

  type: TravelerType
}

export interface CreateTripDetails {
  travelerProfile: string
  tripDescription?: string
}

export interface CreateTripRequest {
  travelerId: string;
  goals: string[];
  /**
   * New contract: details container (profile + trip description).
   */
  tripDetails: CreateTripDetails

  budget: {
    maxBudget: number | null
    isFlexible: boolean
  }

  dates: TripDates
  travelers: CreateTripTravelers

  /**
   * New contract flag. When true, the backend should generate destination recommendations.
   */
  shouldRecommendDestinations?: boolean

  mode?: "PROPOSAL" | "CONSULTANCY"

  /** Collection unique name when the trip is inspired by a collection (nullable). */
  collection?: string | null

  /** Destination unique name when the traveler already chose a destination (nullable). */
  destination?: string | null

  /** Funnel: structured travel intent from discovery flow */
  travelIntent?: TravelIntent
  metadata?: Record<string, unknown>
  destinationProposal?: DestinationProposalResponse
  selectedDestinationUniqueName?: string
}
