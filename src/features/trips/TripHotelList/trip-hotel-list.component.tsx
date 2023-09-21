import { Text } from "@/ui";
import type { TripHotelListProps } from "./trip-hotel-list.types";

import { Card, Accordion as MarsAccordion } from "mars-ds";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripHotelList, TripStay } from "@/core/types";
import { useState } from "react";

const mockObject: TripHotelList = {
  curated: [
    {
      coverImageUrl: "https://picsum.photos/50/",
      cancellationInfo: "Informação de cancelamento",
      isBuilding: false,
      isReserved: false,
      message: "Mensagem legal de Teste",
      reservationMessage: "Mensagem de reservação",
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
      highlight: {
        description: "Um ótimo lugar para quem gosta montanhas e grandes altitudes",
        title: "Nas Alturas",
        type: "comfort",
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
      highlight: {
        description: "Um ótimo lugar para quem gosta montanhas e grandes altitudes",
        title: "Nas Alturas",
        type: "comfort",
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
      highlight: {
        description: "Um ótimo lugar para quem gosta montanhas e grandes altitudes",
        title: "Nas Alturas",
        type: "comfort",
      },
      id: "12kuj3h6244er",
      isSelected: true,
      name: "Alto mais Alto",
      tags: "3 estrelas",
    },
  ],
};

export function TripHotelList({ className, children, sx, ...props }: TripHotelListProps) {
  const cn = makeCn("trip-hotel-list", className)(sx);

  return (
    <div className={`${cn} p-lg`} {...props}>
      <Text heading style={{ color: "var(--color-brand-1)" }} size="sm">
        Lista de Hoteis
      </Text>
      <MarsAccordion title="Com selo Trip Evolved">
        Esse é o conteúdo mais legal já visto no mudno todo
      </MarsAccordion>
      <MarsAccordion title="Outros">
        Esse é o conteúdo mais legal já visto no mudno todo
      </MarsAccordion>
    </div>
  );
}

export const TripHotelCard = ({
  coverImageUrl,
  name,
  isCurated,
}: TripStay & { isCurated: boolean }) => {
  const [selected, setSelected] = useState(false);
  const selectedColor = isCurated ? "var(--color-brand-4)" : "var(--color-brand-1)";

  return (
    <Card
      className="trip-hotel-card"
      style={{ border: `2px solid ${selected ? selectedColor : "var(--color-gray-3)"}` }}
    >
      <div className="trip-hotel-card__content">
        <div className="trip-hotel-card__content__info"></div>
      </div>
    </Card>
  );
};
