export interface FlightCardProps {
  flight: any;
  selectedFlight: number | null;
  handleSelectedFlight: (flightId: number) => void;
  destination: any;
  origin: any;
  flightPrice: number;
}
