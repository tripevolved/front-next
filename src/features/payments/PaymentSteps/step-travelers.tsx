import { Text } from "@/ui";
import type { PaymentStepProps } from "./payment-steps.types";

import { Button, Divider, Grid, SelectField, TextField, makeArray } from "mars-ds";
import { GENDER_OPTIONS } from "../TripPurchasePage/trip-purchase.constants";

export const StepTravelers = ({ trip, onNext }: PaymentStepProps) => {
  const array = makeArray(trip.configuration.numAdults);
  return (
    <Grid>
      <Text heading size="xs">
        Só mais um passo
      </Text>
      <Text className="color-text-secondary">
        Para prosseguirmos com a compra dos itens da sua viagem, insira os dados dos viajantes.
        Precisamos dessas informações para garantir sua reserva!
      </Text>
      {array.map((_, index) => (
        <>
          <Divider key={`divider-${index}`} />
          <TravelerForm key={`form-${index}`} index={index} />
        </>
      ))}
      <br />
      <Button variant="tertiary" onClick={onNext}>
        Continuar
      </Button>
    </Grid>
  );
};

const TravelerForm = ({ index = 0 }) => {
  const position = index + 1;
  return (
    <Grid>
      <Text>Viajante {position}:</Text>
      <TextField required label="Nome completo" id={`${index}.fullName`} />
      <TextField required label="CPF" id={`${index}.cpf`} mask={"999.999.999-99"} />
      <Grid columns={2}>
        <TextField
          info="DD/MM/AAAA"
          id={`${index}.birthDate`}
          required
          label="Data de Nascimento"
          type="text"
          mask="99/99/9999"
        />
        <SelectField
          id={`${index}.gender`}
          required
          name="gender"
          label="Sexo"
          options={GENDER_OPTIONS}
        />
      </Grid>
      <TextField label="E-mail" id={`${index}.email`} type="email" />
      <TextField required label="Número de RG" id={`${index}.rg`} mask="999999999" />
    </Grid>
  );
};
