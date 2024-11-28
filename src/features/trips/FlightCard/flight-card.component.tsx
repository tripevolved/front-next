import { Card, Divider } from "mars-ds";

import { Picture, Text } from "@/ui";

import type { FlightCardProps } from "./flight-card.types";

export function FlightCard({ flight }: FlightCardProps) {
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
          id="flight-card-main-content"
          className=" mt-sm flex flex-colun  gap-xl"
          style={{ alignItems: "center" }}
        >
          <div className="flex flex-row flex-grow align-middle gap-md" style={{textAlign: "center"}}>
            <div
              className="flex flex-column gap-sm"
              style={{ alignItems: "center", maxWidth: "160px" }}
            >
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
              <Text size="xs">
                {(flight.fromAirportServedStateProvinceCode 
                  ? `${flight.fromAirportServedCity}, ${flight.fromAirportServedStateProvinceCode}, ${flight.fromAirportServedCountry}`
                  : `${flight.fromAirportServedCity}, ${flight.fromAirportServedCountry}`)}
              </Text>
            </div>
            <Picture
              style={{ alignContent: "center" }}
              src="/assets/transportation/flight_yellow.svg"
            />
            <div
              className="flex flex-column gap-sm"
              style={{ alignItems: "center", maxWidth: "160px" }}
            >
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
              <Text size="xs">
                {(flight.toAirportServedStateProvinceCode 
                  ? `${flight.toAirportServedCity}, ${flight.toAirportServedStateProvinceCode}, ${flight.toAirportServedCountry}`
                  : `${flight.toAirportServedCity}, ${flight.toAirportServedCountry}`)}
              </Text>
            </div>
          </div>
          <Divider id="divider-mobile" />
          <div>
            <div className="flex flex-row gap-md align-center">
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  border: "solid",
                  borderWidth: 2,
                  borderColor: "var(--color-brand-1)",
                }}
              />
              <strong
                style={{
                  maxWidth: 180,
                  flexWrap: "nowrap",
                  textWrap: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >{`${String(new Date(flight.arrival).getHours()).padStart(2, "0")}:${String(
                new Date(flight.departure).getMinutes()
              ).padStart(2, "0")} - ${flight.fromAirportName}`}</strong>
            </div>
            <div
              style={{
                margin: "4px 0 4px 7px",
                borderWidth: 2,
                borderColor: "var(--color-brand-1)",
                borderStyle: "dashed",
                borderRight: "none",
                borderTop: " none",
                borderBottom: "none",
              }}
              className="py-md pl-lg"
            >
              <span>{`Tempo de viagem: ${flight.flightTime.split(":")[0]}h${
                flight.flightTime.split(":")[1]
              }`}</span>
            </div>
            <div className="flex flex-row gap-md align-center">
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  border: "solid",
                  borderWidth: 2,
                  borderColor: "var(--color-brand-1)",
                }}
              />
              <strong
                style={{
                  maxWidth: 180,
                  flexWrap: "nowrap",
                  textWrap: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >{`${String(new Date(flight.arrival).getHours()).padStart(2, "0")}:${String(
                new Date(flight.arrival).getMinutes()
              ).padStart(2, "0")} - ${flight.toAirportName}`}</strong>
            </div>
          </div>
          <Divider id="divider-mobile" />
          <div className="flex flex-column gap-md align-end">
            <span>{flight.flightCode}</span>
            <span>{flight.luggageInfo}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
