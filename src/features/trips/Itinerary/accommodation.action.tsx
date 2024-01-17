import type { ItineraryAction as ItineraryActionProps } from "@/core/types/itinerary";

import { Skeleton, Grid, Modal, Button, Card, Icon } from "mars-ds";
import { ErrorState, EmptyState, Picture, Text, CardHighlight, GlobalLoader } from "@/ui";
import useSWR from "swr";
import { StaysApiService } from "@/services/api";
import { useRouter } from "next/router";

import { StayEditionButton } from "../TripDetailsPage/trip-stay.section";
import { TripStayHighlightSection } from "../TripDetailsPage/trip-stay-highlight.section";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { AccommodationState } from "@/core/store/accomodation";
import { TripStay } from "@/core/types";
import { TripStayServiceItem } from "../TripStayServiceItem";
import { toFullDetailedDate } from "@/utils/helpers/dates.helpers";
import { SeeMoreAccommodation } from "./see-more-accommodation.modal";

export const AccommodationAction = (props: ItineraryActionProps & { tripId: string }) => {
  const router = useRouter();

  const fetcher = async () =>
    StaysApiService.getByTripId(props.tripId, props.tripItineraryActionId);
  const { isLoading, data, error, isValidating } = useSWR(
    `get-itinerary-accommodation-action-${props.tripItineraryActionId}`,
    fetcher
  );

  const handleSeeDetails = (tripStay: TripStay) => {
    const modal = Modal.open(
      () => (
        <SeeMoreAccommodation
          tripId={props.tripId}
          itineraryActionId={props.tripItineraryActionId}
          router={router}
          onCloseModal={() => modal.close()}
        />
      ),
      {
        closable: true,
        size: "md",
      }
    );
  };

  if (error) return <ErrorState />;
  if (isLoading || isValidating) return <GlobalLoader inline />;

  if (!data || !data.isSelected) {
    return (
      <>
        <div className="px-xl w-100 flex-column gap-lg">
          <TripAccommodationEmptyState
            tripId={props.tripId}
            tripItineraryActionId={props.tripItineraryActionId}
          />
        </div>
      </>
    );
  }

  if (!data.isRoomSelected) {
    return (
      <>
        <div className="px-xl w-100 flex-column gap-lg">
          <TripStayEmptyRoomState
            tripId={props.tripId}
            tripItineraryActionId={props.tripItineraryActionId}
            tripStay={data}
            handleSeeDetails={() => handleSeeDetails(data)}
          />
        </div>
      </>
    );
  }

  return (
    <Skeleton active={isLoading} height={355}>
      {data ? (
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
            <div className="stay-detail-info__item">
              <Icon name="info" size="sm" color="#8253F6" />
              <Text>{data.cancellationInfo}</Text>
            </div>
          </div>
          <Grid columns={["120px", "auto"]}>
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
                      {data.details.services.map((service, i) => (
                        <TripStayServiceItem {...service} key={i} />
                      ))}
                    </div>
                  )}
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid columns={["75%", "20%"]}>
            <Button size="sm" variant="neutral" onClick={() => handleSeeDetails(data)}>
              Ver detalhes
            </Button>
            <StayEditionButton
              tripId={props.tripId}
              itineraryActionId={props.tripItineraryActionId}
              accommodationData={data as AccommodationState}
            />
          </Grid>
          {data.highlight ? <TripStayHighlightSection highlight={data.highlight} /> : null}
        </Grid>
      ) : (
        <EmptyState />
      )}
    </Skeleton>
  );
};

const TripAccommodationEmptyState = ({ tripId = "", tripItineraryActionId = "" }) => (
  <CardHighlight
    variant="warning"
    heading="Ainda não escolhemos a acomodação para sua viagem"
    text="Fale conosco e vamos deixar tudo como você deseja!"
    cta={{
      href: `/app/viagens/${tripId}/hospedagem/editar/?iditinerario=${tripItineraryActionId}`,
      label: "Escolher hospedagem",
      iconName: "arrow-right",
      isRtl: true,
    }}
  />
);

interface TripStayEmptyRoomStateProps {
  tripId: string;
  tripItineraryActionId: string;
  tripStay: TripStay;
  handleSeeDetails: () => void;
}

const TripStayEmptyRoomState = ({
  tripId = "",
  tripItineraryActionId = "",
  tripStay,
  handleSeeDetails,
}: TripStayEmptyRoomStateProps) => {
  return (
    <Card className={"card-highlight card-highlight--warning"}>
      <Text as="h3" heading size="xs" className="mb-md">
        <strong>Temos uma sugestão de hospedagem</strong>
      </Text>
      <Text className="color-text-secondary mb-md">{tripStay.roomSelectionMessage}</Text>
      <Grid columns={["56px", "auto", "25%"]} style={{ padding: "8px 0 12px 0" }}>
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
        <Button
          variant="neutral"
          size="sm"
          href={`/app/viagens/${tripId}/hospedagem/editar/?iditinerario=${tripItineraryActionId}`}
          label="Escolher outra hospedagem online"
          iconName="arrow-right"
          isRtl={true}
        />
      </div>
    </Card>
  );
};
