import { Card, Button, Modal, Divider } from "mars-ds";

import { Picture, Text } from "@/ui";

import type { FlightCardProps } from "./flight-edit-card.types";
import React from "react";
import { FlightDetails } from "./components/flight-details";
import {
  capitalizeFirstLetter,
  extractCityName,
  extractDayFromDate,
  formatPrice,
  getHourOfFlight,
} from "./flight-edit.helpers";

export function FlightEditCard({
  flight,
  selectedFlight,
  handleSelectedFlight,
  destination,
  origin,
  flightPrice,
}: FlightCardProps) {
  const arrivalDestination = flight.flights.find(
    (flight: { destination: { description: any } }) =>
      flight.destination.description === destination.description
  );

  const departureOrigin = flight.flights.find(
    (flight: { origin: { description: any } }) => flight.origin.description === origin.description
  );

  const iconFlight = flight.flights.find((flight: { iconUrl: string }) => flight.iconUrl)?.iconUrl;

  const handleDetails = () => {
    const modal = Modal.open(
      () => (
        <FlightDetails
          flight={flight}
          destination={destination}
          origin={origin}
          departureOrigin={departureOrigin}
          arrivalDestination={arrivalDestination}
        />
      ),
      {
        closable: true,
        size: "lg",
        onClose: () => {},
        style: {
          zIndex: 1000,
        },
      }
    );
  };

  return (
    <>
      <Card
        onClick={() => handleSelectedFlight(flight.id)}
        className="flight-edit-card flex-column"
        elevation="md"
        style={{
          border:
            selectedFlight === flight.id
              ? "1px solid var(--color-brand-1)"
              : "1px solid var(--color-gray-3)",
        }}
      >
        <div className="flex flex-column w-100">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Picture
              className="flight-card__airline__airline-logo-company"
              style={{
                margin: "initial",
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
                alignItems: "center",
              }}
              src={iconFlight ? iconFlight : "/assets/blank-image.png"}
            />
            <div>
              <Text as="span" size="xl" style={{ color: "var(--color-brand-1)" }}>
                R${formatPrice(flightPrice)}
              </Text>
            </div>
          </div>
          <Divider />
          <div className="container__flight_edit_card">
            <div
              className="mt-sm flex flex-column gap-xl"
              style={{
                alignItems: "center",
              }}
            >
              <div
                className="flex flex-row flex-grow align-middle gap-md"
                style={{ textAlign: "center", alignItems: "center" }}
              >
                <div
                  className="flex flex-column gap-sm"
                  style={{ alignItems: "center", maxWidth: "250px" }}
                >
                  <span>
                    {new Date(departureOrigin.departureDate).toLocaleDateString()}
                    {" - "}
                    {getHourOfFlight(departureOrigin.departureTime)}
                  </span>
                  <Text style={{ color: "var(--color-brand-1)" }} size="sm" variant="heading">
                    {origin.iataCode}
                  </Text>
                  <span>{capitalizeFirstLetter(extractCityName(origin.description))}</span>
                </div>
                <Picture
                  style={{ alignContent: "center" }}
                  src="/assets/transportation/flight_yellow.svg"
                />
                <div
                  className="flex flex-column gap-sm"
                  style={{ alignItems: "center", maxWidth: "250px" }}
                >
                  <span>
                    {new Date(arrivalDestination.arrivalDate).toLocaleDateString()}
                    {" - "}
                    {getHourOfFlight(arrivalDestination.arrivalTime)}
                  </span>
                  <Text style={{ color: "var(--color-brand-1)" }} size="sm" variant="heading">
                    {arrivalDestination.destination.iataCode}
                  </Text>
                  <span>
                    {capitalizeFirstLetter(
                      extractCityName(arrivalDestination.destination.description)
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Divider id="divider-mobile" />
            <div>
              <div>
                {flight.flights.slice(0, 2).map((flight: any, index: number, array: any) => (
                  <>
                    <div className="flex flex-row gap-md align-center" key={flight.id}>
                      <div
                        key={flight.id}
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
                          maxWidth: 400,
                          fontWeight: 700,
                        }}
                      >{`${flight.departureTime.slice(0, -3)}- ${extractCityName(
                        flight.origin.description
                      )} - ${flight.mandatoryAirline.iataCode}${flight.number}`}</strong>
                    </div>
                    {index !== array.length - 1 && (
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
                        <span>{`Tempo de viagem: ${flight.duration.split(":")[0]}h${
                          flight.duration.split(":")[1]
                        }`}</span>
                      </div>
                    )}
                  </>
                ))}
                <Button
                  variant="naked"
                  style={{
                    display: "flex",
                    justifyContent: "center",

                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                    color: "var(--color-brand-1)",
                    textDecoration: "none",
                    fontWeight: 700,
                    textDecorationColor: "var(--color-brand-1)",
                    textDecorationLine: "underline",
                  }}
                  onClick={handleDetails}
                >
                  Exibir Detalhes do voo
                </Button>
              </div>
            </div>
            <Divider id="divider-mobile" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "0",
              }}
            >
              {extractDayFromDate(departureOrigin.departureDate) <=
                extractDayFromDate(arrivalDestination.arrivalDate) && (
                <Text as="span" size="lg" style={{ color: "var(--color-brand-1)" }}>
                  Sua viagem terá duração de{" "}
                  {extractDayFromDate(arrivalDestination.arrivalDate) -
                    extractDayFromDate(departureOrigin.departureDate) +
                    1}{" "}
                  dia
                  {extractDayFromDate(arrivalDestination.arrivalDate) -
                    extractDayFromDate(departureOrigin.departureDate) +
                    1 >
                    1 && "s"}
                </Text>
              )}
              <Text
                as="span"
                size="md"
                style={{
                  marginTop: "0",
                }}
              >
                Despacho de bagagem incluso
              </Text>
              <Text
                as="span"
                size="md"
                style={{
                  marginTop: "0",
                }}
              >
                Wi-fi disponível
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
