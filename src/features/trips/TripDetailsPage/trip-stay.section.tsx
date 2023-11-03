import useSwr from "swr";

import { Button, Modal, Grid } from "mars-ds";
import { CardHighlight, GlobalLoader, Picture, Text } from "@/ui";
import { TripStayHighlightSection } from "./trip-stay-highlight.section";

import { StaysApiService } from "@/services/api";
import { useRouter } from "next/router";
import { TripStayDetails } from "@/features";
import { TripDetailInfo } from "./trip-detail-info.component";

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
        <StayEditionButton tripId={tripId} />
      </Grid>
      <Grid>
        <Grid columns={["56px", "auto"]}>
          <Picture src={data.coverImageUrl ? data.coverImageUrl : "/assets/blank-image.png"} />
          <div>
            <Text as="h3" size="lg">
              {data.name}
            </Text>
            <Text style={{ marginTop: 0, color: "var(--color-brand-4)" }}>{data.tags}</Text>
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

const StayEditionButton = ({ tripId }: { tripId: string }) => (
  <Button
    variant="naked"
    size="sm"
    iconName="edit-2"
    href={`/app/viagens/criar/${tripId}/hospedagem/editar-hotel`}
  >
    Editar
  </Button>
);

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
      href: `/app/viagens/criar/${tripId}/hospedagem/editar-hotel`,
      label: "Escolher hospedagem",
      iconName: "arrow-right",
      isRtl: true,
    }}
  />
);
