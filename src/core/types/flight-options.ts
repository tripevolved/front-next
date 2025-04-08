export type Flight = {
  number: string;
  id: number;
  cabin: string;
  isLuggageIncluded: boolean;
  luggageIndicator: number;
  luggageWeight: number;
  luggageCount: number;
  luggageMeasureUnit: string;
  mandatoryAirline: {
    id: number;
    iataCode: string;
    description: string;
  };
  operationAirline: {
    id: number;
    iataCode: string;
    description: string;
  };
  class: string;
  company: string;
  isConnection: boolean;
  arrivalDate: string;
  arrivalTime: string;
  departureDate: string;
  departureTime: string;
  duration: string;
  equipment: string;
  stopovers: number;
  family: string;
  familyCode: string;
  segmentGroup: number;
  iconUrl: string;
  companyLocatorId: string;
  destination: {
    id: number;
    iataCode: string;
    description: string;
  };
  origin: {
    id: number;
    iataCode: string;
    description: string;
  };
  numberOfStops: number;
  segment: string;
};

export type FlightOptions = {
  company: {
    id: number;
    iataCode: string;
    description: string;
  };
  destination: {
    id: number;
    iataCode: string;
    description: string;
  };
  origin: {
    id: number;
    iataCode: string;
    description: string;
  };
  supplier: {
    id: number;
    code: number;
    name: string;
  };
  subSupplier: {
    id: number;
    code: number;
    name: string;
  };
  duration: number;
  id: number;
  externalId: string;
  numSteps: number;
  segment: string;
  durationTime: string;
  totalPrice: number;
  totalPriceOnlyFlights: number;
  totalNetPriceOnlyFlights: number;
  totalTax: number;
  totalFee: number;
  totalBoardingFee: number;
  pricePerAdult: number;
  pricePerChild: number | null;
  pricePerBaby: number | null;
  flights: Flight[];
};
