

export interface FlightCardProps {
  flight: any;
  selectedFlight: number | null;
  handleSelectedFlight: (flightId: number) => void;
}
