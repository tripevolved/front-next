import { Card, Modal, Divider } from "mars-ds";
import { Picture, Text } from "@/ui";
import type { FlightCardProps } from "./flight-edit-card.types";
import React from "react";
import { FlightDetails } from "./components/flight-details";
import {
  capitalizeFirstLetter,
  convertDate,
  extractCityName,
  extractDayFromDate,
  formatPrice,
  getHourOfFlight,
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
    (flight: { origin: { description: any } }) => flight.origin.description === origin.description
  );

  const destinationFlight = flight.flights.find(
    (flight: { destination: { description: any } }) =>
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

  const subtractOriginDestinationDates = (originDate: string, destinationDate: string) => {
    const originDateDay = extractDayFromDate(originDate);
    const destinationDateDay = extractDayFromDate(destinationDate);
    const subtractedDate = destinationDateDay - originDateDay + 1;

    console.log(`subtracting ${destinationDateDay} - ${originDateDay} + 1 = ${subtractedDate}`);

    return subtractedDate;
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
            selectedFlight === flight.id
              ? "1px solid var(--color-brand-1)"
              : "1px solid var(--color-gray-3)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "20px",
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
            <div className="container__flight_edit_card">
              <div
                className="mt-sm flex gap-xl flight__edit__card__wrapper"
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className="flex flex-row flex-grow align-middle gap-md"
                  style={{
                    textAlign: "center",
                    alignItems: "center",
                    width: "20rem",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    className="flex flex-column gap-sm"
                    style={{ alignItems: "flex-start", maxWidth: "250px" }}
                  >
                    <span>{convertDate(originFlight.departureDate)}</span>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "1.5rem",
                      }}
                    >
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
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        marginTop: "0",
                      }}
                    >
                      <Plane className="plane__icon" />
                    </div>
                    <div
                      className="flex flex-column gap-sm"
                      style={{ alignItems: "flex-start", maxWidth: "250px" }}
                    >
                      <span>{convertDate(destinationFlight.arrivalDate)}</span>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: "1.5rem",
                        }}
                      >
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
                          <div
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              backgroundColor: "var(--color-brand-1)",
                              marginRight: 10,
                            }}
                          />
                          <strong
                            style={{
                              maxWidth: 400,
                              fontWeight: 600,
                              fontSize: "15px",
                            }}
                          >{`${flight.mandatoryAirline.iataCode}${
                            flight.number
                          } - ${extractCityName(flight.origin.description)}`}</strong>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      marginTop: "0",
                    }}
                  >
                    <span>Tempo de viagem: {addDurations()}</span>
                    <button className="flight__details__button" onClick={handleDetails}>
                      Exibir detalhes do voo
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "0",
                  }}
                >
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
