import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { Skeleton, Grid, Modal, Button, Card, Icon } from "mars-ds";
import {
  ErrorState,
  EmptyState,
  Picture,
  Text,
  CardHighlight,
  GlobalLoader,
  HoverTooltipCard,
} from "@/ui";
import useSWR from "swr";
import { StaysApiService } from "@/services/api";
import { useRouter } from "next/router";

import { TripStayHighlightSection } from "../TripDetailsPage/trip-stay-highlight.section";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { AccommodationState } from "@/core/store/accomodation";
import { TripStay } from "@/core/types";
import { TripStayServiceItem } from "../TripStayServiceItem";
import { toFullDetailedDate } from "@/utils/helpers/dates.helpers";
import { StayDetailsModal } from "@/features";
import { useAppStore } from "@/core/store";

const mockData: TripStay = {
  id: "232ecb4e-54a5-4c72-bb97-a1813efa934d",
  coverImage: {
    alt: "infos",
    title: "Foto de capa",
    sources: [{ height: 400, width: 800, type: "md", url: "https://picsum.photos/800/400" }],
  },
  name: "NANNAI Muro Alto",
  tags: "resort 5 estrelas",
  checkIn: new Date("2024-04-24T00:00:00"),
  checkOut: new Date("2024-04-28T00:00:00"),
  cancellationInfo: "null",
  boardInfo: "null",
  isRoomSelected: false,
  roomSelectionMessage:
    "A hospedagem sugerida não está disponível online e ainda não faz parte do preço da sua viagem. Nosso time de atendimento vai te ajudar nessa escolha!",
  isReserved: false,
  reservationMessage: null,
  highlight: {
    title: "Conforto",
    description: null,
    type: "comfort",
  },
  details: {
    images: [
      {
        alt: "infos",
        title: "Primeira foto",
        sources: [{ height: 400, width: 800, type: "md", url: "https://picsum.photos/800/400" }],
      },
      {
        alt: "trecos",
        title: "Foto do Carrossel",
        sources: [{ height: 400, width: 800, type: "md", url: "https://picsum.photos/1000/500" }],
      },
      {
        alt: "infos",
        title: "Foto de Carrosel",
        sources: [{ height: 400, width: 800, type: "md", url: "https://picsum.photos/800/400" }],
      },
      {
        alt: "infos",
        title: "Foto de Carrossel",
        sources: [{ height: 400, width: 800, type: "md", url: "https://picsum.photos/900/450" }],
      },
    ],
    information:
      "Nannai Resort & Spa é um resort luxuoso localizado na Praia de Muro Alto, oferecendo uma ampla variedade de atividades para seus hóspedes. O resort conta com uma piscina ao ar livre, um spa e sauna para relaxar, além de um restaurante e bar para desfrutar de refeições deliciosas.\n\nOs quartos do Nannai Resort & Spa são equipados com ar-condicionado, TV a cabo, DVD player, base para MP3, frigobar e banheiro privativo com chuveiro de água quente. Cada acomodação também possui uma varanda com vista para o jardim, enquanto os chalés apresentam uma piscina privativa, área de estar, cafeteira e banheira.\n\nO resort também oferece uma quadra de tênis e a possibilidade de jogar na praia do hotel. Além disso, a famosa Praia de Porto de Galinhas e o centro da cidade ficam a cerca de 9 km, enquanto a Praia de Maracaípe fica a 12 km. O Aeroporto Internacional dos Guararapes, em Recife, fica a aproximadamente 54 km de distância.",
    checkInHour: "00:00",
    address: "Praia de Muro Alto - N. São do Ó, Ipojuca - PE, Brasil",
    price: 0,
    currency: "BRL",
    services: [],
    rooms: [],
  },
  isBuilding: false,
  isSelected: true,
  message: "null",
  system: "",
};

