import type { TripStay } from "@/core/types";
import type { HotelStepProps } from "@/features/";

import { Accordion as MarsAccordion, Button } from "mars-ds";
import { TripHotelCard } from "@/features";
import { useState } from "react";
import { useRouter } from "next/router";
import { useIdParam } from "@/utils/hooks/param.hook";

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
      <MarsAccordion title="Com selo Trip Evolved" defaultOpen>
        <div className="trip-hotel-list__list gap-md">
          {hotelLists.curated.map((hotel, i) => (
            <TripHotelCard
              tripId={tripId}
              onSelect={() => setSelectedHotel(hotel)}
              tripStayData={hotel}
              isSelected={selectedHotel?.name === hotel.name}
              router={router}
              isCurated
              key={i}
            />
          ))}
        </div>
      </MarsAccordion>
      {hotelLists.others?.length ? (
        <MarsAccordion title="Outros">
          <div className="trip-hotel-list__list gap-md">
            {hotelLists.others.map((hotel, i) => (
              <TripHotelCard
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
