import type { TripHotelList, TripStay } from "@/core/types";
import type { HotelStepProps } from "@/features/";

import { Accordion as MarsAccordion, Button, Loader } from "mars-ds";
import { TripHotelCard } from "@/features";
import { useState } from "react";
import { TripHotelDTO } from "@/services/api/stays/by-trip";

const mockObject: TripHotelList = {
  uniqueTransactionId: "oaiuygsdoiuay",
  curated: [
    {
      coverImageUrl: "https://picsum.photos/50/",
      cancellationInfo: "Informação de cancelamento",
      isBuilding: false,
      isReserved: false,
      message: "Mensagem legal de Teste",
      reservationMessage: "Mensagem de reservação",
      system: "390hjf4",
      code: "09893sgsds",
      provider: "providenciado",
      signature: "w9eur03nka0-",
      details: {
        address: "Quadra QS 112",
        checkInHour: "8h às 20h",
        services: [
          { title: "Ar condicionado", type: "ac" },
          { title: "Boa cama", type: "bed" },
          { title: "Café da Manhã", type: "breakfast" },
          { title: "Wi-Fi", type: "wifi" },
        ],
        images: [
          { url: "https://picsum.photos/300/200", altText: "Primeira imagem" },
          { url: "https://picsum.photos/400/300", altText: "Segunda imagem" },
          { url: "https://picsum.photos/500/400", altText: "Terceira imagem" },
        ],
        information: "Informação legal da acomodação",
        price: 67.09,
        currency: "R$",
        rooms: [
          {
            coverImageUrl: "https://picsum.photos/300/200",
            details: {
              amenities: ["coisa", "nova", "teste"],
              information: "informação sensacional",
            },
            features: [
              { title: "Wifi", type: "wifi" },
              { title: "Ar Condicionado", type: "ac" },
              { title: "Boa cama", type: "bed" },
            ],
            id: "i2u3g429",
            isSelected: true,
            price: 20.0,
            subtitle: "Acomoda 2 pessoas",
            title: "Suíte simples",
          },
          {
            coverImageUrl: "https://picsum.photos/300/200",
            details: {
              amenities: ["coisa", "nova", "teste"],
              information: "informação sensacional",
            },
            features: [{ title: "Ar Condicionado", type: "ac" }],
            id: "i2u3g429",
            isSelected: true,
            price: 20.0,
            subtitle: "acomoda 4 pessoas",
            title: "Suíte deluxe",
          },
        ],
      },
      id: "12kuj3h6244er",
      isSelected: true,
      name: "Alto mais Alto",
      tags: "3 estrelas",
    },
    {
      coverImageUrl: "https://picsum.photos/50/",
      cancellationInfo: "Informação de cancelamento",
      isBuilding: false,
      isReserved: false,
      message: "Mensagem legal de Teste",
      reservationMessage: "Mensagem de reservação",
      system: "jn6390348hg",
      code: "nmf984hw45",
      provider: "providenciado2",
      signature: "f98nj4w98-=",
      details: {
        address: "Quadra QS 112",
        checkInHour: "8h às 20h",
        services: [
          { title: "Ar condicionado", type: "ac" },
          { title: "Boa cama", type: "bed" },
          { title: "Café da Manhã", type: "breakfast" },
          { title: "Wi-Fi", type: "wifi" },
        ],
        images: [
          { url: "https://picsum.photos/300/200", altText: "Primeira imagem" },
          { url: "https://picsum.photos/400/300", altText: "Segunda imagem" },
          { url: "https://picsum.photos/500/400", altText: "Terceira imagem" },
        ],
        information: "Informação legal da acomodação",
        price: 67.09,
        currency: "R$",
        rooms: [
          {
            coverImageUrl: "https://picsum.photos/300/200",
            details: {
              amenities: ["coisa", "nova", "teste"],
              information: "informação sensacional",
            },
            features: [
              { title: "Wifi", type: "wifi" },
              { title: "Ar Condicionado", type: "ac" },
              { title: "Boa cama", type: "bed" },
            ],
            id: "i2u3g429",
            isSelected: true,
            price: 20.0,
            subtitle: "Acomoda 2 pessoas",
            title: "Suíte simples",
          },
          {
            coverImageUrl: "https://picsum.photos/300/200",
            details: {
              amenities: ["coisa", "nova", "teste"],
              information: "informação sensacional",
            },
            features: [{ title: "Ar Condicionado", type: "ac" }],
            id: "i2u3g429",
            isSelected: true,
            price: 20.0,
            subtitle: "acomoda 4 pessoas",
            title: "Suíte deluxe",
          },
        ],
      },
      id: "12kuj3h6244er",
      isSelected: true,
      name: "Alto mais Alto",
      tags: "3 estrelas",
    },
  ],
  others: [
    {
      coverImageUrl: "https://picsum.photos/50/",
      cancellationInfo: "Informação de cancelamento",
      isBuilding: false,
      isReserved: false,
      message: "Mensagem legal de Teste",
      reservationMessage: "Mensagem de reservação",
      system: "83o947h20",
      code: "2oh3i952",
      provider: "providenciado3",
      signature: "9o8h3t356",
      details: {
        address: "Quadra QS 112",
        checkInHour: "8h às 20h",
        services: [
          { title: "Ar condicionado", type: "ac" },
          { title: "Boa cama", type: "bed" },
          { title: "Café da Manhã", type: "breakfast" },
          { title: "Wi-Fi", type: "wifi" },
        ],
        images: [
          { url: "https://picsum.photos/300/200", altText: "Primeira imagem" },
          { url: "https://picsum.photos/400/300", altText: "Segunda imagem" },
          { url: "https://picsum.photos/500/400", altText: "Terceira imagem" },
        ],
        information: "Informação legal da acomodação",
        price: 67.09,
        currency: "R$",
        rooms: [
          {
            coverImageUrl: "https://picsum.photos/300/200",
            details: {
              amenities: ["coisa", "nova", "teste"],
              information: "informação sensacional",
            },
            features: [
              { title: "Wifi", type: "wifi" },
              { title: "Ar Condicionado", type: "ac" },
              { title: "Boa cama", type: "bed" },
            ],
            id: "i2u3g429",
            isSelected: true,
            price: 20.0,
            subtitle: "Acomoda 2 pessoas",
            title: "Suíte simples",
          },
          {
            coverImageUrl: "https://picsum.photos/300/200",
            details: {
              amenities: ["coisa", "nova", "teste"],
              information: "informação sensacional",
            },
            features: [{ title: "Ar Condicionado", type: "ac" }],
            id: "i2u3g429",
            isSelected: true,
            price: 20.0,
            subtitle: "acomoda 4 pessoas",
            title: "Suíte deluxe",
          },
        ],
      },
      id: "12kuj3h6244er",
      isSelected: true,
      name: "Alto mais Alto",
      tags: "3 estrelas",
    },
  ],
};

export const TripHotelChoose = ({ onNext, hotelLists }: HotelStepProps) => {
  const [selectedHotel, setSelectedHotel] = useState<Omit<TripStay, "hightlight">>({} as TripStay);

  return (
    <>
      <MarsAccordion title="Com selo Trip Evolved" defaultOpen>
        <div className="trip-hotel-list__list gap-md">
          {mockObject.curated.map((hotel, i) => (
            <TripHotelCard
              onSelect={() => setSelectedHotel(hotel)}
              tripStayData={hotel}
              isCurated
              key={i}
            />
          ))}
        </div>
      </MarsAccordion>
      {mockObject.others ? (
        <div className="trip-hotel-list__list gap-md">
          <MarsAccordion title="Outros">
            {mockObject.others.map((hotel, i) => (
              <TripHotelCard
                onSelect={() => setSelectedHotel(hotel)}
                tripStayData={hotel}
                key={i}
              />
            ))}
          </MarsAccordion>
        </div>
      ) : null}
      <Button onClick={() => onNext({ value: selectedHotel, isAccommodation: true })}>
        Continuar
      </Button>
    </>
  );
};
