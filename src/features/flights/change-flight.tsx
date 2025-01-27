import { Text } from "@/ui";
import { FlightEditCard } from "./FlightEditCard";
import { mock } from "./mock";
import { Button } from "mars-ds";
import { useState } from "react";

export function ChangeFlight() {
  const handleSave = () => {
    console.log("Salvo com sucesso");
  };

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
        }}
      >
        {mock.map((flight, i) => (
          <FlightEditCard
            flight={flight}
            key={i}
            handleSelectedFlight={handleSelectedFlight}
            selectedFlight={selectedFlight}
          />
        ))}
      </div>

      <Button
        variant="tertiary"
        style={{
          position: "fixed",
          bottom: "125px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
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
