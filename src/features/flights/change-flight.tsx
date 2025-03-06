import { EmptyState, ErrorState, Text } from "@/ui";
import { FlightEditCard } from "./FlightEditCard";
import { Button, Grid, Skeleton } from "mars-ds";
import { useState } from "react";
import { FlightsService } from "@/services/api";
import useSWR from "swr";

export function ChangeFlight({ tripId }: { tripId: string }) {
  const [selectedFlight, setSelectedFlight] = useState<number | null>(null);

  const flightsFetcher = async () => FlightsService.getFlightOptions(tripId);

  const {
    data: flightOptionsData,
    isLoading: isLoadingFlightsOptions,
    error: errorFetchingFlightOptions,
  } = useSWR(`flights-${tripId}`, flightsFetcher, {
    revalidateOnFocus: false,
  });

  const handleSelectedFlight = (flightId: number) => {
    if (selectedFlight === flightId) {
      setSelectedFlight(null);
      return;
    }
    setSelectedFlight(flightId);
  };

  const handleSave = () => {
    console.log("Salvo com sucesso");
  };

  if (errorFetchingFlightOptions) return <ErrorState />;

  return (
    <div className="change__flight_wrapper">
      <div className="container">
        <div className="text__wrapper">
          <Text as="h2" size="xxl" style={{ color: "var(--color-brand-1" }}>
            <strong>Mudar o voo </strong>
          </Text>
          <Button variant="custom" size="md" onClick={() => console.log("close")}>
            X
          </Button>
        </div>
      </div>

      <Skeleton active={isLoadingFlightsOptions} height={250}>
        {flightOptionsData !== undefined ? (
          <Grid
            style={{
              width: "100%",
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
          </Grid>
        ) : (
          <EmptyState />
        )}
      </Skeleton>

      <Button
        variant="tertiary"
        className="save__button"
        onClick={handleSave}
        disabled={!selectedFlight || isLoadingFlightsOptions}
      >
        Salvar
      </Button>
    </div>
  );
}
