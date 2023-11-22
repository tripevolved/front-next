import { Button, Grid } from "mars-ds";
import { PaymentStepProps } from "./payment-steps.types";
import { useIdParam } from "@/utils/hooks/param.hook";
import { usePurchase } from "../TripPurchasePage/trip-purchase-page.hook";
import { EmptyState, ErrorState, GlobalLoader } from "@/ui";
import { TripPurchaseAddressForm } from "../TripPurchaseForm/trip-purchase-address-form";

export const StepAddress = ({ onNext }: PaymentStepProps) => {
  const tripId = useIdParam();
  const { isLoading, data, error } = usePurchase(tripId);

  if (error) return <ErrorState />;
  if (isLoading) return <GlobalLoader inline />;
  if (!data) return <EmptyState />;

  const { payer } = data;
  return (
    <Grid>
      <TripPurchaseAddressForm {...payer.address} />
      <br />
      <Button variant="tertiary" onClick={onNext}>
        Continuar
      </Button>
    </Grid>
  );
};
