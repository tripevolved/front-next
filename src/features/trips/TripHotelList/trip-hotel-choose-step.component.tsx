import type { TripStay } from "@/core/types";
import type { HotelStepProps } from "@/features/";

import { Accordion as MarsAccordion, Button } from "mars-ds";
import { TripHotelCard } from "@/features";
import { useState } from "react";

export const TripHotelChoose = ({ onNext, hotelLists }: HotelStepProps) => {
  const [selectedHotel, setSelectedHotel] = useState<Omit<TripStay, "hightlight">>();

  return (
    <>
      <MarsAccordion title="Com selo Trip Evolved" defaultOpen>
        <div className="trip-hotel-list__list gap-md">
          {hotelLists.curated.map((hotel, i) => (
            <TripHotelCard
              onSelect={() => setSelectedHotel(hotel)}
              tripStayData={hotel}
              isCurated
              key={i}
            />
          ))}
        </div>
      </MarsAccordion>
      {hotelLists.others?.length ? (
        <div className="trip-hotel-list__list gap-md">
          <MarsAccordion title="Outros">
            {hotelLists.others.map((hotel, i) => (
              <TripHotelCard
                onSelect={() => setSelectedHotel(hotel)}
                tripStayData={hotel}
                key={i}
              />
            ))}
          </MarsAccordion>
        </div>
      ) : null}
      <div className="trip-hotel-list__button-area mt-lg">
        <Button
          style={{ color: "var(--color-gray-4)", maxWidth: 500 }}
          className="w-100"
          disabled={!hotelLists.uniqueTransactionId || selectedHotel == undefined}
          onClick={() => onNext({ value: selectedHotel, isAccommodation: true })}
        >
          Continuar
        </Button>
      </div>
    </>
  );
};
