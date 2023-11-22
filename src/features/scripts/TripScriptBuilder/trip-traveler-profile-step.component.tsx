import type { StepComponentProps } from "@/features";
import { useAppStore } from "@/core/store";

import { ErrorState, Text } from "@/ui";
import { Button, Grid, Link } from "mars-ds";
import { HasProfile } from "@/features";

export function TripTravelerProfileStep({ onNext, onPrevious }: StepComponentProps) {
  const travelerProfile = useAppStore((state) => state.travelerState.travelerProfile);

  if (!travelerProfile) {
    return (
      <div className="text-center">
        <ErrorState />
        <Button variant="tertiary" onClick={onPrevious}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <Grid className="trip-script-builder-step">
      <Text heading size="sm" className="trip-script-builder-step__item">
        Temos uma ideia do que você quer para essa viagem!
      </Text>
      <HasProfile travelerProfile={travelerProfile} />
      <Text className="trip-script-builder-step__item" size="sm">
        Seu perfil de viajante nos ajuda a encontrar as melhores experiências para o seu roteiro.
      </Text>
      <Button
        className="trip-script-builder-step__item"
        onClick={() => onNext({ tripTravelerProfile: travelerProfile })}
      >
        Avançar com este perfil
      </Button>
      <Link className="trip-script-builder-step__link" href="/perfil">
        Quero refazer meu perfil
      </Link>
    </Grid>
  );
}
