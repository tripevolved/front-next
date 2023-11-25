import { Button, Grid } from "mars-ds";
import { PaymentStepProps } from "./payment-steps.types";
import { TripPurchaseAddressForm } from "../TripPurchaseForm/trip-purchase-address-form";
import { handleFormSubmit, type SubmitHandler } from "@/utils/helpers/form.helpers";
import { TripPayerAddress } from "@/core/types";

export const StepAddress = ({ onNext, payload, setPayload }: PaymentStepProps) => {
  const handleSubmit: SubmitHandler<TripPayerAddress> = (address) => {
    setPayload({ address });
    onNext();
  };

  return (
    <form onSubmit={handleFormSubmit(handleSubmit)}>
      <Grid>
        <TripPurchaseAddressForm {...payload.address} />
        <br />
        <Button type="submit" variant="tertiary">
          Continuar
        </Button>
      </Grid>
    </form>
  );
};