export const AccommodationAction = (props: ItineraryActionProps & { tripId: string }) => {
  const fetcher = async () =>
    StaysApiService.getByTripId(props.tripId, props.tripItineraryActionId);
  const { isLoading, data, error, isValidating } = useSWR(
    `get-itinerary-accommodation-action-${props.tripItineraryActionId}`,
    fetcher
  );

  if (error) return <ErrorState />;

  return (
    <Skeleton active={isLoading || isValidating} height={355}>
      {mockData ? (
        <AccommodationComponent
          data={mockData}
          tripId={props.tripId}
          tripItineraryActionId={props.tripItineraryActionId}
        />
      ) : (
        <TripStayEmptyState />
      )}
    </Skeleton>
  );
};

const AccommodationComponent = ({
  data,
  tripId,
  tripItineraryActionId,
}: {
  data: TripStay;
  tripId: string;
  tripItineraryActionId: string;
}) => {
  const { availableFeatures } = useAppStore((state) => state.travelerState);
  const allowStayEdit = availableFeatures.includes("STAY_EDIT");

  const router = useRouter();

  if (!data || !data.isSelected) {
    return (
      <>
        <div className="w-100 flex-column gap-lg">
          <TripStayEmptyState
            tripId={tripId}
            tripItineraryActionId={tripItineraryActionId}
            allowEdit={allowStayEdit}
          />
        </div>
      </>
    );
  }

  const handleSeeDetails = () => {
    const modal = Modal.open(
      () => (
        <StayDetailsModal
          tripId={tripId}
          tripStay={data}
          itineraryActionId={tripItineraryActionId}
          router={router}
          onCloseModal={() => modal.close()}
          allowEdit={allowStayEdit}
        />
      ),
      {
        closable: true,
        size: "md",
      }
    );
  };

  if (!data.isRoomSelected) {
    return (
      <>
        <div className="w-100 flex-column gap-lg">
          <TripStayEmptyRoomState
            tripId={tripId}
            tripItineraryActionId={tripItineraryActionId}
            tripStay={data}
            handleSeeDetails={() => handleSeeDetails()}
            allowEdit={allowStayEdit}
          />
        </div>
      </>
    );
  }
  return (
    <Grid className="pl-lg">
      <div className="stay-detail-info">
        {data.checkIn && data.checkOut && (
          <div className="stay-detail-info__item">
            <Icon name="calendar" size="sm" color="#8253F6" />
            <Text>
              Sua estadia é de {`${toFullDetailedDate(data.checkIn)}`} até{" "}
              {`${toFullDetailedDate(data.checkOut)}`}
            </Text>
          </div>
        )}
        {data.cancellationInfo ? (
          <div className="stay-detail-info__item">
            <Icon name="info" size="sm" color="#8253F6" />
            <Text>{data.cancellationInfo}</Text>
          </div>
        ) : null}
      </div>
      <Grid columns={{ sm: 1, md: ["120px", "auto"] }}>
        <Picture className="itinerary-item__content__image">
          {data.coverImage ? parsePhoto(data.coverImage) : "/assets/blank-image.png"}
        </Picture>
        <div>
          <div className="w-100 flex-column itinerary-item__content__break">
            <Grid gap={4}>
              <Text as="h3" size="xl">
                {data.name}
              </Text>
              <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{data.tags}</Text>
              {data.details.services && (
                <div className="trip-stay-details__content__service-list">
                  {data.boardInfo ? (
                    <TripStayServiceItem title={data.boardInfo} type={"breakfast"} />
                  ) : null}
                  {data.details.services.map((service, i) => {
                    if (service.title == data.boardInfo) return null;
                    return <TripStayServiceItem {...service} key={i} />;
                  })}
                </div>
              )}
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid columns={{ sm: 1, md: ["60%", "30%"] }}>
        <Button size="sm" variant="neutral" onClick={() => handleSeeDetails()}>
          Ver detalhes
        </Button>
        <StayEditionButton
          tripId={tripId}
          itineraryActionId={tripItineraryActionId}
          accommodationData={data as AccommodationState}
          allowEdit={allowStayEdit}
        />
      </Grid>
      {data.highlight ? <TripStayHighlightSection highlight={data.highlight} /> : null}
    </Grid>
  );
};

