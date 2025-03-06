import { Card, Button, Modal, Heading, Caption, Icon, Divider } from "mars-ds";

import { Picture, Text } from "@/ui";

import type { FlightCardProps } from "./flight-edit-card.types";
import React from "react";

export function FlightEditCard({
  flight,
  selectedFlight,
  handleSelectedFlight,
  destination,
  origin,
  flightPrice,
}: FlightCardProps) {
  
  const getHourOfFlight = (flightTime: string) => {
    const flightTimeRemovedSeconds = flightTime.slice(0, -3);

    return flightTimeRemovedSeconds;
  };

  const capitalizeFirstLetter = (string: string) => {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const arrivalDestination = flight.flights.find(
    (flight: { destination: { description: any } }) =>
      flight.destination.description === destination.description
  );

  console.log(flight);

  const departureOrigin = flight.flights.find(
    (flight: { origin: { description: any } }) => flight.origin.description === origin.description
  );

  const iconFlight = flight.flights.find((flight: { iconUrl: any }) => flight.iconUrl)?.iconUrl;

  const formattedPrice = (price?: number) => {
    return price && (price < 1000 ? price.toFixed(0) : (price / 1000).toFixed(3));
  };

  const extractDayFromDate = (date: string) => {
    const day = new Date(date).getDate();

    return day;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayOfWeek}, ${day} de ${month} de ${year}`;
  };

  const extractCityName = (location: string) => {
    const parts = location.split(" - ");
    return parts.length > 1 ? parts[1] : parts[0];
  };

  const handleDetails = () => {
    const outboundFlights = flight.flights.filter(
      (f: any) =>
        f.origin.iataCode !== destination.iataCode && f.destination.iataCode !== origin.iataCode
    );
    const returnFlights = flight.flights.filter(
      (f: any) =>
        f.origin.iataCode === destination.iataCode || f.destination.iataCode === origin.iataCode
    );

    const modal = Modal.open(
      () => (
        <div style={{ zIndex: 1000 }}>
          <React.Fragment key=".0">
            <div className="mb-lg">
              <Heading size="sm">
                <Text as="span" size="lg" style={{ color: "var(--color-brand-1)" }}>
                  Detalhes do voo
                </Text>
              </Heading>
              <Caption
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span
                  style={{
                    color: "var(--color-brand-1)",
                    fontWeight: 700,
                  }}
                >
                  {departureOrigin.origin.description}
                </span>{" "}
                <Icon name="arrow-right" />{" "}
                <span
                  style={{
                    color: "var(--color-brand-1)",
                    fontWeight: 700,
                  }}
                >
                  {arrivalDestination.destination.description}
                </span>
              </Caption>

              <Caption>Viagem com {flight.durationTime.slice(0, -3)} horas de duração</Caption>
            </div>

            <div>
              <Heading size="sm" style={{ marginBottom: "1rem" }}>
                Ida
              </Heading>
              {outboundFlights.map((flight: any, index: number) => (
                <React.Fragment key={flight.number}>
                  <div
                    style={{
                      borderRadius: "1rem",
                      border: "1px solid var(--color-gray-3)",
                      boxShadow: "var(--shadow-elevation-300)",
                      backgroundColor: "white",
                      padding: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(10, 185, 173, 0.3)",
                        paddingBottom: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "0.5rem",
                            backgroundColor: "rgba(10, 185, 173, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Picture
                            src={flight.iconUrl ? flight.iconUrl : "/assets/blank-image.png"}
                            alt={flight.mandatoryAirline.name}
                            style={{ height: "1.5rem", width: "1.5rem" }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <p style={{ fontSize: "0.875rem", color: "#0AB9AD", fontWeight: 500 }}>
                            {flight.mandatoryAirline.description}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "1rem",
                                color: "gray",
                                display: "flex",
                                gap: "0.2rem",
                                marginTop: "0",
                              }}
                            >
                              Voo
                              <span
                                style={{
                                  color: "#0AB9AD",
                                  fontWeight: 700,
                                }}
                              >
                                {flight.mandatoryAirline.iataCode}
                                {flight.number}
                              </span>
                            </p>
                            <span
                              style={{
                                fontWeight: 700,
                                color: "#0AB9AD",
                                fontSize: "1.25rem",
                              }}
                            >
                              -
                            </span>
                            <span
                              style={{
                                marginTop: "0",
                                fontWeight: 500,
                              }}
                            >
                              {flight.cabin}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.875rem",
                        }}
                      >
                        <Icon
                          name="calendar"
                          style={{ width: "1rem", height: "1rem", color: "#0AB9AD" }}
                        />
                        <span style={{ fontWeight: 500 }}>
                          {formatDate(departureOrigin.departureDate)}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "grid", gap: "2rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "1.5rem",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0AB9AD" }}>
                            {extractCityName(flight.origin.description)}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginTop: "0.5rem",
                            }}
                          >
                            <span
                              style={{ fontSize: "0.875rem", fontWeight: 500, color: "#0AB9AD" }}
                            >
                              {flight.origin.iataCode}
                            </span>
                          </div>
                          <p style={{ fontSize: "0.875rem", fontWeight: 700, marginTop: "0.5rem" }}>
                            {getHourOfFlight(flight.departureTime)}
                          </p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              width: "8rem",
                            }}
                          >
                            <div style={{ height: "2px", flex: 1, backgroundColor: "#0AB9AD" }} />
                            <Picture
                              style={{
                                color: "#0AB9AD",
                              }}
                              src="/assets/transportation/flight_yellow.svg"
                            />
                            <div style={{ height: "2px", flex: 1, backgroundColor: "#0AB9AD" }} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.375rem",
                              fontSize: "0.875rem",
                              color: "#0AB9AD",
                              fontWeight: 500,
                            }}
                          >
                            <Icon name="clock" style={{ width: "1rem", height: "1rem" }} />
                            <span>
                              {parseInt(flight.duration.split(":")[0], 10)}h
                              {parseInt(flight.duration.split(":")[1], 10)}min
                            </span>
                          </div>
                        </div>

                        <div style={{ flex: 1, textAlign: "right" }}>
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0AB9AD" }}>
                            {extractCityName(flight.destination.description)}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              gap: "0.5rem",
                              marginTop: "0.5rem",
                            }}
                          >
                            <span
                              style={{ fontSize: "0.875rem", fontWeight: 500, color: "#0AB9AD" }}
                            >
                              {flight.destination.iataCode}
                            </span>
                          </div>
                          <p style={{ fontSize: "0.875rem", fontWeight: 700, marginTop: "0.5rem" }}>
                            {getHourOfFlight(flight.arrivalTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}

              <Heading size="sm" style={{ marginBottom: "1rem" }}>
                Volta
              </Heading>
              {returnFlights.map((flight: any, index: number) => (
                <React.Fragment key={flight.number}>
                  <div
                    style={{
                      borderRadius: "1rem",
                      border: "1px solid var(--color-gray-3)",
                      boxShadow: "var(--shadow-elevation-300)",
                      backgroundColor: "white",
                      padding: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(10, 185, 173, 0.3)",
                        paddingBottom: "1rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "0.5rem",
                            backgroundColor: "rgba(10, 185, 173, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Picture
                            src={flight.iconUrl ? flight.iconUrl : "/assets/blank-image.png"}
                            alt={flight.mandatoryAirline.name}
                            style={{ height: "1.5rem", width: "1.5rem" }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <p style={{ fontSize: "0.875rem", color: "#0AB9AD", fontWeight: 500 }}>
                            {flight.mandatoryAirline.description}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "1rem",
                                color: "gray",
                                display: "flex",
                                gap: "0.2rem",
                                marginTop: "0",
                              }}
                            >
                              Voo
                              <span
                                style={{
                                  color: "#0AB9AD",
                                  fontWeight: 700,
                                }}
                              >
                                {flight.mandatoryAirline.iataCode}
                                {flight.number}
                              </span>
                            </p>
                            <span
                              style={{
                                fontWeight: 700,
                                color: "#0AB9AD",
                                fontSize: "1.25rem",
                              }}
                            >
                              -
                            </span>
                            <span
                              style={{
                                marginTop: "0",
                                fontWeight: 500,
                              }}
                            >
                              {flight.cabin}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.875rem",
                        }}
                      >
                        <Icon
                          name="calendar"
                          style={{ width: "1rem", height: "1rem", color: "#0AB9AD" }}
                        />
                        <span style={{ fontWeight: 500 }}>
                          {formatDate(departureOrigin.departureDate)}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "grid", gap: "2rem" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "1.5rem",
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0AB9AD" }}>
                            {extractCityName(flight.origin.description)}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginTop: "0.5rem",
                            }}
                          >
                            <span
                              style={{ fontSize: "0.875rem", fontWeight: 500, color: "#0AB9AD" }}
                            >
                              {flight.origin.iataCode}
                            </span>
                          </div>
                          <p style={{ fontSize: "0.875rem", fontWeight: 700, marginTop: "0.5rem" }}>
                            {getHourOfFlight(flight.departureTime)}
                          </p>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.75rem",
                              width: "8rem",
                            }}
                          >
                            <div style={{ height: "2px", flex: 1, backgroundColor: "#0AB9AD" }} />
                            <Picture
                              style={{
                                color: "#0AB9AD",
                              }}
                              src="/assets/transportation/flight_yellow.svg"
                            />
                            <div style={{ height: "2px", flex: 1, backgroundColor: "#0AB9AD" }} />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.375rem",
                              fontSize: "0.875rem",
                              color: "#0AB9AD",
                              fontWeight: 500,
                            }}
                          >
                            <Icon name="clock" style={{ width: "1rem", height: "1rem" }} />
                            <span>
                              {parseInt(flight.duration.split(":")[0], 10)}h
                              {parseInt(flight.duration.split(":")[1], 10)}min
                            </span>
                          </div>
                        </div>

                        <div style={{ flex: 1, textAlign: "right" }}>
                          <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0AB9AD" }}>
                            {extractCityName(flight.destination.description)}
                          </h3>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-end",
                              gap: "0.5rem",
                              marginTop: "0.5rem",
                            }}
                          >
                            <span
                              style={{ fontSize: "0.875rem", fontWeight: 500, color: "#0AB9AD" }}
                            >
                              {flight.destination.iataCode}
                            </span>
                          </div>
                          <p style={{ fontSize: "0.875rem", fontWeight: 700, marginTop: "0.5rem" }}>
                            {getHourOfFlight(flight.arrivalTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </React.Fragment>
        </div>
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

  console.log(flight.flights);
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
        <div className="flex flex-column w-100" style={{}}>
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
                R${formattedPrice(flightPrice)}
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
                  dias
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
