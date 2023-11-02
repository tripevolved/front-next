import type { FlightDetailsPainelProps } from "./flight-details-painel.types";
import { render } from "@testing-library/react";
import { FlightDetailsPainel } from "./flight-details-painel.component";
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
    flightTime: "20:20:00",
    departure: "2023-11-02T23:30:00",
    arrival: "2023-11-03T19:50:00",
    fromAirportCode: "POA",
    fromAirportName: "Salgado Filho",
    toAirportCode: "FEN",
    toAirportName: "Fernando de Noronha",
    connections: 3,
    outboundFlightDetails: [
      {
        airlineCompanyLogoUrl: "",
        flightTime: "01:40:00",
        departure: "2023-11-02T23:30:00",
        arrival: "2023-11-03T01:10:00",
        fromAirportCode: "POA",
        fromAirportName: "Salgado Filho",
        fromAirportAddress: "Endereço de Teste",
        toAirportCode: "CGH",
        toAirportName: "Congonhas",
        toAirportAddress: "Endereço de Teste",
      },
    ],
    returnFlightDetails: [
      {
        airlineCompanyLogoUrl: "",
        flightTime: "00:25:00",
        departure: "2023-11-05T20:15:00",
        arrival: "2023-11-05T20:40:00",
        fromAirportCode: "FEN",
        fromAirportName: "Fernando de Noronha",
        fromAirportAddress: "Endereço de Teste",
        toAirportCode: "REC",
        toAirportName: "Guararapes - Gilberto Freyre Internacional",
        toAirportAddress: "Endereço de Teste",
      },
    ],
  },
  isBuilding: false,
  isSelected: true,
  message: "",
};

const makeSut = (props?: FlightDetailsPainelProps) =>
  render(<FlightDetailsPainel {...props} transportationData={mock} />);

describe("<FlightDetailsPainel>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
