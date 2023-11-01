import { Card, ConsoleList, Divider } from "mars-ds";

import { Picture } from "@/ui";

import type { FlightCardProps } from "./flight-card.types";
import { FlightBox } from "@/features";
import { toTimeOnlyString } from "@/utils/helpers/dates.helpers";

export function FlightCard({ flight }: FlightCardProps) {
  return (
    <Card className="flight-card w-100 flex-column" elevation="md">
      <div className="flight-card__airline w-100 flex-column align-items-center">
        <Picture
          className="flight-card__airline__airline-logo-company"
          src={
            flight.airlineCompanyLogoUrl ? flight.airlineCompanyLogoUrl : "/assets/blank-image.png"
          }
        />

        <FlightBox {...flight} hideTitle />
      </div>
      <Divider className="flight-card__divider" />
      <ConsoleList
        list={[
          {
            iconName: "map-pin",
            title: `${toTimeOnlyString(new Date(flight.departure))} - Aeroporto: ${
              flight.fromAirportName
            }`,
            subtitle: flight.fromAirportAddress && `${flight.fromAirportAddress}`,
            list: [{ title: `Tempo de viagem: ${flight.flightTime}` }],
          },
          {
            iconName: "map-pin",
            title: `${toTimeOnlyString(new Date(flight.departure))} - Aeroporto: ${
              flight.toAirportName
            }`,
            subtitle: flight.toAirportAddress && `${flight.fromAirportAddress}`,
          },
        ]}
      />
    </Card>
  );
}
