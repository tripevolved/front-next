// Database table models based on PostgreSQL schema

export interface CruiseCompany {
  id: number;
  name: string;
  description: string;
  logo_url: string;
}

export interface Cruise {
  id: number;
  created_at: string;
  last_updated_at: string | null;
  title: string;
  unique_name: string;
  description: string;
  type: string;
  duration: number;
  cruise_company_id: number;
}

export interface CruiseAsset {
  id: number;
  created_at: string;
  last_updated_at: string | null;
  url: string;
  short_description: string | null;
  type: string; // e.g., 'image', 'video', etc.
  cruise_id: number;
}

export interface CruiseItinerary {
  id: number;
  created_at: string;
  last_updated_at: string | null;
  start_date_time: string;
  end_date_time: string;
  cruise_id: number;
}

export interface Destination {
  id: number;
  created_at: string;
  last_updated_at: string | null;
  name: string;
  unique_name: string;
  description: string | null;
  state_province: string | null;
  country: string;
}

export interface CruiseItineraryDestination {
  id: number;
  created_at: string;
  last_updated_at: string | null;
  day: number;
  title: string;
  description: string;
  highlight: string | null;
  cruise_itinerary_id: number;
  destination_id: number;
}

export interface CruiseItineraryAsset {
  id: number;
  created_at: string;
  last_updated_at: string | null;
  url: string;
  short_description: string | null;
  type: string;
  cruise_itinerary_destination_id: number;
}

// Extended models with relations (for API responses)

export interface CruiseWithCompany extends Cruise {
  cruise_companies: CruiseCompany;
}

export interface CruiseWithAssets extends Cruise {
  cruise_assets: CruiseAsset[];
}

export interface CruiseWithCompanyAndAssets extends Cruise {
  cruise_companies: CruiseCompany;
  cruise_assets: CruiseAsset[];
}

export interface CruiseItineraryDestinationWithDetails extends CruiseItineraryDestination {
  destinations: Destination;
  cruise_itinerary_assets: CruiseItineraryAsset[];
}

export interface CruiseItineraryWithDestinations extends CruiseItinerary {
  cruise_itinerary_destinations: CruiseItineraryDestinationWithDetails[];
}

export interface CruiseDetailedResponse extends Cruise {
  cruise_companies: CruiseCompany;
  cruise_assets: CruiseAsset[];
  cruise_itineraries: CruiseItineraryWithDestinations[];
}

// API Response types

export interface CruisesListResponse {
  cruises: CruiseWithCompanyAndAssets[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CruiseDetailResponse {
  cruise: CruiseDetailedResponse;
}

export interface ErrorResponse {
  error: string;
}

// Query parameters types

export interface CruisesQueryParams {
  type?: string;
  page?: number;
  limit?: number;
}

