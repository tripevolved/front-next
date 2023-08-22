import useSWR from "swr";
import { GlobalLoader, Tag, Text, WhatsappButton } from "@/ui";
import { Button, Divider, Grid, Icon } from "mars-ds";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { TripsApiService } from "@/services/api";
import { useRouter } from "next/router";

interface TripPricingBoxProps {
  destinationName: string;
}

export const TripPricingBox = ({ destinationName }: TripPricingBoxProps) => {
  const router = useRouter();
  const tripId = typeof router.query.id === "string" ? router.query.id : "";

  const { isLoading, data, error } = useSWR(`trip-pricing/${tripId}`, async () =>
    TripsApiService.getPriceById(tripId)
  );

  if (isLoading || !data || error) {
    return (
      <Grid>
        <Text heading size="xs" as="h2">
          {destinationName}
        </Text>
        {isLoading ? (
          <GlobalLoader inline />
        ) : (
          <>
            <Text>Devido à um erro não foi possível mostrar os preços</Text>
            <Button iconName="refresh-ccw" variant="neutral" onClick={() => location.reload()}>
              Tentar novamente
            </Button>
          </>
        )}
      </Grid>
    );
  }

  return (
    <Grid>
      <Text heading size="xs" as="h2">
        {destinationName}
      </Text>
      <div className="flex gap-md align-items-center color-text-secondary">
        <Icon name="users" size="sm" />
        <Text>Para 2 pessoas</Text>
      </div>
      <Divider />
      <div className="mb-lg px-md grid text">
        <div className="flex justify-content-between">
          <span>Preço</span>
          <span>{formatToCurrencyBR(data.price)}</span>
        </div>
        <div className="flex justify-content-between">
          <span>Taxa de serviço</span>
          <span>{formatToCurrencyBR(data.serviceFee)}</span>
        </div>
        <Divider />
        <div className="flex justify-content-between">
          <strong>Total</strong>
          <strong>{formatToCurrencyBR(data.total)}</strong>
        </div>
      </div>
      {data.isPaid ? (
        <Tag>A viagem já está paga.</Tag>
      ) : (
        <>
          {/* @ts-ignore */}
          <Button variant="tertiary" href={`/app/viagens/comprar/${tripId}`}>
            Comprar
          </Button>
          <WhatsappButton
            variant="secondary"
            message={`Quero alterar minha viagem para ${destinationName}!`}
          >
            Quero alterar a viagem
          </WhatsappButton>
        </>
      )}
      <Text className="color-text-secondary">*{data?.description}</Text>
    </Grid>
  );
};
