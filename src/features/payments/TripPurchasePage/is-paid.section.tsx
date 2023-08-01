import { Text, Picture, Box } from "@/ui";
import { Button } from "mars-ds";

export function IsPaidSection({ tripId }: { tripId: string }) {
  return (
    <Box className="trip-purchase__response">
      <Picture className="trip-purchase__response-item" src="/assets/payments/success.png" />
      <Text className="trip-purchase__response-item" heading={true} size="xl">Tudo certo!</Text>
      <Text className="trip-purchase__response-item" size="lg">Sua viagem já foi paga.</Text>
      <Button
        className="trip-purchase__response-button"
        variant="custom"
        backgroundColor="var(--color-brand-2)"
        hoverBackgroundColor="var(--color-secondary-900)"
        color="white"
        href={`/app/viagens/${tripId}`}>
        Ver minha viagem
      </Button>
    </Box>
  );
}
