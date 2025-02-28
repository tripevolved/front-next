import { Text } from "@/ui";
import { FlightEditCard } from "./FlightEditCard";
import { mock } from "./mock";
import { Button } from "mars-ds";
import { useState } from "react";
import { FlightsService } from "@/services/api";
import useSWR from "swr";

export function ChangeFlight({ tripId }: { tripId: string }) {
  const handleSave = () => {
    console.log("Salvo com sucesso");
  };

  const flightsFetcher = async () => FlightsService.getFlightOptions(tripId);

  const { data: flightOptionsData, isLoading, error } = useSWR(`flights-${tripId}`, flightsFetcher, {
    revalidateOnFocus: false,
  });

  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);

  const handleSelectedFlight = (flightId: number) => {
    if (selectedFlight === flightId) {
      setSelectedFlight(null);
      return;
    }
    setSelectedFlight(flightId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Text as="h2" size="xxl" style={{ color: "var(--color-brand-1" }}>
            <strong>Mudar o voo de ida</strong>
          </Text>
          <Button variant="custom" size="md" onClick={() => console.log("close")}>
            X
          </Button>
        </div>

        <Text
          as="h3"
          size="xl"
          style={{
            fontWeight: 400,
          }}
        >
          Voo de ida
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          marginBottom: "30px",
        }}
      >
        {flightOptionsData?.map((flight: any, i: number) => (
          <FlightEditCard
            flight={flight}
            destination={flight.destination}
            origin={flight.origin}
            key={i}
            handleSelectedFlight={handleSelectedFlight}
            selectedFlight={selectedFlight}
            flightPrice={flight.totalPrice}
          />
        ))}
      </div>

      <Button
        variant="tertiary"
        style={{
          position: "fixed",
          bottom: "15px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          width: "90%",
          maxWidth: "400px",
          padding: "1rem",
          opacity: "100%",
        }}
        onClick={handleSave}
        disabled={!selectedFlight}
      >
        Salvar
      </Button>
    </div>
  );
}
