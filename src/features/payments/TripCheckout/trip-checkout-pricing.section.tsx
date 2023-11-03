import useSWR from "swr";
import { Box, Tag, Text } from "@/ui";
import { Button, Grid, Loader } from "mars-ds";
import { formatToCurrencyBR } from "@/utils/helpers/number.helpers";
import { TripsApiService } from "@/services/api";
import { useIdParam } from "@/utils/hooks/param.hook";

export const TripCheckoutPricingSection = ({ isEnabled }: { isEnabled: boolean }) => {
  const idParam = useIdParam();

  const fetcherKey = `trip-pricing-${idParam}`;
  const fetcher = async () => TripsApiService.getPriceById(idParam);
  const { isLoading, data, error } = useSWR(fetcherKey, fetcher);

  const submitConditions = () => {
    // TODO: implement this
    console.log("SUBMITTING CONDITIONS!");
  }

  if (isLoading){
    return (
      <Grid className="trip-checkout__cta">
        <Loader />
      </Grid>
    );
  }

  if (error || !data) {
    return (
      <Grid className="trip-checkout__cta">
        <Text>Devido à um erro não foi possível mostrar os preços</Text>
        <Button iconName="refresh-ccw" variant="neutral" onClick={() => location.reload()}>
          Tentar novamente
        </Button>
      </Grid>
    );
  }

  return (
    <Box className="trip-checkout__cta">
      <Text className="flex justify-content-between">
        <span>Preço</span>
        <span>{formatToCurrencyBR(data.price)}</span>
      </Text>
      <Text className="flex justify-content-between">
        <span>Taxa de serviço</span>
        <span>{formatToCurrencyBR(data.serviceFee)}</span>
      </Text>
      {data?.description && <Text className="color-text-secondary">*{data?.description}</Text>}
      {data.isPaid ? (
        <Tag>A viagem já está paga.</Tag>
      ) : (
        <>
          {/* @ts-ignore */}
          <Button variant="tertiary" href={`/app/viagens/comprar/${idParam}`} className="trip-checkout__cta-button" disabled={!isEnabled} onClick={submitConditions}>
            Prosseguir para pagamento por {formatToCurrencyBR(data.total)}
          </Button>
        </>
      )}
    </Box>
  );
};
