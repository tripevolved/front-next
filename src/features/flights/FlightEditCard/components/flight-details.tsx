import { Flight, FlightOptions } from "@/core/types/flight-options";
import { Picture } from "@/ui";
import { Caption, Heading, Icon, Text } from "mars-ds";
import { extractCityName, formatDate, getHourOfFlight } from "../flight-edit.helpers";

interface FlightDetails {
  flight: FlightOptions;
  destination: { iataCode: string; description: string };
  origin: { iataCode: string; description: string };
  departureOrigin?: Flight;
  arrivalDestination?: Flight;
}

export function FlightDetails({
  flight,
  destination,
  origin,
  departureOrigin,
  arrivalDestination,
}: FlightDetails) {
  const destinationArrivalIndex = flight.flights.findIndex(
    (f: Flight) => f.destination.iataCode === destination.iataCode
  );

  const outboundFlights = flight.flights.slice(0, destinationArrivalIndex + 1);

  const returnFlights = flight.flights.slice(destinationArrivalIndex + 1);

  const FlightCard = ({ flight }: { flight: Flight }) => {
    return (
      <div key={flight.number}>
        <div className="flight__details">
          <div className="__wrapper">
            <div className="flight__informations">
              <div className="flight__company__logo">
                <Picture
                  src={flight.iconUrl ? flight.iconUrl : "/assets/blank-image.png"}
                  alt={flight.mandatoryAirline.description}
                  style={{ height: "1.5rem", width: "1.5rem" }}
                />
              </div>
              <div className="airplane__details__wrapper">
                <p style={{ fontSize: "0.875rem", color: "#0AB9AD", fontWeight: 500 }}>
                  {flight.mandatoryAirline.description}
                </p>
                <div className="airplane__number">
                  <p>
                    Voo
                    <span id="flight__number">
                      {flight.mandatoryAirline.iataCode}
                      {flight.number}
                    </span>
                  </p>
                  <span id="separator">-</span>
                  <span id="flight__cabin">{flight.cabin}</span>
                </div>
              </div>
            </div>
            <div className="flight__date__wrapper">
              <Icon name="calendar" style={{ width: "1rem", height: "1rem", color: "#0AB9AD" }} />
              <span style={{ fontWeight: 500 }}>{formatDate(flight.departureDate)}</span>
            </div>
          </div>

          <div className="flight__schedule__container">
            <div className="flight__schedule__wrapper">
              <div style={{ flex: 1 }}>
                <h3 className="flight__airport">{extractCityName(flight.origin.description)}</h3>
                <div className="flight__iata__code__wrapper">
                  <span>{flight.origin.iataCode}</span>
                </div>
                <p className="flight__hour">{getHourOfFlight(flight.departureTime)}</p>
              </div>

              <div className="flight__schedule__separator__container">
                <div className="flight__schedule__separator__wrapper">
                  <div className="flight__schedule__separator" />
                  <Picture
                    style={{
                      color: "#0AB9AD",
                    }}
                    src="/assets/transportation/flight_yellow.svg"
                  />
                  <div className="flight__schedule__separator" />
                </div>
                <div className="flight__duration__container">
                  <Icon name="clock" style={{ width: "1rem", height: "1rem" }} />
                  <span>
                    {parseInt(flight.duration.split(":")[0], 10)}h
                    {parseInt(flight.duration.split(":")[1], 10)}min
                  </span>
                </div>
              </div>

              <div style={{ flex: 1, textAlign: "right" }}>
                <h3 className="flight__airport">
                  {extractCityName(flight.destination.description)}
                </h3>
                <div id="destination" className="flight__iata__code__wrapper">
                  <span>{flight.destination.iataCode}</span>
                </div>
                <p className="flight__hour">{getHourOfFlight(flight.arrivalTime)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ zIndex: 1000 }}>
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
              {departureOrigin?.origin.description}
            </span>{" "}
            <Icon name="arrow-right" />{" "}
            <span
              style={{
                color: "var(--color-brand-1)",
                fontWeight: 700,
              }}
            >
              {arrivalDestination?.destination.description}
            </span>
          </Caption>

          <Caption>Viagem com {flight.durationTime.slice(0, -3)} horas de duração</Caption>
        </div>

        <div>
          <Heading size="sm" style={{ marginBottom: "1rem" }}>
            Ida
          </Heading>
          {outboundFlights.map((flight: Flight) => (
            <FlightCard key={flight.number} flight={flight} />
          ))}

          <Heading size="sm" style={{ marginBottom: "1rem" }}>
            Volta
          </Heading>
          {returnFlights.map((flight: Flight) => (
            <FlightCard flight={flight} key={flight.number} />
          ))}
        </div>
      </div>
    </>
  );
}
