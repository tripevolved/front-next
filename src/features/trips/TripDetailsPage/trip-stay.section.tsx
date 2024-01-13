import useSwr from "swr";

import { Button, Modal, Grid } from "mars-ds";
import { CardHighlight, GlobalLoader, Picture, Text } from "@/ui";
import { TripStayHighlightSection } from "./trip-stay-highlight.section";

import { StaysApiService } from "@/services/api";
import { useRouter } from "next/router";
import { TripStayDetails } from "@/features";
import { TripDetailInfo } from "./trip-detail-info.component";
import { parsePhoto } from "@/utils/helpers/photo.helpers";
import { useAppStore } from "@/core/store";
import { AccommodationState } from "@/core/store/accomodation";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = StaysApiService;

const detailInfoProps = { title: "Hospedagem", image: "/assets/destino/hospedagem.svg" };

export const TripStaySection = ({ tripId }: { tripId: string }) => {
  const router = useRouter();

  const fetcherKey = `trip-stay-${tripId}`;
  const fetcher = async () => getByTripId(tripId);
  const { data, error, isLoading } = useSwr(fetcherKey, fetcher, swrOptions);

  if (error) {
    return (
      <>
        <TripDetailInfo {...detailInfoProps} />
        <TripStayErrorState />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <TripDetailInfo {...detailInfoProps} />
        <GlobalLoader inline />
      </>
    );
  }

  if (!data || !data.isSelected) {
    return (
      <>
        <TripDetailInfo {...detailInfoProps} />
        <TripStayEmptyState tripId={tripId} />
      </>
    );
  }

  const handleSeeDetails = () => {
    const modal = Modal.open(
      () => (
        <TripStayDetails
          stayData={data!}
          tripId={tripId}
          router={router}
          onCloseModal={() => modal.close()}
        />
      ),
      {
        closable: true,
        size: "lg",
      }
    );
  };

  return (
    <>
      <Grid columns={["1fr", "auto"]}>
        <TripDetailInfo {...detailInfoProps} />
        <StayEditionButton
          tripId={tripId}
          itineraryActionId={""}
          accommodationData={{} as AccommodationState}
        />
      </Grid>
      <Grid>
        <Grid columns={["96px", "auto"]}>
          <Picture>
            {data.coverImage ? parsePhoto(data.coverImage) : "/assets/blank-image.png"}
          </Picture>
          <div>
            <Text as="h3" size="lg">
              {data.name}
            </Text>
            <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{data.tags}</Text>
            {!data.isRoomSelected ? <Text size="sm">{data.roomSelectionMessage}</Text> : null}
            <Button className="mt-sm" size="sm" variant="neutral" onClick={handleSeeDetails}>
              Ver detalhes
            </Button>
          </div>
        </Grid>
        {data.highlight ? <TripStayHighlightSection highlight={data.highlight} /> : null}
      </Grid>
    </>
  );
};

export const StayEditionButton = ({
  tripId,
  itineraryActionId,
  accommodationData,
}: {
  tripId: string;
  accommodationData: AccommodationState;
  itineraryActionId: string;
}) => {
  const router = useRouter();
  const { accommodation, updateAccommodation } = useAppStore((state) => ({
    updateAccommodation: state.updateAccommodationState,
    accommodation: state.accommodation,
  }));

  const handleClick = () => {
    updateAccommodation({ ...accommodation, ...accommodationData, itineraryActionId });
    router.push(`/app/viagens/${tripId}/hospedagem/editar?idItinerario=${itineraryActionId}`);
  };

  return (
    <Button variant="naked" size="sm" iconName="edit-2" onClick={handleClick}>
      Editar
    </Button>
  );
};

const TripStayErrorState = () => (
  <CardHighlight
    variant="warning"
    heading="Algo não saiu como o esperado :("
    text="Não foi possível carregar os dados da hospedagem"
    cta={{ onClick: location.reload, children: "Tentar novamente", iconName: "refresh-ccw" }}
  />
);

const TripStayEmptyState = ({ tripId = "" }) => (
  <CardHighlight
    variant="warning"
    heading="Ainda não escolhemos a acomodação para sua viagem"
    text="Fale conosco e vamos deixar tudo como você deseja!"
    cta={{
      href: `/app/viagens/${tripId}/hospedagem/editar`,
      label: "Escolher hospedagem",
      iconName: "arrow-right",
      isRtl: true,
    }}
  />
);
