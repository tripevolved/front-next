import { CircleStepper, Grid, ToggleButton, Card, CardElevations, Divider } from "mars-ds";

import { usePaymentSteps } from "./payment-steps.hook";

export const PaymentSteps = () => {
  const { position, children, onPrevious, isFirstStep, stepNames } = usePaymentSteps();

  return (
    <Card elevation={CardElevations.Low}>
      <Grid columns={isFirstStep ? 1 : ["auto", 1]} growing={false} className="mx-auto py-md">
        {isFirstStep ? null : (
          <ToggleButton iconName="arrow-left" onClick={onPrevious} disabled={isFirstStep} />
        )}
        <CircleStepper position={position} steps={stepNames} />
      </Grid>
      <div className="py-md" style={{ marginLeft: -24, marginRight: -24 }}>
        <Divider />
      </div>
      <div style={{ maxWidth: 480 }} className="mx-auto py-md">
        {children}
      </div>
    </Card>
  );
};
