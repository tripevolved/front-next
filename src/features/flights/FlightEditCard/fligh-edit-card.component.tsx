import { Card, Divider, Icon, Button } from "mars-ds";

import { Picture, Text } from "@/ui";

import type { FlightCardProps } from "./flight-edit-card.types";

export function FlightEditCard({ flight, selectedFlight, handleSelectedFlight }: FlightCardProps) {
  const getHourOfFlight = (departure: string) => {
    const departureDate = new Date(departure);

    const getHour = String(departureDate.getHours()).padStart(2, "0");
    const getMinutes = String(departureDate.getMinutes()).padStart(2, "0");

    return `${getHour}:${getMinutes}`;
  };

  console.log(flight);

  return (
    <>
      <Card
        onClick={() => handleSelectedFlight(flight.id)}
        className="flight-card flex-column"
        elevation="md"
        style={{
          border:
            selectedFlight === flight.id
              ? "1px solid var(--color-brand-1)"
              : "1px solid var(--color-gray-3)",
        }}
      >
        <div className="flex flex-column w-100">
          <div className="flight__infos__wrapper">
            <Picture
              className="flight-card__airline__airline-logo-company"
              style={{
                margin: "initial",
              }}
              src={
                flight.airlineCompanyLogoUrl
                  ? flight.airlineCompanyLogoUrl
                  : "/assets/blank-image.png"
              }
            />
            <div>
              <Text
                as="span"
                size="lg"
                style={{
                  fontWeight: 700,
                }}
              >
                {getHourOfFlight(flight.departure)}
              </Text>{" "}
              -{" "}
              <Text
                as="span"
                size="lg"
                color="var(--color-brand-2)"
                style={{
                  fontWeight: 700,
                }}
              >
                {getHourOfFlight(flight.arrival)}
              </Text>
            </div>
            <div>
              <Text as="span" size="xxl" style={{ color: "var(--color-brand-1" }}>
                R$410,00
              </Text>
            </div>
          </div>

          <Divider />
          <div
            id="flight-card-main-content"
            className=" mt-sm flex flex-column  gap-md"
            style={{ alignItems: "start" }}
          >
            <div
              style={{
                width: "100%",
              }}
            >
              <div className="flex flex-row gap-md align-center">
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    border: "solid",
                    borderWidth: 1,
                    borderColor: "var(--color-brand-1)",
                  }}
                />
                <strong
                  style={{
                    maxWidth: 180,
                  }}
                >{`${String(new Date(flight.arrival).getHours()).padStart(2, "0")}:${String(
                  new Date(flight.departure).getMinutes()
                ).padStart(2, "0")} - ${flight.fromAirportName}`}</strong>
              </div>
              <div className="flight__time__text py-md pl-lg">
                <Text as="span" size="sm">{`Tempo de viagem: ${flight.flightTime.split(":")[0]}h${
                  flight.flightTime.split(":")[1]
                }`}</Text>
              </div>
              <div className="flex flex-row gap-md align-center">
                <div className="return__flight__wrapper" />
                <strong
                  style={{
                    maxWidth: 250,
                  }}
                >
                  14:30 - Aeroporto de Confins
                </strong>
              </div>
            </div>

            <div
              className="flex flex-column align-end"
              style={{
                width: "100%",
              }}
            >
              <Text as="span" size="sm">
                LATAM - Econômica - AD 8084
              </Text>
              <Text as="span" size="sm">
                Despacho de bagagem incluso
              </Text>
              <Text as="span" size="sm">
                Wi-Fi disponível, cobrado à parte
              </Text>
            </div>

            <div className="w-100 selectedMarker">
              {selectedFlight === flight.id && (
                <>
                  <Text as="span" size="xxl">
                    Selecionado
                  </Text>{" "}
                  <Icon name="check" size="sm" />
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
