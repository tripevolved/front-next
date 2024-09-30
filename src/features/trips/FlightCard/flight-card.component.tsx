import { Card, ConsoleList, Divider } from "mars-ds";

import { Picture, Text } from "@/ui";

import type { FlightCardProps } from "./flight-card.types";

export function FlightCard({ flight }: FlightCardProps) {
  console.log(flight);
  return (
    <Card className="flight-card w-100 flex-column" elevation="md">
      <div className="flex flex-column w-100">
        <Picture
          className="flight-card__airline__airline-logo-company"
          src={
            flight.airlineCompanyLogoUrl ? flight.airlineCompanyLogoUrl : "/assets/blank-image.png"
          }
        />
        <Divider />
        <div
          className=" mt-sm flex flex-column sm:flex-row gap-xl"
          style={{ alignItems: "center" }}
        >
          <div className="flex flex-column gap-sm" style={{ alignItems: "center" }}>
            <span>{`${new Date(flight.departure).toLocaleDateString()} - ${String(
              new Date(flight.departure).getHours()
            ).padStart(2, "0")}:${String(new Date(flight.departure).getMinutes()).padStart(
              2,
              "0"
            )}`}</span>
            <Text style={{ color: "var(--color-brand-1)" }} size="sm" variant="heading">
              {flight.fromAirportCode}
            </Text>
            <span>{flight.fromAirportName}</span>
          </div>
          <Picture src="/assets/transportation/flight_yellow.svg" />
          <div className="flex flex-column gap-sm" style={{ alignItems: "center" }}>
            <span>{`${new Date(flight.arrival).toLocaleDateString()} - ${String(
              new Date(flight.arrival).getHours()
            ).padStart(2, "0")}:${String(new Date(flight.arrival).getMinutes()).padStart(
              2,
              "0"
            )}`}</span>
            <Text style={{ color: "var(--color-brand-1)" }} size="sm" variant="heading">
              {flight.toAirportCode}
            </Text>
            <span>{flight.toAirportName}</span>
          </div>
          <div className="flex flex-column gap-md align-end">
            <span>{flight.flightCode}</span>
            <span>{flight.luggageInfo}</span>
            <span>{`Tempo de viagem ${flight.flightTime.split(":")[0]}h${
              flight.flightTime.split(":")[1]
            }`}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
