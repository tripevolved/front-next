import { EmptyState, Text } from "@/ui";
import type { TripHotelListProps } from "./trip-hotel-list.types";

import { Accordion as MarsAccordion, Button, Loader } from "mars-ds";

import type { TripHotelList, TripStay } from "@/core/types";
import { TripHotelCard } from "@/features";
import { useState } from "react";
import { StaysApiService } from "@/services/api";
import useSwr from "swr";

const mockObject: TripHotelList = {
  uniqueTransactionId: "898ef0w8ej-90uwe087rw",
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

export function TripHotelList({ tripId }: TripHotelListProps) {
  const [selectedHotel, setSelectedHotel] = useState<Omit<TripStay, "hightlight">>({} as TripStay);

  const fetcher = async () => StaysApiService.getHotels(tripId);
  const { data, isLoading, error } = useSwr(`accomodation-edit-${tripId}`, fetcher);

  if (error) return <EmptyState />;
  if (isLoading)
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Loader size="xs" />
      </div>
    );
  if (!data) return <EmptyState />;

  return (
    <div className="trip-hotel-list p-lg">
      <Text heading style={{ color: "var(--color-brand-1)" }} size="sm">
        Lista de Hoteis
      </Text>
      <MarsAccordion title="Com selo Trip Evolved" defaultOpen>
        <div className="trip-hotel-list__list gap-md">
          {data.curated.map((hotel, i) => (
            <TripHotelCard
              onSelect={() => setSelectedHotel(hotel)}
              tripStayData={hotel}
              isCurated
              key={i}
            />
          ))}
        </div>
      </MarsAccordion>
      {data.others ? (
        <div className="trip-hotel-list__list gap-md">
          <MarsAccordion title="Outros">
            {data.others.map((hotel, i) => (
              <TripHotelCard
                onSelect={() => setSelectedHotel(hotel)}
                tripStayData={hotel}
                key={i}
              />
            ))}
          </MarsAccordion>
        </div>
      ) : null}
    </div>
  );
}
