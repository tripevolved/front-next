import type { Traveler } from "@/core/types";
import type { PaymentStepProps } from "./payment-steps.types";
import { SelectFieldGender, Text } from "@/ui";

import { Button, Divider, Grid, TextField, makeArray } from "mars-ds";
import { type SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";
import { parseIsoToBRString } from "@/utils/helpers/dates.helpers";

export const StepTravelers = ({ trip, onNext, setPayload, payload }: PaymentStepProps) => {
  const array = makeArray(trip.configuration.numAdults);

  const handleSubmit: SubmitHandler = (data) => {
    const travelers: Traveler[] = [];

    for (const keyName in data) {
      const [index, key] = keyName.split(".");
      const i = Number(index);
      const value = data[keyName];
      if (!travelers[i]) travelers[i] = {} as any;
      // @ts-ignore
      travelers[i][key] = value;
    }

    setPayload({ travelers });
    onNext();
  };

  return (
    <form onSubmit={handleFormSubmit(handleSubmit)}>
      <Grid>
        <Text heading size="xs">
          Só mais um passo
        </Text>
        <Text className="color-text-secondary">
          Para prosseguirmos com a compra dos itens da sua viagem, insira os dados dos viajantes.
          Precisamos dessas informações para garantir sua reserva!
        </Text>
        {array.map((_, index) => (
          <TravelerForm key={`form-${index}`} index={index} data={payload.travelers?.[index]} />
        ))}
        <br />
        <Button variant="tertiary" type="submit">
          Continuar
        </Button>
      </Grid>
    </form>
  );
};

interface TravelerFormProps {
  index: number;
  data?: Partial<Traveler>;
}

const TravelerForm = ({ index = 0, data }: TravelerFormProps) => {
  const position = index + 1;
  console.log(data)
  return (
    <Grid>
      <Divider key={`divider-${index}`} />
      <Text>Viajante {position}:</Text>
      {data?.id ? <input type="hidden" name={`${index}.id`} value={data.id} /> : null}
      {data?.travelerId ? (
        <input type="hidden" name={`${index}.travelerId`} value={data.travelerId} />
      ) : null}
      <TextField
        required
        label="Nome completo"
        value={data?.fullName}
        name={`${index}.fullName`}
        minLength={3}
      />
      <TextField
        required
        label="CPF"
        value={data?.cpf}
        mask={"999.999.999-99"}
        name={`${index}.cpf`}
        minLength={14}
      />
      <Grid columns={{ sm: 2 }}>
        <TextField
          info="DD/MM/AAAA"
          name={`${index}.birthDate`}
          required
          label="Data de Nascimento"
          type="text"
          mask="99/99/9999"
          value={parseIsoToBRString(data?.birthDate)}
          minLength={10}
        />
        <SelectFieldGender name={`${index}.gender`} required defaultValue={data?.gender} />
      </Grid>
      <TextField label="E-mail" name={`${index}.email`} type="email" value={data?.email} required />
      <TextField
        required
        label="Número de RG"
        name={`${index}.rg`}
        mask="9999999999"
        value={data?.rg}
        maxLength={10}
        minLength={3}
      />
    </Grid>
  );
};
