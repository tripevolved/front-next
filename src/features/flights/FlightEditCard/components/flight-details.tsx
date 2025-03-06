import { Flight } from "@/core/types/flight-options";
import { Picture } from "@/ui";
import { Caption, Heading, Icon, Text } from "mars-ds";

interface FlightDetails {
  flight: Flight;
  destination: { iataCode: string; description: string };
  origin: { iataCode: string; description: string };
  departureOrigin: { departureDate: string; origin: { description: string } };
  arrivalDestination: { destination: { description: string } };
}

export function FlightDetails({
  flight,
  destination,
  origin,
  departureOrigin,
  arrivalDestination,
}: any) {
  const outboundFlights = flight.flights.filter(
    (f: any) =>
      f.origin.iataCode !== destination.iataCode && f.destination.iataCode !== origin.iataCode
  );
  const returnFlights = flight.flights.filter(
    (f: any) =>
      f.origin.iataCode === destination.iataCode || f.destination.iataCode === origin.iataCode
  );

  const extractCityName = (location: string) => {
    const parts = location.split(" - ");
    return parts.length > 1 ? parts[1] : parts[0];
  };

  const getHourOfFlight = (flightTime: string) => {
    const flightTimeRemovedSeconds = flightTime.slice(0, -3);

    return flightTimeRemovedSeconds;
  };

  const FlightCard = ({ flight }: any) => {
    return (
      <div key={flight.number}>
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
              <Icon name="calendar" style={{ width: "1rem", height: "1rem", color: "#0AB9AD" }} />
              <span style={{ fontWeight: 500 }}>{formatDate(departureOrigin.departureDate)}</span>
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
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#0AB9AD" }}>
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
                  <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#0AB9AD" }}>
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
      </div>
    );
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
          {outboundFlights.map((flight: any) => (
            <FlightCard flight={flight} key={flight.number} />
          ))}

          <Heading size="sm" style={{ marginBottom: "1rem" }}>
            Volta
          </Heading>
          {returnFlights.map((flight: any, index: number) => (
            <FlightCard flight={flight} key={flight.number} />
          ))}
        </div>
      </div>
    </>
  );
}
