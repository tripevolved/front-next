import type { Traveler } from "@/core/types";
import type { PaymentPayloadData, PaymentStepProps } from "./payment-steps.types";
import { SelectFieldGender, Text } from "@/ui";

import { Button, Checkbox, Divider, Grid, TextField, makeArray } from "mars-ds";
import { type SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";
import { parseIsoToBRString } from "@/utils/helpers/dates.helpers";
import React from "react";

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
          <TravelerForm
            key={`form-${index}`}
            index={index}
            data={payload.travelers?.[index]}
            payerData={payload.payer}
          />
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
  payerData: PaymentPayloadData["payer"];
}

const TravelerForm = ({ index = 0, data, payerData }: TravelerFormProps) => {
  const [travelerData, setTravelerData] = React.useState<Partial<Traveler>>(data || {});
  const [checked, setChecked] = React.useState(false);
  const position = index + 1;

  const handleCheckbox = () => {
    setChecked((prev) => !prev);
    if (!checked) {
      setTravelerData((prev) => ({
        ...prev,
        birthDate: payerData.birthDate,
        fullName: payerData.fullName,
        cpf: payerData.cpf,
        rg: payerData.document,
        gender: payerData.gender,
        email: payerData.email,
      }));
    }
  };

  const removeIndexFromName = (name: string) => name.replace(/^\d+\./, "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const fieldName = removeIndexFromName(name) as keyof typeof payerData;

    setTravelerData((prev) => ({ ...prev, [name]: value }));
    if (payerData[fieldName] !== value) {
      setChecked(false);
    }
  };

  return (
    <Grid>
      <Divider key={`divider-${index}`} />
      <Text>Viajante {position}:</Text>
      {travelerData?.id ? (
        <input type="hidden" name={`${index}.id`} value={travelerData.id} />
      ) : null}
      {travelerData?.travelerId ? (
        <input type="hidden" name={`${index}.travelerId`} value={travelerData.travelerId} />
      ) : null}
      <TextField
        required
        label="Nome completo"
        value={travelerData?.fullName}
        defaultValue={travelerData?.fullName}
        name={`${index}.fullName`}
        minLength={3}
        onChange={handleChange}
      />
      <TextField
        required
        label="CPF"
        value={travelerData?.cpf}
        mask={"999.999.999-99"}
        name={`${index}.cpf`}
        minLength={14}
        onChange={handleChange}
      />
      <Grid columns={{ sm: 2 }}>
        <TextField
          info="DD/MM/AAAA"
          name={`${index}.birthDate`}
          required
          label="Data de Nascimento"
          type="text"
          mask="99/99/9999"
          value={parseIsoToBRString(travelerData?.birthDate)}
          minLength={10}
          onChange={handleChange}
        />
        <SelectFieldGender
          name={`${index}.gender`}
          required
          key={`gender-${travelerData.gender || "not-informed"}`}
          value={travelerData.gender}
        />
      </Grid>
      <TextField
        label="E-mail"
        name={`${index}.email`}
        type="email"
        value={travelerData?.email}
        required
        onChange={handleChange}
      />
      <TextField
        required
        label="Número do RG"
        name={`${index}.rg`}
        mask="9999999999"
        value={travelerData?.rg}
        maxLength={10}
        minLength={3}
        onChange={handleChange}
      />
      <Grid columns={{ sm: 2 }}>
        <TextField
          info="DD/MM/AAAA"
          name={`${index}.rgValidUntil`}
          required
          label="Validade do RG"
          type="text"
          mask="99/99/9999"
          value={parseIsoToBRString(travelerData?.rgValidUntil)}
          minLength={10}
        />
        <TextField
          required
          label="Emissor do RG"
          value={travelerData?.rgIssuer}
          name={`${index}.rgIssuer`}
          minLength={3}
          maxLength={10}
        />
        {position === 1 && (
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Text>Eu mesmo sou o viajante:</Text>
            <Checkbox onClick={handleCheckbox} defaultChecked={checked} />
          </div>
        )}
      </Grid>
    </Grid>
  );
};
