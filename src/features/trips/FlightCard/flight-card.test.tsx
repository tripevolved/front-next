import type { FlightCardProps } from "./flight-card.types";
import { render } from "@testing-library/react";
import { FlightCard } from "./flight-card.component";

const FAKE_PROPS: FlightCardProps = {
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

const makeSut = (props?: FlightCardProps) => render(<FlightCard {...FAKE_PROPS} {...props} />);

describe("<FlightCard>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
