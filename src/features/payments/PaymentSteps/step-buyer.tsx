import { Button, Divider, Grid, SelectField, TextField } from "mars-ds";
import { PaymentStepProps } from "./payment-steps.types";
import { useIdParam } from "@/utils/hooks/param.hook";
import { usePurchase } from "../TripPurchasePage/trip-purchase-page.hook";
import { EmptyState, ErrorState, GlobalLoader, Text } from "@/ui";
import { GENDER_OPTIONS } from "../TripPurchasePage/trip-purchase.constants";

export const StepBuyer = ({ onNext }: PaymentStepProps) => {
  const tripId = useIdParam();
  const { isLoading, data, error } = usePurchase(tripId);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader inline />;
  if (!data) return <EmptyState />;

  const { payer } = data;
  return (
    <Grid>
      <Text>Dados do viajante comprador</Text>
      <TextField
        id="fullName"
        name="fullName"
        required
        label="Nome do comprador"
        defaultValue={payer.fullName}
      />
      <TextField
        id="cpf"
        name="cpf"
        required
        label="CPF do comprador"
        defaultValue={payer.cpf}
        mask={"999.999.999-99"}
      />
      <Grid columns={2}>
        <TextField
          info="DD/MM/AAAA"
          id="birthDate"
          name="birthDate"
          required
          label="Data de Nascimento"
          type="text"
          mask="99/99/9999"
          defaultValue={payer.birthDate}
        />
        <SelectField
          id="gender"
          required
          name="gender"
          label="Sexo"
          options={GENDER_OPTIONS}
          defaultValue={payer.gender}
          enableFilter={false}
        />
      </Grid>
      <TextField
        id="motherName"
        name="motherName"
        label="Nome da mãe"
        defaultValue={payer.motherName}
      />
      <TextField
        id="document"
        name="document"
        required
        label="Documento do comprador (RG)"
        defaultValue={payer.document}
        mask="999999999"
        maxLength={9}
      />
      <Divider />
      <Text>Contato</Text>
      <TextField label="E-mail" id="email" value={payer.email} disabled={Boolean(payer.email)} />
      <input type="hidden" value={payer.email} name="email" />
      <TextField
        label="Telefone"
        name="phone"
        id="phone"
        mask="(99) 99999-9999"
        required
        defaultValue={payer.phone}
        disabled={Boolean(payer.phone)}
      />
      <br />
      <Button variant="tertiary" onClick={onNext}>
        Continuar
      </Button>
    </Grid>
  );
};
