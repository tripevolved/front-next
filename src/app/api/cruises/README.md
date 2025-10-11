# Cruises API Documentation

## Overview
This API provides endpoints for fetching cruise data from Supabase with proper TypeScript typing.

## Endpoints

### GET `/api/cruises`

Fetches cruises filtered by type with pagination support.

#### Query Parameters
- `type` (required): Cruise type - one of: `relax`, `destination`, `adventure`, `bucketlist`
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 3)

#### Example Request
```typescript
const response = await fetch('/api/cruises?type=relax&page=1&limit=3');
const data = await response.json();
```

#### Response Format
```typescript
{
  cruises: CruiseWithCompanyAndAssets[],
  total: number,
  page: number,
  totalPages: number
}
```

Each cruise includes:
- Basic cruise information (id, title, description, duration, etc.)
- Related cruise company details (name, description, logo_url)
- Associated assets (images, videos, etc.)

#### Error Response
```typescript
{
  error: string
}
```

## Type Definitions

### Database Models
Located in `models.ts`, these match the PostgreSQL schema:

- **CruiseCompany**: Cruise line companies
- **Cruise**: Main cruise entity
- **CruiseAsset**: Images/videos for cruises
- **CruiseItinerary**: Cruise schedule/dates
- **Destination**: Geographic locations
- **CruiseItineraryDestination**: Day-by-day itinerary
- **CruiseItineraryAsset**: Assets for specific itinerary days

### Extended Models
- **CruiseWithCompany**: Cruise with company info joined
- **CruiseWithAssets**: Cruise with assets joined
- **CruiseWithCompanyAndAssets**: Cruise with both company and assets
- **CruiseDetailedResponse**: Full cruise data with itineraries

## Usage in Components

```typescript
import { getCruisesByType } from '@/clients/cruises/cruises';

// Fetch cruises
const data = await getCruisesByType({ 
  type: 'relax', 
  page: 1, 
  limit: 3 
});

// data.cruises is automatically mapped to CruiseCardData format
console.log(data.cruises); // Array of CruiseCardData
console.log(data.total); // Total count
console.log(data.totalPages); // Total pages
```

## Database Schema

### Tables Relationships
```
cruise_companies (1) ──< (many) cruises
cruises (1) ──< (many) cruise_assets
cruises (1) ──< (many) cruise_itineraries
cruise_itineraries (1) ──< (many) cruise_itinerary_destinations
cruise_itinerary_destinations (many) >── (1) destinations
cruise_itinerary_destinations (1) ──< (many) cruise_itinerary_assets
```

## Data Mapping

The API returns database models which are mapped to `CruiseCardData` format in the client:

| Database Field | Card Data Field | Notes |
|---------------|----------------|-------|
| `id` | `id` | Converted to string |
| `title` | `title` | Direct mapping |
| `cruise_companies.name` | `company` | Company name |
| `description` | `description` | Direct mapping |
| `cruise_assets[0].url` | `image` | First image asset |
| `duration` | `duration` | Formatted as "X noites" |

### Fields TODO
Some fields in `CruiseCardData` need database schema updates:
- `price`: Need to add price field
- `departureDate/arrivalDate`: Get from cruise_itineraries
- `departurePort/arrivalPort`: Need to add to schema
- `cabinType`: Need to add to schema
- `highlights`: Extract from description or add field
- `included/notIncluded`: Need to add to schema

## Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Future Enhancements

1. Add POST endpoint for creating cruises
2. Add PUT endpoint for updating cruises
3. Add DELETE endpoint for removing cruises
4. Add detailed cruise endpoint: GET `/api/cruises/[id]`
5. Add filtering by company, duration, dates
6. Add search functionality
7. Implement caching strategy

