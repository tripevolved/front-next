import { Card, Modal, Divider } from "mars-ds";
import { Picture, Text } from "@/ui";
import type { FlightCardProps } from "./flight-edit-card.types";
import React from "react";
import { FlightDetails } from "./components/flight-details";
import {
  capitalizeFirstLetter,
  convertDate,
  extractCityName,
  formatPrice,
  getHourOfFlight,
  subtractOriginDestinationDates,
} from "./flight-edit.helpers";
import { Plane } from "@/ui/icons/plane";
import { Flight } from "@/core/types/flight-options";

export function FlightEditCard({
  flight,
  selectedFlight,
  handleSelectedFlight,
  destination,
  origin,
  flightPrice,
}: FlightCardProps) {
  const originFlight = flight.flights.find(
    (flight: { origin: { description: string } }) =>
      flight.origin.description === origin.description
  );

  const destinationFlight = flight.flights.find(
    (flight: { destination: { description: string } }) =>
      flight.destination.description === destination.description
  );

  const airlineIcon = flight.flights.find((flight: { iconUrl: string }) => flight.iconUrl)?.iconUrl;

  const addDurations = () => {
    const flightDurations = flight.flights.map((flight: Flight) => {
      const [hours, minutes] = flight.duration.split(":").map(Number);
      return {
        hours,
        minutes,
      };
    });

    const total = flightDurations.reduce(
      (acc: { hours: any; minutes: any }, time: { hours: any; minutes: any }) => {
        acc.hours += time.hours;
        acc.minutes += time.minutes;
        return acc;
      },
      { hours: 0, minutes: 0 }
    );

    total.hours += Math.floor(total.minutes / 60);
    total.minutes = total.minutes % 60;

    return `${total.hours}h${total.minutes > 0 ? total.minutes : ""}`;
  };

  const handleDetails = () => {
    const modal = Modal.open(
      () => (
        <FlightDetails
          flight={flight}
          destination={destination}
          origin={origin}
          departureOrigin={destinationFlight}
          arrivalDestination={originFlight}
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
            selectedFlight?.id === flight.id
              ? "1px solid var(--color-brand-1)"
              : "1px solid var(--color-gray-3)",
        }}
      >
        <div className="container">
          <div className="flex flex-column w-100">
            <div className="header">
              <Picture
                className="airline-icon"
                src={airlineIcon ? airlineIcon : "/assets/blank-image.png"}
              />
              <div>
                <Text
                  as="span"
                  size="xl"
                  style={{ color: "var(--color-brand-1)", fontWeight: "bold" }}
                >
                  R${formatPrice(flightPrice)}
                </Text>
              </div>
            </div>
            <Divider />
            <div className="flight__edit__card__main__content">
              <div className="mt-sm flex gap-xl flight__details__container">
                <div className="flex flex-row flex-grow align-middle gap-md wrapper">
                  <div
                    className="flex flex-column gap-sm"
                    style={{ alignItems: "flex-start", maxWidth: "250px" }}
                  >
                    <span>{convertDate(originFlight.departureDate)}</span>
                    <span className="flight__edit__card__flight__hour">
                      {getHourOfFlight(originFlight.departureTime)}
                    </span>
                    <Text
                      style={{ color: "var(--color-brand-1)", fontWeight: "bold" }}
                      size="sm"
                      variant="heading"
                      className="text-2xl font-bold text-teal-500"
                    >
                      {origin.iataCode}
                    </Text>
                    <span>{capitalizeFirstLetter(extractCityName(origin.description))}</span>
                  </div>
                  <div className="flight__trip__resumee__wrapper">
                    <div className="plane__icon__wraper">
                      <Plane className="plane__icon" />
                    </div>
                    <div
                      className="flex flex-column gap-sm"
                      style={{ alignItems: "flex-start", maxWidth: "250px" }}
                    >
                      <span>{convertDate(destinationFlight.arrivalDate)}</span>
                      <span className="flight__edit__card__flight__hour">
                        {getHourOfFlight(destinationFlight.arrivalTime)}
                      </span>
                      <Text style={{ color: "var(--color-brand-1)" }} size="sm" variant="heading">
                        {destination.iataCode}
                      </Text>
                      <span>{capitalizeFirstLetter(extractCityName(destination.description))}</span>
                    </div>
                  </div>
                </div>

                <Divider id="divider-mobile" />

                <div className="flight__resumee">
                  <div>
                    {flight.flights.slice(0, 2).map((flight: Flight) => (
                      <React.Fragment key={flight.id}>
                        <div
                          className="flex flex-row"
                          style={{
                            marginBottom: "5px",
                            alignItems: "center",
                          }}
                        >
                          <div className="flight__edit__card__marker" />
                          <strong className="flight__edit__card__flight__info">{`${
                            flight.mandatoryAirline.iataCode
                          }${flight.number} - ${extractCityName(
                            flight.origin.description
                          )}`}</strong>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flight__details__button__wrapper">
                    <span>Tempo de viagem: {addDurations()}</span>
                    <button className="flight__details__button" onClick={handleDetails}>
                      Exibir detalhes do voo
                    </button>
                  </div>
                </div>
                <div className="flight__additional__informations__container">
                  {
                    <Text as="span" size="lg" style={{ color: "var(--color-brand-1)" }}>
                      Sua viagem terá duração de{" "}
                      {subtractOriginDestinationDates(
                        originFlight.departureDate,
                        destinationFlight.arrivalDate
                      )}{" "}
                      dia
                      {subtractOriginDestinationDates(
                        originFlight.departureDate,
                        destinationFlight.arrivalDate
                      ) > 1 && "s"}
                    </Text>
                  }
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
                  <Text
                    as="span"
                    size="lg"
                    style={{ color: "var(--color-brand-1)", marginTop: "0" }}
                  >
                    {flight.numSteps > 2 ? (
                      <span>Este voo possui {flight.numSteps - 1} paradas</span>
                    ) : (
                      <span>Esta viagem não possui paradas</span>
                    )}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
