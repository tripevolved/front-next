import { FlightOptions } from "@/core/types/flight-options";

export interface FlightCardProps {
  flight: FlightOptions;
  selectedFlight: FlightOptions | null;
  handleSelectedFlight: (flightId: number) => void;
  destination: FlightOptions["destination"];
  origin: FlightOptions["origin"];
  flightPrice: number;
  durationTime: string;
}
