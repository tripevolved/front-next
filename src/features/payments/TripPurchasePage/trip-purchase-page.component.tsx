import { EmptyState, GlobalLoader, Box, Text, DashedDivider } from "@/ui";
import { PageAppBody, PageAppHeader } from "@/features";
import { useTripPayer } from "./trip-payer.hook";
import { Button, Grid, RadioFields, SelectField, TextField } from "mars-ds";

export function TripPurchasePage() {
  const { isLoading, data, error } = useTripPayer();

  const options = [
    { label: "1x de X", value: 1 }
  ];

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
            value={data?.fullName} />
          <TextField
            className="trip-purchase__section__input"
            label="CPF do viajante comprador"
            value={data?.cpf}
            mask={"999.999.999-99"} />
        </Box>
        <DashedDivider/>
        <Box className="trip-purchase__section">
          <Text heading={true} size="xs">Contato</Text>
          <Text className="trip-purchase__section__content" heading={false} size="md">{data?.email}</Text>
        </Box>
        <DashedDivider/>
        <Box className="trip-purchase__section">
          <Text heading={true} size="xs">Endereço de cobrança</Text>
          <TextField
            className="trip-purchase__section__input"
            label="CEP"
            value={data?.address?.postalCode}
            mask={"99999-999"} />
          <Grid columns={2}>
            <TextField
              className="trip-purchase__section__input"
              label="Cidade"
              value={data?.address?.city} />
            <TextField
              className="trip-purchase__section__input"
              label="UF"
              value={data?.address?.stateProvince!} />
          </Grid>
          <TextField
            className="trip-purchase__section__input"
            label="Endereço"
            value={data?.address?.address} />
          <Grid columns={2}>
            <TextField
              className="trip-purchase__section__input"
              label="Número"
              value={data?.address?.number} />
            <TextField
              className="trip-purchase__section__input"
              label="Complemento"
              value={data?.address?.complement!} />
          </Grid>
        </Box>
        <DashedDivider/>
        <Box className="trip-purchase__section">
          <Text heading={true} size="xs">Forma de pagamento</Text>
          <RadioFields
            className="trip-purchase__section__input"
            name="payment-form"
            options={[{ label: "Cartão de crédito", value: "credit-card" }, { label: "Pix", value: "pix" }]}
          />
          <Grid columns={2} className="trip-purchase__section__input">
          </Grid>
          <SelectField
            label="Parcelamento"
            options={options}
            defaultOption={options[0]}
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
            Comprar viagem por PREÇO
          </Button>
        </Box>
      </PageAppBody>
    </>
  );
}
