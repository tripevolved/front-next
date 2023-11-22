import { useIdParam } from "@/utils/hooks/param.hook";
import type { PaymentStepProps } from "./payment-steps.types";

import { Button, Grid, ItemButton, Label, RadioFields, SelectField, TextField } from "mars-ds";
import { usePurchase } from "../TripPurchasePage/trip-purchase-page.hook";
import { EmptyState, ErrorState, GlobalLoader, Text } from "@/ui";
import { PAYMENT_OPTIONS, PIX_PAYMENT_OPTION } from "../TripPurchasePage/trip-purchase.constants";
import { useState } from "react";
import { TripPaymentMethod } from "@/core/types";
import { formatByDataType } from "@/utils/helpers/number.helpers";

export const StepPaymentMethods = ({ trip }: PaymentStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState<TripPaymentMethod>(
    PIX_PAYMENT_OPTION.value as TripPaymentMethod
  );

  const tripId = useIdParam();
  const { isLoading, data, error } = usePurchase(tripId);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader inline />;
  if (!data) return <EmptyState />;

  const { price } = data;
  const [firstInstallmentOption] = price.installmentOptions;

  const formattedPrice = formatByDataType(price.amount, "CURRENCY");

  return (
    <Grid>
      <div className="flex align-items-center gap-md">
        <Text>
          <strong>Pix</strong> (Total de {formattedPrice})
        </Text>
        <Label>3% OFF</Label>
      </div>
      <input type="hidden" name="amount" id="amount" value={price.amount} />
      <Button variant="neutral">Pagar no Pix </Button>
      <div>
        <Text className="text-center color-text-secondary">ou</Text>
      </div>
      <Text>
        <strong>Cartão de Crédito</strong> (Total de {formattedPrice})
      </Text>
      <SelectField
        enableFilter={false}
        id="installments"
        name="installments"
        required
        label="Parcelamento"
        defaultOption={firstInstallmentOption}
        options={price.installmentOptions}
        disabled={!price.installmentOptions.length}
      />
      <Button variant="neutral">Pagar no Cartão</Button>
    </Grid>
  );
};