const TripStayEmptyState = ({ tripId = "", tripItineraryActionId = "", allowEdit = true }) => {
  return allowEdit ? (
    <CardHighlight
      variant="warning"
      heading="Ainda não escolhemos a acomodação para sua viagem"
      text="Fale conosco e vamos deixar tudo como você deseja!"
      cta={{
        href: `/app/viagens/${tripId}/hospedagem/editar/${tripItineraryActionId}`,
        label: "Escolher hospedagem",
        iconName: "arrow-right",
        isRtl: true,
      }}
    />
  ) : (
    <CardHighlight
      sx={{ padding: 10 }}
      variant="warning"
      heading="Ainda não escolhemos a acomodação para sua viagem"
      text="Fale conosco e vamos deixar tudo como você deseja!"
    >
      <HoverTooltipCard text="A escolha da sua hospedagem ainda não está disponível online.">
        <Button
          variant="neutral"
          size="sm"
          label="Escolher hospedagem"
          iconName="lock"
          isRtl={true}
          disabled
        />
      </HoverTooltipCard>
    </CardHighlight>
  );
};

interface TripStayEmptyRoomStateProps {
  tripId: string;
  tripItineraryActionId: string;
  tripStay: TripStay;
  handleSeeDetails: () => void;
  allowEdit: boolean;
}

const TripStayEmptyRoomState = ({
  tripId = "",
  tripItineraryActionId = "",
  tripStay,
  handleSeeDetails,
  allowEdit,
}: TripStayEmptyRoomStateProps) => {
  return (
    <Card className={"card-highlight card-highlight--warning"}>
      <Text as="h3" heading size="xs" className="mb-md">
        <strong>Temos uma sugestão de hospedagem</strong>
      </Text>
      <Text className="color-text-secondary mb-md">{tripStay.roomSelectionMessage}</Text>
      <Grid columns={{ sm: 1, md: ["48px", "auto", "25%"] }} style={{ padding: "8px 0 12px 0" }}>
        <Picture>
          {tripStay.coverImage ? parsePhoto(tripStay.coverImage) : "/assets/blank-image.png"}
        </Picture>
        <div>
          <div className="w-100 flex-column itinerary-item__content__break">
            <div>
              <Text as="h3" size="lg">
                {tripStay.name}
              </Text>
              <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{tripStay.tags}</Text>
            </div>
          </div>
        </div>
        <Button className="mt-sm" size="sm" variant="neutral" onClick={handleSeeDetails}>
          Ver detalhes
        </Button>
      </Grid>
      <div>
        {!allowEdit ? (
          <HoverTooltipCard text="A escolha da sua hospedagem ainda não está disponível online.">
            <Button
              variant="neutral"
              size="sm"
              label="Escolher outra hospedagem online"
              iconName="lock"
              isRtl={true}
              disabled
            />
          </HoverTooltipCard>
        ) : (
          <Button
            variant="neutral"
            size="sm"
            href={`/app/viagens/${tripId}/hospedagem/editar/${tripItineraryActionId}`}
            label="Escolher outra hospedagem online"
            iconName="arrow-right"
            isRtl={true}
          />
        )}
      </div>
    </Card>
  );
};

export const StayEditionButton = ({
  tripId,
  itineraryActionId,
  accommodationData,
  allowEdit,
}: {
  tripId: string;
  accommodationData: AccommodationState;
  itineraryActionId: string;
  allowEdit: boolean;
}) => {
  const router = useRouter();
  const { accommodation, updateAccommodation } = useAppStore((state) => ({
    updateAccommodation: state.updateAccommodationState,
    accommodation: state.accommodation,
  }));

  const handleClick = () => {
    updateAccommodation({ ...accommodation, ...accommodationData, itineraryActionId });
    router.push(`/app/viagens/${tripId}/hospedagem/editar?iditinerario=${itineraryActionId}`);
  };

  return allowEdit ? (
    <Button variant="naked" size="sm" iconName="edit-2" onClick={handleClick}>
      Editar
    </Button>
  ) : (
    <HoverTooltipCard text="A escolha da sua hospedagem ainda não está disponível online.">
      <Button
        className="w-100"
        variant="naked"
        size="sm"
        iconName="lock"
        onClick={handleClick}
        disabled
      >
        Editar
      </Button>
    </HoverTooltipCard>
  );
};
