import type { GridProps } from "mars-ds";

import { Grid, TextField } from "mars-ds";
import { useState } from "react";
import { WhatsappButton } from "@/ui";

interface BudgetRequestFormProps extends GridProps {
}

export const BudgetRequestForm = ({ ...props }: BudgetRequestFormProps) => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");

  return (
    <form className="text-left">
      <Grid {...props}>
        <TextField required name="name" label="Nome" minLength={3} value={name} onChange={(event) => setName((event.target as HTMLInputElement).value)} />
        <TextField name="info" label="Nos conte o que puder sobre sua viagem" minLength={3} value={info} onChange={(event) => setInfo((event.target as HTMLInputElement).value)} />
        <WhatsappButton
          /* eslint-disable-next-line react/no-children-prop */
          children="Realizar meu orçamento"
          variant="custom"
          backgroundColor="var(--color-brand-4)"
          color="var(--color-black)"
          hoverBackgroundColor="var(--color-secondary-900)"
          hoverColor="var(--color-white)"
          message={`Olá, meu nome é ${name} e quero realizar meu orçamento de viagem! Informações: ${info}`}
        />
      </Grid>
    </form>
  );
};
