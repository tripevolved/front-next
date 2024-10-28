import type { FlightDetailsPanelProps } from "./flight-details-panel.types";
import { render } from "@testing-library/react";
import { FlightDetailsPanel } from "./flight-details-panel.component";
import type { TripTransportation } from "@/core/types";

const mock: TripTransportation = {
  iconSlug: "flight",
  partnerLogoUrl: "",
  departure: "2/nov./23 às 23:30",
  estimatedArrival: "3/nov./23 às 01:10",
  fromName: "POA - Salgado Filho",
  toName: "CGH - Congonhas",
  fromAddress: "",
  toAddress: "",
  isRouteFinished: true,
  isOffBudget: true,
  description: "POA - Salgado Filho\nCGH - Congonhas",
  flightView: {
    airlineCompanyLogoUrl: "",
    outboundFlight: {
      airlineCompanyLogoUrl: "",
      flightTime: "01:40:00",
      departure: "2023-11-02T23:30:00",
      arrival: "2023-11-03T01:10:00",
      fromAirportCode: "POA",
      fromAirportName: "Salgado Filho",
      toAirportCode: "CGH",
      toAirportName: "Congonhas",
      connections: 1,
      flightDetails: [],
    },
    returnFlight: {
      airlineCompanyLogoUrl: "",
      flightTime: "00:25:00",
      departure: "2023-11-05T20:15:00",
      arrival: "2023-11-05T20:40:00",
      fromAirportCode: "FEN",
      fromAirportName: "Fernando de Noronha",
      toAirportCode: "REC",
      toAirportName: "Guararapes - Gilberto Freyre Internacional",
      connections: 1,
      flightDetails: [],
    },
  },
  isBuilding: false,
  isSelected: true,
  message: "",
};

const makeSut = (props?: FlightDetailsPanelProps) =>
  render(<FlightDetailsPanel {...props} transportationData={mock} />);

describe("<FlightDetailsPanel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
