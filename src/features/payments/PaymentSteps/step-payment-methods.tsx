import type { PaymentStepProps } from "./payment-steps.types";

import { Button, Grid, Label } from "mars-ds";
import { SelectFieldSimple, Text } from "@/ui";

import { formatByDataType } from "@/utils/helpers/number.helpers";

export const StepPaymentMethods = ({ price, payload, setPayload }: PaymentStepProps) => {
  const formattedPrice = formatByDataType(price.amount, "CURRENCY");

  const payWithPix = () => {
    console.log({ ...payload, maxInstallments: "1" });
  };

  const payWithCreditCard = () => {
    console.log(payload);
  };

  return (
    <Grid>
      <div className="flex align-items-center gap-md">
        <Text>
          <strong>Pix</strong> (Total de {formattedPrice})
        </Text>
        <Label>3% OFF</Label>
      </div>
      <input type="hidden" name="amount" id="amount" value={price.amount} />
      <Button variant="neutral" onClick={payWithPix}>
        Pagar no Pix{" "}
      </Button>
      <div>
        <Text className="text-center color-text-secondary">ou</Text>
      </div>
      <form action=""></form>
      <Text>
        <strong>Cartão de Crédito</strong> (Total de {formattedPrice})
      </Text>
      <SelectFieldSimple
        name="installments"
        required
        label="Parcelamento"
        onValueChange={(maxInstallments) => setPayload({ maxInstallments })}
        defaultValue={payload.maxInstallments}
        options={price.installmentOptions}
        disabled={!price.installmentOptions.length}
      />
      <Button variant="neutral" onClick={payWithCreditCard}>
        Pagar no Cartão
      </Button>
    </Grid>
  );
};
