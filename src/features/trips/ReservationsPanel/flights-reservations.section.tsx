import { Box, Text, Picture, DashedDivider, EmptyState, GlobalLoader } from "@/ui";
import { Button } from "mars-ds";
import { toFullDate } from "@/utils/helpers/dates.helpers";
import { useIdParam } from "@/utils/hooks/param.hook";
import { TransportationApiService } from "@/services/api";
import useSWR from "swr";

export const FlightsReservationsSection = () => {
  const idParam = useIdParam();

  const fetcher = async () =>
    TransportationApiService.getFlightReservationsById(idParam);
  const { isLoading, data, error } = useSWR(
    `get-flight-reservations-${idParam}`,
    fetcher
  );

  // TODO: use tripId to see tickets

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader inline />;
  if (!data) return <EmptyState text={"Não há voos reservados para esta viagem"} />;

  return (
    <>
      {data && data.map((reservation, i) => {
        return (
          <Box className="reservations-panel__box" key={i}>
            <Box className="reservations-panel__box__flight">
              <Box className="reservations-panel__box__flight__piece">
                <Text size="md">{toFullDate(reservation.departure)}</Text>
                <Text className="reservations-panel__box__flight__piece__colored" style={{ padding: "8px" }} heading size="xl">{reservation.fromAirportCode}</Text>
                <Text className="reservations-panel__box__flight__piece__title" size="xs">{reservation.fromAirportName}</Text>
                <Text size="sm">{reservation.fromAirportCity}</Text>
              </Box>
              <Picture src={`/assets/voos/icon.png`} className="reservations-panel__box__flight__piece" />
              <Box className="reservations-panel__box__flight__piece">
                <Text size="md">{toFullDate(reservation.estimatedArrival)}</Text>
                <Text className="reservations-panel__box__flight__piece__colored" style={{ padding: "8px" }} heading size="xl">{reservation.toAirportCode}</Text>
                <Text className="reservations-panel__box__flight__piece__title" size="xs">{reservation.toAirportName}</Text>
                <Text size="sm">{reservation.toAirportCity}</Text>
              </Box>
            </Box>
            <DashedDivider />
            <Box className="reservations-panel__box__flight">
              <Box className="reservations-panel__box__flight__piece">
                <Text className="reservations-panel__box__flight__piece__title">Voo</Text>
                <Text className="reservations-panel__box__flight__piece__colored" size="xl">{reservation.flightCode}</Text>
              </Box>
              <Box className="reservations-panel__box__flight__piece">
                <Text className="reservations-panel__box__flight__piece__title">Assentos</Text>
                <Text className="reservations-panel__box__flight__piece__colored" size="xl">{reservation.seats && reservation.seats.map((seat, s) => (<>{seat} </>))}</Text>
              </Box>
              <Box className="reservations-panel__box__flight__piece">
                <Text className="reservations-panel__box__flight__piece__title">Portão</Text>
                <Text className="reservations-panel__box__flight__piece__colored" size="xl">{reservation.gate ?? "----"}</Text>
              </Box>
            </Box>
            <Button disabled>Ver tickets</Button>
          </Box>
        );
      })}
    </>
  );
};
