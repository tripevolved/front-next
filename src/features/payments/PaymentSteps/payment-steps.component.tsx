import { CircleStepper, Grid, ToggleButton, Card, CardElevations } from "mars-ds";

import { usePaymentSteps } from "./payment-steps.hook";

export const PaymentSteps = () => {
  const { position, children, onPrevious, isFirstStep, stepNames } = usePaymentSteps();

  return (
    <Grid>
      <div>
        <Grid
          columns={isFirstStep ? 1 : ["auto", 1]}
          growing={false}
          style={{ maxWidth: 480 }}
          className="mx-auto py-md"
        >
          {isFirstStep ? (
            null
          ) : (
            <ToggleButton iconName="arrow-left" onClick={onPrevious} disabled={isFirstStep} />
          )}
          <CircleStepper position={position} steps={stepNames} />
        </Grid>
      </div>
      <Card elevation={CardElevations.Low}>
        <div style={{ maxWidth: 480 }} className="mx-auto py-md">
          {children}
        </div>
      </Card>
    </Grid>
  );
};
