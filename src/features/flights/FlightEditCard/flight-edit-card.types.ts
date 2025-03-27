import { FlightOptions } from "@/core/types/flight-options";

export interface FlightCardProps {
  flight: any;
  selectedFlight: FlightOptions | null;
  handleSelectedFlight: (flightId: number) => void;
  destination: any;
  origin: any;
  flightPrice: number;
  durationTime: string;
}
