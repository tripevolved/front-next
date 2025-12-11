export interface CruiseExperience {
  name: string;
  description: string;
  duration: string;
  category: 'onboard' | 'shore' | 'dining' | 'entertainment';
  image?: string;
  price?: string;
  included: boolean;
}

export interface CruiseItinerary {
  totalDays: number;
  daysAtSea: number;
  ports: {
    name: string;
    country: string;
    arrivalTime?: string;
    departureTime?: string;
    duration: string;
    image?: string;
    highlights: string[];
  }[];
  route: string;
}

export interface CruiseShip {
  name: string;
  company: string;
  capacity: number;
  yearBuilt: number;
  refurbished?: number;
  length: string;
  width: string;
  decks: number;
  image: string;
  features: string[];
  amenities: {
    category: string;
    items: string[];
  }[];
  dining: {
    name: string;
    type: 'main' | 'specialty' | 'casual';
    description: string;
    included: boolean;
    image?: string;
  }[];
  entertainment: {
    name: string;
    type: 'show' | 'activity' | 'venue';
    description: string;
    image?: string;
  }[];
}

export interface Cruise {
  // Basic information (thumbnail view)
  name: string;
  description: string;
  images: string[];
  duration: string;
  
  // Detailed information
  details: {
    // Main section - most important details
    main: {
      departurePort: string;
      arrivalPort: string;
      departureDate: string;
      arrivalDate: string;
      cabinType: string;
      price: string;
      highlights: string[];
      included: string[];
      notIncluded: string[];
    };
    
    // Itinerary section
    itinerary: CruiseItinerary;
    
    // Experiences section
    experiences: CruiseExperience[];
    
    // Ship section
    ship: CruiseShip;
  };
}
