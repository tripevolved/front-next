import { EmptyState, GlobalLoader, Box, Text, DashedDivider } from "@/ui";
import { PageAppBody, PageAppHeader } from "@/features";
import { useTripPayer } from "./trip-payer.hook";
import { useTripPrice } from "@/features/trips/TripDetailsPage/trip-price.hook";
import { Button, Grid, RadioFields, SelectField, TextField } from "mars-ds";
import { formatByDataType } from "@/utils/helpers/number.helpers";

const MIN_PAYMENT = 100;
const MAX_INSTALLMENTS = 6;

export function TripPurchasePage() {
  const { isLoading, tripPayer, error } = useTripPayer();
  const { priceData } = useTripPrice();

  const priceTotal = priceData?.price! + priceData?.serviceFee!;

  const getOptions = () => {
    let maxInstallments = Math.min(Math.floor(priceTotal / MIN_PAYMENT), MAX_INSTALLMENTS);

    const options = [];
    for (let i = 1; i <= maxInstallments; i++) {
      options.push({ label: `${i}x de ${formatByDataType(priceTotal/i, "CURRENCY")}`, value: i });
    }
    return options;
  }

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;

  return (
    <>
      <PageAppHeader>
        COMPONENTE PARA VOLTAR
        <Text heading={true} size="sm">Comprar viagem</Text>
      </PageAppHeader>
      <PageAppBody>
        <Box className="trip-purchase__section">
          <Text heading={true} size="xs">Dados do viajante comprador</Text>
          <TextField
            className="trip-purchase__section__input"
            label="Nome do viajante comprador"
            value={tripPayer?.fullName} />
          <TextField
            className="trip-purchase__section__input"
            label="CPF do viajante comprador"
            value={tripPayer?.cpf}
            mask={"999.999.999-99"} />
        </Box>
        <DashedDivider className="trip-purchase__divider"/>
        <Box className="trip-purchase__section">
          <Text heading={true} size="xs">Contato</Text>
          <Text className="trip-purchase__section__content" heading={false} size="md">{tripPayer?.email}</Text>
        </Box>
        <DashedDivider className="trip-purchase__divider"/>
        <Box className="trip-purchase__section">
          <Text heading={true} size="xs">Endereço de cobrança</Text>
          <TextField
            className="trip-purchase__section__input"
            label="CEP"
            value={tripPayer?.address?.postalCode}
            mask={"99999-999"} />
          <Grid columns={[2,1]}>
            <TextField
              className="trip-purchase__section__input"
              label="Cidade"
              value={tripPayer?.address?.city} />
            <TextField
              className="trip-purchase__section__input"
              label="UF"
              value={tripPayer?.address?.stateProvince!} />
          </Grid>
          <TextField
            className="trip-purchase__section__input"
            label="Endereço"
            value={tripPayer?.address?.address} />
          <Grid columns={[1,2]}>
            <TextField
              className="trip-purchase__section__input"
              label="Número"
              value={tripPayer?.address?.number} />
            <TextField
              className="trip-purchase__section__input"
              label="Complemento"
              value={tripPayer?.address?.complement!} />
          </Grid>
        </Box>
        <DashedDivider className="trip-purchase__divider" />
        <Box className="trip-purchase__section">
          <Text heading={true} size="xs">Forma de pagamento</Text>
          <RadioFields
            className="trip-purchase__section__radio"
            name="payment-form"
            options={[{ label: "Cartão de crédito", value: "credit_card" }, { label: "Pix", value: "pix" }]}
          />
          <SelectField
            label="Parcelamento"
            options={getOptions()}
            className="trip-purchase__section__input"
          />
        </Box>
        <Box className="trip-purchase__footer">
          <Button
            className="trip-purchase__footer__button"
            variant="custom"
            backgroundColor="var(--color-brand-2)"
            hoverBackgroundColor="var(--color-secondary-900)"
            color="white">
            Comprar viagem por {formatByDataType(priceTotal, "CURRENCY")}
          </Button>
        </Box>
      </PageAppBody>
    </>
  );
}
