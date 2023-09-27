import { Picture, Text } from "@/ui";
import type { TripHotelListProps } from "./trip-hotel-list.types";

import { Card, Accordion as MarsAccordion, Button, RatingStar, Modal } from "mars-ds";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TripHotelList, TripStay } from "@/core/types";
import { useState } from "react";
import { formatByDataType } from "@/utils/helpers/number.helpers";
import { TripStayDetailsModal, TripStayServiceItem } from "../TripStayDetails";

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
      <MarsAccordion title="Com selo Trip Evolved" defaultOpen>
        <div className="trip-hotel-list__list gap-md">
          {mockObject.curated.map((hotel, i) => (
            <TripHotelCard {...hotel} isCurated key={i} />
          ))}
        </div>
      </MarsAccordion>
      {mockObject.others ? (
        <div className="trip-hotel-list__list gap-md">
          <MarsAccordion title="Outros">
            {mockObject.others.map((hotel, i) => (
              <TripHotelCard {...hotel} key={i} />
            ))}
          </MarsAccordion>
        </div>
      ) : null}
    </div>
  );
}

export const TripHotelCard = (tripStayData: TripStay & { isCurated?: boolean }) => {
  const [selected, setSelected] = useState(false);
  const selectedColor = tripStayData.isCurated ? "var(--color-brand-4)" : "var(--color-brand-1)";

  const handleSeeMore = (tripStay: TripStay) => {
    Modal.open(() => <TripStayDetailsModal stayData={tripStay.details} name={tripStay.name} />, {
      closable: true,
      size: "sm",
    });
  };

  return (
    <Card
      className="trip-hotel-card"
      style={{ border: `2px solid ${selected ? selectedColor : "var(--color-gray-3)"}` }}
    >
      <div className="trip-hotel-card__content">
        <div className="trip-hotel-card__content__info gap-md">
          <Picture
            className="trip-hotel-card__content__info__image"
            src={`${tripStayData.coverImageUrl}`}
          />
          <div className="trip-hotel-card__content__info__data gap-md">
            <div className="trip-hotel-card__content__info__data__header">
              <Text size="lg">{tripStayData.name}</Text>
              <RatingStar total={5} value={3} />
            </div>

            <div className="trip-hotel-card__content__info__data__footer">
              <Text size="lg">{formatByDataType(tripStayData.details.price, "CURRENCY")}</Text>
              <Text style={{ color: "var(--color-gray-1)", marginTop: 0 }}>
                {tripStayData.details.information}
              </Text>
            </div>
          </div>
        </div>
        <div className="trip-hotel-card__content__info__services gap-lg">
          {tripStayData.details.services.map((item, i) => (
            <TripStayServiceItem
              type={item.type}
              title={item.title}
              color={tripStayData.isCurated ? selectedColor : "var(--color-brand-1)"}
              key={i}
            />
          ))}
        </div>
        <div
          className="trip-hotel-card__content__divider"
          style={{
            width: "100%",
            border: `.5px solid ${selected ? selectedColor : "var(--color-gray-3)"}`,
          }}
        ></div>
        <div className="trip-hotel-card__content__button-area">
          <Button
            iconName={selected ? "check-circle" : "circle"}
            size="sm"
            variant="naked"
            style={{
              color: selected ? selectedColor : "var(--color-gray-2)",
            }}
            onClick={() => setSelected(!selected)}
          >
            {selected ? "Selecionado" : "Selecionar este"}
          </Button>

          <Text
            onClick={() => handleSeeMore(tripStayData)}
            className="trip-hotel-card__content__button-area__see-more"
          >
            ver mais
          </Text>
        </div>
      </div>
    </Card>
  );
};
