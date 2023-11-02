import type { FlightCardProps } from "./flight-card.types";
import { render } from "@testing-library/react";
import { FlightCard } from "./flight-card.component";
import type { FlightDetails } from "@/core/types";

const mock: { flight: FlightDetails } = {
  flight: {
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
};

const makeSut = (props?: FlightCardProps = mock) => render(<FlightCard {...props} />);

describe("<FlightCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
