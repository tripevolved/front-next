import useSwr from "swr";

import { Grid } from "mars-ds";
import { Picture, Text, CardHighlight, GlobalLoader } from "@/ui";

import { TransportationApiService } from "@/services/api";
import { TripDetailInfo } from "./trip-detail-info.component";

const swrOptions = { revalidateOnFocus: false };
const { getByTripId } = TransportationApiService;

const TRANSPORTATION = {
  car: "Carro",
  flight: "Passagem aérea",
  bus: "Passagem de ônibus",
  train: "Passagem de trem",
  rentalcar: "Aluguel de carro",
  default: "Transporte",
};

const getDetailInfoProps = (slug?: keyof typeof TRANSPORTATION) => ({
  title: TRANSPORTATION[slug || "default"],
  image: `/assets/transportation/${slug || "flight"}.svg`,
});

export const TripTransportationSection = ({ tripId }: { tripId: string }) => {
  const fetcherKey = `transportation-${tripId}`;
  const fetcher = async () => getByTripId(tripId);
  const { data, error, isLoading } = useSwr(fetcherKey, fetcher, swrOptions);

  if (error) {
    return (
      <>
        <TripDetailInfo {...getDetailInfoProps()} />
        <TripTransportationErrorState />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <TripDetailInfo {...getDetailInfoProps()} />
        <GlobalLoader inline />
      </>
    );
  }

  if (!data || !data.isSelected) {
    return (
      <>
        <TripDetailInfo {...getDetailInfoProps()} />
        <TripTransportationEmptyState />
      </>
    );
  }

  if (data.isRouteFinished) {
    return (
      <>
        <TripDetailInfo {...getDetailInfoProps(data.iconSlug)} />
        <CardHighlight text={data.message} />
      </>
    );
  }

  return (
    <>
      <TripDetailInfo {...getDetailInfoProps(data.iconSlug)} />
      <Grid columns={["56px", "1fr"]} style={{ paddingLeft: 56 }}>
        <Picture src={data.partnerLogoUrl || "/assets/blank-image.png"} />
        <Grid>
          <TripTransportationItem
            title="Saída"
            date={data.departure}
            name={data.fromName}
            address={data.fromAddress}
          />
          <TripTransportationItem
            title="Chegada prevista"
            date={data.estimatedArrival}
            name={data.toName}
            address={data.toAddress}
          />
          <Text className="color-text-secondary">{data.description}</Text>
        </Grid>
      </Grid>
    </>
  );
};

const TripTransportationItem = ({ title = "", date = "", name = "", address = "" }) => {
  if (!date) return null;
  return (
    <div className="color-text-secondary">
      <Text>
        <strong>{title}:</strong> {date.replace("./", "/")}
      </Text>
      <Text style={{ margin: 0 }}>
        {address ? `${name},` : name} {address}
      </Text>
    </div>
  );
};

const TripTransportationErrorState = () => (
  <CardHighlight
    variant="warning"
    heading="Algo não saiu como o esperado :("
    text="Não foi possível carregar os dados do seu transporte"
    cta={{ onClick: location.reload, children: "Tentar novamente", iconName: "refresh-ccw" }}
  />
);

const TripTransportationEmptyState = () => (
  <CardHighlight
    variant="warning"
    heading="Ainda não escolhemos o transporte para sua viagem"
    text="Fale conosco e vamos deixar tudo como você deseja!"
  />
);
