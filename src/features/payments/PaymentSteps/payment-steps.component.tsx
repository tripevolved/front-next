import { CircleStepper, Grid, ToggleButton, Card, CardElevations, Divider, Button } from "mars-ds";

import { usePaymentSteps } from "./payment-steps.hook";
import { Text } from "@/ui";

export const PaymentSteps = () => {
  const { position, children, onPrevious, isFirstStep, stepNames, price } = usePaymentSteps();

  if (price?.isPaid) {
    return (
      <Card elevation={CardElevations.Low}>
        <Grid style={{ maxWidth: 480 }} className="mx-auto py-md">
          <Text heading>Essa viagem já está paga!</Text>
          <Text>Acesse o seu painel para visualizar os detalhes da sua viagem:</Text>
          <Button variant="tertiary" href="/app/painel">Ir para o painel</Button>
        </Grid>
      </Card>
    )
  }

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
