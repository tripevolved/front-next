import type { TripStay } from "@/core/types";
import type { HotelStepProps } from "@/features/";

import { Accordion as MarsAccordion, Button } from "mars-ds";
import { TripHotelCard } from "@/features";
import { useState } from "react";
import { useRouter } from "next/router";
import { useIdParam } from "@/utils/hooks/param.hook";
import { Box, Picture, Text } from "@/ui";

export const TripHotelChoose = ({ onNext, hotelLists, setFunction }: HotelStepProps) => {
  const [selectedHotel, setSelectedHotel] = useState<Omit<TripStay, "highlight">>(
    {} as Omit<TripStay, "highlight">
  );
  const router = useRouter();
  const tripId = useIdParam();

  const handleButton = () => {
    setFunction(selectedHotel);
    onNext();
  };

  return (
    <>
      {hotelLists.curated.length > 0 ? (
        <Box>
          <div className="trip-hotel-list__list gap-md">
            <Text heading size="sm">
              <Picture src="/assets/stays/badge.png" style={{paddingRight: "12px"}} />
              Com selo Trip Evolved
            </Text>
            <Text size="sm">Nossos especialistas escolheram esses hotéis por suas características, únicas no destino.</Text>
            {hotelLists.curated.map((hotel, i) => (
              <TripHotelCard
                uniqueTransactionId={hotelLists.uniqueTransactionId}
                tripId={tripId}
                onSelect={() => setSelectedHotel(hotel)}
                tripStayData={hotel}
                isSelected={hotel.isSelected}
                router={router}
                isCurated
                key={i}
              />
            ))}
          </div>
        </Box>) : <></>}
      {hotelLists.others?.length ? (
        <MarsAccordion title={hotelLists.curated.length > 0 ? "Outras opções" : "Opções"} defaultOpen={hotelLists.curated.length == 0}>
          <div className="trip-hotel-list__list gap-md">
            {hotelLists.others.map((hotel, i) => (
              <TripHotelCard
                uniqueTransactionId={hotelLists.uniqueTransactionId}
                tripId={tripId}
                onSelect={() => setSelectedHotel(hotel)}
                tripStayData={hotel}
                isSelected={selectedHotel?.name === hotel.name}
                router={router}
                key={i}
              />
            ))}
          </div>
        </MarsAccordion>
      ) : null}
      <div className="trip-hotel-list__button-area mt-lg">
        <Button
          style={{ color: "var(--color-gray-4)", maxWidth: 500 }}
          className="w-100"
          disabled={!hotelLists.uniqueTransactionId || !selectedHotel.name}
          onClick={() => handleButton()}
        >
          Continuar
        </Button>
      </div>
    </>
  );
};
