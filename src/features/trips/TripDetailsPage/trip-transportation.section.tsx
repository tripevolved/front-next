import useSwr from "swr";

import { Button, Grid, Modal } from "mars-ds";
import { Picture, Text, CardHighlight, GlobalLoader } from "@/ui";

import { TransportationApiService } from "@/services/api";
import { TripDetailInfo } from "./trip-detail-info.component";
import { TripTransportation } from "@/core/types";
import { FlightDetailsPainel } from "@/features";

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

  const handleSeeDetails = () => {
    Modal.open(() => <FlightDetailsPainel transportationData={data!} isModalView />, {
      size: "md",
      closable: true,
    });
  };

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

  return (
    <>
      <TripDetailInfo {...getDetailInfoProps(data.iconSlug)} />
      {data.iconSlug === "car" ? (
        <CarDetailInfo data={data} />
      ) : (
        <Grid columns={["56px", "1fr"]}>
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
            {data.iconSlug === "flight" && !data.flightView ? (
              <Text size="sm">
                Seu voo ainda não foi escolhido, mas vamos cuidar de tudo para você.
              </Text>
            ) : null}
            {data.description && <Text className="color-text-secondary">{data.description}</Text>}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export const TripTransportationItem = ({ title = "", date = "", name = "", address = "" }) => {
  if (!date) return null;
  return (
    <div className="color-text-secondary">
      <Text>
        <strong>{title}:</strong> {date.replace("./", "/")}
      </Text>
      <Text style={{ margin: 0 }}>
        <strong>Local: </strong>
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

export const CarDetailInfo = ({ data }: { data: TripTransportation }) => {
  const columns = data.partnerLogoUrl ? ["40px", "1fr"] : ["auto"];
  return (
    <Grid columns={columns}>
      {data.partnerLogoUrl ? (
        <div>
          <Picture src={data.partnerLogoUrl} />
        </div>
      ) : null}
      <Grid>
        <TripTransportationItem title="Saída" date={data.departure} name={data.fromName} />
        <TripTransportationItem
          title="Chegada prevista"
          date={data.estimatedArrival}
          name={data.toName}
        />
        {data.description && <Text className="color-text-secondary">{data.description}</Text>}
      </Grid>
    </Grid>
  );
};
