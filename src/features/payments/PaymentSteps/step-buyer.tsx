import type { PaymentPayloadData, PaymentStepProps } from "./payment-steps.types";
import { Button, Divider, Grid, TextField } from "mars-ds";
import { SelectFieldGender, Text } from "@/ui";
import { type SubmitHandler, handleFormSubmit } from "@/utils/helpers/form.helpers";

export const StepBuyer = ({ onNext, payload, payer, setPayload }: PaymentStepProps) => {
  const handleSubmit: SubmitHandler<PaymentPayloadData["payer"]> = (payer) => {
    setPayload({ payer });
    onNext();
  };

  return (
    <form onSubmit={handleFormSubmit(handleSubmit)}>
      <Grid>
        <Text>Dados do viajante comprador</Text>
        <TextField
          id="fullName"
          name="fullName"
          required
          label="Nome do comprador"
          value={payload.payer.fullName}
          minLength={3}
        />
        <TextField
          id="cpf"
          name="cpf"
          required
          label="CPF do comprador"
          value={payload.payer.cpf}
          mask={"999.999.999-99"}
          minLength={14}
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
            value={payload.payer.birthDate}
            minLength={10}
          />
          <SelectFieldGender name="gender" defaultValue={payload.payer.gender} required />
        </Grid>
        <TextField
          id="motherName"
          name="motherName"
          label="Nome da mãe"
          value={payload.payer.motherName}
          minLength={3}
          required
        />
        <TextField
          id="document"
          name="document"
          required
          label="Documento do comprador (RG)"
          value={payload.payer.document}
          mask="9999999999"
          maxLength={10}
          minLength={3}
        />
        <Divider />
        <Text>Contato</Text>
        <TextField
          label="E-mail"
          id="email"
          value={payload.payer.email}
          disabled={Boolean(payer.email)}
        />
        <input type="hidden" value={payload.payer.email} name="email" />
        <TextField
          label="Telefone"
          name="phone"
          id="phone"
          mask="(99) 99999-9999"
          required
          value={payload.payer.phone}
          minLength={14}
        />
        <br />
        <Button variant="tertiary" type="submit">
          Continuar
        </Button>
      </Grid>
    </form>
  );
};
