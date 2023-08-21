import useSWR from "swr";

import { Box, Text, Picture, DashedDivider, EmptyState, GlobalLoader } from "@/ui";
import { Avatar, Button } from "mars-ds";
import { toLocaleShortDateOnlyString, toTimeOnlyString } from "@/utils/helpers/dates.helpers";

import { StaysApiService } from "@/services/api";

export interface StaysReservationsSectionProps {
  tripId: string;
}

export const StaysReservationsSection = ({ tripId }: StaysReservationsSectionProps) => {
  const { isLoading, error, data } = useSWR(tripId, () => StaysApiService.getAllReservedByTripId(tripId));

  console.log(data);
  // TODO: use tripId to see tickets

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState text={"Não há hospedagens reservadas para esta viagem"} />;

  return (
    <>
      {data && data.map((reservation, i) => {
        return (
          <Box className="reservations-panel__box" key={i}>
            <Box className="reservations-panel__box__stay">
              {reservation?.imageUrl ? <Avatar size="xl" thumbnail={reservation.imageUrl} className="page-app-header__box__avatar" /> : null}
              <Text size="md" heading><strong>{reservation?.title}</strong></Text>
              <Text size="sm">{reservation?.roomDetail}</Text>
              <Text size="md">De {toLocaleShortDateOnlyString(reservation.checkIn)} a {toLocaleShortDateOnlyString(reservation.checkOut)}</Text>
            </Box>
            <DashedDivider />
            <Box className="reservations-panel__box__stay">
              <div className="reservations-panel__box__stay__piece">
                <Picture src="/assets/stays/time.png" className="reservations-panel__box__stay__piece__icon"/>
                <Text size="md" className="reservations-panel__box__stay__piece__text">Check in a partir de {toTimeOnlyString(reservation.checkIn)}</Text>
              </div>
              <div className="reservations-panel__box__stay__piece">
                <Picture src="/assets/stays/pin.png" className="reservations-panel__box__stay__piece__icon"/>
                <Text size="md" className="reservations-panel__box__stay__piece__text">{reservation.fullAddress}</Text>
              </div>
            </Box>
          </Box>
        );
      })}
    </>
  );
};
