import type { CruiseWithCompanyAndAssets } from '@/app/api/cruises/models';

export type CruiseType = 'relax' | 'destination' | 'adventure' | 'bucketlist';

export interface CruiseCardData {
  id: string;
  title: string;
  company: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  departureDate: string;
  arrivalDate: string;
  departurePort: string;
  arrivalPort: string;
  cabinType: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
}

interface CruisesResponse {
  cruises: CruiseCardData[];
  total: number;
  page: number;
  totalPages: number;
}

interface CruisesRequestParams {
  type: CruiseType;
  page?: number;
  limit?: number;
}

/**
 * Maps database cruise model to card data format
 */
function mapCruiseToCardData(cruise: CruiseWithCompanyAndAssets): CruiseCardData {
  // Get the first image asset if available
  const imageAsset = cruise.cruise_assets?.find(asset => asset.type === 'image');
  
  return {
    id: String(cruise.id),
    title: cruise.title,
    company: cruise.cruise_companies?.name || 'Unknown',
    description: cruise.description,
    image: imageAsset?.url || '/assets/placeholder-cruise.jpg',
    price: 'A partir de R$ 3.500', // TODO: Add price field to database
    duration: `${cruise.duration} noites`,
    departureDate: '', // TODO: Get from cruise_itineraries
    arrivalDate: '', // TODO: Get from cruise_itineraries
    departurePort: '', // TODO: Add to database schema
    arrivalPort: '', // TODO: Add to database schema
    cabinType: 'Cabine com Varanda', // TODO: Add to database schema
    highlights: [], // TODO: Extract from description or add to schema
    included: [], // TODO: Add to database schema
    notIncluded: [], // TODO: Add to database schema
  };
}

export const getCruisesByType = async ({
  type,
  page = 1,
  limit = 3,
}: CruisesRequestParams): Promise<CruisesResponse> => {
  const params = new URLSearchParams({
    type,
    page: String(page),
    limit: String(limit)
  });
  
  const response = await fetch(`/api/cruises?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Ensure fresh data from Supabase
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `Failed to fetch cruises: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Map database cruises to card data format
  return {
    cruises: data.cruises.map(mapCruiseToCardData),
    total: data.total,
    page: data.page,
    totalPages: data.totalPages,
  };
};
