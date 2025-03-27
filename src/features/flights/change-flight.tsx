import { EmptyState, ErrorState, Text } from "@/ui";
import { FlightEditCard } from "./FlightEditCard";
import { Button, Grid, Skeleton } from "mars-ds";
import { useState } from "react";
import { FlightsService } from "@/services/api";
import useSWR from "swr";
import { FlightOptions } from "@/core/types/flight-options";
import { useRouter } from "next/router";

export function ChangeFlight({ tripId }: { tripId: string }) {
  const router = useRouter()

  const [selectedFlight, setSelectedFlight] = useState<FlightOptions | null>(null);

  const flightsFetcher = async () => FlightsService.getFlightOptions(tripId);
  const saveFlightFetcher = async (tripId: string, data: any) => 
    FlightsService.saveSelectFlightTransportations(tripId, data);

  const {
    data: flightOptionsData,
    isLoading: isLoadingFlightsOptions,
    error: errorFetchingFlightOptions,
  } = useSWR(`flights-${tripId}`, flightsFetcher, {
    revalidateOnFocus: false,
  });

  const handleSelectedFlight = (flightId: number) => {
    const flight = flightOptionsData?.find((f: FlightOptions) => f.id === flightId) || null;
    setSelectedFlight(flight);
  };

  const handleSave = async () => {
    if (!selectedFlight) return;
    try {
      await saveFlightFetcher(tripId, selectedFlight);
      router.back();
    } catch (error) {
      console.error("Erro ao salvar voo", error);
    }
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
            {flightOptionsData?.map((flight: FlightOptions, i: number) => (
              <FlightEditCard
                flight={flight}
                destination={flight.destination}
                origin={flight.origin}
                key={i}
                handleSelectedFlight={handleSelectedFlight}
                selectedFlight={selectedFlight?.id === flight.id ? selectedFlight : null}
                flightPrice={flight.totalPrice}
                durationTime={flight.durationTime}
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
